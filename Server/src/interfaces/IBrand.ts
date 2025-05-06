import { Document } from "mongoose";

export interface IBrand extends Document {
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  website: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}
