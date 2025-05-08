import mongoose, { Schema } from "mongoose";
import { model } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const productImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
  type: {
    type: String,
  },
});

const variantSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  color: String,
  size: String,
  images: [productImageSchema],
});

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    compareAtPrice: Number,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    stock: {
      type: Number,
      required: true,
    },
    dimensions: {
      length: String,
      width: String,
      height: String,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    images: [productImageSchema],
    variants: [variantSchema],
    hasVariants: {
      type: Boolean,
      default: false,
    },
    shippingRequired: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model<IProduct>("Product", productSchema);
