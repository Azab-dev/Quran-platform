import { create } from "zustand";
import { Auction } from "@/types/auction.types";
import * as auctionApi from "@/lib/api/auction.api";
import { AuctionFilters } from "@/types/api.types";

interface PaginationData {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface AuctionsResponseData {
  items: Auction[];
  pagination: PaginationData;
}

interface AuctionResponseData {
  auction: Auction;
}

interface ApiError {
  response?: { data?: { message?: string } };
}

interface AuctionState {
  auctions: Auction[];
  selectedAuction: Auction | null;
  isLoading: boolean;
  error: string | null;
  pagination: PaginationData | null;

  fetchAuctions: (filters?: AuctionFilters) => Promise<void>;
  fetchAuctionById: (id: string) => Promise<void>;
  placeBid: (auctionId: string, amount: number) => Promise<void>;
  clearError: () => void;
}

export const useAuctionStore = create<AuctionState>((set) => ({
  auctions: [],
  selectedAuction: null,
  isLoading: false,
  error: null,
  pagination: null,

  fetchAuctions: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await auctionApi.getAllAuctions(filters);
      if (response.success && response.data) {
        const data = response.data as AuctionsResponseData;
        set({
          auctions: data.items,
          pagination: data.pagination,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في جلب المزادات",
      });
    }
  },

  fetchAuctionById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await auctionApi.getAuctionById(id);
      if (response.success && response.data) {
        const data = response.data as AuctionResponseData;
        set({
          selectedAuction: data.auction,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في جلب بيانات المزاد",
      });
    }
  },

  placeBid: async (auctionId, amount) => {
    set({ isLoading: true, error: null });
    try {
      await auctionApi.placeBid(auctionId, amount);
      const response = await auctionApi.getAuctionById(auctionId);
      if (response.success && response.data) {
        const data = response.data as AuctionResponseData;
        set({
          selectedAuction: data.auction,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || "حدث خطأ في تقديم العرض",
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));