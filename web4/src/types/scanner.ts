// web4/src/types/scanner.ts
export interface ScanData {
  barcode: string;
  price: string;
  qualityScore: string;
  categoryId: string;
  shopName: string;
  location: string;
  essentiality: string;
  isBQP: boolean;
  image: File | null;
  externalUserId: string;
}

export interface ProductInfo {
  barcode: string;
  name?: string;
  category?: { id: string };
  nutriscore?: string;
}

export interface FormData {
  price: string;
  qualityScore: string;
  categoryId: string;
  shopName: string;
  location: string;
  essentiality: string;
  isBQP: boolean;
  image: File | null;
}