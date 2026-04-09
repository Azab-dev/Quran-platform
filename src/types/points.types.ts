export interface Transaction {
  _id: string;
  userId: string | {
    _id: string;
    name: string;
    avatar?: string;
  };
  productId?: string | {
    _id: string;
    name: string;
    image: string;
    price: number;
    category: string;
  };
  type: 'points_award' | 'points_deduct' | 'purchase' | 'auction_win' | 'refund';
  pointsAmount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: 'pending' | 'completed' | 'cancelled';
  description: string;
  metadata?: {
    key: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AwardPointsData {
  userId: string;
  points: number;
  reason: string;
}

export interface DeductPointsData {
  userId: string;
  points: number;
  reason: string;
}