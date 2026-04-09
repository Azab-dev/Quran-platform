import { create } from 'zustand';
import { User } from '@/types/user.types';
import * as authApi from '@/lib/api/auth.api';
import { LoginCredentials, RegisterData } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Login
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      set({
        isLoading: false,
        error: err.response?.data?.message || 'حدث خطأ في تسجيل الدخول',
      });
      throw error;
    }
  },

  // Register
  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.register(data);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      set({
        isLoading: false,
        error: err.response?.data?.message || 'حدث خطأ في التسجيل',
      });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  // Load user from token
  loadUser: async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      set({ isAuthenticated: false, isLoading: false });
      return;
    }
    
    set({ isLoading: true });
    
    try {
      const response = await authApi.getMe();
      
      if (response.success && response.data) {
        set({
          user: response.data.user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      // Token invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));