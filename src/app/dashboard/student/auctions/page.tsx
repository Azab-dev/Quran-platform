'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Award, Clock, Gavel, TrendingUp, Users } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { notifySuccess, notifyError } from '@/lib/notify';

interface Auction {
  _id: string;
  product: {
    name: string;
    description: string;
  };
  startingPrice: number;
  currentBid: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'ended';
  bidsCount: number;
  isWinner: boolean;
  userBid?: number;
}

export default function StudentAuctionsPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'ended'>('active');

  // Mock data
  useEffect(() => {
    const mockAuctions: Auction[] = [
      {
        _id: '1',
        product: {
          name: 'مصحف مذهب فاخر',
          description: 'مصحف فاخر بغلاف جلدي مذهب',
        },
        startingPrice: 100,
        currentBid: 150,
        startDate: new Date(Date.now() - 86400000).toISOString(),
        endDate: new Date(Date.now() + 7200000).toISOString(),
        status: 'active',
        bidsCount: 5,
        isWinner: false,
      },
      {
        _id: '2',
        product: {
          name: 'ساعة ذكية',
          description: 'ساعة ذكية بمواصفات عالية',
        },
        startingPrice: 150,
        currentBid: 200,
        startDate: new Date(Date.now() - 172800000).toISOString(),
        endDate: new Date(Date.now() + 18000000).toISOString(),
        status: 'active',
        bidsCount: 8,
        isWinner: false,
        userBid: 180,
      },
      {
        _id: '3',
        product: {
          name: 'حقيبة ظهر رياضية',
          description: 'حقيبة ظهر عملية ومتينة',
        },
        startingPrice: 80,
        currentBid: 120,
        startDate: new Date(Date.now() - 259200000).toISOString(),
        endDate: new Date(Date.now() - 3600000).toISOString(),
        status: 'ended',
        bidsCount: 12,
        isWinner: false,
      },
      {
        _id: '4',
        product: {
          name: 'سماعات لاسلكية',
          description: 'سماعات بلوتوث عالية الجودة',
        },
        startingPrice: 120,
        currentBid: 180,
        startDate: new Date(Date.now() - 345600000).toISOString(),
        endDate: new Date(Date.now() - 86400000).toISOString(),
        status: 'ended',
        bidsCount: 15,
        isWinner: true,
      },
    ];

    setTimeout(() => {
      setAuctions(mockAuctions);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredAuctions = auctions.filter(auction => {
    if (filter === 'all') return true;
    return auction.status === filter;
  });

  const getTimeRemaining = (endDate: string) => {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const diff = end - now;

    if (diff <= 0) return 'انتهى';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} يوم`;
    }
    return `${hours}س ${minutes}د`;
  };

  const handleBid = async () => {
    if (!selectedAuction || !bidAmount) return;

    const amount = parseInt(bidAmount);

    if (amount <= selectedAuction.currentBid) {
      notifyError('يجب أن يكون المبلغ أكبر من المزايدة الحالية');
      return;
    }

    if ((user?.points || 0) < amount) {
      notifyError('نقاطك غير كافية');
      return;
    }

    try {
      // TODO: Call API
      notifySuccess('تم تقديم المزايدة بنجاح!');
      setIsDialogOpen(false);
      setBidAmount('');
    } catch (error) {
      notifyError('حدث خطأ في تقديم المزايدة');
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">المزادات</h1>
          <p className="text-muted-foreground mt-2">
            شارك في المزايدة واربح منتجات حصرية
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
          <Award className="h-5 w-5 text-primary" />
          <span className="font-semibold">{user?.points || 0} نقطة</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          نشطة ({auctions.filter(a => a.status === 'active').length})
        </Button>
        <Button
          variant={filter === 'ended' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('ended')}
        >
          منتهية ({auctions.filter(a => a.status === 'ended').length})
        </Button>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          الكل ({auctions.length})
        </Button>
      </div>

      {/* Auctions Grid */}
      {filteredAuctions.length === 0 ? (
        <EmptyState
          icon={Gavel}
          title="لا توجد مزادات"
          description="لا توجد مزادات متاحة حالياً"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAuctions.map((auction) => (
            <Card key={auction._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48 bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center">
                  <Gavel className="h-20 w-20 text-amber-500/40" />
                  {auction.status === 'active' && (
                    <Badge className="absolute top-4 right-4 bg-green-500">
                      نشط
                    </Badge>
                  )}
                  {auction.status === 'ended' && (
                    <Badge className="absolute top-4 right-4 bg-gray-500">
                      انتهى
                    </Badge>
                  )}
                  {auction.isWinner && (
                    <Badge className="absolute top-4 left-4 bg-yellow-500">
                      🏆 فائز
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-lg mb-2">{auction.product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">
                  {auction.product.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">السعر الابتدائي:</span>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{auction.startingPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">المزايدة الحالية:</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-lg font-bold text-green-600">
                        {auction.currentBid}
                      </span>
                    </div>
                  </div>

                  {auction.userBid && (
                    <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <span className="text-sm text-muted-foreground">مزايدتك:</span>
                      <span className="font-semibold text-blue-600">{auction.userBid}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{auction.bidsCount} مزايدة</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="font-semibold text-amber-600">
                        {getTimeRemaining(auction.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={auction.status !== 'active'}
                  onClick={() => {
                    setSelectedAuction(auction);
                    setBidAmount(String(auction.currentBid + 10));
                    setIsDialogOpen(true);
                  }}
                >
                  <Gavel className="h-4 w-4 ml-2" />
                  {auction.status === 'active' ? 'زايد الآن' : 'المزاد منتهي'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Bid Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تقديم مزايدة</DialogTitle>
            <DialogDescription>
              أدخل المبلغ الذي تريد المزايدة به
            </DialogDescription>
          </DialogHeader>
          {selectedAuction && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">{selectedAuction.product.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المزايدة الحالية:</span>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-bold text-lg">{selectedAuction.currentBid}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>مبلغ المزايدة</Label>
                <Input
                  type="number"
                  placeholder={`أكثر من ${selectedAuction.currentBid}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  min={selectedAuction.currentBid + 1}
                />
                <p className="text-xs text-muted-foreground">
                  الحد الأدنى: {selectedAuction.currentBid + 1} نقطة
                </p>
              </div>

              <div className="text-sm text-muted-foreground">
                رصيدك الحالي: <span className="font-semibold">{user?.points || 0}</span> نقطة
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleBid}>
              تأكيد المزايدة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}