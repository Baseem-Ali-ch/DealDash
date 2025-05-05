import { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  parentId?: string;
  imageUrl: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}
