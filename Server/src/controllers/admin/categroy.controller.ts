import { CategoryModel } from "../../models/Category";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import { StatusMessage } from "../../constants/responseMessages";
import { uploadToCloudinary } from "../../config/cloudinary";

export const getCategories = async (req: any, res: any): Promise<any> => {
  try {
    const categories = await CategoryModel.find({}).sort({ createdAt: -1 });
    res.status(HttpStatusCode.OK).json({
      message: StatusMessage.SUCCESS,
      data: categories,
    });
  } catch (error) {
    console.log("Error in get all categories:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const createCategory = async (req: any, res: any): Promise<any> => {
  try {
    const { name, description, iamgeurl, slug, status } = req.body;
    if (!name || !description) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: StatusMessage.BAD_REQUEST,
      });
    }

    let imageUrl = null;
    if (iamgeurl) {
      try {
        // Upload image to Cloudinary
        const uploadResponse = await uploadToCloudinary(iamgeurl);
        imageUrl = uploadResponse.secure_url;
        console.log("Image URL:", imageUrl);
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Error uploading image",
        });
      }
    }

    const category = new CategoryModel({
      name,
      description,
      slug,
      imageUrl,
      status,
    });
    await category.save();

    res.status(HttpStatusCode.CREATED).json({
      message: StatusMessage.SUCCESS,
      data: category,
    });
  } catch (error) {
    console.log("Error in create category:", error);

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateCategory = async (req: any, res: any): Promise<any> => {
  try {
    const { name, description, slug, status, imageurl } = req.body;
    const { id } = req.params;
    if (!name || !description) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: StatusMessage.BAD_REQUEST,
      });
    }

    let updateData = {
      name,
      description,
      slug,
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
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Error uploading image",
        });
      }
    }

    const category = await CategoryModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!category) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: StatusMessage.NOT_FOUND,
      });
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: StatusMessage.SUCCESS,
      data: category,
    });
  } catch (error) {
    console.error("Error in update category:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteCategory = async (req: any, res: any): Promise<any> => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: StatusMessage.NOT_FOUND,
      });
    }

    res.status(HttpStatusCode.OK).json({
      message: StatusMessage.SUCCESS,
      data: category,
    });
  } catch (error) {
    console.log("Error in delete category:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const toggleCategoryStatus = async (
  req: any,
  res: any
): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: StatusMessage.BAD_REQUEST,
      });
      return;
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { status },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: StatusMessage.NOT_FOUND,
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: StatusMessage.SUCCESS,
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Toggle category status error:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
