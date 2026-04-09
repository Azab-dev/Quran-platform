import api from './axios';
import { ApiResponse } from '@/types/api.types';

// Get All Competitions
export const getAllCompetitions = async (params?: {
  status?: 'upcoming' | 'active' | 'ended';
}) => {
  const response = await api.get<ApiResponse>('/competitions', { params });
  return response.data;
};

// Get Competition by ID
export const getCompetitionById = async (id: string) => {
  const response = await api.get<ApiResponse>(`/competitions/${id}`);
  return response.data;
};

// Join Competition
export const joinCompetition = async (id: string) => {
  const response = await api.post<ApiResponse>(`/competitions/${id}/join`);
  return response.data;
};

// Get My Competitions
export const getMyCompetitions = async () => {
  const response = await api.get<ApiResponse>('/competitions/my-competitions');
  return response.data;
};

// Submit Score (Teacher/Admin)
export const submitScore = async (competitionId: string, userId: string, score: number) => {
  const response = await api.post<ApiResponse>(`/competitions/${competitionId}/score`, {
    userId,
    score
  });
  return response.data;
};

// Create Competition (Admin)
export const createCompetition = async (data: {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prizes: {
    first: number;
    second: number;
    third: number;
  };
  maxParticipants?: number;
}) => {
  const response = await api.post<ApiResponse>('/competitions', data);
  return response.data;
};

// Finalize Competition (Admin)
export const finalizeCompetition = async (id: string) => {
  const response = await api.post<ApiResponse>(`/competitions/${id}/finalize`);
  return response.data;
};

// Delete Competition (Admin)
export const deleteCompetition = async (id: string) => {
  const response = await api.delete<ApiResponse>(`/competitions/${id}`);
  return response.data;
};