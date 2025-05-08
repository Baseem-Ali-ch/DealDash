import { Request } from 'express';
import { Types } from 'mongoose';
import {Document, ObjectId} from 'mongoose'
import { ICategory } from './ICategory';
import { IBrand } from './IBrand';

interface ProductImage {
  url: string;
  name: string;
  size: number;
  type: string;
}

interface ProductVariant {
  sku: string;
  price: number;
  stock: number;
  color: string;
  size: string;
  images: ProductImage[];
}

export interface CreateProductRequest extends Request{
  body: {
    name: string;
    sku: string;
    description: string;
    price: number;
    compareAtPrice: number;
    categoryId: string;
    brandId: string;
    stock: number;
    dimensions: {
      length: string;
      width: string;
      height: string;
    };
    status: 'draft' | 'published';
    images: ProductImage[];
    variants: ProductVariant[];
    hasVariants: boolean;
    shippingRequired: boolean;
  };
}

export interface IProduct extends Document {
  name: string;
  sku: string;
  description: string;
  price: number;
  compareAtPrice: number;
  categoryId: Types.ObjectId | ICategory;
  brandId: Types.ObjectId | IBrand;
  stock: number;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  status: 'draft' | 'published';
  images: ProductImage[];
  variants: ProductVariant[];
  hasVariants: boolean;
  shippingRequired: boolean;
}
