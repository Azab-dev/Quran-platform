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
import { Trophy, Plus, Trash2, Users, Award } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { notifySuccess, notifyError } from '@/lib/notify';

interface Competition {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'ended';
  prizes: { first: number; second: number; third: number };
  participantsCount: number;
}

export default function AdminCompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    firstPrize: '',
    secondPrize: '',
    thirdPrize: '',
  });

  useEffect(() => {
    const mockCompetitions: Competition[] = [
      {
        _id: '1',
        title: 'مسابقة حفظ جزء عم',
        description: 'مسابقة أسبوعية لحفظ جزء عم',
        startDate: new Date(Date.now() - 86400000).toISOString(),
        endDate: new Date(Date.now() + 518400000).toISOString(),
        status: 'active',
        prizes: { first: 500, second: 300, third: 150 },
        participantsCount: 45,
      },
      {
        _id: '2',
        title: 'تحدي سورة البقرة',
        description: 'مسابقة شهرية لحفظ سورة البقرة',
        startDate: new Date(Date.now() + 86400000).toISOString(),
        endDate: new Date(Date.now() + 2592000000).toISOString(),
        status: 'upcoming',
        prizes: { first: 1000, second: 600, third: 300 },
        participantsCount: 0,
      },
      {
        _id: '3',
        title: 'مسابقة التلاوة المجودة',
        description: 'مسابقة لأفضل تلاوة مجودة',
        startDate: new Date(Date.now() - 604800000).toISOString(),
        endDate: new Date(Date.now() - 86400000).toISOString(),
        status: 'ended',
        prizes: { first: 400, second: 250, third: 100 },
        participantsCount: 67,
      },
    ];

    setTimeout(() => {
      setCompetitions(mockCompetitions);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status: string) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      ended: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };
    const labels = { upcoming: 'قريباً', active: 'نشطة', ended: 'منتهية' };
    return { color: colors[status as keyof typeof colors], label: labels[status as keyof typeof labels] };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.startDate || !formData.endDate || 
        !formData.firstPrize || !formData.secondPrize || !formData.thirdPrize) {
      notifyError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      notifySuccess('تم إضافة المسابقة بنجاح');
      setIsDialogOpen(false);
      setFormData({ title: '', description: '', startDate: '', endDate: '', firstPrize: '', secondPrize: '', thirdPrize: '' });
    } catch (error) {
      notifyError('حدث خطأ في إضافة المسابقة');
    }
  };

  const handleFinalize = async (competitionId: string) => {
    try {
      notifySuccess('تم إنهاء المسابقة وتوزيع الجوائز');
      setCompetitions(competitions.map(c => c._id === competitionId ? { ...c, status: 'ended' as const } : c));
    } catch (error) {
      notifyError('حدث خطأ في إنهاء المسابقة');
    }
  };

  const handleDelete = async (competitionId: string) => {
    try {
      notifySuccess('تم حذف المسابقة بنجاح');
      setCompetitions(competitions.filter(c => c._id !== competitionId));
    } catch (error) {
      notifyError('حدث خطأ في حذف المسابقة');
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
          <h1 className="text-3xl font-bold">إدارة المسابقات</h1>
          <p className="text-muted-foreground mt-2">إدارة المسابقات والجوائز</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة مسابقة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة مسابقة جديدة</DialogTitle>
              <DialogDescription>أضف مسابقة جديدة للمنصة</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>عنوان المسابقة *</Label>
                <Input
                  placeholder="مسابقة حفظ جزء عم"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>الوصف *</Label>
                <Textarea
                  placeholder="وصف المسابقة..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              <div className="space-y-2">
                <Label>الجوائز (نقاط) *</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">المركز الأول 🥇</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="500"
                      value={formData.firstPrize}
                      onChange={(e) => setFormData({ ...formData, firstPrize: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">المركز الثاني 🥈</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="300"
                      value={formData.secondPrize}
                      onChange={(e) => setFormData({ ...formData, secondPrize: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">المركز الثالث 🥉</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="150"
                      value={formData.thirdPrize}
                      onChange={(e) => setFormData({ ...formData, thirdPrize: e.target.value })}
                    />
                  </div>
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
            <CardTitle className="text-sm font-medium">إجمالي المسابقات</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">المسابقات النشطة</CardTitle>
            <Trophy className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitions.filter(c => c.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">المشاركون</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitions.reduce((sum, c) => sum + c.participantsCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الجوائز</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {competitions.reduce((sum, c) => sum + c.prizes.first + c.prizes.second + c.prizes.third, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المسابقات</CardTitle>
        </CardHeader>
        <CardContent>
          {competitions.length === 0 ? (
            <EmptyState icon={Trophy} title="لا توجد مسابقات" description="لم يتم إنشاء أي مسابقات بعد" />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead className="text-center">المشاركون</TableHead>
                    <TableHead className="text-center">الجوائز</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitions.map((competition) => {
                    const statusBadge = getStatusBadge(competition.status);
                    return (
                      <TableRow key={competition._id}>
                        <TableCell className="font-medium">{competition.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{competition.description}</TableCell>
                        <TableCell className="text-center">{competition.participantsCount}</TableCell>
                        <TableCell className="text-center">
                          <div className="text-sm">
                            🥇 {competition.prizes.first} | 🥈 {competition.prizes.second} | 🥉 {competition.prizes.third}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={statusBadge.color}>
                            {statusBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {competition.status === 'active' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleFinalize(competition._id)}
                              >
                                إنهاء
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(competition._id)}
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