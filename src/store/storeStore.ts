import { create } from "zustand";
import { Product } from "@/types/product.types";
import { Transaction } from "@/types/points.types";
import { StoreStats } from "@/types/order.types";
import * as productApi from "@/lib/api/product.api";
import * as storeApi from "@/lib/api/store.api";
import { ProductFilters, PaginationParams } from "@/types/api.types";

interface PaginationData {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface ProductsResponseData {
  items: Product[];
  pagination: PaginationData;
}

interface PurchaseHistoryResponseData {
  items: Transaction[];
  pagination: PaginationData;
}

interface ApiError {
  response?: { data?: { message?: string } };
}

interface StoreState {
  products: Product[];
  purchaseHistory: Transaction[];
  stats: StoreStats | null;
  isLoading: boolean;
  error: string | null;
  pagination: PaginationData | null;

  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  purchaseProduct: (productId: string, quantity?: number) => Promise<void>;
  fetchPurchaseHistory: (params?: PaginationParams) => Promise<void>;
  fetchStoreStats: () => Promise<void>;
  clearError: () => void;
}

export const useStoreStore = create<StoreState>((set) => ({
  products: [],
  purchaseHistory: [],
  stats: null,
  isLoading: false,
  error: null,
  pagination: null,

  fetchProducts: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productApi.getAllProducts(filters);
      if (response.success && response.data) {
        const data = response.data as ProductsResponseData;
        set({
          products: data.items,
          pagination: data.pagination,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في جلب المنتجات",
      });
    }
  },

  purchaseProduct: async (productId, quantity = 1) => {
    set({ isLoading: true, error: null });
    try {
      await storeApi.purchaseProduct({ productId, quantity });
      set({ isLoading: false });
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في عملية الشراء",
      });
      throw error;
    }
  },

  fetchPurchaseHistory: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await storeApi.getPurchaseHistory(params);
      if (response.success && response.data) {
        const data = response.data as PurchaseHistoryResponseData;
        set({
          purchaseHistory: data.items,
          pagination: data.pagination,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في جلب سجل المشتريات",
      });
    }
  },

  fetchStoreStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await storeApi.getStoreStats();
      if (response.success && response.data) {
        const data = response.data as StoreStats;
        set({
          stats: data,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في جلب الإحصائيات",
      });
    }
  },

  clearError: () => set({ error: null }),
}));
