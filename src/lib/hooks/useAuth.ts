import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { 
    user, 
    token, 
    isAuthenticated, 
    isLoading, 
    error,
    login,
    register,
    logout,
    loadUser,
    clearError
  } = useAuthStore();

  // Load user on mount
  useEffect(() => {
    if (token && !user && !isLoading) {
      loadUser();
    }
  }, [token, user, isLoading, loadUser]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isStudent: user?.role === 'student',
    isTeacher: user?.role === 'teacher',
    isAdmin: user?.role === 'admin',
  };
};