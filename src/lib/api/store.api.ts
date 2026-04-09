import api from "./axios";
import { ApiResponse } from "@/types/api.types";

// Purchase Product
export const purchaseProduct = async (data: {
  productId: string;
  quantity: number;
}) => {
  const response = await api.post<ApiResponse>("/store/purchase", data);
  return response.data;
};

// Get Purchase History (My Orders)
export const getMyOrders = async () => {
  const response = await api.get<ApiResponse>("/store/history");
  return response.data;
};

// Refund/Cancel Order
export const refundOrder = async (transactionId: string) => {
  const response = await api.post<ApiResponse>(
    `/store/refund/${transactionId}`,
  );
  return response.data;
};

// Get Purchase History
export const getPurchaseHistory = async (params?: {
  page?: number;
  limit?: number;
}) => {
  const response = await api.get<ApiResponse>("/store/history", { params });
  return response.data;
};

// Get Store Stats (Admin)
export const getStoreStats = async () => {
  const response = await api.get<ApiResponse>("/store/stats");
  return response.data;
};

// Update Order Status (Admin)
export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await api.patch<ApiResponse>(
    `/store/orders/${orderId}/status`,
    { status },
  );
  return response.data;
};
