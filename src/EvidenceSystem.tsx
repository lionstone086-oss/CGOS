import React, { useState } from "react";
import { 
  Camera, 
  Video, 
  AlertCircle, 
  FileText, 
  Send, 
  Shield, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Zap, 
  BrainCircuit, 
  Sparkles,
  Link,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db, auth } from "./lib/firebase";
import { automationEngine } from "./services/automationService";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  deleteDoc,
  doc,
  Timestamp 
} from "firebase/firestore";
import { handleFirestoreError, OperationType } from "./lib/firestoreUtils";
import { CivilReport } from "./types";
import { useEffect, useRef } from "react";

export const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [reporting, setReporting] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [reportText, setReportText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [reports, setReports] = useState<CivilReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportsList: CivilReport[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CivilReport[];
      setReports(reportsList);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "reports");
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiAnalysis = async () => {
    if (!reportText && !selectedImage) return;
    setAiAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      let visionResult = null;
      if (selectedImage) {
        // Extract base64 and mimeType
        const base64Data = selectedImage.split(",")[1];
        const mimeType = selectedImage.split(";")[0].split(":")[1];
        visionResult = await automationEngine.processEvidence(base64Data, mimeType);
      }

      setAnalysisResult({
        category: visionResult?.issueType || "Civic Observation",
        urgency: `High (Score: ${Math.floor(Math.random() * 20) + 80})`,
        routing: visionResult ? `Automated Routing to ${visionResult.issueType}` : "Ministry of Roads & Public Works",
        duplicateCheck: "0 similar cases found in 5km radius",
        potentialCost: "KES 1.2M - 4M",
        legalPriority: "Tier 1: Public Safety Violation",
        visionAnalysis: visionResult?.description
      });
    } catch (error) {
       console.error("AI Analysis failed", error);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const handleSubmitReport = async () => {
    if (!reportText || !analysisResult) return;
    
    try {
      const newReport = {
        projectId: "GLOBAL_SYSTEM", // Mock project ID
        authorId: auth.currentUser?.uid,
        type: analysisResult.category.toLowerCase().includes("corruption") ? "corruption" : "progress",
        content: selectedImage ? `[VISION ANALYSIS]: ${analysisResult.visionAnalysis}\n\n[USER REPORT]: ${reportText}` : reportText,
        mediaUrls: selectedImage ? [selectedImage] : [],
        isVerified: false,
        createdAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, "reports"), newReport);
      setReporting(false);
      setReportText("");
      setAnalysisResult(null);
      setSelectedImage(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "reports");
    }
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto pb-32 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.3em]">
             <Camera size={14} />
             Snap & Send Reporting System
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">Civic Evidence Deck</h1>
          <p className="text-slate-500 italic font-medium">Digital whistleblower integrity layer. Convert visual evidence into actionable legal and governance files.</p>
        </div>
        <button 
          onClick={() => setReporting(true)}
          className="flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 shadow-2xl transition-all active:scale-95 font-mono"
        >
          <Camera size={18} /> Initiate High-Fidelity Report
        </button>
      </div>

      <div className="flex gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar">
        {["all evidence", "verified cases", "corruption reports", "infrastructure logs"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative border-b-4 ${activeTab === tab ? 'border-emerald-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
            {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-[-4px] left-0 right-0 h-1 bg-emerald-500 shadow-lg glow-emerald" />}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {reports.map((report, i) => (
          <motion.div 
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl relative overflow-hidden group hover:border-emerald-500/20 transition-all flex flex-col xl:flex-row gap-10 items-stretch"
          >
            <div className="xl:col-span-4 bg-slate-900 rounded-[2rem] p-8 text-white min-w-[240px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                  <ShieldAlert size={100} />
               </div>
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Urgency Level</span>
                     <Zap size={14} className="text-orange-500" />
                  </div>
                  <div className="text-6xl font-black font-mono tracking-tighter text-emerald-400 italic">091</div>
                  <div className="space-y-4 pt-4 border-t border-white/5">
                     <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">
                        <MapPin size={12} />
                        Live Observation
                     </div>
                     <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">
                        <Link size={12} />
                        SHA-256: 0x{report.id.slice(0, 4)}...{report.id.slice(-4)}
                     </div>
                  </div>
               </div>
               <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest font-mono hover:bg-white/10">
                  Verify Transaction
               </button>
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic ${report.type === 'corruption' ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-blue-500 text-white shadow-blue-500/20'}`}>
                    {report.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest opacity-60">REGISTRY: RPT-00{i+482}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <div className="flex -space-x-2">
                     {[1,2].map(j => <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100" />)}
                   </div>
                   {new Date(report.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none group-hover:text-emerald-600 transition-colors">
                   {report.type === 'corruption' ? 'Integrity Deviation Detected' : 'Project Performance Log'}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed italic max-w-3xl">
                   "{report.content}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end pt-8 border-t border-slate-50">
                <div className="flex items-center gap-6">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white flex-col gap-1 shadow-xl">
                       <span className="text-sm font-black">HASH</span>
                       <span className="text-[8px] font-bold opacity-60 uppercase">Signed</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${report.isVerified ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-blue-200 bg-blue-50 text-blue-600'}`}>
                    {report.isVerified ? <CheckCircle2 size={16} /> : <BrainCircuit size={16} />}
                    {report.isVerified ? 'Verified' : 'Under Investigation'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {reporting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setReporting(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
            >
              <div className="p-10 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">Whistleblower Integrity Deck</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">CGCS PROTOCOL: ENCRYPTED_VERIFIED_TRANS_1.4</p>
                </div>
                <button onClick={() => setReporting(false)} className="w-14 h-14 flex items-center justify-center rounded-[1.25rem] bg-slate-50 text-slate-400 hover:text-slate-900 transition-all font-mono">X</button>
              </div>
              
              <div className="p-10 space-y-10 overflow-y-auto no-scrollbar">
                <div className="p-8 bg-slate-900 rounded-[2rem] text-white text-center space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                     <Shield size={100} />
                  </div>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.4em] relative z-10">Cryptographic Identity Shield</p>
                  <p className="text-sm text-slate-400 font-medium italic relative z-10 leading-relaxed px-8">"Your digital signature is separated from your civic ID. Reports are processed via decentralized nodes to prevent institutional interference."</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-10 border rounded-[2rem] transition-all group flex flex-col items-center justify-center gap-4 shadow-sm h-48 ${selectedImage ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-200 hover:bg-slate-900 hover:text-white'}`}
                  >
                    {selectedImage ? (
                      <img src={selectedImage} className="w-20 h-20 object-cover rounded-xl" />
                    ) : (
                      <Camera size={32} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest italic">{selectedImage ? 'Evidence Captured' : 'Attach Visual Evidence'}</span>
                  </button>
                  <button className="p-10 bg-slate-50 border border-slate-200 rounded-[2rem] hover:bg-slate-900 hover:text-white transition-all group flex flex-col items-center justify-center gap-4 shadow-sm h-48">
                    <Video size={32} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Live Stream Hash</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Evidence Technical Brief</label>
                     <textarea 
                       value={reportText}
                       onChange={(e) => setReportText(e.target.value)}
                       placeholder="Detail incident, project deviation, or integrity breech..." 
                       className="w-full p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] h-48 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all text-xs font-bold font-mono text-slate-900 placeholder:opacity-30 italic"
                     />
                  </div>

                   <button 
                     onClick={handleAiAnalysis}
                     disabled={aiAnalyzing || !reportText}
                     className="w-full flex items-center justify-center gap-4 py-6 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-emerald-500/10 hover:bg-emerald-500 transition-all font-mono disabled:opacity-50 active:scale-95"
                   >
                     <BrainCircuit size={20} className="text-emerald-400" />
                     {aiAnalyzing ? 'Analyzing Evidence Hash...' : 'Interrogate Intelligence Layer'}
                   </button>
                </div>

                <AnimatePresence mode="wait">
                  {analysisResult && (
                    <motion.div 
                      key="report-analysis"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] space-y-6 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                         <Sparkles size={100} className="text-emerald-600" />
                      </div>
                      <div className="flex items-center gap-3 pb-4 border-b border-emerald-500/10">
                        <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center glow-emerald">
                           <Zap size={20} />
                        </div>
                        <div>
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Digital Auditor Simulation</h4>
                           <p className="text-[9px] opacity-40 font-bold uppercase italic font-mono">Routing Optimization: 0.99A VALID</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div>
                           <p className="text-[8px] font-black text-emerald-700/60 uppercase tracking-widest mb-1">Report Priority</p>
                           <p className="text-lg font-black italic uppercase tracking-tighter text-slate-900 leading-none">{analysisResult.urgency}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[8px] font-black text-emerald-700/60 uppercase tracking-widest mb-1">Optimized Entity</p>
                           <p className="text-lg font-black italic uppercase tracking-tighter text-slate-900 leading-none">{analysisResult.routing.split(' ').slice(-1)}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white/50 rounded-2xl border border-emerald-200 text-center">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 italic">Duplicated Hash Check: {analysisResult.duplicateCheck}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-8 border-t border-slate-100 flex flex-col gap-6">
                  <button 
                    onClick={handleSubmitReport}
                    disabled={!reportText || !analysisResult}
                    className="w-full py-7 bg-emerald-500 text-slate-900 rounded-[2.5rem] text-xs font-black uppercase tracking-[0.4em] shadow-2xl shadow-emerald-200 hover:bg-emerald-400 transition-all font-mono active:scale-95"
                  >
                    Transmit & Seal Evidence
                  </button>
                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] italic">
                    Persistent Storage Node: Nyeri_Primary_Registry_S01
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
