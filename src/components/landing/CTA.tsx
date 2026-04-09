import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
            هل أنت مستعد لبدء رحلتك؟
          </h2>
          <p className="text-xl text-primary-50">
            انضم إلى آلاف الطلاب الذين يحفظون القرآن الكريم بطريقة ممتعة ومحفزة
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                سجل الآن مجاناً
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
              asChild
            >
              <Link href="/login">لدي حساب بالفعل</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}