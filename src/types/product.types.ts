export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  stock: number;
  isAvailable: boolean;
  inAuction: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  stock: number;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  category?: string;
  stock?: number;
  isAvailable?: boolean;
  inAuction?: boolean;
}

export interface UpdateStockData {
  quantity: number;
  operation: 'add' | 'subtract' | 'set';
}