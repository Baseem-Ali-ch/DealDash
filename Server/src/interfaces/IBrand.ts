import { Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  description: string;
  website?: string;
  imageUrl?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBrandRequest {
  name: string;
  description: string;
  website?: string;
  imageurl?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateBrandRequest extends CreateBrandRequest {
  id: string;
}

export interface ToggleBrandStatusRequest {
  brandId: string;
  status: 'active' | 'inactive';
}