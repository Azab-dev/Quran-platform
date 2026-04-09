'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('student' | 'teacher' | 'admin')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    
    if (!isLoading) {
      // No token - redirect to login
      if (!token) {
        router.push('/login');
        return;
      }

      // Token exists but no user loaded - wait for loadUser
      if (!user) {
        return;
      }

      // Check role permissions
      if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
        // Redirect based on actual role
        switch (user.role) {
          case 'student':
            router.push('/dashboard/student');
            break;
          case 'teacher':
            router.push('/dashboard/teacher');
            break;
          case 'admin':
            router.push('/dashboard/admin');
            break;
          default:
            router.push('/login');
        }
      }
    }
  }, [user, isLoading, router, allowedRoles]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Show loading while user is being loaded
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Check role permission
  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}