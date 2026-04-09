import api from './axios';
import { ApiResponse } from '@/types/api.types';

// Get Points History
export const getPointsHistory = async () => {
  const response = await api.get<ApiResponse>('/points/history');
  return response.data;
};

// Award Points (Teacher/Admin)
export const awardPoints = async (data: {
  userId: string;
  points: number;
  reason: string;
}) => {
  const response = await api.post<ApiResponse>('/points/award', data);
  return response.data;
};

// Deduct Points (Teacher/Admin)
export const deductPoints = async (data: {
  userId: string;
  points: number;
  reason: string;
}) => {
  const response = await api.post<ApiResponse>('/points/deduct', data);
  return response.data;
};

// Get Points Stats
export const getPointsStats = async () => {
  const response = await api.get<ApiResponse>('/points/stats');
  return response.data;
};

// Get Student Points History (Teacher/Admin)
export const getStudentPointsHistory = async (studentId: string) => {
  const response = await api.get<ApiResponse>(`/points/student/${studentId}`);
  return response.data;
};