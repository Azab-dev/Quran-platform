'use client';

import { ReactNode, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

interface DashboardLayoutProps {
  children: ReactNode;
  allowedRoles?: ('student' | 'teacher' | 'admin')[];
}

export default function DashboardLayout({ children, allowedRoles }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <div className="min-h-screen bg-background">
        {/* Navbar - ثابت في الأعلى */}
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Container للـ Sidebar والـ Content */}
        <div className="flex pt-16">
          
          {/* Sidebar */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          
          {/* Overlay للموبايل */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          {/* Main Content Area */}
          <main 
            className="flex-1 p-6 lg:p-8 w-full"
          >
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}