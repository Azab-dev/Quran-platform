import Link from 'next/link';
import { ArrowLeft, BookOpen, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <BookOpen className="w-4 h-4" />
              <span>منصة تحفيظ القرآن الكريم</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              ابدأ رحلتك في حفظ{' '}
              <span className="text-secondary">القرآن الكريم</span>
            </h1>

            <p className="text-xl text-primary-50 leading-relaxed">
              منصة تفاعلية تجمع بين التعليم والتحفيز من خلال نظام النقاط والمكافآت،
              مع إمكانية التنافس في المسابقات والمزادات
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">
                  ابدأ الآن مجاناً
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white" asChild>
                <Link href="/login">تسجيل الدخول</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-4xl font-bold mb-1">1000+</div>
                <div className="text-sm text-primary-100">طالب نشط</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">50+</div>
                <div className="text-sm text-primary-100">معلم</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="text-sm text-primary-100">مسابقات</div>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">نظام النقاط</div>
                    <div className="text-sm text-primary-100">اجمع النقاط واربح الجوائز</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">المسابقات</div>
                    <div className="text-sm text-primary-100">تنافس مع زملائك</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">المتجر</div>
                    <div className="text-sm text-primary-100">استبدل نقاطك بجوائز</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}