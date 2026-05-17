import React from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  Lock, 
  Users, 
  Activity,
  Network
} from "lucide-react";
import { motion } from "motion/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./lib/firebase";

export const LoginPage = () => {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 technical-grid opacity-20" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 shadow-2xl flex flex-col items-center text-center space-y-10"
      >
        <div className="space-y-4">
          <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] mx-auto flex items-center justify-center text-slate-900 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <ShieldCheck size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
              Identity Portal
            </h1>
            <p className="text-emerald-400 font-mono text-[10px] font-black uppercase tracking-[0.4em]">
              Sovereign Governance Access
            </p>
          </div>
        </div>

        <div className="w-full space-y-6">
          <p className="text-slate-400 text-sm font-medium italic leading-relaxed px-8">
            "By connecting your identity, you join a decentralized network of civic validators. Your contributions are cross-referenced across national registries in real-time."
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
              <Activity size={16} className="text-blue-400" />
              <span className="text-[9px] text-white font-bold uppercase tracking-widest leading-tight">Live Audit Participation</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
              <Network size={16} className="text-emerald-400" />
              <span className="text-[9px] text-white font-bold uppercase tracking-widest leading-tight">Peer Consensus Nodes</span>
            </div>
          </div>
        </div>

        <div className="w-full space-y-4">
          <button 
            onClick={handleSignIn}
            className="w-full py-6 bg-emerald-500 text-slate-900 rounded-2xl text-sm font-black uppercase tracking-[0.4em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95 flex items-center justify-center gap-4 group"
          >
            Connect with Google Identity
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center gap-6 opacity-30 text-white">
             <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Lock size={12} />
                AES-256
             </div>
             <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Globe size={12} />
                Public Registry
             </div>
             <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Users size={12} />
                Citizen Signed
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 w-full">
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
            Session Protocol: <span className="text-slate-300">0x8a...2fb_AUTH_STABLE</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
