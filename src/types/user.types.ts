export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  points: number;
  grade?: string;
  avatar?: string;
  dateOfBirth?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  name?: string;
  grade?: string;
  dateOfBirth?: string;
  avatar?: string;
}

export interface LeaderboardEntry {
  rank: number;
  _id: string;
  name: string;
  points: number;
  avatar?: string;
  grade?: string;
}