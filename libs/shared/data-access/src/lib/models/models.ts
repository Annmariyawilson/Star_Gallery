export interface Category {
  id: string;
  name: string;
  nameAr: string;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  bannerUrl: string;
  tagline: string;
  colorClass: string;
  hexColor: string;
}

export interface Product {
  id: string;
  brandId: string;
  categoryId: string;
  name: string;
  nameAr: string;
  image: string;
  images?: string[];
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  discount: string;
  isCashOnDelivery: boolean;
}
