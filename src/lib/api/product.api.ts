import api from './axios';
import { ApiResponse } from '@/types/api.types';

// Get All Products
export const getAllProducts = async (params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get<ApiResponse>('/products', { params });
  return response.data;
};

// Get Product by ID
export const getProductById = async (id: string) => {
  const response = await api.get<ApiResponse>(`/products/${id}`);
  return response.data;
};

// Create Product (Admin)
export const createProduct = async (data: {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}) => {
  const response = await api.post<ApiResponse>('/products', data);
  return response.data;
};

// Update Product (Admin)
export const updateProduct = async (id: string, data: {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}) => {
  const response = await api.patch<ApiResponse>(`/products/${id}`, data);
  return response.data;
};

// Delete Product (Admin)
export const deleteProduct = async (id: string) => {
  const response = await api.delete<ApiResponse>(`/products/${id}`);
  return response.data;
};

// Get Categories
export const getCategories = async () => {
  const response = await api.get<ApiResponse>('/products/categories');
  return response.data;
};