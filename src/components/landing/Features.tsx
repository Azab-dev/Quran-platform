import { Award, BookOpen, ShoppingBag, Trophy, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: BookOpen,
    title: 'نظام تحفيظ متكامل',
    description: 'تتبع تقدمك في حفظ القرآن الكريم مع معلمين متخصصين',
  },
  {
    icon: Trophy,
    title: 'نظام النقاط',
    description: 'اجمع النقاط مقابل حفظك وتقدمك في الحفظ والمراجعة',
  },
  {
    icon: ShoppingBag,
    title: 'المتجر',
    description: 'استبدل نقاطك بجوائز قيمة من المتجر الخاص بالمنصة',
  },
  {
    icon: Zap,
    title: 'المزادات',
    description: 'شارك في المزادات المثيرة وفز بجوائز حصرية',
  },
  {
    icon: Users,
    title: 'المسابقات',
    description: 'تنافس مع زملائك في مسابقات الحفظ والتلاوة',
  },
  {
    icon: Award,
    title: 'لوحة المتصدرين',
    description: 'تابع تقدمك وشاهد ترتيبك بين الطلاب المتميزين',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">مميزات المنصة</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نوفر لك كل ما تحتاجه لرحلة حفظ ممتعة ومثمرة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}