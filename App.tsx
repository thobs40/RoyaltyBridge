
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Works from './components/Works';
import Earnings from './components/Earnings';
import Submissions from './components/Submissions';
import Network from './components/Network';
import { User, RoyaltyRecord, Submission } from './types';
import { MOCK_ROYALTIES, MOCK_SUBMISSIONS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Shared state for a "functional" app experience
  const [works, setWorks] = useState<RoyaltyRecord[]>(MOCK_ROYALTIES as any);
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS as any);

  const handleLogin = (role: 'CREATOR' | 'CMO') => {
    setUser({
      id: 'u1',
      name: 'Alex Producer',
      email: 'alex@example.com',
      role: role
    });
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

  if (!user) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard submissions={submissions} works={works} onAddSubmission={handleAddSubmission} />;
      case 'works':
        return <Works works={works} />;
      case 'earnings':
        return <Earnings works={works} />;
      case 'submissions':
        return <Submissions submissions={submissions} />;
      case 'network':
        return <Network />;
      default:
        return <Dashboard submissions={submissions} works={works} onAddSubmission={handleAddSubmission} />;
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <main className="flex-1 ml-64 min-h-screen bg-slate-950 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
