import api from './axios';
import { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth.types';
import { ApiResponse } from '@/types/api.types';
import { User } from '@/types/user.types';

// Register
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

// Login
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

// Get current user
export const getMe = async (): Promise<ApiResponse<{ user: User }>> => {
  const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
  return response.data;
};

// Logout
export const logout = async (): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/auth/logout');
  return response.data;
};