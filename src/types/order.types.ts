export interface PurchaseData {
  productId: string;
  quantity?: number;
}

export interface RefundData {
  reason?: string;
}

export interface StoreStats {
  overview: {
    totalPoints: number;
    totalTransactions: number;
  };
  topProducts: Array<{
    _id: string;
    productName: string;
    totalSold: number;
    totalPoints: number;
  }>;
  topBuyers: Array<{
    _id: string;
    userName: string;
    totalPurchases: number;
    totalSpent: number;
  }>;
}