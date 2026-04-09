export interface Auction {
  _id: string;
  productId: {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: string;
  };
  startingPrice: number;
  currentBid: number;
  highestBidder?: {
    _id: string;
    name: string;
    avatar?: string;
    points?: number;
  };
  winner?: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'ended';
  bids: Bid[];
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  userId: string | {
    _id: string;
    name: string;
    avatar?: string;
  };
  amount: number;
  timestamp: string;
}

export interface CreateAuctionData {
  productId: string;
  startingPrice: number;
  startDate: string;
  endDate: string;
}

export interface PlaceBidData {
  amount: number;
}