
export type UserRole = 'CREATOR' | 'PUBLISHER' | 'CMO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface RoyaltyRecord {
  id: string;
  title: string;
  plays: number;
  earnings: number;
  cmo: string;
  period: string;
  status: 'Distributed' | 'Pending' | 'Calculated';
}

export interface Submission {
  id: string;
  title: string;
  date: string;
  splits: { name: string; percentage: number }[];
  status: 'Approved' | 'Reviewing' | 'Pending';
  cmo: string;
}

export interface Stats {
  totalEarnings: number;
  totalPlays: number;
  activeWorks: number;
}
