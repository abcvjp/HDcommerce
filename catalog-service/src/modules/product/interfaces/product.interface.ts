import { ObjectId } from 'mongoose';
export interface IProduct {
  _id?: string | ObjectId;
  name: string;
  title: string;
  isEnabled: boolean;
  isPublic: boolean;
  price: number;
  originalPrice: number;
  stockQuantity: number;
  soldQuantity: number;
  description: string;
  shortDescription: string;
  slug: string;
  thumbnail: string;
  images: any[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  categoryId: string;
}
