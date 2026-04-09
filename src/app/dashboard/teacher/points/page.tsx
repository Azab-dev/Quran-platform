'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, TrendingUp, TrendingDown } from 'lucide-react';
import { notifySuccess, notifyError } from '@/lib/notify';

export default function TeacherPointsPage() {
  const [awardData, setAwardData] = useState({
    studentId: '',
    points: '',
    reason: '',
  });

  const [deductData, setDeductData] = useState({
    studentId: '',
    points: '',
    reason: '',
  });

  const students = [
    { id: '1', name: 'أحمد محمد', points: 450 },
    { id: '2', name: 'فاطمة علي', points: 380 },
    { id: '3', name: 'محمود حسن', points: 320 },
    { id: '4', name: 'سارة أحمد', points: 510 },
  ];

  const handleAward = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!awardData.studentId || !awardData.points || !awardData.reason) {
      notifyError('الرجاء ملء جميع الحقول');
      return;
    }

    try {
      // TODO: Call API
      notifySuccess(`تم منح ${awardData.points} نقطة بنجاح!`);
      setAwardData({ studentId: '', points: '', reason: '' });
    } catch (error) {
      notifyError('حدث خطأ في منح النقاط');
    }
  };

  const handleDeduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deductData.studentId || !deductData.points || !deductData.reason) {
      notifyError('الرجاء ملء جميع الحقول');
      return;
    }

    try {
      // TODO: Call API
      notifySuccess(`تم خصم ${deductData.points} نقطة بنجاح!`);
      setDeductData({ studentId: '', points: '', reason: '' });
    } catch (error) {
      notifyError('حدث خطأ في خصم النقاط');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">إدارة النقاط</h1>
        <p className="text-muted-foreground mt-2">منح أو خصم نقاط للطلاب</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">النقاط الممنوحة اليوم</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+850</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">النقاط المخصومة اليوم</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-120</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">الصافي</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+730</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إدارة نقاط الطلاب</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="award" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="award">منح نقاط</TabsTrigger>
              <TabsTrigger value="deduct">خصم نقاط</TabsTrigger>
            </TabsList>

            <TabsContent value="award" className="space-y-4 mt-4">
              <form onSubmit={handleAward} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="award-student">اختر الطالب</Label>
                  <Select value={awardData.studentId} onValueChange={(value) => setAwardData({ ...awardData, studentId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر طالباً" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.points} نقطة)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="award-points">عدد النقاط</Label>
                  <Input
                    id="award-points"
                    type="number"
                    min="1"
                    placeholder="50"
                    value={awardData.points}
                    onChange={(e) => setAwardData({ ...awardData, points: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="award-reason">السبب</Label>
                  <Textarea
                    id="award-reason"
                    placeholder="حفظ سورة البقرة بإتقان"
                    rows={3}
                    value={awardData.reason}
                    onChange={(e) => setAwardData({ ...awardData, reason: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <TrendingUp className="h-4 w-4 ml-2" />
                  منح النقاط
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="deduct" className="space-y-4 mt-4">
              <form onSubmit={handleDeduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deduct-student">اختر الطالب</Label>
                  <Select value={deductData.studentId} onValueChange={(value) => setDeductData({ ...deductData, studentId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر طالباً" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.points} نقطة)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deduct-points">عدد النقاط</Label>
                  <Input
                    id="deduct-points"
                    type="number"
                    min="1"
                    placeholder="20"
                    value={deductData.points}
                    onChange={(e) => setDeductData({ ...deductData, points: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deduct-reason">السبب</Label>
                  <Textarea
                    id="deduct-reason"
                    placeholder="غياب عن الحصة"
                    rows={3}
                    value={deductData.reason}
                    onChange={(e) => setDeductData({ ...deductData, reason: e.target.value })}
                  />
                </div>

                <Button type="submit" variant="destructive" className="w-full">
                  <TrendingDown className="h-4 w-4 ml-2" />
                  خصم النقاط
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}