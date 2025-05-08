import { Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  slug?: string;
  imageUrl?: string;
  status?: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
  imageurl?: string;
  slug?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: string;
}

export interface ToggleCategoryStatusRequest {
  categoryId: string;
  status: 'active' | 'inactive';
}