'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Users, Award, BookOpen } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';

interface Teacher {
  _id: string;
  name: string;
  email: string;
  studentsCount: number;
  evaluationsCount: number;
  pointsAwarded: number;
  status: 'active' | 'inactive';
}

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockTeachers: Teacher[] = [
      { _id: '1', name: 'محمد حسن', email: 'mohamed@example.com', studentsCount: 25, evaluationsCount: 120, pointsAwarded: 3200, status: 'active' },
      { _id: '2', name: 'فاطمة أحمد', email: 'fatima@example.com', studentsCount: 30, evaluationsCount: 150, pointsAwarded: 4100, status: 'active' },
      { _id: '3', name: 'عمر علي', email: 'omar@example.com', studentsCount: 20, evaluationsCount: 90, pointsAwarded: 2500, status: 'inactive' },
    ];

    setTimeout(() => {
      setTeachers(mockTeachers);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold">إدارة المعلمين</h1>
        <p className="text-muted-foreground mt-2">إدارة ومتابعة أداء المعلمين</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المعلمين</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">المعلمون النشطون</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.filter(t => t.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التقييمات</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.reduce((sum, t) => sum + t.evaluationsCount, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">النقاط الممنوحة</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.reduce((sum, t) => sum + t.pointsAwarded, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>المعلمون</CardTitle>
            <div className="relative w-64">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن معلم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTeachers.length === 0 ? (
            <EmptyState icon={Users} title="لا يوجد معلمون" description="لم يتم العثور على معلمين" />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead className="text-center">عدد الطلاب</TableHead>
                    <TableHead className="text-center">التقييمات</TableHead>
                    <TableHead className="text-center">النقاط الممنوحة</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher._id}>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell className="text-center">{teacher.studentsCount}</TableCell>
                      <TableCell className="text-center">{teacher.evaluationsCount}</TableCell>
                      <TableCell className="text-center font-semibold text-green-600">
                        {teacher.pointsAwarded}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                          {teacher.status === 'active' ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}