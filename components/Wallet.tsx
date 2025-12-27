
import React, { useState } from 'react';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRight, 
  History, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  Download 
} from 'lucide-react';
import { Transaction } from '../types';
import WithdrawModal from './WithdrawModal';

interface WalletProps {
  transactions: Transaction[];
  onWithdraw: (t: Transaction) => void;
}

const Wallet: React.FC<WalletProps> = ({ transactions, onWithdraw }) => {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const balance = transactions.reduce((acc, t) => {
    return t.type === 'CREDIT' ? acc + t.amount : acc - t.amount;
  }, 0);

  const pendingBalance = 1450.20; // Mock pending balance

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto min-w-0">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Digital Wallet</h2>
          <p className="text-slate-400 font-medium">Securely manage your royalty funds and withdraw to your accounts.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black text-white transition-all flex items-center gap-2">
            <Download size={18} /> Export Statements
          </button>
          <button 
            onClick={() => setIsWithdrawModalOpen(true)}
            className="bg-violet-600 hover:bg-violet-500 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-violet-600/30 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            <ArrowDownRight size={20} /> Withdraw Funds
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Main Balance Card */}
        <div className="lg:col-span-2 relative overflow-hidden glass p-10 rounded-[3rem] border border-white/5 bg-gradient-to-br from-violet-600/10 via-slate-900 to-slate-900">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <WalletIcon size={180} />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black text-violet-400 uppercase tracking-widest">Available Balance</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>
                <h3 className="text-6xl font-black text-white tracking-tighter mb-4">
                  ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
              <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <ShieldCheck size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase">Vault Status</p>
                    <p className="text-white text-xs font-bold uppercase tracking-wider">Encrypted</p>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mt-16 pt-10 border-t border-white/5">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Pending Clearances</p>
                <p className="text-2xl font-black text-amber-400 tracking-tight">+ ${pendingBalance.toFixed(2)}</p>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">Estimated arrival: 48-72 hours</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Total Withdrawn (YTD)</p>
                <p className="text-2xl font-black text-white tracking-tight">$3,500.00</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-emerald-400 font-bold">2.4% Fees Saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods / Shortcuts */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border border-white/5">
             <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center justify-between">
                Linked Methods
                <button className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors">Manage</button>
             </h4>
             <div className="space-y-4">
                {[
                  { name: 'Chase Bank (...4291)', type: 'Bank Account', primary: true },
                  { name: 'alex@prod.me', type: 'PayPal', primary: false }
                ].map((method, i) => (
                  <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${method.primary ? 'bg-violet-600/5 border-violet-500/20' : 'bg-white/5 border-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${method.primary ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-500'}`}>
                        {method.type === 'Bank Account' ? <CreditCard size={16} /> : <WalletIcon size={16} />}
                      </div>
                      <div>
                        <p className="text-xs font-black text-white">{method.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">{method.type}</p>
                      </div>
                    </div>
                    {method.primary && <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>}
                  </div>
                ))}
                <button className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-violet-500/30 hover:text-white transition-all">
                  + Add New Method
                </button>
             </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-blue-600/5 to-transparent">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                   <Lock size={18} />
                </div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">Payout Settings</h4>
             </div>
             <p className="text-xs text-slate-500 font-medium leading-relaxed">
               Automatic payouts are currently <span className="text-emerald-400 font-bold uppercase tracking-wider ml-1">Enabled</span> for balances over $100.
             </p>
             <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black text-white transition-all uppercase tracking-widest">
               Configure Auto-Payout
             </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-white/10 flex justify-between items-center bg-white/[0.01]">
          <div>
            <h4 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
               <History size={24} className="text-slate-400" />
               Transaction Ledger
            </h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Full audit of all credits and debits</p>
          </div>
          <div className="flex gap-4">
             <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                {['All', 'Payouts', 'Earnings'].map(f => (
                  <button key={f} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${f === 'All' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>
                    {f}
                  </button>
                ))}
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-white/[0.02] text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                    <th className="px-10 py-5">Activity Details</th>
                    <th className="px-10 py-5">Date</th>
                    <th className="px-10 py-5">Status</th>
                    <th className="px-10 py-5 text-right">Amount</th>
                    <th className="px-10 py-5 w-10"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {transactions.map((tx) => (
                    <tr key={tx.id} className="group hover:bg-white/[0.03] transition-colors">
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${tx.type === 'CREDIT' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                {tx.type === 'CREDIT' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                             </div>
                             <div>
                                <p className="text-white font-black text-lg leading-none mb-1">{tx.description}</p>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                   {tx.type === 'CREDIT' ? 'Royalty Deposit' : `Payout via ${tx.method}`}
                                </p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-6 text-slate-400 text-sm font-bold">{tx.date}</td>
                       <td className="px-10 py-6">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                             tx.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' : 'bg-amber-500/10 text-amber-400 border-amber-500/10'
                          }`}>
                             {tx.status}
                          </div>
                       </td>
                       <td className={`px-10 py-6 text-right font-black text-xl tabular-nums ${tx.type === 'CREDIT' ? 'text-emerald-400' : 'text-white'}`}>
                          {tx.type === 'CREDIT' ? '+' : '-'} ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                       </td>
                       <td className="px-10 py-6 text-slate-600">
                          <ChevronRight size={20} className="group-hover:text-white transition-colors cursor-pointer" />
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)} 
        currentBalance={balance}
        onSuccess={onWithdraw}
      />
    </div>
  );
};

export default Wallet;
