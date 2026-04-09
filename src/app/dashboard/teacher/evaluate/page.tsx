'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, BookOpen, CheckCircle } from 'lucide-react';
import { notifySuccess, notifyError } from '@/lib/notify';

export default function TeacherEvaluatePage() {
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    score: '',
    points: '',
    notes: '',
  });

  const students = [
    { id: '1', name: 'أحمد محمد' },
    { id: '2', name: 'فاطمة علي' },
    { id: '3', name: 'محمود حسن' },
    { id: '4', name: 'سارة أحمد' },
  ];

  const subjects = [
    'حفظ سورة البقرة',
    'حفظ سورة آل عمران',
    'حفظ جزء عم',
    'حفظ جزء تبارك',
    'تلاوة مجودة',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentId || !formData.subject || !formData.score || !formData.points) {
      notifyError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      // TODO: Call API
      notifySuccess('تم تقييم الطالب بنجاح!');
      setFormData({ studentId: '', subject: '', score: '', points: '', notes: '' });
    } catch (error) {
      notifyError('حدث خطأ في عملية التقييم');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">تقييم الطلاب</h1>
        <p className="text-muted-foreground mt-2">قم بتقييم أداء الطلاب ومنح النقاط</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">التقييمات اليوم</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">النقاط الممنوحة</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">متوسط الدرجات</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تقييم جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="student">اختر الطالب *</Label>
                <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر طالباً" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">الموضوع *</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموضوع" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="score">الدرجة (من 100) *</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="85"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="points">النقاط الممنوحة *</Label>
                <Input
                  id="points"
                  type="number"
                  min="0"
                  placeholder="50"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                placeholder="أضف أي ملاحظات إضافية..."
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                <CheckCircle className="h-4 w-4 ml-2" />
                تقييم وإرسال
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({ studentId: '', subject: '', score: '', points: '', notes: '' })}
              >
                إعادة تعيين
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}