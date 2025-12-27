
import React from 'react';
import { 
  LayoutDashboard, Music, DollarSign, Send, Users, Wallet as WalletIcon, 
  Globe, ShieldAlert, Database, History, Search 
} from 'lucide-react';
import { CMOPayment, IPQuery, CMOWork } from './types';

export const COLORS = {
  primary: '#8b5cf6', // Violet 500
  secondary: '#3b82f6', // Blue 500
  accent: '#ec4899', // Pink 500
  background: '#0f172a', // Slate 900
};

export const MOCK_ROYALTIES = [
  { id: '1', title: 'Neon Nights', plays: 1254300, earnings: 4235.50, cmo: 'ASCAP', period: 'Q3 2024', status: 'Distributed' },
  { id: '2', title: 'Midnight Echoes', plays: 842000, earnings: 2840.20, cmo: 'BMI', period: 'Q3 2024', status: 'Distributed' },
  { id: '3', title: 'Velvet Sky', plays: 312000, earnings: 1050.75, cmo: 'SESAC', period: 'Q3 2024', status: 'Pending' },
  { id: '4', title: 'Digital Dreams', plays: 98000, earnings: 330.40, cmo: 'ASCAP', period: 'Q3 2024', status: 'Calculated' },
  { id: '5', title: 'Synth Wave', plays: 540000, earnings: 1820.10, cmo: 'GEMA', period: 'Q2 2024', status: 'Distributed' },
];

export const MOCK_SUBMISSIONS = [
  { id: 's1', title: 'Pulse of Tomorrow', date: '2024-10-15', cmo: 'ASCAP', splits: [{ name: 'Alex Producer', percentage: 50 }, { name: 'Sarah Writer', percentage: 50 }], status: 'Reviewing' },
  { id: 's2', title: 'Lunar Drift', date: '2024-10-10', cmo: 'BMI', splits: [{ name: 'Alex Producer', percentage: 100 }], status: 'Approved' },
];

export const MOCK_TRANSACTIONS = [
  { id: 't1', type: 'CREDIT', amount: 4235.50, description: 'Royalty Distribution: Neon Nights (Q3)', date: '2024-11-20', status: 'COMPLETED' },
  { id: 't2', type: 'DEBIT', amount: 2000.00, description: 'Payout to Bank Account (...4291)', date: '2024-11-15', status: 'COMPLETED', method: 'Bank Transfer' },
  { id: 't3', type: 'CREDIT', amount: 2840.20, description: 'Royalty Distribution: Midnight Echoes (Q3)', date: '2024-11-10', status: 'COMPLETED' },
  { id: 't4', type: 'DEBIT', amount: 1500.00, description: 'Payout to PayPal (alex@prod.me)', date: '2024-10-28', status: 'COMPLETED', method: 'PayPal' },
];

export const MOCK_CMO_PAYMENTS: CMOPayment[] = [
  { id: 'cp1', memberName: 'Hans Zimmer', country: 'Germany', worksCount: 142, amount: 84200.50, status: 'Processed', date: '2024-11-20' },
  { id: 'cp2', memberName: 'Emily Warren', country: 'USA', worksCount: 89, amount: 125400.00, status: 'Processing', date: '2024-11-21' },
  { id: 'cp3', memberName: 'Finneas O\'Connell', country: 'USA', worksCount: 56, amount: 45200.25, status: 'Processed', date: '2024-11-19' },
  { id: 'cp4', memberName: 'Tainy', country: 'Puerto Rico', worksCount: 112, amount: 98400.80, status: 'Pending', date: '2024-11-22' },
];

export const MOCK_CMO_QUERIES: IPQuery[] = [
  { id: 'q1', type: 'Ownership Verification', requestingParty: 'Spotify', workTitle: 'Blinding Lights', status: 'Resolved', priority: 'High' },
  { id: 'q2', type: 'Copyright Dispute', requestingParty: 'Universal Music', workTitle: 'Cruel Summer', status: 'Under Review', priority: 'High' },
  { id: 'q3', type: 'Territory Rights', requestingParty: 'Warner Chappell', workTitle: 'Levitating', status: 'Pending', priority: 'Medium' },
  { id: 'q4', type: 'ISRC Conflict', requestingParty: 'Apple Music', workTitle: 'Vampire', status: 'Pending', priority: 'Low' },
];

export const MOCK_CMO_WORKS: CMOWork[] = [
  { id: 'w1', title: 'Flowers', creator: 'Miley Cyrus', iswc: 'T-900.743.321-2', territories: ['Global'], status: 'Active' },
  { id: 'w2', title: 'Anti-Hero', creator: 'Taylor Swift', iswc: 'T-900.512.111-0', territories: ['Global'], status: 'Active' },
  { id: 'w3', title: 'Last Night', creator: 'Morgan Wallen', iswc: 'T-900.213.444-5', territories: ['US', 'CA'], status: 'Under Review' },
  { id: 'w4', title: 'Calm Down', creator: 'Rema', iswc: 'T-900.111.999-9', territories: ['Global'], status: 'Conflict' },
];

export const NAV_ITEMS = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', id: 'dashboard' },
  { icon: <Music size={20} />, label: 'My Works', id: 'works' },
  { icon: <DollarSign size={20} />, label: 'Earnings', id: 'earnings' },
  { icon: <WalletIcon size={20} />, label: 'Wallet', id: 'wallet' },
  { icon: <Send size={20} />, label: 'Submissions', id: 'submissions' },
  { icon: <Users size={20} />, label: 'Network', id: 'network' },
];

export const CMO_NAV_ITEMS = [
  { icon: <LayoutDashboard size={20} />, label: 'CMO Overview', id: 'cmo-dashboard' },
  { icon: <Globe size={20} />, label: 'Intl Payments', id: 'cmo-payments' },
  { icon: <ShieldAlert size={20} />, label: 'Queries & Disputes', id: 'cmo-queries' },
  { icon: <Database size={20} />, label: 'Works Database', id: 'cmo-works' },
];
