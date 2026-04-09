'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  Home,
  User,
  Award,
  ShoppingBag,
  Gavel,
  Trophy,
  ShoppingCart,
  Users,
  Package,
  Settings,
  BookOpen,
  TrendingUp,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Student Navigation
  const studentNav = [
    { name: 'الرئيسية', href: '/dashboard/student', icon: Home },
    { name: 'ملفي الشخصي', href: '/dashboard/student/profile', icon: User },
    { name: 'نقاطي', href: '/dashboard/student/points', icon: Award },
    { name: 'المتجر', href: '/dashboard/student/store', icon: ShoppingBag },
    { name: 'المزادات', href: '/dashboard/student/auctions', icon: Gavel },
    { name: 'المسابقات', href: '/dashboard/student/competitions', icon: Trophy },
    { name: 'طلباتي', href: '/dashboard/student/orders', icon: ShoppingCart },
  ];

  // Teacher Navigation
  const teacherNav = [
    { name: 'الرئيسية', href: '/dashboard/teacher', icon: Home },
    { name: 'الطلاب', href: '/dashboard/teacher/students', icon: Users },
    { name: 'التقييم', href: '/dashboard/teacher/evaluate', icon: BookOpen },
    { name: 'إدارة النقاط', href: '/dashboard/teacher/points', icon: Award },
  ];

  // Admin Navigation
  const adminNav = [
    { name: 'الرئيسية', href: '/dashboard/admin', icon: Home },
    { name: 'المستخدمون', href: '/dashboard/admin/users', icon: Users },
    { name: 'المنتجات', href: '/dashboard/admin/products', icon: Package },
    { name: 'المتجر', href: '/dashboard/admin/store', icon: ShoppingBag },
    { name: 'المزادات', href: '/dashboard/admin/auctions', icon: Gavel },
    { name: 'المسابقات', href: '/dashboard/admin/competitions', icon: Trophy },
    { name: 'النقاط', href: '/dashboard/admin/points', icon: Award },
    { name: 'الإحصائيات', href: '/dashboard/admin/stats', icon: TrendingUp },
    { name: 'الإعدادات', href: '/dashboard/admin/settings', icon: Settings },
  ];

  // Get navigation based on role
  const navigation = 
    user?.role === 'admin' ? adminNav :
    user?.role === 'teacher' ? teacherNav :
    studentNav;

  return (
    <aside
      className={cn(
        'fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] w-64 bg-card border-l transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Header with Close Button (Mobile) */}
      <div className="flex items-center justify-between p-4 border-b lg:hidden">
        <h2 className="font-semibold">القائمة</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-4 overflow-y-auto h-[calc(100%-8rem)]">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="absolute bottom-0 right-0 left-0 p-4 border-t bg-muted/50">
        <div className="text-xs text-muted-foreground text-center">
          <p className="font-semibold text-foreground mb-1">منصة التحفيظ</p>
          <p>الإصدار 1.0.0</p>
        </div>
      </div>
    </aside>
  );
}