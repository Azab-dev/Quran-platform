import { create } from 'zustand';
import { User, LeaderboardEntry } from '@/types/user.types';
import * as userApi from '@/lib/api/user.api';
import { UserFilters } from '@/types/api.types';

interface PaginationData {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface UsersResponseData {
  items: User[];
  pagination: PaginationData;
}

interface UserResponseData {
  user: User;
}

interface LeaderboardResponseData {
  leaderboard: LeaderboardEntry[];
}

interface ApiError {
  response?: { data?: { message?: string } };
}

interface UserState {
  users: User[];
  leaderboard: LeaderboardEntry[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  pagination: PaginationData | null;

  fetchUsers: (filters?: UserFilters) => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  fetchLeaderboard: (limit?: number) => Promise<void>;
  updateUserAdmin: (id: string, data: Partial<User>) => Promise<void>;
  deleteUserAdmin: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  leaderboard: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  pagination: null,

  fetchUsers: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userApi.getAllUsers(filters);
      if (response.success && response.data) {
        const data = response.data as UsersResponseData;
        set({
          users: data.items,
          pagination: data.pagination,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || 'حدث خطأ في جلب المستخدمين',
      });
    }
  },

  fetchUserById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userApi.getUserById(id);
      if (response.success && response.data) {
        const data = response.data as UserResponseData;
        set({
          selectedUser: data.user,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || 'حدث خطأ في جلب بيانات المستخدم',
      });
    }
  },

  fetchLeaderboard: async (limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await userApi.getLeaderboard(limit);
      if (response.success && response.data) {
        const data = response.data as LeaderboardResponseData;
        set({
          leaderboard: data.leaderboard,
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || 'حدث خطأ في جلب لوحة المتصدرين',
      });
    }
  },

  updateUserAdmin: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await userApi.updateUser(id, data);
      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? { ...user, ...data } : user
        ),
        isLoading: false,
      }));
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || 'حدث خطأ في تحديث المستخدم',
      });
      throw error;
    }
  },

  deleteUserAdmin: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await userApi.deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) {
      const err = error as ApiError;
      set({
        isLoading: false,
        error: err.response?.data?.message || 'حدث خطأ في حذف المستخدم',
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));