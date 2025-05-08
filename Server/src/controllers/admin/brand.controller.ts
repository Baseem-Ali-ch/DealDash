import { HttpStatusCode } from "../../constants/httpStatusCodes";
import { StatusMessage } from "../../constants/responseMessages";
import { uploadToCloudinary } from "../../config/cloudinary";
import { BrandModel } from "../../models/Brand";
import { Request, Response } from "express";
import { CreateBrandRequest, IBrand } from "../../interfaces/IBrand";

export const getBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const brands = await BrandModel.find({}).sort({ createdAt: -1 });
    res.status(HttpStatusCode.OK).json({
      message: StatusMessage.SUCCESS,
      data: brands,
    });
  } catch (error) {
    console.log("Error in get all brands:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const createBrands = async (
  req: Request<CreateBrandRequest>,
  res: Response<{ message: string; data?: IBrand; success?: boolean }>
): Promise<void> => {
  try {
    const { name, description, imageurl, website, status } = req.body;
    if (!name || !description) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: StatusMessage.BAD_REQUEST,
      });
    }

    let imageUrl = null;
    if (imageurl) {
      try {
        // Upload image to Cloudinary
        const uploadResponse = await uploadToCloudinary(imageurl);
        imageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Error uploading image",
        });
      }
    }

    const brand = new BrandModel({
      name,
      description,
      website,
      imageUrl,
      status,
    });
    await brand.save();

    res.status(HttpStatusCode.CREATED).json({
      message: StatusMessage.SUCCESS,
      data: brand,
    });
  } catch (error) {
    console.log("Error in create brand:", error);

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateBrands = async (
  req: Request,
  res: Response<{ message: string; data?: IBrand; success?: boolean }>
): Promise<void> => {
  try {
    const { name, description, imageurl, website, status } = req.body;
    const { id } = req.params;
    if (!name || !description) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: StatusMessage.BAD_REQUEST,
      });
    }

    let updateData = {
      name,
      description,
      website,
      status,
      imageUrl: imageurl,
    };

    // Handle image upload if new image is provided
    if (imageurl) {
      try {
        const uploadResponse = await uploadToCloudinary(imageurl);
        updateData = {
          ...updateData,
          imageUrl: uploadResponse.secure_url,
        };
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Error uploading image",
        });
      }
    }

    const brands = await BrandModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!brands) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: StatusMessage.NOT_FOUND,
      });
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: StatusMessage.SUCCESS,
      data: brands || undefined,
    });
  } catch (error) {
    console.error("Error in update brands:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteBrands = async (
  req: Request<{ id: string }>,
  res: Response<{ message: string; data?: IBrand }>
): Promise<void> => {
  try {
    const { id } = req.params;
    const brands = await BrandModel.findByIdAndDelete(id);

    if (!brands) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: StatusMessage.NOT_FOUND,
      });
    }

    res.status(HttpStatusCode.OK).json({
      message: StatusMessage.SUCCESS,
      data: brands || undefined,
    });
  } catch (error) {
    console.log("Error in delete brands:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const toggleBrandsStatus = async (
  req: Request<{ brandId: string }>,
  res: Response<{ message: string; data?: IBrand; success: boolean }>
): Promise<void> => {
  try {
    const { brandId } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: StatusMessage.BAD_REQUEST,
      });
      return;
    }

    const updatedBrands = await BrandModel.findByIdAndUpdate(
      brandId,
      { status },
      { new: true }
    );

    if (!updatedBrands) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: StatusMessage.NOT_FOUND,
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: StatusMessage.SUCCESS,
      data: updatedBrands,
    });
  } catch (error) {
    console.error("Toggle brand status error:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
