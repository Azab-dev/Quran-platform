'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Award, Search, ShoppingCart, Package, Filter } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { notifySuccess, notifyError } from '@/lib/notify';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

export default function StudentStorePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Mock data - Replace with API call
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        _id: '1',
        name: 'مصحف مذهب',
        description: 'مصحف فاخر بغلاف مذهب وخط واضح',
        price: 150,
        category: 'كتب',
        stock: 10,
      },
      {
        _id: '2',
        name: 'سجادة صلاة',
        description: 'سجادة صلاة مريحة وعملية',
        price: 80,
        category: 'مستلزمات',
        stock: 20,
      },
      {
        _id: '3',
        name: 'مسبحة إلكترونية',
        description: 'مسبحة إلكترونية بعداد رقمي',
        price: 50,
        category: 'إلكترونيات',
        stock: 15,
      },
      {
        _id: '4',
        name: 'كتاب تفسير',
        description: 'تفسير القرآن الكريم - الطبعة الجديدة',
        price: 120,
        category: 'كتب',
        stock: 8,
      },
      {
        _id: '5',
        name: 'ساعة يد',
        description: 'ساعة يد رياضية مقاومة للماء',
        price: 200,
        category: 'إكسسوارات',
        stock: 5,
      },
      {
        _id: '6',
        name: 'حقيبة ظهر',
        description: 'حقيبة ظهر مدرسية بتصميم عصري',
        price: 180,
        category: 'حقائب',
        stock: 12,
      },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePurchase = async () => {
    if (!selectedProduct) return;

    const totalCost = selectedProduct.price * quantity;
    
    if ((user?.points || 0) < totalCost) {
      notifyError('نقاطك غير كافية لإتمام الشراء');
      return;
    }

    try {
      // TODO: Call API to purchase
      notifySuccess(`تم شراء ${selectedProduct.name} بنجاح!`);
      setIsDialogOpen(false);
      setSelectedProduct(null);
      setQuantity(1);
    } catch (error) {
      notifyError('حدث خطأ في عملية الشراء');
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
          <h1 className="text-3xl font-bold">المتجر</h1>
          <p className="text-muted-foreground mt-2">
            استبدل نقاطك بمنتجات رائعة
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
          <Award className="h-5 w-5 text-primary" />
          <span className="font-semibold">{user?.points || 0} نقطة</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category === 'all' ? 'الكل' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={Package}
          title="لا توجد منتجات"
          description="لم يتم العثور على منتجات تطابق البحث"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Package className="h-20 w-20 text-primary/40" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-bold text-primary">{product.price}</span>
                  </div>
                  <Badge variant={product.stock > 0 ? 'outline' : 'destructive'}>
                    {product.stock > 0 ? `متوفر: ${product.stock}` : 'نفذت الكمية'}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={product.stock === 0 || (user?.points || 0) < product.price}
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsDialogOpen(true);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 ml-2" />
                  {(user?.points || 0) < product.price ? 'نقاط غير كافية' : 'شراء الآن'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Purchase Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الشراء</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من شراء هذا المنتج؟
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">{selectedProduct.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedProduct.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">السعر للوحدة:</span>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-bold">{selectedProduct.price}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>الكمية</Label>
                <Input
                  type="number"
                  min="1"
                  max={selectedProduct.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(selectedProduct.stock, parseInt(e.target.value) || 1)))}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                <span className="font-semibold">الإجمالي:</span>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-xl font-bold text-primary">
                    {selectedProduct.price * quantity}
                  </span>
                </div>
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
            <Button onClick={handlePurchase}>
              تأكيد الشراء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}