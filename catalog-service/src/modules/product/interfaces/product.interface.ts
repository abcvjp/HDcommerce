export interface IProduct {
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
  images: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
}
