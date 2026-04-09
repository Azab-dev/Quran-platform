import api from './axios';
import { ApiResponse } from '@/types/api.types';

// Get All Users (Admin/Teacher)
export const getAllUsers = async (params?: {
  role?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get<ApiResponse>('/users', { params });
  return response.data;
};

// Get User by ID
export const getUserById = async (id: string) => {
  const response = await api.get<ApiResponse>(`/users/${id}`);
  return response.data;
};

// Update User Profile
export const updateProfile = async (data: {
  name?: string;
  email?: string;
  grade?: string;
}) => {
  const response = await api.patch<ApiResponse>('/users/profile', data);
  return response.data;
};

// Change Password
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.patch<ApiResponse>('/users/change-password', data);
  return response.data;
};

// Get Leaderboard
export const getLeaderboard = async (limit?: number) => {
  const response = await api.get<ApiResponse>('/users/leaderboard', {
    params: { limit }
  });
  return response.data;
};

// Create User (Admin)
export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
  grade?: string;
}) => {
  const response = await api.post<ApiResponse>('/users', data);
  return response.data;
};

// Update User (Admin)
export const updateUser = async (id: string, data: {
  name?: string;
  email?: string;
  role?: string;
  grade?: string;
  status?: string;
}) => {
  const response = await api.patch<ApiResponse>(`/users/${id}`, data);
  return response.data;
};

// Delete User (Admin)
export const deleteUser = async (id: string) => {
  const response = await api.delete<ApiResponse>(`/users/${id}`);
  return response.data;
};

// Get Students (Teacher)
export const getMyStudents = async () => {
  const response = await api.get<ApiResponse>('/users/my-students');
  return response.data;
};