import { create } from "zustand";
import {
  Transaction,
  AwardPointsData,
  DeductPointsData,
} from "@/types/points.types";
import * as pointsApi from "@/lib/api/points.api";
import { PaginationParams } from "@/types/api.types";

interface PaginationData {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface PointsHistoryData {
  items: Transaction[];
  pagination: PaginationData;
}

interface ApiError {
  response?: { data?: { message?: string } };
}

interface PointsState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  pagination: PaginationData | null;

  awardPoints: (data: AwardPointsData) => Promise<void>;
  deductPoints: (data: DeductPointsData) => Promise<void>;
  fetchPointsHistory: (
    userId: string,
    params?: PaginationParams,
  ) => Promise<void>;
  clearError: () => void;
}

export const usePointsStore = create<PointsState>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,
  pagination: null,

  awardPoints: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await pointsApi.awardPoints(data);
      set({ isLoading: false });
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في منح النقاط",
      });
      throw error;
    }
  },

  deductPoints: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await pointsApi.deductPoints(data);
      set({ isLoading: false });
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في خصم النقاط",
      });
      throw error;
    }
  },

  fetchPointsHistory: async (userId, params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await pointsApi.getStudentPointsHistory(userId);
      if (response.success && response.data) {
        const data = response.data as PointsHistoryData;
        set({
          transactions: data.items,
          pagination: data.pagination,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في جلب سجل النقاط",
      });
    }
  },

  clearError: () => set({ error: null }),
}));
