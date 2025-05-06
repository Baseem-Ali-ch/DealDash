import { model, Schema } from "mongoose";
import { IBrand } from "../interfaces/IBrand";

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
    },
    website:{
        type: String,
        required: true,
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

export const BrandModel = model<IBrand>("Brand", brandSchema);
