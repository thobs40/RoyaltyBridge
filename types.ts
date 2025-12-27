
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

export interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  method?: string;
}

// CMO Specific Types
export interface CMOPayment {
  id: string;
  memberName: string;
  country: string;
  worksCount: number;
  amount: number;
  status: 'Processed' | 'Processing' | 'Pending';
  date: string;
}

export interface IPQuery {
  id: string;
  type: 'Ownership Verification' | 'Copyright Dispute' | 'Territory Rights' | 'ISRC Conflict';
  requestingParty: string;
  workTitle: string;
  status: 'Resolved' | 'Under Review' | 'Pending';
  priority: 'High' | 'Medium' | 'Low';
}

export interface CMOWork {
  id: string;
  title: string;
  creator: string;
  iswc: string;
  territories: string[];
  status: 'Active' | 'Under Review' | 'Conflict';
}

export interface Stats {
  totalEarnings: number;
  totalPlays: number;
  activeWorks: number;
}
