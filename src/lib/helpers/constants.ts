// App Info
export const APP_NAME = 'منصة التحفيظ';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'منصة تحفيظ القرآن الكريم';

// API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Roles
export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
} as const;

// Roles in Arabic
export const ROLES_ARABIC = {
  student: 'طالب',
  teacher: 'معلم',
  admin: 'مدير',
} as const;

// Product Categories
export const PRODUCT_CATEGORIES = [
  'كتب',
  'مصاحف',
  'إلكترونيات',
  'قرطاسية',
  'ألعاب',
  'هدايا',
  'أخرى',
] as const;

// Competition Types
export const COMPETITION_TYPES = {
  MEMORIZATION: 'memorization',
  RECITATION: 'recitation',
  TAJWEED: 'tajweed',
  OTHER: 'other',
} as const;

// Competition Types in Arabic
export const COMPETITION_TYPES_ARABIC = {
  memorization: 'حفظ',
  recitation: 'تلاوة',
  tajweed: 'تجويد',
  other: 'أخرى',
} as const;

// Auction Status
export const AUCTION_STATUS = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  ENDED: 'ended',
} as const;

// Auction Status in Arabic
export const AUCTION_STATUS_ARABIC = {
  upcoming: 'قادم',
  active: 'نشط',
  ended: 'منتهي',
} as const;

// Competition Status
export const COMPETITION_STATUS = {
  UPCOMING: 'upcoming',
  REGISTRATION_OPEN: 'registration_open',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
} as const;

// Competition Status in Arabic
export const COMPETITION_STATUS_ARABIC = {
  upcoming: 'قادم',
  registration_open: 'التسجيل مفتوح',
  ongoing: 'جاري',
  completed: 'منتهي',
} as const;

// Transaction Types
export const TRANSACTION_TYPES = {
  POINTS_AWARD: 'points_award',
  POINTS_DEDUCT: 'points_deduct',
  PURCHASE: 'purchase',
  AUCTION_WIN: 'auction_win',
  REFUND: 'refund',
} as const;

// Transaction Types in Arabic
export const TRANSACTION_TYPES_ARABIC = {
  points_award: 'منح نقاط',
  points_deduct: 'خصم نقاط',
  purchase: 'شراء',
  auction_win: 'فوز في مزاد',
  refund: 'استرجاع',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

// Date Formats
export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';

// Validation
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 100;
export const MAX_NAME_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 1000;