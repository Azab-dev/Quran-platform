'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Award, BookOpen, Calendar, Mail, User } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  reason: string;
  date: string;
}

interface StudentData {
  _id: string;
  name: string;
  email: string;
  points: number;
  grade: string;
  status: string;
  joinedAt: string;
  transactions: Transaction[];
}

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState<StudentData | null>(null);

  useEffect(() => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    
    if (!id) {
      router.push('/dashboard/teacher/students');
      return;
    }

    const mockStudent: StudentData = {
      _id: id,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      points: 450,
      grade: 'الصف الثالث الإعدادي',
      status: 'active',
      joinedAt: new Date().toISOString(),
      transactions: [
        { _id: '1', type: 'award', amount: 50, reason: 'حفظ سورة البقرة', date: new Date().toISOString() },
        { _id: '2', type: 'deduct', amount: -20, reason: 'غياب', date: new Date(Date.now() - 86400000).toISOString() },
        { _id: '3', type: 'award', amount: 100, reason: 'الفوز في مسابقة', date: new Date(Date.now() - 172800000).toISOString() },
      ],
    };

    setTimeout(() => {
      setStudent(mockStudent);
      setIsLoading(false);
    }, 500);
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!student) {
    return <div>الطالب غير موجود</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div>
          <h1 className="text-3xl font-bold">تفاصيل الطالب</h1>
          <p className="text-muted-foreground mt-2">معلومات وسجل الطالب</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {student.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mt-4">{student.name}</h3>
              <Badge variant="secondary" className="mt-2">طالب</Badge>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.grade}</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">{student.points} نقطة</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {new Date(student.joinedAt).toLocaleDateString('ar-EG')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>سجل النقاط</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>النوع</TableHead>
                    <TableHead>السبب</TableHead>
                    <TableHead className="text-center">المبلغ</TableHead>
                    <TableHead>التاريخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.transactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell>
                        <Badge variant={transaction.amount > 0 ? 'default' : 'destructive'}>
                          {transaction.amount > 0 ? 'منح' : 'خصم'}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.reason}</TableCell>
                      <TableCell className="text-center">
                        <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString('ar-EG', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}