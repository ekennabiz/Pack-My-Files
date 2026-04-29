/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Package,
  ShieldCheck,
  Zap,
  Archive,
  RefreshCcw,
  Plus,
  Box,
  Layout,
  Menu,
  X,
  Star,
  Cloud,
  HardDrive,
  Cpu,
  Lock
} from 'lucide-react';

// --- Branding Components ---
const Logo = ({ size = "md", showSubtext = true }: { size?: "sm" | "md" | "lg", showSubtext?: boolean }) => {
  const containerSize = size === "sm" ? "w-10 h-10" : size === "md" ? "w-12 h-12" : "w-14 h-14";
  const iconScale = size === "sm" ? "scale-75" : size === "md" ? "scale-90" : "scale-100";
  const titleSize = size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : "text-3xl";

  return (
    <div className="flex items-center gap-3 group">
      {/* 3D Isometric Crate Icon */}
      <div className={`${containerSize} relative flex items-center justify-center ${iconScale} transition-transform duration-500 group-hover:scale-105`}>
        {/* Shadow Casting */}
        <div className="absolute inset-0 bg-brand-navy/20 rounded-xl translate-x-1 translate-y-1 blur-sm"></div>
        
        {/* The Crate Body */}
        <div className="absolute inset-0 bg-[#0F172A] rounded-xl border border-slate-700 shadow-industrial flex flex-col items-center justify-start overflow-hidden">
          {/* Top Lip / Depth Ring */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 opacity-50"></div>
          
          {/* Side Handle Detail */}
          <div className="absolute left-1 top-1/2 -translate-y-1/2 h-3.5 w-1 bg-black/40 rounded-full"></div>

          {/* Interior: The Packed Folders */}
          <div className="relative mt-1 px-1.5 pt-1.5 flex justify-center items-end gap-0.5 h-6 overflow-hidden">
            {/* Back Folders */}
            <div className="w-1.5 h-4 bg-[#1E293B] border-t border-l border-brand-green/20 rounded-t-[1px] rotate-[-5deg]"></div>
            <div className="w-1.5 h-5 bg-brand-navy border-t border-l border-brand-green/50 rounded-t-[1px] shadow-lg -translate-x-0.5"></div>
            {/* Front White Document */}
            <div className="w-2.5 h-4.5 bg-white rounded-t-[1px] rotate-[3deg] shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-[1px] bg-slate-200 mb-1"></div>
            </div>
          </div>

          {/* The Neon Green Cloud Logo (Embossed on Front) */}
          <div className="mt-auto mb-1.5 relative flex items-center justify-center">
            {/* Outer Glow */}
            <div className="absolute inset-0 scale-150 blur-md bg-brand-green/20 rounded-full"></div>
            <div className="relative">
              <Cloud className="w-5 h-5 text-brand-green drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col -space-y-1">
        <div className={`font-black tracking-tighter flex items-center ${titleSize}`}>
          <span className="text-brand-navy">Pack</span>
          <span className="text-brand-green ml-1.5">My</span>
          <span className="text-brand-navy ml-1.5">Files</span>
        </div>
        {showSubtext && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] leading-none">Pure Web Storage.</span>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white text-brand-navy font-sans selection:bg-brand-green/10 selection:text-brand-green">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" />
            
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-sm font-semibold text-slate-500 hover:text-brand-green transition-colors">Features</a>
              <a href="#use-cases" className="text-sm font-semibold text-slate-500 hover:text-brand-green transition-colors">Use Cases</a>
              <a href="#pricing" className="text-sm font-semibold text-slate-500 hover:text-brand-green transition-colors">Pricing</a>
              <button className="text-sm font-semibold text-slate-900 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">Log In</button>
              <button className="bg-brand-green text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-green/90 transition-all shadow-industrial">
                Start Packing
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl">
            <a href="#features" className="block px-3 py-3 rounded-md text-base font-semibold text-slate-900 hover:bg-slate-50">Features</a>
            <a href="#use-cases" className="block px-3 py-3 rounded-md text-base font-semibold text-slate-900 hover:bg-slate-50">Use Cases</a>
            <a href="#pricing" className="block px-3 py-3 rounded-md text-base font-semibold text-slate-900 hover:bg-slate-50">Pricing</a>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button className="w-full py-3 text-base font-semibold text-slate-900 bg-slate-50 rounded-lg">Log In</button>
              <button className="w-full bg-brand-green text-white py-3 rounded-lg text-base font-bold shadow-industrial">Start Packing Free</button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* 1. Hero Section */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-40 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 mb-8 uppercase tracking-widest"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Digital Offloading
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-8xl font-black tracking-tight text-brand-navy mb-6 max-w-5xl mx-auto leading-[0.95]"
            >
              Your Digital Attic. <br />
              <span className="text-brand-green">Pack It. Save It.</span> Done.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl font-medium text-slate-500 mb-10 max-w-2xl mx-auto"
            >
              Pure web storage. No document editing, no unnecessary bloat. Just a secure, stable home for the files you need to keep, but don't need right now.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <button className="w-full sm:w-auto px-10 py-5 bg-brand-green text-white rounded-lg font-bold text-lg hover:bg-brand-green/90 transition-all shadow-industrial flex items-center justify-center gap-3">
                Start Packing Free <ArrowRight className="w-6 h-6" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-brand-navy border-2 border-slate-200 rounded-lg font-bold text-lg hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center">
                How it Works
              </button>
            </motion.div>

            {/* Crate Interface Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mx-auto max-w-5xl bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-crate"
            >
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row h-[500px]">
                {/* Sidebar */}
                <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-6 hidden md:flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-slate-900 font-bold uppercase text-xs tracking-widest mb-4">
                    <Box className="w-4 h-4" /> Your Crates
                  </div>
                  <div className="space-y-2">
                    <div className="bg-brand-green text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2">
                      <Archive className="w-4 h-4" /> 2024 Archive
                    </div>
                    <div className="text-slate-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-200/50 transition-colors cursor-pointer flex items-center gap-2">
                      <Package className="w-4 h-4" /> Assets v2
                    </div>
                    <div className="text-slate-500 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-200/50 transition-colors cursor-pointer flex items-center gap-2">
                      <HardDrive className="w-4 h-4" /> RAW Backups
                    </div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2 uppercase">
                      <span>Storage Use</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-[42%] h-full bg-brand-green"></div>
                    </div>
                  </div>
                </div>

                {/* Main Area: The Drop Zone */}
                <div className="flex-1 p-8 flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black tracking-tight">Digital Vault</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-industrial">
                      <Plus className="w-4 h-4" /> Create Crate
                    </button>
                  </div>
                  
                  <div className="flex-1 border-4 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-10 hover:border-brand-green/30 hover:bg-slate-50 transition-all group cursor-pointer">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-industrial">
                      <Package className="w-10 h-10 text-slate-400 group-hover:text-brand-green transition-colors" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Drop files into the Crate</h4>
                    <p className="text-slate-400 font-medium">Or click to select files from your hardware</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <div className="px-3 py-1 bg-slate-100 rounded border border-slate-200 text-xs font-bold text-slate-400">PDF</div>
                      <div className="px-3 py-1 bg-slate-100 rounded border border-slate-200 text-xs font-bold text-slate-400">MP4</div>
                      <div className="px-3 py-1 bg-slate-100 rounded border border-slate-200 text-xs font-bold text-slate-400">RAW</div>
                      <div className="px-3 py-1 bg-slate-100 rounded border border-slate-200 text-xs font-bold text-slate-400">PSD</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Features Section */}
        <section id="features" className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-8 tracking-tighter leading-tight">
                    Pure Archiving. <br />
                    No Messy Metadata.
                  </h2>
                  <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                    We don't try to open your spreadsheets or preview your PSDs. We store them exactly as they were created, preserving integrity and security for long-term survival.
                  </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    { icon: <Archive />, title: "Static Freezing", desc: "Files are held in a read-only state until you call them back." },
                    { icon: <RefreshCcw />, title: "Fast Offloading", desc: "Clear gigabytes of local storage in a single session." },
                    { icon: <Lock />, title: "Encrypted Containers", desc: "AES-256 encryption applied at the 'crate' level." },
                    { icon: <Zap />, title: "Zero Interference", desc: "We don't scan your content. We just pack it." }
                  ].map((feat, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="p-6 bg-white rounded-xl border border-slate-200 shadow-industrial"
                    >
                      <div className="w-10 h-10 text-brand-green mb-4">{feat.icon}</div>
                      <h4 className="text-lg font-bold mb-2">{feat.title}</h4>
                      <p className="text-slate-400 text-sm font-medium">{feat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-2xl border-4 border-white shadow-crate overflow-hidden aspect-[4/5] bg-slate-900">
                  <div className="p-8 text-white h-full flex flex-col">
                    <div className="flex gap-2 mb-10">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 space-y-4 font-mono text-sm opacity-60">
                      <p className="text-brand-green">&gt;&nbsp;initializing_encryption_seq...</p>
                      <p>&gt; [OK] container_locked_aes256</p>
                      <p>&gt; [OK] cloud_sync_status: stable</p>
                      <p>&gt; [OK] original_hash_verified</p>
                      <div className="pt-4 space-y-2">
                        <div className="w-full h-2 bg-slate-800 rounded"></div>
                        <div className="w-3/4 h-2 bg-slate-800 rounded"></div>
                        <div className="w-5/6 h-2 bg-brand-green/20 rounded"></div>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-bold">Encrypted Vault</span>
                          <ShieldCheck className="text-brand-green" />
                        </div>
                        <div className="text-3xl font-black">ACTIVE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Use Cases Section */}
        <section id="use-cases" className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black tracking-tight mb-4">Storage for Selective Minds</h2>
              <p className="text-slate-500 font-medium text-lg">Four ways the world packs their files today.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Digital Archivists", 
                  desc: "Keep life's milestones and captured memories safe without cluttering your phone's photo library.",
                  color: "bg-emerald-50", 
                  icon: <Package className="text-emerald-600" /> 
                },
                { 
                  title: "Creative Techs", 
                  desc: "Store raw video footage, massive 3D renders, and finalized project crates securely off-site.",
                  color: "bg-slate-50", 
                  icon: <Cpu className="text-slate-900" /> 
                },
                { 
                  title: "Digital Minimalists", 
                  desc: "Clear your desktop. Clear your mind. Only keep what you're working on today locally.",
                  color: "bg-brand-navy", 
                  icon: <Layout className="text-brand-green" /> 
                },
                { 
                  title: "Global Studios", 
                  desc: "Managed backup sets and static assets for teams that prioritize stability and speed.",
                  color: "bg-slate-100", 
                  icon: <HardDrive className="text-brand-navy" /> 
                }
              ].map((useCase, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className={`${useCase.color} ${useCase.color === 'bg-brand-navy' ? 'text-white' : 'text-brand-navy'} p-10 rounded-2xl border border-slate-200/50 shadow-industrial flex flex-col`}
                >
                  <div className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center p-3 mb-6 shadow-sm border border-slate-200`}>
                    {useCase.icon}
                  </div>
                  <h4 className="text-xl font-black mb-4 tracking-tight">{useCase.title}</h4>
                  <p className={`${useCase.color === 'bg-brand-navy' ? 'text-slate-400' : 'text-slate-600'} font-medium text-sm leading-relaxed`}>{useCase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Pricing Section */}
        <section id="pricing" className="py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 tracking-tight">Capacity for Everyone</h2>
              <p className="text-slate-500 font-medium">No hidden fees. Pay only for the crates you occupy.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Backpack */}
              <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-industrial flex flex-col">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6">The Backpack</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black">$0</span>
                  <span className="text-slate-400 font-bold">forever</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {['5GB Storage Crate', 'AES-256 Encryption', 'Mobile Access', 'Direct Download'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm leading-none">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" /> {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-lg font-black bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 transition-colors">Start Free</button>
              </div>

              {/* Container - Featured */}
              <div className="bg-brand-navy p-10 rounded-2xl border-4 border-brand-green shadow-crate flex flex-col relative transform lg:-translate-y-4 scale-105 z-10 text-white">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.1em]">Best Value</div>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-6 font-mono">The Container</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-6xl font-black">$12</span>
                  <span className="text-slate-500 font-bold">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {['500GB Storage Space', 'Multi-Crate Management', 'Priority Upload Lane', 'API Access', '24/7 Security Audit'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 font-bold text-sm leading-none">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" /> {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-lg font-black bg-brand-green text-white hover:bg-brand-green/90 transition-all shadow-industrial text-lg">Select Container</button>
              </div>

              {/* Warehouse */}
              <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-industrial flex flex-col">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6">The Warehouse</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black">$45</span>
                  <span className="text-slate-400 font-bold">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {['5TB Storage Capacity', 'Team Crate Sharing', 'Custom Retention Rules', 'Unlimited API Keys', 'SLA Guarantee'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm leading-none">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" /> {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-lg font-black bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 transition-colors">Start Storing</button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Testimonials Section */}
        <section id="testimonials" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Stability Reports</div>
            
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { 
                  quote: "I don't need another Google Drive. I need a place where my raw files just sit and wait for me. This is exactly that.",
                  author: "Markus V.",
                  role: "Indie Cinematographer"
                },
                { 
                  quote: "The interface feels like quality hardware. It's stable, fast, and does one thing perfectly: it packs my files.",
                  author: "Julianne S.",
                  role: "Studio Director"
                },
                { 
                  quote: "Finally, a storage solution that doesn't try to be a word processor. Pure, clean, industrial-grade web storage.",
                  author: "Leo Knight",
                  role: "Lead Developer"
                }
              ].map((t, idx) => (
                <div key={idx} className="relative">
                  <div className="flex gap-1 mb-6 text-brand-green">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-lg font-bold text-slate-900 mb-6 italic leading-relaxed">"{t.quote}"</p>
                  <div className="font-bold uppercase tracking-widest text-xs text-slate-400">{t.author} — {t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Final CTA Section */}
        <section className="py-24 bg-brand-navy relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(var(--color-brand-green)_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
              Clear the clutter. <br />
              <span className="text-brand-green">Start packing today.</span>
            </h2>
            <p className="text-xl text-slate-400 font-bold mb-12">
              Join 40,000+ users offloading their digital footprint to the Attic.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="w-full sm:w-auto px-12 py-6 bg-brand-green text-white rounded-lg font-black text-2xl hover:bg-brand-green/90 transition-all shadow-industrial transform hover:scale-105">
                Get Started Now
              </button>
              <div className="flex items-center gap-6 text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
                <span>No Credit Card</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span>Setup In 2 Minutes</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <div className="mb-8">
                <Logo size="md" showSubtext={false} />
              </div>
              <p className="text-slate-400 font-bold max-w-xs mb-8">
                The web's most stable, minimal digital attic. Pack it. Save it. Done.
              </p>
              <div className="font-mono text-xs text-slate-300">SYSTEM STATUS: ALL CRATES STABLE</div>
            </div>
            
            {['Services', 'Company', 'Integrations'].map((group, gidx) => (
              <div key={gidx}>
                <h4 className="font-black text-xs uppercase tracking-[0.3em] text-slate-900 mb-8">{group}</h4>
                <ul className="space-y-4">
                  {['Crate Management', 'API Access', 'Hardware Sync', 'Archive Services'].map((link, lidx) => (
                    <li key={lidx}><a href="#" className="text-slate-400 font-bold text-sm hover:text-brand-green transition-colors tracking-tight">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              © {new Date().getFullYear()} Pack My Files Inc. 
            </p>
            <div className="flex gap-10">
              <a href="#" className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-brand-teal">Security</a>
              <a href="#" className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-brand-teal">Privacy</a>
              <a href="#" className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-brand-teal">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
