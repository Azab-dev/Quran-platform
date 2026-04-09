'use client';

import { Users, Package, Gavel, Trophy, Award, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: '156',
      change: '+12',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'المنتجات',
      value: '45',
      change: '+3',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'المزادات النشطة',
      value: '8',
      change: '+2',
      icon: Gavel,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900/20',
    },
    {
      title: 'المسابقات',
      value: '12',
      change: '+4',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      title: 'إجمالي النقاط',
      value: '45,230',
      change: '+1,250',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'الطلبات اليوم',
      value: '23',
      change: '+5',
      icon: ShoppingBag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: 'معدل النشاط',
      value: '87%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100 dark:bg-teal-900/20',
    },
    {
      title: 'القيمة الإجمالية',
      value: '12,450',
      change: '+450',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">مرحباً، {user?.name}! 👋</h1>
        <p className="text-muted-foreground mt-2">
          لوحة التحكم الرئيسية - نظرة شاملة على المنصة
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">{stat.change} من الأسبوع الماضي</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>أحدث المستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">مستخدم {i}</p>
                    <p className="text-xs text-muted-foreground">منذ {i} ساعة</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أحدث الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">طلب #{i}</p>
                    <p className="text-xs text-muted-foreground">منذ {i * 2} ساعة</p>
                  </div>
                  <div className="text-sm font-semibold text-primary">{i * 50} نقطة</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المزادات الساخنة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">مزاد {i}</p>
                    <p className="text-xs text-muted-foreground">{i * 5} مزايدة</p>
                  </div>
                  <div className="text-sm font-semibold text-amber-600">{i * 100} نقطة</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}