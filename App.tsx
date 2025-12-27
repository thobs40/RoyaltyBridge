
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Works from './components/Works';
import Earnings from './components/Earnings';
import Submissions from './components/Submissions';
import Network from './components/Network';
import Wallet from './components/Wallet';
import CMOOverview from './components/cmo/CMOOverview';
import CMOPayments from './components/cmo/CMOPayments';
import CMOQueries from './components/cmo/CMOQueries';
import CMOWorksDB from './components/cmo/CMOWorksDB';
import { User, RoyaltyRecord, Submission, Transaction } from './types';
import { MOCK_ROYALTIES, MOCK_SUBMISSIONS, MOCK_TRANSACTIONS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Shared state for a "functional" app experience
  const [works, setWorks] = useState<RoyaltyRecord[]>(MOCK_ROYALTIES as any);
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS as any);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS as any);

  const handleLogin = (role: 'CREATOR' | 'CMO') => {
    setUser({
      id: 'u1',
      name: role === 'CMO' ? 'Society Administrator' : 'Alex Producer',
      email: role === 'CMO' ? 'admin@ascap.org' : 'alex@example.com',
      role: role
    });
    // Set default tab based on role
    setActiveTab(role === 'CMO' ? 'cmo-dashboard' : 'dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const handleAddSubmission = (newSubmission: Submission) => {
    setSubmissions([newSubmission, ...submissions]);
    
    // Also add to works list (with zero earnings initially)
    const newWork: RoyaltyRecord = {
      id: newSubmission.id,
      title: newSubmission.title,
      plays: 0,
      earnings: 0,
      cmo: newSubmission.cmo,
      period: 'Q4 2024',
      status: 'Pending'
    };
    setWorks([newWork, ...works]);
  };

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  if (!user) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Creator Content
    if (user.role === 'CREATOR') {
      switch (activeTab) {
        case 'dashboard':
          return <Dashboard submissions={submissions} works={works} onAddSubmission={handleAddSubmission} />;
        case 'works':
          return <Works works={works} />;
        case 'earnings':
          return <Earnings works={works} />;
        case 'wallet':
          return <Wallet transactions={transactions} onWithdraw={handleAddTransaction} />;
        case 'submissions':
          return <Submissions submissions={submissions} />;
        case 'network':
          return <Network />;
        default:
          return <Dashboard submissions={submissions} works={works} onAddSubmission={handleAddSubmission} />;
      }
    }

    // CMO Content
    if (user.role === 'CMO') {
      switch (activeTab) {
        case 'cmo-dashboard':
          return <CMOOverview />;
        case 'cmo-payments':
          return <CMOPayments />;
        case 'cmo-queries':
          return <CMOQueries />;
        case 'cmo-works':
          return <CMOWorksDB />;
        default:
          return <CMOOverview />;
      }
    }

    return <div>Access Denied</div>;
  };

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar 
        role={user.role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 ml-64 min-h-screen bg-slate-950 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
