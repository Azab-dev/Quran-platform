'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Award, TrendingUp, TrendingDown, Search, Calendar } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { notifyError } from '@/lib/notify';
import api from '@/lib/api/axios';

interface PointTransaction {
  _id: string;
  type: 'award' | 'deduct' | 'purchase' | 'refund';
  amount: number;
  reason: string;
  date: string;
  balance: number;
}

interface BackendTransaction {
  _id: string;
  type: 'points_award' | 'points_deduct' | 'purchase' | 'refund';
  pointsAmount: number;
  description: string;
  createdAt: string;
  balanceAfter: number;
}

export default function StudentPointsPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - Replace with API call
  useEffect(() => {
    fetchPointsHistory();
  }, []);

  const fetchPointsHistory = async () => {
    try {
      setIsLoading(true);
      
      // Use /points/my-history instead (no userId needed)
      const response = await api.get('/points/my-history', {
        params: {
          limit: 100 // Get more transactions for history page
        }
      });
      const data = response.data;
      
      if (data.success && data.data) {
        // Map backend transaction format to frontend format
        const mappedTransactions: PointTransaction[] = data.data.map((t: BackendTransaction) => ({
          _id: t._id,
          type: t.type === 'points_award' ? 'award' :
                t.type === 'points_deduct' ? 'deduct' :
                t.type === 'purchase' ? 'purchase' :
                t.type === 'refund' ? 'refund' : 'award',
          amount: t.pointsAmount || 0,
          reason: t.description || 'معاملة',
          date: t.createdAt,
          balance: t.balanceAfter || 0
        }));
        
        setTransactions(mappedTransactions);
      }
    } catch (error) {
      console.error('Error fetching points history:', error);
      notifyError('حدث خطأ في تحميل سجل النقاط');
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'award':
        return { label: 'منح نقاط', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' };
      case 'deduct':
        return { label: 'خصم نقاط', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' };
      case 'purchase':
        return { label: 'شراء', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' };
      case 'refund':
        return { label: 'استرجاع', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' };
      default:
        return { label: type, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = transaction.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    {
      title: 'إجمالي النقاط',
      value: user?.points || 0,
      icon: Award,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'النقاط المكتسبة',
      value: transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'النقاط المستخدمة',
      value: Math.abs(transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
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
        <h1 className="text-3xl font-bold">سجل النقاط</h1>
        <p className="text-muted-foreground mt-2">
          تتبع جميع معاملات النقاط الخاصة بك
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
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

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>سجل المعاملات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في المعاملات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Filter */}
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="نوع المعاملة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المعاملات</SelectItem>
                <SelectItem value="award">منح نقاط</SelectItem>
                <SelectItem value="deduct">خصم نقاط</SelectItem>
                <SelectItem value="purchase">شراء</SelectItem>
                <SelectItem value="refund">استرجاع</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          {filteredTransactions.length === 0 ? (
            <EmptyState
              icon={Award}
              title="لا توجد معاملات"
              description="لم يتم العثور على معاملات تطابق البحث"
            />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>النوع</TableHead>
                    <TableHead>السبب</TableHead>
                    <TableHead className="text-center">المبلغ</TableHead>
                    <TableHead className="text-center">الرصيد بعد</TableHead>
                    <TableHead>التاريخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => {
                    const typeInfo = getTypeInfo(transaction.type);
                    return (
                      <TableRow key={transaction._id}>
                        <TableCell>
                          <Badge variant="outline" className={typeInfo.color}>
                            {typeInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.reason}
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`font-semibold ${
                              transaction.amount > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {transaction.amount > 0 ? '+' : ''}
                            {transaction.amount}
                          </span>
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                          {transaction.balance}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(transaction.date).toLocaleDateString('ar-EG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
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