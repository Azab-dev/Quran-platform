// Generic API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pagination: PaginationInfo;
  };
}

// Query Filters
export interface ProductFilters extends PaginationParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inAuction?: boolean;
}

export interface UserFilters extends PaginationParams {
  search?: string;
  role?: 'student' | 'teacher' | 'admin';
}

export interface AuctionFilters extends PaginationParams {
  status?: 'upcoming' | 'active' | 'ended';
}

export interface CompetitionFilters extends PaginationParams {
  status?: 'upcoming' | 'registration_open' | 'ongoing' | 'completed';
  type?: 'memorization' | 'recitation' | 'tajweed' | 'other';
}