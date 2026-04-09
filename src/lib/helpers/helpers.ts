// Get initials from name
export const getInitials = (name: string): string => {
  const names = name.trim().split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Truncate text
export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

// Get role in Arabic
export const getRoleInArabic = (role: string): string => {
  const roles: Record<string, string> = {
    student: 'طالب',
    teacher: 'معلم',
    admin: 'مدير',
  };
  return roles[role] || role;
};

// Get status color
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-gray-100 text-gray-800',
    upcoming: 'bg-purple-100 text-purple-800',
    ended: 'bg-gray-100 text-gray-800',
    registration_open: 'bg-green-100 text-green-800',
    ongoing: 'bg-blue-100 text-blue-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Get transaction type in Arabic
export const getTransactionTypeInArabic = (type: string): string => {
  const types: Record<string, string> = {
    points_award: 'منح نقاط',
    points_deduct: 'خصم نقاط',
    purchase: 'شراء',
    auction_win: 'فوز في مزاد',
    refund: 'استرجاع',
  };
  return types[type] || type;
};

// Sleep utility
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Generate random color
export const generateColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
};

// Check if date is past
export const isPast = (date: string | Date): boolean => {
  return new Date(date) < new Date();
};

// Check if date is future
export const isFuture = (date: string | Date): boolean => {
  return new Date(date) > new Date();
};

// Get time until date
export const getTimeUntil = (date: string | Date): string => {
  const now = new Date();
  const target = new Date(date);
  const diff = target.getTime() - now.getTime();

  if (diff < 0) return 'انتهى';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days} يوم`;
  if (hours > 0) return `${hours} ساعة`;
  return `${minutes} دقيقة`;
};