'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ShoppingBag, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { notifySuccess, notifyError } from '@/lib/notify';

interface Order {
  _id: string;
  studentName: string;
  productName: string;
  quantity: number;
  totalPoints: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const mockOrders: Order[] = [
      {
        _id: '1',
        studentName: 'أحمد محمد',
        productName: 'مصحف مذهب',
        quantity: 1,
        totalPoints: 150,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        studentName: 'فاطمة علي',
        productName: 'سجادة صلاة',
        quantity: 2,
        totalPoints: 160,
        status: 'processing',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        _id: '3',
        studentName: 'محمود حسن',
        productName: 'مسبحة إلكترونية',
        quantity: 1,
        totalPoints: 50,
        status: 'completed',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        _id: '4',
        studentName: 'سارة أحمد',
        productName: 'كتاب تفسير',
        quantity: 1,
        totalPoints: 120,
        status: 'cancelled',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
      },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusInfo = (status: string) => {
    const info = {
      pending: {
        label: 'قيد الانتظار',
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        icon: Clock,
      },
      processing: {
        label: 'قيد التجهيز',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        icon: AlertCircle,
      },
      completed: {
        label: 'مكتمل',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        icon: CheckCircle,
      },
      cancelled: {
        label: 'ملغي',
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        icon: XCircle,
      },
    };
    return info[status as keyof typeof info] || info.pending;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus as Order['status'] } : o));
      notifySuccess('تم تحديث حالة الطلب بنجاح');
    } catch (error) {
      notifyError('حدث خطأ في تحديث الحالة');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">إدارة الطلبات</h1>
        <p className="text-muted-foreground mt-2">إدارة ومتابعة طلبات الطلاب</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">قيد الانتظار</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">قيد التجهيز</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'processing').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">مكتملة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter(o => o.status === 'completed').length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في الطلبات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="حالة الطلب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الطلبات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="processing">قيد التجهيز</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <EmptyState icon={ShoppingBag} title="لا توجد طلبات" description="لم يتم العثور على طلبات" />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الطالب</TableHead>
                    <TableHead>المنتج</TableHead>
                    <TableHead className="text-center">الكمية</TableHead>
                    <TableHead className="text-center">النقاط</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium">{order.studentName}</TableCell>
                        <TableCell>{order.productName}</TableCell>
                        <TableCell className="text-center">{order.quantity}</TableCell>
                        <TableCell className="text-center font-semibold">{order.totalPoints}</TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString('ar-EG', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={statusInfo.color}>
                            <StatusIcon className="h-3 w-3 ml-1" />
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order._id, value)}
                            disabled={order.status === 'completed' || order.status === 'cancelled'}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">قيد الانتظار</SelectItem>
                              <SelectItem value="processing">قيد التجهيز</SelectItem>
                              <SelectItem value="completed">مكتمل</SelectItem>
                              <SelectItem value="cancelled">ملغي</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}