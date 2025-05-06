export interface ProductVariant {
    id?: string;
    sku: string;
    price: number;
    stock: number;
    color?: string;
    size?: string;
    images?: ProductImage[];
  }
  
  export interface ProductImage {
    id?: string;
    url: string;
    name: string;
    size: number;
    type: string;
    file?: File;
    color?: string;
  }
  
  export interface Product {
    _id?: string;
    name: string;
    sku: string;
    description?: string;
    price: number;
    compareAtPrice?: number;
    cost?: number;
    categoryId: string;
    brandId?: string;
    stock: number;
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
    status: 'draft' | 'published';
    images: ProductImage[];
    variants: ProductVariant[];
    hasVariants: boolean;
    shippingRequired: boolean;
  }