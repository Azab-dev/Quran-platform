'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Award, Trophy, Users, Calendar, Medal, Clock } from 'lucide-react';
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
  prizes: {
    first: number;
    second: number;
    third: number;
  };
  participantsCount: number;
  maxParticipants?: number;
  isParticipating: boolean;
  userScore?: number;
  userRank?: number;
}

export default function StudentCompetitionsPage() {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'ended'>('active');

  // Mock data
  useEffect(() => {
    const mockCompetitions: Competition[] = [
      {
        _id: '1',
        title: 'مسابقة حفظ جزء عم',
        description: 'مسابقة أسبوعية لحفظ وتسميع جزء عم كاملاً',
        startDate: new Date(Date.now() - 86400000).toISOString(),
        endDate: new Date(Date.now() + 518400000).toISOString(),
        status: 'active',
        prizes: { first: 500, second: 300, third: 150 },
        participantsCount: 45,
        maxParticipants: 100,
        isParticipating: true,
        userScore: 85,
        userRank: 12,
      },
      {
        _id: '2',
        title: 'تحدي سورة البقرة',
        description: 'مسابقة شهرية لحفظ سورة البقرة كاملة بإتقان',
        startDate: new Date(Date.now() + 86400000).toISOString(),
        endDate: new Date(Date.now() + 2592000000).toISOString(),
        status: 'upcoming',
        prizes: { first: 1000, second: 600, third: 300 },
        participantsCount: 0,
        maxParticipants: 50,
        isParticipating: false,
      },
      {
        _id: '3',
        title: 'مسابقة التلاوة المجودة',
        description: 'مسابقة لأفضل تلاوة مجودة لسورة الكهف',
        startDate: new Date(Date.now() - 604800000).toISOString(),
        endDate: new Date(Date.now() - 86400000).toISOString(),
        status: 'ended',
        prizes: { first: 400, second: 250, third: 100 },
        participantsCount: 67,
        isParticipating: true,
        userScore: 92,
        userRank: 3,
      },
    ];

    setTimeout(() => {
      setCompetitions(mockCompetitions);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredCompetitions = competitions.filter(comp => {
    if (filter === 'all') return true;
    return comp.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">نشطة</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500">قريباً</Badge>;
      case 'ended':
        return <Badge className="bg-gray-500">منتهية</Badge>;
      default:
        return null;
    }
  };

  const handleJoin = async () => {
    if (!selectedCompetition) return;

    try {
      // TODO: Call API
      notifySuccess('تم الاشتراك في المسابقة بنجاح!');
      setIsDialogOpen(false);
    } catch (error) {
      notifyError('حدث خطأ في الاشتراك');
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
      <div>
        <h1 className="text-3xl font-bold">المسابقات</h1>
        <p className="text-muted-foreground mt-2">
          شارك في المسابقات واربح جوائز قيمة
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          نشطة ({competitions.filter(c => c.status === 'active').length})
        </Button>
        <Button
          variant={filter === 'upcoming' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('upcoming')}
        >
          قريباً ({competitions.filter(c => c.status === 'upcoming').length})
        </Button>
        <Button
          variant={filter === 'ended' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('ended')}
        >
          منتهية ({competitions.filter(c => c.status === 'ended').length})
        </Button>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          الكل ({competitions.length})
        </Button>
      </div>

      {/* Competitions Grid */}
      {filteredCompetitions.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="لا توجد مسابقات"
          description="لا توجد مسابقات متاحة حالياً"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompetitions.map((competition) => (
            <Card key={competition._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 flex items-center justify-center">
                  <Trophy className="h-20 w-20 text-yellow-500/40" />
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(competition.status)}
                  </div>
                  {competition.isParticipating && (
                    <Badge className="absolute top-4 left-4 bg-blue-500">
                      مشترك
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-lg mb-2">{competition.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">
                  {competition.description}
                </p>

                {/* User Stats (if participating) */}
                {competition.isParticipating && competition.userScore !== undefined && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">درجتك:</span>
                      <span className="font-bold text-blue-600">{competition.userScore}/100</span>
                    </div>
                    {competition.userRank && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">ترتيبك:</span>
                        <div className="flex items-center gap-1">
                          <Medal className="h-4 w-4 text-yellow-600" />
                          <span className="font-bold text-yellow-600">#{competition.userRank}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Prizes */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Medal className="h-4 w-4 text-yellow-500" />
                      <span>المركز الأول:</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{competition.prizes.first}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Medal className="h-4 w-4 text-gray-400" />
                      <span>المركز الثاني:</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{competition.prizes.second}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Medal className="h-4 w-4 text-amber-600" />
                      <span>المركز الثالث:</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{competition.prizes.third}</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>المشاركون:</span>
                    </div>
                    <span className="font-semibold">
                      {competition.participantsCount}
                      {competition.maxParticipants && ` / ${competition.maxParticipants}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>تنتهي في:</span>
                    </div>
                    <span className="font-semibold">
                      {new Date(competition.endDate).toLocaleDateString('ar-EG', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {competition.isParticipating ? (
                  <Button className="w-full" variant="outline" disabled>
                    مشترك بالفعل
                  </Button>
                ) : competition.status === 'ended' ? (
                  <Button className="w-full" variant="outline" disabled>
                    المسابقة منتهية
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedCompetition(competition);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Trophy className="h-4 w-4 ml-2" />
                    اشترك الآن
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Join Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>الاشتراك في المسابقة</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من الاشتراك في هذه المسابقة؟
            </DialogDescription>
          </DialogHeader>
          {selectedCompetition && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">{selectedCompetition.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedCompetition.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تبدأ في:</span>
                  <span className="font-semibold">
                    {new Date(selectedCompetition.startDate).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تنتهي في:</span>
                  <span className="font-semibold">
                    {new Date(selectedCompetition.endDate).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">الجوائز:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span>🥇 المركز الأول:</span>
                    <span className="font-bold">{selectedCompetition.prizes.first} نقطة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🥈 المركز الثاني:</span>
                    <span className="font-bold">{selectedCompetition.prizes.second} نقطة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🥉 المركز الثالث:</span>
                    <span className="font-bold">{selectedCompetition.prizes.third} نقطة</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleJoin}>
              تأكيد الاشتراك
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}