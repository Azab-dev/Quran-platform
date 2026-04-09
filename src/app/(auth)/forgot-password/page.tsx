'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notifySuccess } from '@/lib/notify';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      notifySuccess('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">نسيت كلمة المرور؟</CardTitle>
        <CardDescription>
          {isSent
            ? 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني'
            : 'أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSent ? (
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-primary">
                تفقد بريدك الإلكتروني واتبع التعليمات لإعادة تعيين كلمة المرور
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/login">
                <ArrowRight className="ml-2 h-4 w-4" />
                العودة لتسجيل الدخول
              </Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
            </Button>

            <Button variant="ghost" asChild className="w-full">
              <Link href="/login">
                <ArrowRight className="ml-2 h-4 w-4" />
                العودة لتسجيل الدخول
              </Link>
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}