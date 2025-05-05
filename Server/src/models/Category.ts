import { model, Schema } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Category",
    //   default: null,
        type: String,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive'],
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const CategoryModel = model<ICategory>("Category", categorySchema);
