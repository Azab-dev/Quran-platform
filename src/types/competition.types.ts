export interface Competition {
  _id: string;
  title: string;
  description: string;
  type: 'memorization' | 'recitation' | 'tajweed' | 'other';
  pointsReward: {
    first: number;
    second: number;
    third: number;
    participation: number;
  };
  maxParticipants?: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'registration_open' | 'ongoing' | 'completed';
  createdBy: string | {
    _id: string;
    name: string;
  };
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  userId: string | {
    _id: string;
    name: string;
    avatar?: string;
    grade?: string;
  };
  joinedAt: string;
  score?: number;
  rank?: number;
  pointsAwarded?: number;
}

export interface CreateCompetitionData {
  title: string;
  description: string;
  type: 'memorization' | 'recitation' | 'tajweed' | 'other';
  pointsReward: {
    first: number;
    second: number;
    third: number;
    participation: number;
  };
  maxParticipants?: number;
  startDate: string;
  endDate: string;
}

export interface RecordScoreData {
  userId: string;
  score: number;
}