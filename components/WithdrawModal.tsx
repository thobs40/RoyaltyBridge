
import React, { useState } from 'react';
import { X, ArrowDownRight, CreditCard, Wallet as WalletIcon, ShieldCheck, Loader2, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { Transaction } from '../types';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSuccess: (t: Transaction) => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, currentBalance, onSuccess }) => {
  const [amount, setAmount] = useState<string>('');
  const [method, setMethod] = useState<'BANK' | 'PAYPAL' | 'WIRE'>('BANK');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleWithdraw = async () => {
    setLoading(true);
    // Simulate payment gateway delay
    await new Promise(r => setTimeout(r, 2000));
    
    const newTx: Transaction = {
      id: `tx-${Math.random().toString(36).substr(2, 9)}`,
      type: 'DEBIT',
      amount: parseFloat(amount),
      description: `Payout to ${method === 'BANK' ? 'Chase Bank (...4291)' : method === 'PAYPAL' ? 'PayPal (alex@prod.me)' : 'Wire Transfer'}`,
      date: new Date().toISOString().split('T')[0],
      status: 'COMPLETED',
      method: method === 'BANK' ? 'Bank Transfer' : method === 'PAYPAL' ? 'PayPal' : 'Wire Transfer'
    };

    onSuccess(newTx);
    setLoading(false);
    setStep(2);
  };

  const isInvalid = !amount || parseFloat(amount) <= 0 || parseFloat(amount) > currentBalance;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        
        {/* Header */}
        <div className="p-8 border-b border-white/5 bg-white/5 relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400">
                  <ArrowDownRight size={24} />
               </div>
               <h3 className="text-2xl font-black text-white tracking-tight">Withdraw Funds</h3>
            </div>
            <button onClick={onClose} className="p-2.5 hover:bg-white/10 rounded-2xl transition-all text-slate-500 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 1 ? (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              {/* Balance Summary */}
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available Balance</span>
                 <span className="text-xl font-black text-white">${currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              {/* Amount Input */}
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-slate-900 px-2 text-[10px] font-black text-violet-400 uppercase tracking-tighter z-10">Amount to Withdraw</label>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-black text-2xl group-focus-within:text-violet-500 transition-colors">$</div>
                <input 
                  type="number" 
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-6 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-black text-3xl placeholder:text-slate-800"
                />
                {parseFloat(amount) > currentBalance && (
                  <p className="mt-2 text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ml-2">
                    <AlertTriangle size={12} /> Insufficient Balance
                  </p>
                )}
              </div>

              {/* Method Selection */}
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Destination</label>
                 <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'BANK', label: 'Chase Bank (...4291)', icon: <CreditCard size={18} />, type: 'Standard Payout' },
                      { id: 'PAYPAL', label: 'PayPal (alex@prod.me)', icon: <WalletIcon size={18} />, type: 'Instant Transfer' },
                    ].map(m => (
                      <button 
                        key={m.id}
                        onClick={() => setMethod(m.id as any)}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all text-left group ${method === m.id ? 'bg-violet-600/10 border-violet-500/40 ring-4 ring-violet-500/5' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                      >
                         <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method === m.id ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-500'}`}>
                               {m.icon}
                            </div>
                            <div>
                               <p className={`text-sm font-black ${method === m.id ? 'text-white' : 'text-slate-400'}`}>{m.label}</p>
                               <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{m.type}</p>
                            </div>
                         </div>
                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === m.id ? 'border-violet-500 bg-violet-500' : 'border-slate-800'}`}>
                            {method === m.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                         </div>
                      </button>
                    ))}
                 </div>
              </div>

              <button 
                onClick={handleWithdraw}
                disabled={loading || isInvalid}
                className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden active:scale-[0.98] ${
                  !isInvalid ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-violet-600/30 hover:shadow-violet-600/50' : 'bg-white/5 text-slate-700 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Confirm Withdrawal
                    <ShieldCheck size={18} />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-8 animate-in zoom-in-95 duration-500 flex flex-col items-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[40px] rounded-full animate-pulse" />
                <div className="relative z-10 w-24 h-24 rounded-full bg-emerald-500/10 border-4 border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-2xl">
                  <CheckCircle2 size={48} className="animate-in zoom-in duration-500 delay-200" />
                </div>
              </div>
              <h4 className="text-3xl font-black text-white mb-3 tracking-tight">Processing Payout</h4>
              <p className="text-slate-400 font-medium mb-10 max-w-xs mx-auto leading-relaxed">
                <span className="text-white font-black">${parseFloat(amount).toLocaleString()}</span> has been sent to your chosen destination. You'll see it reflected in your balance soon.
              </p>
              
              <div className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl text-left mb-10">
                 <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Transaction ID</p>
                    <p className="text-white font-mono text-xs">#MIR-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                 </div>
                 <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Est. Completion</p>
                    <p className="text-emerald-400 font-bold text-xs uppercase">Instant Transfer</p>
                 </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Done <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Info Footer */}
        {step === 1 && (
          <div className="p-6 bg-slate-950/40 border-t border-white/5 text-center">
             <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                <ShieldCheck size={12} className="text-violet-500" /> Secure Payout Processed via MiRoy Vault
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawModal;
