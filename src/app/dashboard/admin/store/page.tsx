'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Package, TrendingUp, Award, DollarSign } from 'lucide-react';

export default function AdminStorePage() {
  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: '45',
      change: '+3 هذا الشهر',
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'الطلبات اليوم',
      value: '23',
      change: '+5 من الأمس',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'النقاط المستخدمة',
      value: '3,450',
      change: '+450 هذا الأسبوع',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      title: 'معدل المبيعات',
      value: '87%',
      change: '+12% من الشهر الماضي',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
  ];

  const topProducts = [
    { name: 'مصحف مذهب', sales: 45, points: 6750 },
    { name: 'سجادة صلاة', sales: 38, points: 3040 },
    { name: 'مسبحة إلكترونية', sales: 32, points: 1600 },
    { name: 'كتاب تفسير', sales: 28, points: 3360 },
    { name: 'ساعة يد', sales: 15, points: 3000 },
  ];

  const recentOrders = [
    { id: '1', student: 'أحمد محمد', product: 'مصحف مذهب', points: 150, time: 'منذ 5 دقائق' },
    { id: '2', student: 'فاطمة علي', product: 'سجادة صلاة', points: 80, time: 'منذ 15 دقيقة' },
    { id: '3', student: 'محمود حسن', product: 'مسبحة إلكترونية', points: 50, time: 'منذ 30 دقيقة' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">نظرة عامة على المتجر</h1>
        <p className="text-muted-foreground mt-2">إحصائيات وأداء المتجر</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>أكثر المنتجات مبيعاً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} عملية بيع</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-green-600">{product.points}</p>
                    <p className="text-xs text-muted-foreground">نقطة</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آخر الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{order.student}</p>
                    <p className="text-xs text-muted-foreground">{order.product}</p>
                    <p className="text-xs text-muted-foreground mt-1">{order.time}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">{order.points}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الأداء الشهري</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">إجمالي الطلبات</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">456</div>
              <p className="text-xs text-muted-foreground mt-1">+23% من الشهر الماضي</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">النقاط المحصلة</span>
              </div>
              <div className="text-2xl font-bold text-green-600">34,500</div>
              <p className="text-xs text-muted-foreground mt-1">+15% من الشهر الماضي</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium">متوسط الطلب</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">75.6</div>
              <p className="text-xs text-muted-foreground mt-1">نقطة لكل طلب</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}