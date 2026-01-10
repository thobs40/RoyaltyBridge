import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Works from './components/Works';
import Earnings from './components/Earnings';
import Submissions from './components/Submissions';
import Network from './components/Network';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

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

  // Centralized navigation handler to allow child components to trigger tab changes
  const navigateTo = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'works':
        return <Works />;
      case 'earnings':
        return <Earnings />;
      case 'submissions':
        return <Submissions />;
      case 'network':
        return <Network />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex gradient-bg min-h-screen">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 ml-20 lg:ml-64 min-h-screen relative">
        <div className="max-w-[1600px] mx-auto transition-all duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;