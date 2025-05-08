import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import { StatusMessage } from "../../constants/responseMessages";
import { uploadToCloudinary } from "../../config/cloudinary";
import { ProductModel } from "../../models/Product";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await ProductModel.find({})
      .populate({
        path: "categoryId",
        select: "name status imageUrl",
        model: "Category",
      })
      .populate({
        path: "brandId",
        select: "name status imageUrl",
        model: "Brand",
      })
      .lean()
      .exec();

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: StatusMessage.SUCCESS,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Parse product data
    const productData =
      typeof req.body.productData === "string"
        ? JSON.parse(req.body.productData)
        : req.body.productData || req.body;

    const uploadedImages = [];
    const variants = [...(productData.variants || [])];

    // Initialize images array for each variant
    variants.forEach((variant, index) => {
      if (!variant.images) {
        variants[index].images = [];
      }
    });

    // Parse variant image mappings
    const variantImageMappings: { variantIndex: number; imageIndex: number }[] =
      [];

    // Handle nested FormData keys (variantImageMappings[variantIndex][imageIndex])
    Object.keys(req.body).forEach((key) => {
      if (key.startsWith("variantImageMappings")) {
        const matches = key.match(/variantImageMappings\[(\d+)\]\[(\d+)\]/);
        if (matches) {
          const variantIndex = parseInt(matches[1], 10);
          const imageIndex = parseInt(matches[2], 10);
          const value = req.body[key];
          // Expect value to be a string like "0:0"
          if (typeof value === "string" && value.includes(":")) {
            const [vIndex, iIndex] = value.split(":").map(Number);
            variantImageMappings.push({
              variantIndex: vIndex,
              imageIndex: iIndex,
            });
          }
        }
      }
    });

    // Handle array format from req.body.variantImageMappings
    if (req.body.variantImageMappings) {
      let mappings = req.body.variantImageMappings;
      // If mappings is an array of arrays, flatten it
      if (
        Array.isArray(mappings) &&
        mappings.length === 1 &&
        Array.isArray(mappings[0])
      ) {
        mappings = mappings[0];
      }
      // Process each mapping
      (Array.isArray(mappings) ? mappings : [mappings]).forEach(
        (map: string) => {
          if (typeof map === "string" && map.includes(":")) {
            const [variantIndex, imageIndex] = map.split(":").map(Number);
            variantImageMappings.push({ variantIndex, imageIndex });
          }
        }
      );
    }

    // Handle file uploads
    if (req.files && typeof req.files === "object") {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const imageFiles = files["images"] || [];
      const variantImageFiles = files["variantImages"] || [];

      // Upload main product images
      for (const file of imageFiles) {
        try {
          const fileBase64 = `data:${
            file.mimetype
          };base64,${file.buffer.toString("base64")}`;
          const uploadResult = await uploadToCloudinary(fileBase64);

          uploadedImages.push({
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
          });
        } catch (error) {
          console.error("Error uploading main image:", error);
          throw new Error(`Failed to upload image: ${file.originalname}`);
        }
      }

      // Upload variant images
      for (let i = 0; i < variantImageFiles.length; i++) {
        const file = variantImageFiles[i];
        const mapping = variantImageMappings.find((m) => m.imageIndex === i);

        if (!mapping) {
          console.warn(
            `No mapping found for variant image at index ${i}, skipping`
          );
          continue;
        }

        try {
          const fileBase64 = `data:${
            file.mimetype
          };base64,${file.buffer.toString("base64")}`;
          const uploadResult = await uploadToCloudinary(fileBase64);

          const imageData = {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
          };

          // Ensure variant exists
          if (!variants[mapping.variantIndex]) {
            console.warn(
              `Variant at index ${mapping.variantIndex} does not exist, creating`
            );
            variants[mapping.variantIndex] = { images: [] };
          }
          if (!variants[mapping.variantIndex].images) {
            variants[mapping.variantIndex].images = [];
          }

          variants[mapping.variantIndex].images.push(imageData);
        } catch (error) {
          console.error("Error uploading variant image:", error);
          throw new Error(
            `Failed to upload variant image: ${file.originalname}`
          );
        }
      }
    } else {
      console.log("No files received in req.files");
    }

    // Create product with uploaded images
    const product = new ProductModel({
      ...productData,
      images: uploadedImages,
      variants,
    });

    await product.save();

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: StatusMessage.SUCCESS,
      data: product,
    });
  } catch (error) {
    console.error("Error in create product:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const productData =
      typeof req.body.productData === "string"
        ? JSON.parse(req.body.productData)
        : req.body.productData || req.body;

    const uploadedImages = [];

    // Handle file uploads
    if (req.files && typeof req.files === "object") {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const imageFiles = files["images"] || [];

      // Upload main product images
      for (const file of imageFiles) {
        try {
          const fileBase64 = `data:${
            file.mimetype
          };base64,${file.buffer.toString("base64")}`;
          const uploadResult = await uploadToCloudinary(fileBase64);

          uploadedImages.push({
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
          });
        } catch (error) {
          console.error("Error uploading main image:", error);
          throw new Error(`Failed to upload image: ${file.originalname}`);
        }
      }
    }

    // Update product with uploaded images
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { ...productData, images: uploadedImages },
      { new: true }
    ).exec();

    if (!updatedProduct) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: StatusMessage.NOT_FOUND,
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: StatusMessage.SUCCESS,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id).exec();

    if (!product) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: StatusMessage.NOT_FOUND,
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: StatusMessage.SUCCESS,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const toggleProductStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status value
    if (!["draft", "published"].includes(status)) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid status value. Must be either 'draft' or 'published'",
      });
      return;
    }

    // Find and update the product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate([
      {
        path: "categoryId",
        select: "name status imageUrl",
      },
      {
        path: "brandId",
        select: "name status imageUrl",
      },
    ]);

    if (!updatedProduct) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: `Product status updated to ${status}`,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error toggling product status:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
