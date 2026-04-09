import { BookOpen } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary">منصة التحفيظ</h1>
            <p className="text-muted-foreground mt-2">
              نحو جيل حافظ لكتاب الله
            </p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-primary-600 items-center justify-center p-12">
        <div className="max-w-md text-white space-y-6">
          <h2 className="text-4xl font-bold">
            ابدأ رحلتك في حفظ القرآن الكريم
          </h2>
          <p className="text-lg text-primary-50">
            انضم إلى آلاف الطلاب الذين يتنافسون في حفظ كتاب الله بطريقة ممتعة
            ومحفزة
          </p>
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-sm text-primary-100">طالب نشط</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-sm text-primary-100">معلم</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">5000+</div>
              <div className="text-sm text-primary-100">جزء محفوظ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">10+</div>
              <div className="text-sm text-primary-100">مسابقات</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}