
import React from 'react';
import { LayoutDashboard, Music, DollarSign, Send, Users, Settings, Bell } from 'lucide-react';

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

export const NAV_ITEMS = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', id: 'dashboard' },
  { icon: <Music size={20} />, label: 'My Works', id: 'works' },
  { icon: <DollarSign size={20} />, label: 'Earnings', id: 'earnings' },
  { icon: <Send size={20} />, label: 'Submissions', id: 'submissions' },
  { icon: <Users size={20} />, label: 'Network', id: 'network' },
];
