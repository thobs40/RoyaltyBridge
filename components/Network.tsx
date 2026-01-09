import React, { useState } from 'react';
import { 
  Users, Search, Mail, MessageSquare, ShieldCheck, UserPlus, 
  Star, ChevronLeft, ExternalLink, Briefcase, Award, 
  TrendingUp, Calendar, Zap, Music, Globe, ArrowRight, Loader2,
  MoreVertical, Share2, Link as LinkIcon, Database, CheckCircle,
  BarChart3
} from 'lucide-react';
import { MOCK_ROYALTIES } from '../constants';
import { getContactBio } from '../services/geminiService';

interface Contact {
  name: string;
  role: string;
  works: number;
  rating: number;
  status: string;
}

const Network: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [aiBio, setAiBio] = useState<string>('');
  const [loadingBio, setLoadingBio] = useState(false);

  const contacts: Contact[] = [
    { name: 'Sarah Writer', role: 'Songwriter', works: 12, rating: 4.9, status: 'Verified' },
    { name: 'Mike Mix', role: 'Engineer', works: 8, rating: 4.8, status: 'Verified' },
    { name: 'Luna Vocalist', role: 'Artist', works: 4, rating: 5.0, status: 'Verified' },
    { name: 'David Label', role: 'Publisher', works: 24, rating: 4.7, status: 'Verified' },
  ];

  const handleViewProfile = async (contact: Contact) => {
    setSelectedContact(contact);
    setLoadingBio(true);
    // Fetch a personalized professional bio from Gemini
    const bio = await getContactBio(contact.name, contact.role, contact.works);
    setAiBio(bio || '');
    setLoadingBio(false);
  };

  const handleBack = () => {
    setSelectedContact(null);
    setAiBio('');
  };

  if (selectedContact) {
    return (
      <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-700 max-w-[1400px] mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-10">
          <button 
            onClick={handleBack}
            className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group"
          >
            <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-violet-600/20 transition-colors border border-white/5">
              <ChevronLeft size={20} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Return to Registry</span>
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 border border-white/5 transition-all">
              <Share2 size={18} />
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 border border-white/5 transition-all">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Column 1: Identity & Vital Stats */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-10 rounded-[3.5rem] border border-white/10 relative overflow-hidden flex flex-col items-center text-center bg-white/[0.01]">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-600 via-blue-500 to-violet-600" />
              
              {/* Profile Avatar */}
              <div className="relative mb-8 group/avatar">
                <div className="absolute inset-0 bg-violet-600/20 blur-3xl rounded-full scale-150 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                <div className="relative w-40 h-40 rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-white/5 flex items-center justify-center text-5xl font-black text-white shadow-2xl overflow-hidden group-hover/avatar:scale-[1.02] transition-transform duration-500">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl border-4 border-[#0a0f1e] flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck size={20} />
                </div>
              </div>

              <h3 className="text-4xl font-black text-white mb-2 tracking-tight">{selectedContact.name}</h3>
              <p className="text-sm font-black text-violet-400 uppercase tracking-[0.3em] mb-6">{selectedContact.role}</p>
              
              <div className="w-full h-px bg-white/5 mb-8" />

              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                <div className="text-left p-5 rounded-3xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Shares</p>
                  <p className="text-xl font-black text-white">{selectedContact.works} Works</p>
                </div>
                <div className="text-left p-5 rounded-3xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Trust Rating</p>
                  <div className="flex items-center gap-1.5 text-xl font-black text-amber-400">
                    <Star size={18} fill="currentColor" /> {selectedContact.rating}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <button className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-violet-600/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                  <MessageSquare size={18} />
                  Message
                </button>
                <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                  <UserPlus size={18} />
                  New Registration
                </button>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="glass p-8 rounded-[3rem] border border-white/5 bg-white/[0.01]">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <BarChart3 size={16} className="text-blue-400" />
                Collaboration Health
              </h4>
              <div className="space-y-8">
                {[
                  { label: 'Admin Precision', val: '99.9%', color: 'emerald' },
                  { label: 'Settlement Speed', val: '1.2 Days', color: 'blue' },
                  { label: 'Global Ranking', val: 'Top 5%', color: 'violet' }
                ].map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-slate-500">{m.label}</span>
                      <span className={`text-xs font-black text-${m.color}-400`}>{m.val}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r from-violet-600 to-blue-500 rounded-full w-[95%]`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Deep Dive & Portfolio */}
          <div className="lg:col-span-8 space-y-8">
            {/* AI Insights Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-[3rem] blur-xl opacity-40 group-hover:opacity-100 transition duration-1000" />
              <div className="relative glass p-10 rounded-[3rem] border border-violet-500/30 bg-[#0a0f1e]/60 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-violet-600/5 group-hover:scale-110 transition-transform duration-1000">
                  <Award size={180} />
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center text-violet-400">
                    <Zap size={24} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-violet-400 uppercase tracking-[0.4em]">AI Professional Endorsement</h4>
                    <p className="text-xs text-slate-500 font-bold tracking-wider">Analysis powered by MiRoy Gemini Core</p>
                  </div>
                </div>

                {loadingBio ? (
                  <div className="flex items-center gap-4 py-6">
                    <Loader2 size={24} className="animate-spin text-violet-500" />
                    <p className="text-slate-400 font-medium italic animate-pulse">Generating professional audit...</p>
                  </div>
                ) : (
                  <p className="text-2xl text-white font-medium leading-relaxed italic animate-in fade-in slide-in-from-left-2 duration-1000 pr-10">
                    "{aiBio}"
                  </p>
                )}
                
                <div className="mt-10 pt-10 border-t border-white/5 flex flex-wrap gap-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Work History</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-blue-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global ISRC Registered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shared Work Ledger */}
            <div className="glass p-10 rounded-[3.5rem] border border-white/5 bg-white/[0.01]">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h4 className="text-3xl font-black text-white tracking-tighter">Shared Portfolio</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Joint intellectual property assets</p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black text-violet-400 hover:text-violet-300 transition-all uppercase tracking-widest">
                  View Full Audit Ledger <ExternalLink size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_ROYALTIES.slice(0, 4).map((work, idx) => (
                  <div key={idx} className="group/work glass p-6 rounded-[2.5rem] border border-white/5 hover:border-violet-500/20 hover:bg-violet-600/[0.02] transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 group-hover/work:text-violet-400 transition-all duration-500">
                        <Music size={28} />
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Activity</p>
                        <p className="text-[11px] font-black text-emerald-400">+2.4k Plays</p>
                      </div>
                    </div>
                    <h5 className="text-xl font-black text-white mb-2 group-hover/work:text-violet-400 transition-colors">{work.title}</h5>
                    <div className="flex items-center gap-2 mb-6">
                      <Database size={14} className="text-slate-600" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{work.cmo} Vault Indexed</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         Audit Status: Distributed
                      </div>
                      <ArrowRight size={18} className="text-slate-700 group-hover/work:text-white group-hover/work:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-6 border-2 border-dashed border-white/10 rounded-[2.5rem] text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/[0.01] transition-all flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-[0.4em]">
                Explore Full History
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter">My Network</h2>
          <p className="text-slate-400 font-medium text-lg">Collaborate and manage shares with verified professionals.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group hidden md:block">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or role..."
              className="bg-white/5 border border-white/10 rounded-2xl pl-14 pr-8 py-4 text-white focus:outline-none focus:border-violet-500/50 transition-all w-80 font-medium"
            />
          </div>
          <button className="bg-violet-600 hover:bg-violet-500 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-violet-600/30 flex items-center gap-3 transition-all active:scale-95 border border-violet-500/20 text-sm">
            <UserPlus size={20} />
            Invite Partner
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contacts.map((contact, i) => (
          <div key={i} className="glass p-10 rounded-[3.5rem] border border-white/5 hover:border-violet-500/30 transition-all group relative overflow-hidden flex flex-col bg-white/[0.01]">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 group-hover:bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-700" />
            
            <div className="flex items-start justify-between mb-10">
               <div className="flex gap-6 items-center">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-3xl font-black text-white shadow-2xl group-hover:scale-105 transition-all duration-700">
                     {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                     <h4 className="text-2xl font-black text-white mb-1 group-hover:text-violet-400 transition-colors">{contact.name}</h4>
                     <p className="text-xs font-black text-violet-400 uppercase tracking-widest">{contact.role}</p>
                     <div className="flex items-center gap-2 mt-4 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-full w-fit">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        <span className="text-[9px] font-black text-emerald-400/80 uppercase tracking-widest">{contact.status}</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 mb-10">
               <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/5 flex flex-col justify-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Shared Catalog</p>
                  <p className="text-2xl font-black text-white tracking-tight">{contact.works} Works</p>
               </div>
               <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/5 flex flex-col justify-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Trust Score</p>
                  <div className="flex items-center gap-1.5 text-amber-400 font-black text-2xl tracking-tight">
                    <Star size={20} fill="currentColor" /> {contact.rating}
                  </div>
               </div>
            </div>

            <div className="flex gap-4">
               <button 
                onClick={() => handleViewProfile(contact)}
                className="flex-[3] py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-[11px] font-black text-white border border-white/10 transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
               >
                  View Profile
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
               </button>
               <button className="flex-1 py-5 bg-white/5 hover:bg-violet-600/20 rounded-2xl text-slate-400 hover:text-violet-400 border border-white/10 transition-all flex items-center justify-center active:scale-95">
                  <Mail size={20} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Network;