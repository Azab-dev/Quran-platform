import { format, formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

// Format date
export const formatDate = (date: string | Date, formatStr: string = 'dd/MM/yyyy'): string => {
  try {
    return format(new Date(date), formatStr, { locale: ar });
  } catch {
    return 'تاريخ غير صحيح';
  }
};

// Format datetime
export const formatDateTime = (date: string | Date): string => {
  try {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: ar });
  } catch {
    return 'تاريخ غير صحيح';
  }
};

// Format relative time (منذ ساعة، منذ يومين)
export const formatRelativeTime = (date: string | Date): string => {
  try {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true, 
      locale: ar 
    });
  } catch {
    return 'تاريخ غير صحيح';
  }
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ar-EG').format(num);
};

// Format points
export const formatPoints = (points: number): string => {
  return `${formatNumber(points)} نقطة`;
};

// Format price
export const formatPrice = (price: number): string => {
  return `${formatNumber(price)} نقطة`;
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};