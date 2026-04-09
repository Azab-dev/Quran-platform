'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Award, Package, Search, Calendar, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { notifySuccess, notifyError } from '@/lib/notify';

interface Order {
  _id: string;
  product: {
    name: string;
    description: string;
  };
  quantity: number;
  totalPoints: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  deliveryDate?: string;
}

export default function StudentOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Mock data
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        _id: '1',
        product: { name: 'مصحف مذهب', description: 'مصحف فاخر بغلاف مذهب' },
        quantity: 1,
        totalPoints: 150,
        status: 'completed',
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        deliveryDate: new Date(Date.now() - 259200000).toISOString(),
      },
      {
        _id: '2',
        product: { name: 'سجادة صلاة', description: 'سجادة صلاة مريحة' },
        quantity: 2,
        totalPoints: 160,
        status: 'processing',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        _id: '3',
        product: { name: 'مسبحة إلكترونية', description: 'مسبحة بعداد رقمي' },
        quantity: 1,
        totalPoints: 50,
        status: 'pending',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        _id: '4',
        product: { name: 'كتاب تفسير', description: 'تفسير القرآن الكريم' },
        quantity: 1,
        totalPoints: 120,
        status: 'cancelled',
        createdAt: new Date(Date.now() - 1209600000).toISOString(),
      },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'قيد الانتظار',
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
          icon: Clock,
        };
      case 'processing':
        return {
          label: 'قيد التجهيز',
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
          icon: AlertCircle,
        };
      case 'completed':
        return {
          label: 'مكتمل',
          color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
          icon: CheckCircle,
        };
      case 'cancelled':
        return {
          label: 'ملغي',
          color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
          icon: XCircle,
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-800',
          icon: Package,
        };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;

    try {
      // TODO: Call API
      notifySuccess('تم إلغاء الطلب بنجاح');
      setIsCancelDialogOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      notifyError('حدث خطأ في إلغاء الطلب');
    }
  };

  const stats = [
    {
      title: 'إجمالي الطلبات',
      value: orders.length,
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'قيد التجهيز',
      value: orders.filter(o => o.status === 'processing').length,
      icon: AlertCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'مكتملة',
      value: orders.filter(o => o.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'النقاط المستخدمة',
      value: orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.totalPoints, 0),
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">طلباتي</h1>
        <p className="text-muted-foreground mt-2">
          تتبع جميع طلباتك من المتجر
        </p>
      </div>

      {/* Stats Cards */}
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>سجل الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

          {/* Orders Table */}
          {filteredOrders.length === 0 ? (
            <EmptyState
              icon={Package}
              title="لا توجد طلبات"
              description="لم يتم العثور على طلبات تطابق البحث"
            />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead className="text-center">الكمية</TableHead>
                    <TableHead className="text-center">النقاط</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <TableRow key={order._id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.product.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {order.quantity}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Award className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{order.totalPoints}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusInfo.color}>
                            <StatusIcon className="h-3 w-3 ml-1" />
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(order.createdAt).toLocaleDateString('ar-EG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDialogOpen(true);
                              }}
                            >
                              التفاصيل
                            </Button>
                            {order.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setIsCancelDialogOpen(true);
                                }}
                              >
                                إلغاء
                              </Button>
                            )}
                          </div>
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

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">{selectedOrder.product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.product.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">الكمية:</span>
                  <span className="font-semibold">{selectedOrder.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">النقاط المستخدمة:</span>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{selectedOrder.totalPoints}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">الحالة:</span>
                  <Badge variant="outline" className={getStatusInfo(selectedOrder.status).color}>
                    {getStatusInfo(selectedOrder.status).label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">تاريخ الطلب:</span>
                  <span className="font-semibold">
                    {new Date(selectedOrder.createdAt).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                {selectedOrder.deliveryDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">تاريخ التسليم:</span>
                    <span className="font-semibold">
                      {new Date(selectedOrder.deliveryDate).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إلغاء الطلب</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من إلغاء هذا الطلب؟ سيتم إرجاع النقاط إلى حسابك.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              تراجع
            </Button>
            <Button variant="destructive" onClick={handleCancelOrder}>
              تأكيد الإلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}