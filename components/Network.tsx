import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MessageSquare, ShieldCheck, UserPlus, 
  Star, ChevronLeft, Briefcase, Award, 
  TrendingUp, Music, ArrowRight, Loader2,
  MoreVertical, Share2, Database, CheckCircle,
  BarChart3, Headphones, ChevronDown, Layers, Plus, Sparkles,
  Quote, Send, Lock, Shield, Check
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

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

const Network: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [aiBio, setAiBio] = useState<string>('');
  const [loadingBio, setLoadingBio] = useState(false);
  const [loadingEndorsement, setLoadingEndorsement] = useState(false);
  const [aiEndorsement, setAiEndorsement] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    trust: true,
    collabs: false,
    portfolio: false
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  const contacts: Contact[] = [
    { name: 'Sarah Writer', role: 'Songwriter', works: 12, rating: 4.9, status: 'Verified' },
    { name: 'Mike Mix', role: 'Engineer', works: 8, rating: 4.8, status: 'Verified' },
    { name: 'Luna Vocalist', role: 'Artist', works: 4, rating: 5.0, status: 'Verified' },
    { name: 'David Label', role: 'Publisher', works: 24, rating: 4.7, status: 'Verified' },
  ];

  useEffect(() => {
    if (isChatting) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatting, isTyping]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleViewProfile = async (contact: Contact) => {
    setSelectedContact(contact);
    setLoadingBio(true);
    const bio = await getContactBio(contact.name, contact.role, contact.works);
    setAiBio(bio || '');
    setLoadingBio(false);
  };

  const handleBack = () => {
    if (isChatting) {
      setIsChatting(false);
    } else {
      setSelectedContact(null);
      setAiBio('');
      setAiEndorsement('');
    }
  };

  const startChat = () => {
    setIsChatting(true);
    if (messages.length === 0 && selectedContact) {
      setMessages([
        { 
          id: '1', 
          sender: 'them', 
          text: `Hi Alex! Connection established. I'm ready to review the split proposals for the upcoming project. Is the metadata verified?`, 
          timestamp: '10:30 AM',
          status: 'read'
        }
      ]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    // Simulated Message Lifecycle
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m));
    }, 600);

    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m));
      setIsTyping(true);
    }, 1500);

    // Simulated Auto-Reply
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'them',
        text: "Understood. Metadata nodes are syncing. I'll authorize the ledger entry once the transaction ID is generated.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setMessages(prev => [...prev, reply]);
    }, 4000);
  };

  if (selectedContact && isChatting) {
    return (
      <div className="p-4 lg:p-10 animate-in fade-in slide-in-from-right-4 duration-700 max-w-[1000px] mx-auto h-[calc(100vh-80px)] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group"
          >
            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-600/20 transition-colors border border-white/5">
              <ChevronLeft size={20} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Vault Profile</span>
          </button>
          <div className="hidden md:flex items-center gap-4 bg-emerald-500/5 px-6 py-2.5 rounded-2xl border border-emerald-500/10">
            <Lock size={14} className="text-emerald-500" />
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">End-to-End Encrypted Tunnel Active</span>
          </div>
        </div>

        <div className="flex-1 glass rounded-[3rem] lg:rounded-[4rem] border border-white/10 flex flex-col overflow-hidden shadow-2xl shadow-blue-900/20 bg-slate-950/40 relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          
          {/* Chat Header */}
          <div className="px-8 py-6 lg:px-12 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">
                {selectedContact.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-black text-white leading-none mb-1.5">{selectedContact.name}</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Node Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all border border-white/5 group">
                <Shield size={18} className="group-hover:text-blue-400" />
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all border border-white/5">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10 custom-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-400`}
              >
                <div className={`max-w-[75%] space-y-2 ${msg.sender === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-7 py-5 rounded-[2.2rem] text-[15px] font-medium leading-relaxed shadow-xl ${
                    msg.sender === 'me' 
                      ? 'bg-blue-600 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none border border-white/10 shadow-blue-900/40' 
                      : 'glass border border-white/10 text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-2.5 px-4 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{msg.timestamp}</p>
                    {msg.sender === 'me' && (
                      <div className="flex items-center">
                        {msg.status === 'sent' && <Check size={12} className="text-slate-700" />}
                        {msg.status === 'delivered' && (
                          <div className="relative flex">
                            <Check size={12} className="text-slate-700" />
                            <Check size={12} className="text-slate-700 -ml-2" />
                          </div>
                        )}
                        {msg.status === 'read' && (
                          <div className="relative flex">
                            <Check size={12} className="text-blue-400" />
                            <Check size={12} className="text-blue-400 -ml-2" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="glass px-8 py-5 rounded-[2rem] rounded-tl-none border border-white/10 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 lg:p-10 bg-white/[0.02] border-t border-white/5 backdrop-blur-3xl">
            <form onSubmit={handleSendMessage} className="relative group/form">
              <input 
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Secure message link..."
                className="w-full bg-slate-900/60 border border-white/10 rounded-[2.8rem] py-6 pl-10 pr-28 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-8 focus:ring-blue-500/5 transition-all shadow-inner"
              />
              <button 
                type="submit"
                disabled={!messageText.trim()}
                className="absolute right-3.5 top-3.5 bottom-3.5 w-20 bg-blue-600 hover:bg-blue-500 disabled:opacity-20 text-white rounded-[2.2rem] flex items-center justify-center transition-all active:scale-95 shadow-xl shadow-blue-600/30 group-focus-within/form:scale-105"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (selectedContact) {
    return (
      <div className="p-4 lg:p-10 animate-in fade-in slide-in-from-right-4 duration-700 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-10">
          <button 
            onClick={handleBack}
            className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group"
          >
            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-600/20 transition-colors border border-white/5">
              <ChevronLeft size={20} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Network Directory</span>
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 border border-white/5 transition-all">
              <Share2 size={18} />
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 border border-white/5 transition-all">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Fixed Profile Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-10 rounded-[4rem] border border-white/10 relative overflow-hidden flex flex-col items-center text-center bg-white/[0.01]">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
              <div className="relative mb-8 group/avatar">
                <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full scale-150 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                <div className="relative w-44 h-44 rounded-[3.5rem] bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-white/5 flex items-center justify-center text-6xl font-black text-white shadow-2xl overflow-hidden">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-emerald-500 rounded-3xl border-4 border-[#020617] flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck size={24} />
                </div>
              </div>

              <h3 className="text-4xl font-black text-white mb-2 tracking-tight">{selectedContact.name}</h3>
              <p className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] mb-8">{selectedContact.role}</p>

              <div className="flex flex-col gap-4 w-full pt-6 border-t border-white/5">
                <button 
                  onClick={startChat}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] group"
                >
                  <MessageSquare size={18} className="group-hover:scale-110 transition-transform" /> Direct Message
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[3rem] blur-xl opacity-40 group-hover:opacity-100 transition duration-1000" />
                <div className="relative glass p-8 rounded-[3rem] border border-blue-500/30 bg-[#020617]/60">
                  <div className="flex items-center gap-4 mb-6">
                    <Sparkles size={20} className="text-blue-400 animate-pulse" />
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Neural Audit</h4>
                  </div>
                  {loadingBio ? (
                    <div className="flex items-center gap-4 py-4">
                      <Loader2 size={18} className="animate-spin text-blue-500" />
                      <p className="text-slate-500 font-medium italic text-xs">Scanning registry nodes...</p>
                    </div>
                  ) : (
                    <p className="text-base text-slate-300 font-medium leading-relaxed italic">
                      "{aiBio}"
                    </p>
                  )}
                </div>
              </div>

              <div className="relative group">
                {!aiEndorsement && !loadingEndorsement ? (
                  <button 
                    onClick={async () => {
                      setLoadingEndorsement(true);
                      const endorsement = await getContactBio(selectedContact.name, selectedContact.role, selectedContact.works);
                      setAiEndorsement(endorsement || '');
                      setLoadingEndorsement(false);
                    }}
                    className="w-full py-7 glass rounded-[2.5rem] border border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10 text-violet-400 transition-all flex flex-col items-center justify-center gap-3 group/endors"
                  >
                    <Award size={28} className="group-hover/endors:scale-110 transition-transform text-violet-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Generate Verified Endorsement</span>
                  </button>
                ) : (
                  <div className="relative glass p-8 rounded-[3rem] border border-violet-500/40 bg-violet-950/20 overflow-hidden">
                    <div className="absolute -top-4 -right-4 text-violet-500/10 rotate-12">
                      <Quote size={120} />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <Award size={20} className="text-violet-400" />
                      <h4 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.4em]">Immutable Endorsement</h4>
                    </div>
                    {loadingEndorsement ? (
                      <div className="space-y-4 py-2">
                        <div className="h-3 bg-white/5 rounded-full w-full animate-pulse" />
                        <div className="h-3 bg-white/5 rounded-full w-5/6 animate-pulse" />
                      </div>
                    ) : (
                      <p className="text-sm text-slate-200 font-bold leading-relaxed mb-6 relative z-10">
                        {aiEndorsement}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Content Sections */}
          <div className="lg:col-span-8 space-y-6 pb-20">
            {/* Section 1: Ratings & Trust */}
            <div className={`glass rounded-[3rem] border border-white/5 transition-all duration-500 overflow-hidden ${expandedSections.trust ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
              <button 
                onClick={() => toggleSection('trust')}
                className="w-full px-10 py-8 flex justify-between items-center group/btn"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl transition-all duration-500 ${expandedSections.trust ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 text-slate-500'}`}>
                    <ShieldCheck size={22} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-2xl font-black text-white tracking-tight">Trust & Verification Ledger</h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Verified Credentials & Performance Ratings</p>
                  </div>
                </div>
                <div className={`transition-transform duration-500 ${expandedSections.trust ? 'rotate-180' : ''}`}>
                   <ChevronDown className="text-slate-600" />
                </div>
              </button>

              {expandedSections.trust && (
                <div className="px-10 pb-10 space-y-8 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-white/[0.03] rounded-[2rem] border border-white/5">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Trust Rating</p>
                      <div className="flex items-center gap-2 text-4xl font-black text-amber-400 tracking-tighter">
                        <Star size={28} fill="currentColor" /> {selectedContact.rating}
                      </div>
                    </div>
                    <div className="p-8 bg-white/[0.03] rounded-[2rem] border border-white/5 text-center flex flex-col items-center justify-center">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Network Status</p>
                      <div className="text-emerald-400 font-black text-sm px-6 py-2.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 inline-block uppercase tracking-[0.2em]">
                        {selectedContact.status}
                      </div>
                    </div>
                    <div className="p-8 bg-white/[0.03] rounded-[2rem] border border-white/5">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Admin Accuracy</p>
                      <div className="flex items-center gap-2 text-4xl font-black text-emerald-400 tracking-tighter">
                        <CheckCircle size={28} /> 99.9%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Collaborations */}
            <div className={`glass rounded-[3rem] border border-white/5 transition-all duration-500 overflow-hidden ${expandedSections.collabs ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
              <button 
                onClick={() => toggleSection('collabs')}
                className="w-full px-10 py-8 flex justify-between items-center group/btn"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl transition-all duration-500 ${expandedSections.collabs ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white/5 text-slate-500'}`}>
                    <Layers size={22} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-2xl font-black text-white tracking-tight">Collaborative Ecosystem</h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Shared equity history and node connections</p>
                  </div>
                </div>
                <div className={`transition-transform duration-500 ${expandedSections.collabs ? 'rotate-180' : ''}`}>
                   <ChevronDown className="text-slate-600" />
                </div>
              </button>

              {expandedSections.collabs && (
                <div className="px-10 pb-10 space-y-8 animate-in slide-in-from-top-4 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 bg-indigo-600/5 rounded-[2.5rem] border border-indigo-500/10 flex items-center justify-between">
                         <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Joint Equity</p>
                            <p className="text-4xl font-black text-white tracking-tighter">$14,204.30</p>
                         </div>
                         <TrendingUp size={40} className="text-indigo-400 opacity-20" />
                      </div>
                      <div className="p-8 bg-white/[0.03] rounded-[2.5rem] border border-white/5">
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Network Connectivity</p>
                         <div className="flex gap-3">
                            {[1, 2, 3, 4].map(i => (
                               <div key={i} className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-[11px] font-black text-slate-500 hover:text-blue-400 transition-colors cursor-help">Node_{i}</div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* Section 3: Portfolio/Works */}
            <div className={`glass rounded-[3rem] border border-white/5 transition-all duration-500 overflow-hidden ${expandedSections.portfolio ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
              <button 
                onClick={() => toggleSection('portfolio')}
                className="w-full px-10 py-8 flex justify-between items-center group/btn"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl transition-all duration-500 ${expandedSections.portfolio ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'bg-white/5 text-slate-500'}`}>
                    <BarChart3 size={22} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-2xl font-black text-white tracking-tight">Joint Asset Ledger</h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Listing of shared musical works and registration status</p>
                  </div>
                </div>
                <div className={`transition-transform duration-500 ${expandedSections.portfolio ? 'rotate-180' : ''}`}>
                   <ChevronDown className="text-slate-600" />
                </div>
              </button>

              {expandedSections.portfolio && (
                <div className="px-10 pb-10 space-y-6 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_ROYALTIES.slice(0, 4).map((work, idx) => (
                      <div key={idx} className="group/work glass p-7 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-600/[0.02] transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 group-hover/work:text-emerald-400 transition-all duration-500">
                            <Headphones size={32} />
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-lg">REGISTRY LIVE</p>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">{work.cmo} NETWORK</p>
                          </div>
                        </div>
                        <h5 className="text-2xl font-black text-white mb-3 group-hover/work:text-emerald-400 transition-colors tracking-tight">{work.title}</h5>
                        <div className="flex items-center justify-between pt-5 border-t border-white/5">
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shared Equity</span>
                           <span className="text-lg font-black text-white">50.00%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-6 border-2 border-dashed border-white/10 rounded-[2.5rem] text-slate-600 hover:text-white hover:border-emerald-500/30 transition-all text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3">
                    View Full Joint Catalog <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1400px] mx-auto">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter mb-2">Global Network</h2>
          <p className="text-slate-400 font-medium text-lg">Connect with verified rights holders and metadata nodes.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group flex-1 sm:flex-none">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search registry..." 
              className="bg-white/5 border border-white/10 rounded-[2rem] pl-14 pr-8 py-5 text-white focus:outline-none focus:border-blue-500/50 transition-all w-full sm:w-80 text-sm font-medium shadow-inner"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-4">
             <UserPlus size={20} /> Invite Node
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contacts.map((contact, i) => (
          <div key={i} className="group glass p-10 rounded-[3.5rem] border border-white/5 hover:border-blue-500/30 transition-all duration-700 relative overflow-hidden bg-white/[0.01]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 mb-8 flex items-center justify-center text-4xl font-black text-white shadow-2xl group-hover:scale-110 transition-transform duration-700 relative border-2 border-white/5">
                {contact.name.split(' ').map(n => n[0]).join('')}
                <div className="absolute -bottom-1.5 -right-1.5 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-[#020617] flex items-center justify-center text-white shadow-xl">
                  <ShieldCheck size={18} />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{contact.name}</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">{contact.role}</p>
              
              <div className="grid grid-cols-2 gap-4 w-full mb-10">
                 <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Rating</p>
                    <p className="text-white font-black flex items-center justify-center gap-1.5 text-lg">
                      <Star size={14} fill="currentColor" className="text-amber-400" /> {contact.rating}
                    </p>
                 </div>
                 <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Joint Assets</p>
                    <p className="text-white font-black text-lg">{contact.works}</p>
                 </div>
              </div>

              <button 
                onClick={() => handleViewProfile(contact)}
                className="w-full py-5 bg-white/5 hover:bg-blue-600 text-slate-400 hover:text-white border border-white/10 hover:border-blue-500/50 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
              >
                Inspect Vault
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Network;