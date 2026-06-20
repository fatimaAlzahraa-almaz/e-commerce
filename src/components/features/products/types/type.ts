export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  availabilityStatus?: string;
  brand?: string;
  category?: string;
  description: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  discountPercentage?: number;
  id: number;
  images: string[];
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  minimumOrderQuantity?: number;
  price: number;
  rating?: number;
  returnPolicy?: string;
  reviews?: Review[];
  shippingInformation?: string;
  sku?: string;
  stock?: number;
  tags?: string[];
  thumbnail?: string;
  title: string;
  warrantyInformation?: string;
  weight?: string;
}
export interface ProductWithCount {
  count: number;
  availabilityStatus?: string;
  brand?: string;
  category?: string;
  description: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  discountPercentage?: number;
  id: number;
  images: string[];
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  minimumOrderQuantity?: number;
  price: number;
  rating?: number;
  returnPolicy?: string;
  reviews?: Review[];
  shippingInformation?: string;
  sku?: string;
  stock?: number;
  tags?: string[];
  thumbnail?: string;
  title: string;
  warrantyInformation?: string;
  weight?: string;
}

export interface sortProductsProps {
  setVisibleMenu: (visibleMenu: boolean) => void;
  visibleMenu: boolean;
  handleLowToHigh: () => void;
  handleHighToLow: () => void;
}
