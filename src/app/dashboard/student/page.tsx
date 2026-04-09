"use client";

import { useState, useEffect } from "react";
import { Award, BookOpen, ShoppingBag, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/hooks/useAuth";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import api from "@/lib/api/axios";

interface DashboardStats {
  totalPoints: number;
  pointsEarned: number;
  pointsSpent: number;
  purchasesCount: number;
  competitionsCount: number;
}

interface Activity {
  _id: string;
  type: "award" | "deduct" | "purchase" | "competition";
  amount: number;
  reason: string;
  createdAt: string;
}

interface PointsTransaction {
  _id: string;
  type:
    | "points_award"
    | "points_deduct"
    | "purchase"
    | "auction_win"
    | "refund";
  pointsAmount: number;
  description: string;
  createdAt: string;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch MY points history (no userId needed - uses token)
      let pointsHistory: PointsTransaction[] = [];
      let pointsEarned = 0;
      let pointsSpent = 0;

      try {
        const pointsResponse = await api.get("/points/my-history", {
          params: { limit: 50 }, // Get last 50 transactions
        });
        const pointsData = pointsResponse.data;

        if (pointsData.success && pointsData.data) {
          pointsHistory = pointsData.data;

          // Calculate stats from transactions
          pointsEarned = pointsHistory
            .filter((p) => p.type === "points_award" || p.pointsAmount > 0)
            .reduce((sum, p) => sum + Math.abs(p.pointsAmount || 0), 0);

          pointsSpent = pointsHistory
            .filter((p) => p.type === "purchase" || p.type === "points_deduct")
            .reduce((sum, p) => sum + Math.abs(p.pointsAmount || 0), 0);
        }
      } catch (err) {
        console.log("Could not fetch points history:", err);
      }

      // Fetch purchase history for count
      let purchasesCount = 0;
      try {
        const ordersResponse = await api.get("/store/history");
        const ordersData = ordersResponse.data;
        purchasesCount = ordersData.success ? ordersData.data?.length || 0 : 0;
      } catch (err) {
        console.log("Could not fetch store history");
      }

      // For competitions
      let competitionsCount = 0;
      try {
        const competitionsResponse = await api.get("/competitions");
        const competitionsData = competitionsResponse.data;
        const competitions = competitionsData.success
          ? competitionsData.data || []
          : [];
        competitionsCount =
          competitions.filter(
            (c: { isParticipating?: boolean }) => c.isParticipating
          )?.length || 0;
      } catch (err) {
        console.log("Competitions not fetched");
      }

      setStats({
        totalPoints: user?.points || 0,
        pointsEarned,
        pointsSpent,
        purchasesCount,
        competitionsCount,
      });
      const mapActivityType = (
        transactionType: string
      ): "award" | "deduct" | "purchase" => {
        if (transactionType === "points_award") return "award";
        if (transactionType === "points_deduct") return "deduct";
        return "purchase";
      };

      // Get recent activities (last 5)
      const recentActivities = pointsHistory.slice(0, 5).map((t) => ({
        _id: t._id,
        type: mapActivityType(t.type),
        amount: t.pointsAmount || 0,
        reason: t.description || "معاملة",
        createdAt: t.createdAt,
      }));
      setActivities(recentActivities);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Fallback to default values
      setStats({
        totalPoints: user?.points || 0,
        pointsEarned: 0,
        pointsSpent: 0,
        purchasesCount: 0,
        competitionsCount: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "award":
        return { icon: "✅", color: "text-green-600" };
      case "deduct":
        return { icon: "❌", color: "text-red-600" };
      case "purchase":
        return { icon: "🛒", color: "text-blue-600" };
      case "competition":
        return { icon: "🏆", color: "text-yellow-600" };
      default:
        return { icon: "•", color: "text-gray-600" };
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date().getTime();
    const past = new Date(date).getTime();
    const diff = now - past;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const dashboardStats = [
    {
      title: "إجمالي النقاط",
      value: stats?.totalPoints || 0,
      icon: Award,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "النقاط المكتسبة",
      value: stats?.pointsEarned || 0,
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "المشتريات",
      value: stats?.purchasesCount || 0,
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "المسابقات",
      value: stats?.competitionsCount || 0,
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">مرحباً، {user?.name}! 👋</h1>
        <p className="text-muted-foreground mt-2">هذا ملخص لنشاطك على المنصة</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.title === "إجمالي النقاط" && stats && (
                  <p className="text-xs text-muted-foreground mt-1">
                    +{stats.pointsEarned} مكتسبة | -{stats.pointsSpent} مستخدمة
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>النشاط الأخير</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                لا يوجد نشاط بعد
              </p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => {
                  const activityInfo = getActivityIcon(activity.type);
                  return (
                    <div key={activity._id} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          {getTimeAgo(activity.createdAt)}
                        </p>
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          activity.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {activity.amount > 0 ? "+" : ""}
                        {activity.amount} نقطة
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات النقاط</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">
                    النقاط المكتسبة
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats?.pointsEarned || 0}
                  </p>
                </div>
                <div className="text-3xl">📈</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">
                    النقاط المستخدمة
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats?.pointsSpent || 0}
                  </p>
                </div>
                <div className="text-3xl">📉</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">الرصيد الحالي</p>
                  <p className="text-2xl font-bold text-primary">
                    {stats?.totalPoints || 0}
                  </p>
                </div>
                <div className="text-3xl">💰</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
