import api from './axios';
import { ApiResponse } from '@/types/api.types';

// Get All Auctions
export const getAllAuctions = async (params?: {
  status?: 'upcoming' | 'active' | 'ended';
}) => {
  const response = await api.get<ApiResponse>('/auctions', { params });
  return response.data;
};

// Get Auction by ID
export const getAuctionById = async (id: string) => {
  const response = await api.get<ApiResponse>(`/auctions/${id}`);
  return response.data;
};

// Place Bid
export const placeBid = async (auctionId: string, amount: number) => {
  const response = await api.post<ApiResponse>(`/auctions/${auctionId}/bid`, {
    amount
  });
  return response.data;
};

// Get My Bids
export const getMyBids = async () => {
  const response = await api.get<ApiResponse>('/auctions/my-bids');
  return response.data;
};

// Create Auction (Admin)
export const createAuction = async (data: {
  productId: string;
  startingPrice: number;
  startDate: string;
  endDate: string;
}) => {
  const response = await api.post<ApiResponse>('/auctions', data);
  return response.data;
};

// End Auction (Admin)
export const endAuction = async (id: string) => {
  const response = await api.post<ApiResponse>(`/auctions/${id}/end`);
  return response.data;
};

// Delete Auction (Admin)
export const deleteAuction = async (id: string) => {
  const response = await api.delete<ApiResponse>(`/auctions/${id}`);
  return response.data;
};