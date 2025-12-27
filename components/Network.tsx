
import React from 'react';
import { Users, Search, Mail, MessageSquare, ShieldCheck, UserPlus, Star } from 'lucide-react';

const Network: React.FC = () => {
  const contacts = [
    { name: 'Sarah Writer', role: 'Songwriter', works: 12, rating: 4.9, status: 'Verified' },
    { name: 'Mike Mix', role: 'Engineer', works: 8, rating: 4.8, status: 'Verified' },
    { name: 'Luna Vocalist', role: 'Artist', works: 4, rating: 5.0, status: 'Verified' },
    { name: 'David Label', role: 'Publisher', works: 24, rating: 4.7, status: 'Verified' },
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">My Network</h2>
          <p className="text-slate-400 font-medium">Collaborate with verified professionals in the MiRoy ecosystem.</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-violet-600/30 flex items-center gap-3 transition-all active:scale-95">
          <UserPlus size={20} />
          Invite Partner
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((contact, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] border border-white/5 hover:border-violet-500/30 transition-all group">
            <div className="flex items-start justify-between mb-8">
               <div className="flex gap-6 items-center">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-2xl font-black text-white shadow-xl group-hover:scale-105 transition-transform">
                     {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                     <h4 className="text-2xl font-black text-white mb-1">{contact.name}</h4>
                     <p className="text-sm font-bold text-violet-400 uppercase tracking-widest">{contact.role}</p>
                     <div className="flex items-center gap-2 mt-2">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{contact.status} Professional</span>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col items-end gap-2">
                  <div className="flex text-amber-400 gap-0.5">
                     {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= Math.floor(contact.rating) ? "currentColor" : "none"} />)}
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{contact.works} Shared Works</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black text-white border border-white/5 transition-all flex items-center justify-center gap-2">
                  <Mail size={16} />
                  Email
               </button>
               <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black text-white border border-white/5 transition-all flex items-center justify-center gap-2">
                  <MessageSquare size={16} />
                  Chat
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Network;
