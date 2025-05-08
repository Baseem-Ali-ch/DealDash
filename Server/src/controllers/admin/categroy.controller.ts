import { CategoryModel } from "../../models/Category";
import { HttpStatusCode } from "../../constants/httpStatusCodes";
import { StatusMessage } from "../../constants/responseMessages";
import { uploadToCloudinary } from "../../config/cloudinary";
import { Request, Response } from "express";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../../interfaces/ICategory";
import { ICategory } from "../../interfaces/ICategory";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const createCategory = async (
  req: Request<CreateCategoryRequest>,
  res: Response<{ message: string; data?: ICategory; success?: boolean }>
): Promise<void> => {
  try {
    const { name, description, imageurl, slug, status } = req.body;
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
      data: category || undefined,
    });
  } catch (error) {
    console.log("Error in create category:", error);

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateCategory = async (
  req: Request<UpdateCategoryRequest>,
  res: Response<{ message: string; data?: ICategory; success?: boolean }>
): Promise<void> => {
  try {
    const { name, description, slug, status, imageurl } = req.body;
    const { id } = req.params;
    if (!name || !description) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
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
        res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Error uploading image",
        });
      }
    }

    const category = await CategoryModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!category) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: StatusMessage.NOT_FOUND,
      });
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: StatusMessage.SUCCESS,
      data: category || undefined,
    });
  } catch (error) {
    console.error("Error in update category:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteCategory = async (
  req: Request<{ id: string }>,
  res: Response<{ message: string; data?: ICategory }>
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: StatusMessage.NOT_FOUND,
      });
    }

    res.status(HttpStatusCode.OK).json({
      message: StatusMessage.SUCCESS,
      data: category || undefined,
    });
  } catch (error) {
    console.log("Error in delete category:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: StatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const toggleCategoryStatus = async (
  req: Request<{ categoryId: string }>,
  res: Response<{ message: string; data?: ICategory; success: boolean }>
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
