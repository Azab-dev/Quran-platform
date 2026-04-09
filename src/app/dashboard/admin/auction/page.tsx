'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Gavel, Edit, Trash2, Plus, Clock, Trophy } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { notifySuccess, notifyError } from '@/lib/notify';

interface Auction {
  _id: string;
  productName: string;
  startingPrice: number;
  currentBid: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'ended';
  bidsCount: number;
}

export default function AdminAuctionsPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    startingPrice: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const mockAuctions: Auction[] = [
      {
        _id: '1',
        productName: 'مصحف مذهب فاخر',
        startingPrice: 100,
        currentBid: 150,
        startDate: new Date(Date.now() - 86400000).toISOString(),
        endDate: new Date(Date.now() + 7200000).toISOString(),
        status: 'active',
        bidsCount: 5,
      },
      {
        _id: '2',
        productName: 'ساعة ذكية',
        startingPrice: 150,
        currentBid: 200,
        startDate: new Date(Date.now() - 172800000).toISOString(),
        endDate: new Date(Date.now() + 18000000).toISOString(),
        status: 'active',
        bidsCount: 8,
      },
      {
        _id: '3',
        productName: 'حقيبة ظهر',
        startingPrice: 80,
        currentBid: 120,
        startDate: new Date(Date.now() - 259200000).toISOString(),
        endDate: new Date(Date.now() - 3600000).toISOString(),
        status: 'ended',
        bidsCount: 12,
      },
    ];

    setTimeout(() => {
      setAuctions(mockAuctions);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status: string) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      ended: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };
    const labels = { upcoming: 'قريباً', active: 'نشط', ended: 'منتهي' };
    return { color: colors[status as keyof typeof colors], label: labels[status as keyof typeof labels] };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productName || !formData.startingPrice || !formData.startDate || !formData.endDate) {
      notifyError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      notifySuccess('تم إضافة المزاد بنجاح');
      setIsDialogOpen(false);
      setFormData({ productName: '', description: '', startingPrice: '', startDate: '', endDate: '' });
    } catch (error) {
      notifyError('حدث خطأ في إضافة المزاد');
    }
  };

  const handleEnd = async (auctionId: string) => {
    try {
      notifySuccess('تم إنهاء المزاد بنجاح');
      setAuctions(auctions.map(a => a._id === auctionId ? { ...a, status: 'ended' as const } : a));
    } catch (error) {
      notifyError('حدث خطأ في إنهاء المزاد');
    }
  };

  const handleDelete = async (auctionId: string) => {
    try {
      notifySuccess('تم حذف المزاد بنجاح');
      setAuctions(auctions.filter(a => a._id !== auctionId));
    } catch (error) {
      notifyError('حدث خطأ في حذف المزاد');
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المزادات</h1>
          <p className="text-muted-foreground mt-2">إدارة المزادات والمزايدات</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة مزاد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مزاد جديد</DialogTitle>
              <DialogDescription>أضف مزاداً جديداً للمنصة</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>اسم المنتج *</Label>
                <Input
                  placeholder="مصحف مذهب"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>الوصف</Label>
                <Textarea
                  placeholder="وصف المنتج..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>السعر الابتدائي (نقاط) *</Label>
                <Input
                  type="number"
                  min="0"
                  placeholder="100"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>تاريخ البداية *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>تاريخ النهاية *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">إضافة</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المزادات</CardTitle>
            <Gavel className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">المزادات النشطة</CardTitle>
            <Gavel className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctions.filter(a => a.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">المزايدات</CardTitle>
            <Trophy className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctions.reduce((sum, a) => sum + a.bidsCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">القيمة الحالية</CardTitle>
            <Gavel className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctions.reduce((sum, a) => sum + a.currentBid, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المزادات</CardTitle>
        </CardHeader>
        <CardContent>
          {auctions.length === 0 ? (
            <EmptyState icon={Gavel} title="لا توجد مزادات" description="لم يتم إنشاء أي مزادات بعد" />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم المنتج</TableHead>
                    <TableHead className="text-center">السعر الابتدائي</TableHead>
                    <TableHead className="text-center">المزايدة الحالية</TableHead>
                    <TableHead className="text-center">عدد المزايدات</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead>تاريخ الانتهاء</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auctions.map((auction) => {
                    const statusBadge = getStatusBadge(auction.status);
                    return (
                      <TableRow key={auction._id}>
                        <TableCell className="font-medium">{auction.productName}</TableCell>
                        <TableCell className="text-center">{auction.startingPrice}</TableCell>
                        <TableCell className="text-center font-semibold text-green-600">
                          {auction.currentBid}
                        </TableCell>
                        <TableCell className="text-center">{auction.bidsCount}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={statusBadge.color}>
                            {statusBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            {new Date(auction.endDate).toLocaleDateString('ar-EG', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {auction.status === 'active' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEnd(auction._id)}
                              >
                                إنهاء
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(auction._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
    </div>
  );
}