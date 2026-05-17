import React from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Search,
  Bell,
  Camera,
  Shield,
  Gavel,
  MapPinned,
  ChevronRight,
  BarChart3,
  Building2,
  FileText,
  Users,
  Vote,
  Landmark,
  BookOpen,
  Layers3,
  ScanFace,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VisionPage = () => {
  const navigate = useNavigate();

  const statusCards = [
    {
      title: 'Petition Hearing',
      value: 'Scheduled in 3 days',
      icon: Gavel,
      color: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      title: 'Road Repair',
      value: 'Crew dispatched to Ol Kalou',
      icon: MapPinned,
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      title: 'County Budget Review',
      value: 'Public participation now open',
      icon: BarChart3,
      color: 'from-orange-500/20 to-amber-500/20'
    }
  ];

  const quickActions = [
    {
      title: 'Snap & Send',
      desc: 'Report roads, water, corruption, or infrastructure issues instantly.',
      icon: Camera,
      path: '/reports'
    },
    {
      title: 'Know Your Rights',
      desc: 'Understand constitutional rights and public protections.',
      icon: Shield,
      path: '/know-gov'
    },
    {
      title: 'Who Is Responsible?',
      desc: 'Find the exact office responsible for any issue.',
      icon: Building2,
      path: '/know-gov'
    },
    {
      title: 'Legal Action Center',
      desc: 'Transform citizen demands into petitions and hearings.',
      icon: FileText,
      path: '/legal-action'
    }
  ];

  const civicModules = [
    {
      title: 'Budget Intelligence',
      icon: BarChart3,
      desc: 'Track county budgets, NG-CDF, procurement, and development spending.',
      path: '/budgets'
    },
    {
      title: 'Public Project Tracking',
      icon: Layers3,
      desc: 'Monitor roads, hospitals, schools, and infrastructure progress live.',
      path: '/projects'
    },
    {
      title: 'Civic Education',
      icon: BookOpen,
      desc: 'Learn government structure, rights, and constitutional processes.',
      path: '/know-gov'
    },
    {
      title: 'Citizen Voting',
      icon: Vote,
      desc: 'Vote on priorities and community development demands.',
      path: '/priorities'
    },
    {
      title: 'Leadership Contracts',
      icon: Landmark,
      desc: 'Track promises, negotiations, and public leadership agreements.',
      path: '/contracts'
    },
    {
      title: 'Public Safety Oversight',
      icon: Shield,
      desc: 'Report misconduct and monitor accountability transparently.',
      path: '/reports'
    }
  ];

  return (
    <div className="min-h-screen bg-[#040814] text-white overflow-hidden relative pb-32">
      <div className="absolute inset-0 bg-radial-glow" />

      <main className="relative z-10 max-w-[1440px] mx-auto px-6 py-10 space-y-10">
        <section className="grid lg:grid-cols-[1.4fr,0.8fr] gap-8 items-stretch">
          <div className="rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm">
                <Sparkles className="w-4 h-4" />
                National Civic Intelligence Platform
              </div>

              <div className="space-y-5">
                <h1 className="text-6xl md:text-7xl font-black leading-[0.95] tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent max-w-4xl">
                  The citizen interface for transparent governance.
                </h1>

                <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
                  A next-generation civic operating system for public participation,
                  legal accountability, constitutional education, budget transparency,
                  and institutional oversight.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/40 p-5 flex items-center gap-4 shadow-2xl">
                <Search className="w-6 h-6 text-cyan-300" />
                <input
                  placeholder="Ask anything... Who fixes county roads?"
                  className="bg-transparent outline-none w-full text-lg placeholder:text-white/40"
                />
                <button className="px-5 py-3 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm font-medium hover:bg-cyan-400/20 transition-all">
                  AI Civic Assistant
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {statusCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ y: -6 }}
                      className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} border border-white/10 flex items-center justify-center mb-5`}>
                        <Icon className="w-7 h-7 text-cyan-200" />
                      </div>
                      <div className="text-white/50 text-sm mb-2 uppercase tracking-widest font-bold text-[10px]">{card.title}</div>
                      <div className="text-xl font-semibold leading-snug">{card.value}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-black p-8 backdrop-blur-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-cyan-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                  Quick Civic Actions
                </div>
                <h2 className="text-4xl font-black">Take Action</h2>
              </div>
              <Bell className="w-6 h-6 text-white/60" />
            </div>

            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ x: 6 }}
                    onClick={() => navigate(action.path)}
                    className="rounded-3xl border border-white/10 bg-black/30 p-5 flex items-start gap-4 cursor-pointer backdrop-blur-xl group hover:border-cyan-400/40 transition-all font-mono"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-cyan-300" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1 group-hover:text-cyan-300 transition-colors uppercase italic leading-none">{action.title}</div>
                      <div className="text-white/60 text-[10px] leading-relaxed max-w-[200px] uppercase tracking-wider">
                        {action.desc}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40 mt-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8">
          <div className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <MapPinned size={150} className="text-cyan-400" />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
              <div>
                <div className="text-cyan-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                  Snap & Send
                </div>
                <h2 className="text-5xl font-black">Geo-Reporting</h2>
              </div>
              <div className="px-4 py-2 rounded-2xl border border-green-400/20 bg-green-400/10 text-green-300 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                <MapPinned className="w-4 h-4" />
                Live GPS Protocol
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="rounded-[32px] border border-dashed border-cyan-400/30 bg-cyan-400/[0.03] min-h-[300px] flex flex-col items-center justify-center text-center p-8 group cursor-pointer hover:bg-cyan-400/5 transition-all">
                <Camera className="w-20 h-20 text-cyan-300 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <div className="text-2xl font-bold mb-3 uppercase italic">Capture Issue</div>
                <div className="text-white/60 leading-relaxed max-w-sm text-sm italic">
                  Snap potholes, corruption, or infrastructure issues for immediate audit flagging.
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'AI detects issue category',
                  'GPS auto-tags location',
                  'Responsible office ID',
                  'Citizen tracking ID',
                  'Timeline activation'
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4 flex items-center gap-4 hover:border-cyan-400/20 transition-all border-l-4 border-l-cyan-500"
                  >
                    <div className="font-bold text-xs text-white/40 font-mono">0{index + 1}</div>
                    <div className="font-bold uppercase tracking-widest text-[9px] font-mono">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-cyan-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                  Citizen Identity
                </div>
                <h2 className="text-4xl font-black">Verification</h2>
              </div>
              <ScanFace className="w-8 h-8 text-cyan-300" />
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Digital ID Verification',
                  desc: 'Biometric verification for trusted civic participation.'
                },
                {
                  title: 'Encrypted Civic Data',
                  desc: 'End-to-end encryption and secure audit trails.'
                },
                {
                  title: 'Case Tracking System',
                  desc: 'Track petitions, reports, and government responses live.'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5 group hover:border-cyan-400/20 transition-all"
                >
                  <div className="font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors uppercase italic leading-none">{item.title}</div>
                  <div className="text-white/60 text-xs leading-relaxed italic opacity-80">"{item.desc}"</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div>
            <div className="text-cyan-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
              Civic Infrastructure
            </div>
            <h2 className="text-5xl font-black">Sovereign Modules</h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {civicModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(module.path)}
                  className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl hover:border-cyan-400/40 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-cyan-400 transition-colors uppercase leading-none">{module.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed italic">
                    {module.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[42px] border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-black p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[160px] rounded-full" />
          <div className="relative z-10 max-w-5xl space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm">
              <Users className="w-4 h-4" />
              National Civic Vision
            </div>
            <h2 className="text-6xl font-black leading-[0.95] max-w-4xl tracking-tighter">
              Governance should feel understandable, transparent, and accessible.
            </h2>
            <p className="text-2xl text-white/70 leading-relaxed max-w-4xl font-light italic">
              "Citizens should be able to understand, monitor, negotiate with, and legally engage institutions through one transparent civic interface."
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 text-center">
              {[
                'Transparency',
                'Accountability',
                'Education',
                'Participation'
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 font-bold uppercase tracking-[0.2em] text-[10px] text-white/60 font-mono shadow-2xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
