/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  Map as MapIcon, 
  AlertCircle, 
  MessageSquare, 
  ShieldCheck, 
  Search,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  MapPinned,
  CheckCircle2,
  GraduationCap,
  Gavel,
  Network,
  Zap,
  History,
  Gamepad2,
  Shield,
  Scale,
  Activity,
  Globe,
  Radio,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, db } from "./lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserProfile } from "./types";

// --- Components ---

const Sidebar = () => {
  const location = useLocation();
  
  const sections = [
    {
      title: "Intelligence",
      items: [
        { icon: LayoutDashboard, label: "Command Center", path: "/" },
        { icon: Users, label: "Demand Engine", path: "/priorities" },
        { icon: BarChart3, label: "Budget Matching", path: "/budgets" },
        { icon: Search, label: "Responsibility AI", path: "/ask-ai" },
      ]
    },
    {
      title: "Decision & Action",
      items: [
        { icon: MessageSquare, label: "Negotiation Room", path: "/negotiation" },
        { icon: Radio, label: "Live Hearings", path: "/hearings" },
        { icon: Gavel, label: "Legal Action Engine", path: "/legal-action" },
      ]
    },
    {
      title: "Tracking & Profiles",
      items: [
        { icon: User, label: "Official Profiles", path: "/profiles" },
        { icon: MapPinned, label: "Snap & Send", path: "/reports" },
        { icon: FileText, label: "Project Tracker", path: "/projects" },
        { icon: Activity, label: "Transparency Feed", path: "/feed" },
      ]
    },
    {
      title: "Civic Sovereignty",
      items: [
        { icon: GraduationCap, label: "Civic Academy", path: "/academy" },
        { icon: Scale, label: "Rights & Constitution", path: "/rights" },
        { icon: Globe, label: "System Vision", path: "/vision" },
        { icon: MapIcon, label: "Geospatial Deck", path: "/map" },
      ]
    }
  ];

  return (
    <div className="w-72 border-r border-slate-200 h-screen sticky top-0 bg-white p-4 flex flex-col gap-6 overflow-y-auto no-scrollbar hidden md:flex">
      {sections.map((section, si) => (
        <div key={si} className="space-y-2">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{section.title}</p>
          <nav className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                    isActive 
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <item.icon size={16} className={isActive ? "text-emerald-400" : "text-slate-400"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
      
      <div className="mt-auto space-y-4">
        <div className="p-4 bg-slate-900 rounded-xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
             <Activity size={48} />
          </div>
          <p className="text-[10px] opacity-60 uppercase mb-2 tracking-wider font-bold text-slate-100 relative">Regional Performance</p>
          <div className="flex items-center justify-between mb-1 relative">
            <span className="text-2xl font-bold font-mono tracking-tighter">84.2</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded tracking-tighter font-bold uppercase">Rank #3</span>
          </div>
          <p className="text-[10px] opacity-80 font-medium italic relative">"Institutional alignment at peak latency."</p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Protocol Integrity</p>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          <div className="flex flex-col gap-1">
             <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>EPOCH</span>
                <span className="text-slate-900 font-bold">42_DELTA</span>
             </div>
             <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>HASH</span>
                <span className="text-slate-900 font-bold">0x8a...3fb</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ user, onSignIn, onSignOut }: { user: UserProfile | null, onSignIn: () => void, onSignOut: () => void }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    { title: "New Audit Evidence", desc: "Ward 4 Bridge report verified by citizen nodes.", time: "2m ago", type: "system" },
    { title: "Legal Update", desc: "Petition #421 assigned to Judicial Committee.", time: "14m ago", type: "legal" },
    { title: "Contract Alert", desc: "Variance spike in road project X-12.", time: "1h ago", type: "alert" },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#0F172A] text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <ShieldCheck size={20} />
        </div>
        <h1 className="text-xl font-semibold tracking-tight uppercase flex items-center gap-2">
          CGOS <span className="font-light opacity-60 text-sm hidden sm:block">| Citizen Governance</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden xl:flex gap-4 text-[10px] font-mono bg-slate-800/30 px-4 py-2 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse glow-emerald" />
            <span className="text-emerald-400 font-bold uppercase">Live Audit Hub</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 uppercase">Sector: Regional_04</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 uppercase">Hash: 0x82f...a12</span>
        </div>

        <div className="flex items-center gap-4 pl-6 border-l border-slate-700">
           <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all relative"
              >
                 <Activity size={18} />
                 <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0F172A]" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div 
                      onClick={() => setShowNotifications(false)}
                      className="fixed inset-0 z-[60]"
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 z-[70]"
                    >
                       <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Governance Feed</h4>
                          <span className="text-[8px] bg-slate-200 px-1.5 py-0.5 rounded font-bold">3 NEW</span>
                       </div>
                       <div className="max-h-96 overflow-y-auto no-scrollbar">
                          {notifications.map((n, i) => (
                            <div key={i} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                               <div className="flex justify-between items-center mb-1">
                                  <span className={`text-[9px] font-bold uppercase tracking-widest ${n.type === 'alert' ? 'text-red-500' : 'text-emerald-500'}`}>{n.type}</span>
                                  <span className="text-[9px] text-slate-400 font-mono">{n.time}</span>
                               </div>
                               <h5 className="text-xs font-bold mb-0.5">{n.title}</h5>
                               <p className="text-[10px] text-slate-500 leading-tight italic">"{n.desc}"</p>
                            </div>
                          ))}
                       </div>
                       <button className="w-full py-3 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                          Clear Audit Log
                       </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
           </div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">{user.displayName}</p>
                <p className="text-[10px] text-emerald-400 font-bold mt-1 uppercase tracking-wider">Lvl 14 Validator</p>
              </div>
              <button 
                onClick={onSignOut} 
                className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all active:scale-95"
              >
                {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-sm text-emerald-500">{user.displayName[0]}</div>}
              </button>
            </div>
          ) : (
            <button 
              onClick={onSignIn}
              className="px-6 py-2.5 bg-emerald-500 text-slate-900 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95"
            >
              Connect Identity
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

// --- Mock Stats for Dashboard ---
const StatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { label: "Active Contracts", value: "142", trend: "+12.4%", icon: FileText, color: "emerald", trendUp: true },
      { label: "Public Demands", value: "8,421", trend: "+840 this week", icon: MessageSquare, color: "blue", trendUp: true },
      { label: "Project Fidelity", value: "92.4%", trend: "In Tolerance", icon: ShieldCheck, color: "emerald", trendUp: true },
      { label: "Fiscal Variance", value: "1.2%", trend: "Below Limit", icon: TrendingUp, color: "orange", trendUp: false },
    ].map((stat, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
      >
        <div className="flex justify-between items-start mb-3">
          <div className={`p-2 rounded-lg bg-slate-50 text-slate-600`}>
            <stat.icon size={20} />
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.trendUp ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
            {stat.trend}
          </span>
        </div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1 font-mono tracking-tight">{stat.value}</h3>
      </motion.div>
    ))}
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-4 grid grid-cols-12 gap-4 max-w-[1440px] mx-auto overflow-hidden">
      <div className="col-span-12 flex justify-between items-end pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
             <div className="w-2 h-6 bg-emerald-500 rounded-full" />
             Citizen Governance Reality Engine
          </h2>
          <p className="text-sm text-slate-500 italic mt-1 font-medium ml-5">Active node view of national commitments and civic performance matrices.</p>
        </div>
        <div className="flex gap-4 items-center">
           <div className="text-right">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Epoch Status</p>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest font-mono">Syncing_Valid_042</p>
           </div>
           <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <Activity size={20} />
           </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
        <StatsGrid />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Emergency Ticker */}
           <div className="md:col-span-3 bg-red-50 border-2 border-red-100 p-3 rounded-xl flex items-center gap-3 overflow-hidden group shadow-sm">
              <div className="p-1.5 bg-red-600 text-white rounded-lg animate-pulse shadow-lg shadow-red-500/20">
                <Zap size={14} />
              </div>
              <div className="flex-1 whitespace-nowrap overflow-hidden">
                 <motion.p 
                   initial={{ x: "100%" }}
                   animate={{ x: "-100%" }}
                   transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                   className="text-[10px] font-bold text-red-700 uppercase tracking-[0.25em]"
                 >
                   Critical Audit Alert: Sector 4 Infrastructure variance exceeds 15% threshold. Unified petition draft initiated for Ward 7. Emergency Participation Session scheduled for 18:00 UTC.
                 </motion.p>
              </div>
           </div>

           <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-8 flex flex-col relative overflow-hidden min-h-[440px]">
             <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 opacity-40 blur-3xl" />
             <div className="flex justify-between items-start mb-10 relative z-10">
               <div>
                 <h3 className="text-lg font-bold text-slate-900 tracking-tight">Fiscal-Priority Alignment Matrix</h3>
                 <p className="text-xs text-slate-500 mt-1 italic">Correlation between ward-level demands and official budgetary disbursement.</p>
               </div>
               <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-bold rounded-lg uppercase tracking-[0.2em] italic shadow-lg">NEURAL_DECK_ACTIVE</span>
             </div>

             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
               <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 h-64 flex items-center justify-center relative overflow-hidden group shadow-2xl">
                  {/* Futuristic Grid Overlay */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none technical-grid" />
                  <div className="absolute top-5 left-5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[9px] text-emerald-400 font-bold font-mono tracking-widest">
                    INTEGRITY_INDEX: 0.982
                  </div>
                  
                  <div className="relative">
                    <div className="w-44 h-44 rounded-full border-[2px] border-emerald-500/10 border-t-emerald-500 border-r-emerald-500/40 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-4xl font-bold text-white font-mono tracking-tighter text-glow">84.2</span>
                       <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.3em] font-mono">Efficiency</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-8">
                 {[
                   { label: "Infrastructure Hubs", val: "34.2B", percent: 85, color: "emerald", icon: MapPinned },
                   { label: "Medical Facilities", val: "18.1B", percent: 62, color: "blue", icon: Activity },
                   { label: "Sovereign Education", val: "2.1B", percent: 12, color: "orange", icon: GraduationCap },
                 ].map((row, i) => (
                   <div key={i} className="space-y-3 group cursor-pointer">
                     <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest items-center">
                       <span className="text-slate-400 flex items-center gap-2 group-hover:text-slate-900 transition-colors">
                         <row.icon size={12} className="opacity-40" />
                         {row.label}
                       </span>
                       <span className="text-slate-900 font-mono tracking-tighter text-sm">{row.val} KES</span>
                     </div>
                     <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner p-[1px]">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${row.percent}%` }}
                         transition={{ delay: 0.5 + (i * 0.2) }}
                         className={`h-full bg-slate-900 rounded-full transition-all shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
                       />
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>

           <div className="bg-slate-900 rounded-2xl shadow-2xl p-8 text-white flex flex-col border border-slate-800 relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                 <Shield size={120} />
              </div>
              <div className="flex justify-between items-center mb-8 relative z-10">
                 <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Oversight Stream</h3>
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse glow-emerald" />
              </div>
              <div className="space-y-4 flex-1 relative z-10">
                 {[
                   { title: "Audit Verification", meta: "WARD 42", time: "2m ago", color: "text-emerald-400" },
                   { title: "Procurement Flag", meta: "MINISTRY_X", time: "14m ago", color: "text-orange-400" },
                   { title: "Legal Filing", meta: "SUPREME_COURT", time: "1h ago", color: "text-blue-400" },
                 ].map((item, i) => (
                   <div key={i} className="p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.06] transition-all group cursor-pointer hover:border-emerald-500/30">
                      <div className="flex justify-between text-[9px] font-bold uppercase mb-2 tracking-widest">
                         <span className={item.color}>{item.meta}</span>
                         <span className="opacity-40">{item.time}</span>
                      </div>
                      <p className="text-xs font-bold group-hover:text-emerald-400 transition-colors uppercase italic leading-tight">{item.title}</p>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-4 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-slate-100 transition-all font-mono shadow-xl relative z-10">
                 Monitor Audit Feed
              </button>
           </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
        {/* Verification Status */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl relative overflow-hidden group flex-shrink-0">
           <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 opacity-40 transition-transform group-hover:scale-110" />
           <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-slate-900 text-emerald-400 rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
                 <Shield size={36} className="glow-emerald" />
              </div>
              <h3 className="text-sm font-bold mt-6 uppercase tracking-[0.2em] text-slate-900 leading-none">Citizen Validator</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest opacity-60">Level 14 • Advocate Phase</p>
           </div>
           
           <div className="mt-10 space-y-5 pt-8 border-t border-slate-50 relative z-10">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                 <span className="text-slate-400">Reputation Score</span>
                 <span className="text-emerald-600 font-mono italic">842.00</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                 <span className="text-slate-400">Ledger Contributions</span>
                 <span className="text-slate-900 font-mono">128_VALID</span>
              </div>
              <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden shadow-inner p-[1px] border border-slate-100">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "66%" }}
                   className="h-full bg-slate-900 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                 />
              </div>
           </div>
        </div>

        {/* Global News Ticker / Bulletin */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xl p-8 flex flex-col min-h-[460px] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20" />
           <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-10 border-b border-slate-50 pb-6">Governance Bulletins</h3>
           <div className="space-y-8 flex-1 overflow-auto no-scrollbar relative z-10">
              {[
                { title: "Senate Approves Open-Data Framework for CGCS", date: "May 10", desc: "Full integration of ward-level procurement logs enabled.", icon: Network, color: "emerald" },
                { title: "Court Milestone: Digital Signature Validated", date: "May 08", desc: "Public governance contracts now legally binding.", icon: Gavel, color: "blue" },
                { title: "New Module: Education Academy Now Live", date: "May 06", desc: "Master the mechanics of Article 37 simulations.", icon: GraduationCap, color: "orange" },
              ].map((news, i) => (
                <div key={i} className="flex gap-5 group cursor-pointer items-start">
                   <div className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-emerald-400 group-hover:border-slate-800 transition-all duration-300 shadow-sm`}>
                      <news.icon size={18} />
                   </div>
                   <div className="space-y-1.5 min-w-0">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest opacity-40">
                         <span>Article</span>
                         <span>{news.date}</span>
                      </div>
                      <h4 className="text-[12px] font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors uppercase italic">{news.title}</h4>
                      <p className="text-[10px] text-slate-500 font-medium italic opacity-60 leading-snug truncate">"{news.desc}"</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-10 py-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95 group flex items-center justify-center gap-3">
              Initiate Public Session <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};


import { BudgetsPage } from "./BudgetsPage";
import { PrioritiesPage } from "./PrioritiesPage";
import { ProjectsPage } from "./ProjectsPage";
import { ReportsPage } from "./EvidenceSystem";
import { ContractsPage } from "./ContractsPage";
import { AcademyPage } from "./AcademyPage";
import { KnowGovPage } from "./KnowGovPage";
import { RightsPage } from "./RightsPage";
import { LegalActionEngine as LegalActionPage } from "./LegalActionEngine";
import { SafetyPage } from "./PublicSafety";
import { SimulatorPage } from "./SimulatorPage";
import { MemoryPage } from "./MemoryPage";
import { MapPage } from "./MapPage";
import { VisionPage } from "./VisionPage";
import { NegotiationPage } from "./NegotiationPage";
import { EmergencyPage } from "./EmergencyPage";
import { ProfilesPage } from "./ProfilesPage";
import { HearingsPage } from "./HearingsPage";
import { WhoIsResponsible as ResponsibleAI } from "./WhoIsResponsible";
import { FeedPage } from "./FeedPage";
import { LoginPage } from "./LoginPage";

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setUser(userSnap.data() as UserProfile);
        } else {
          // New user
          const newUser: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || "Citizen",
            role: "citizen",
            isVerified: false,
            createdAt: new Date().toISOString(),
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  const handleSignOut = () => signOut(auth);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-6 bg-[#0F172A]">
        <div className="relative">
          <ShieldCheck className="text-emerald-500 relative z-10" size={48} />
          <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-white font-bold text-xs tracking-[0.3em] uppercase">Hydrating CGCS Core</p>
          <div className="h-1 w-48 bg-slate-800 rounded-full overflow-hidden mx-auto">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="h-full w-1/2 bg-emerald-500"
            />
          </div>
          <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest mt-4">Establishing Secure Node Connection...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Router>
      <div className="flex bg-slate-50 min-h-screen text-slate-900 font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
          <main className="flex-1 overflow-auto bg-[#F8FAFC] technical-grid">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vision" element={<VisionPage />} />
                <Route path="/budgets" element={<BudgetsPage />} />
                <Route path="/priorities" element={<PrioritiesPage />} />
                <Route path="/negotiation" element={<NegotiationPage />} />
                <Route path="/contracts" element={<ContractsPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/academy" element={<AcademyPage />} />
                <Route path="/know-gov" element={<KnowGovPage />} />
                <Route path="/rights" element={<RightsPage />} />
                <Route path="/legal-action" element={<LegalActionPage />} />
                <Route path="/safety" element={<SafetyPage />} />
                <Route path="/emergency" element={<EmergencyPage />} />
                <Route path="/simulator" element={<SimulatorPage />} />
                <Route path="/memory" element={<MemoryPage />} />
                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="/hearings" element={<HearingsPage />} />
                <Route path="/ask-ai" element={<ResponsibleAI />} />
                <Route path="/feed" element={<FeedPage />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}

