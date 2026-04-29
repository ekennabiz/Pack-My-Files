import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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
  Lock,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Shield,
  Layers,
  Container,
  ChevronDown
} from 'lucide-react';

// --- Agency-Level Branding Components ---

const Logo3D = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const containerSize = size === "sm" ? "w-10 h-10" : size === "md" ? "w-14 h-14" : "w-20 h-20";
  
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className={`${containerSize} relative perspective-1000 transform-style-3d`}>
        {/* Animated Glow Aura */}
        <div className="absolute inset-0 bg-brand-green/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* The Isometric Crate */}
        <motion.div 
          whileHover={{ rotateX: 10, rotateY: -15, scale: 1.05 }}
          className="w-full h-full relative"
        >
          {/* Main Box Body */}
          <div className="absolute inset-0 bg-brand-navy rounded-2xl border-2 border-slate-700 shadow-2xl flex flex-col items-center justify-start overflow-hidden">
            {/* Top Gloss Highlights */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10"></div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5"></div>

            {/* Interior Layers (Files) */}
            <div className="mt-2 flex justify-center items-end gap-1 h-1/2 overflow-hidden px-2">
              <div className="w-2 h-[80%] bg-white/10 rounded-t-sm skew-x-[-10deg]"></div>
              <div className="w-2 h-[95%] bg-brand-green shadow-[0_0_15px_rgba(16,185,129,0.5)] rounded-t-sm"></div>
              <div className="w-2 h-[85%] bg-white rounded-t-sm skew-x-[10deg]"></div>
            </div>

            {/* Cloud Icon on Front Face */}
            <div className="mt-auto mb-2 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-brand-green drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" strokeWidth={2.5} />
            </div>
          </div>
          
          {/* 3D Side Shadows */}
          <div className="absolute -right-1 top-2 bottom-2 w-1 bg-black/40 rounded-r-2xl transform origin-left rotate-y-90"></div>
        </motion.div>
      </div>

      <div className="flex flex-col">
        <div className="font-black tracking-tighter leading-none flex items-baseline">
          <span className="text-3xl lg:text-4xl text-brand-navy">Pack</span>
          <span className="text-3xl lg:text-4xl text-brand-green mx-1">My</span>
          <span className="text-3xl lg:text-4xl text-brand-navy">Files</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Digital Attic</span>
          <div className="h-[1px] w-8 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

const DropZone3D = () => {
  const [dragActive, setDragActive] = useState(false);
  const [packing, setPacking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB"
      });
      
      // Log for simulation
      console.log(`[PackMyFiles] Archiving: ${file.name} (${file.size} bytes)`);
      
      // Trigger Animation Sequence
      setPacking(true);
      setTimeout(() => {
        setPacking(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }, 1500);
    }
  };

  return (
    <div 
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className="relative w-full max-w-md aspect-square flex items-center justify-center group"
    >
      {/* 3D Container Perspective */}
      <div className="relative w-64 h-64 perspective-2000 transform-style-3d">
        
        {/* Ambient Floor Glow */}
        <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-12 bg-brand-green/20 blur-2xl rounded-full transition-all duration-700 ${dragActive ? 'scale-150 opacity-100' : 'scale-100 opacity-40'}`}></div>

        {/* Floating Instructions */}
        <AnimatePresence>
          {dragActive && !packing && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: -60 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 bg-brand-green text-brand-navy font-black text-xs uppercase tracking-[0.3em] rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.5)] z-50"
            >
              Ready to Pack
            </motion.div>
          )}
        </AnimatePresence>

        {/* The 3D Crate Box */}
        <motion.div 
          animate={{ 
            rotateX: dragActive ? 15 : 10, 
            rotateY: dragActive ? -25 : -15,
            scale: dragActive ? 1.1 : 1,
            y: packing ? [0, -10, 0] : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full h-full transform-style-3d"
        >
          {/* Back Edge */}
          <div className="absolute inset-0 bg-slate-900 border-2 border-slate-700 rounded-2xl transform translate-z-neg-40"></div>
          
          {/* Bottom Face */}
          <div className="absolute inset-0 bg-slate-950/80 rounded-2xl border-2 border-slate-800 transform rotate-x-90 translate-y-1/2"></div>

          {/* Left Side */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-slate-800 border-r-2 border-slate-700 transform rotate-y-90 -translate-x-1/2"></div>
          
          {/* Right Side */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-slate-900 border-l-2 border-slate-700 transform rotate-y-90 translate-x-1/2"></div>

          {/* Interior Glow / Content */}
          <div className="absolute inset-4 rounded-xl flex items-center justify-center overflow-hidden">
             {/* Neon Green Fluid Inside */}
             <div className={`absolute inset-0 bg-brand-green/10 transition-opacity duration-500 ${dragActive ? 'opacity-40' : 'opacity-10'}`}></div>
             
             {/* Falling File Icon */}
             <AnimatePresence>
               {packing && (
                 <motion.div
                   initial={{ y: -150, opacity: 0, scale: 0.5 }}
                   animate={{ y: 0, opacity: 1, scale: 1 }}
                   exit={{ y: 50, opacity: 0 }}
                   className="relative z-20"
                 >
                   <Package className="w-16 h-16 text-brand-green drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                 </motion.div>
               )}
             </AnimatePresence>

             {/* Success Wave */}
             <AnimatePresence>
               {success && (
                 <motion.div 
                   initial={{ scale: 0, opacity: 1 }}
                   animate={{ scale: 4, opacity: 0 }}
                   className="absolute inset-0 border-4 border-brand-green rounded-full"
                 />
               )}
             </AnimatePresence>
          </div>

          {/* Lid Flaps (3D) */}
          <motion.div 
            animate={{ rotateX: (packing || success) ? 0 : -100 }}
            className={`absolute top-0 left-0 right-0 h-1/2 bg-slate-800 border-2 border-slate-700 origin-top rounded-t-2xl z-30 ${ (packing || success) ? 'shadow-2xl' : ''}`}
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-12 bg-black/40 rounded-full"></div>
          </motion.div>
          <motion.div 
            animate={{ rotateX: (packing || success) ? 0 : 100 }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-slate-900 border-2 border-slate-700 origin-bottom rounded-b-2xl z-30"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-12 bg-black/40 rounded-full"></div>
          </motion.div>

          {/* Front Face (Label) */}
          <div className="absolute inset-0 bg-brand-navy rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center transform translate-z-40 shadow-2xl">
              <div className="absolute top-4 left-4 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
              </div>
              
              <div className="text-center px-4">
                <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 transition-colors ${success ? 'text-brand-green' : 'text-slate-500'}`}>
                  {packing ? 'Archiving...' : success ? 'Vaulted ✓' : 'File Container'}
                </div>
                {success && fileInfo ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] font-mono text-slate-400 break-all max-w-[120px]">
                    {fileInfo.name}
                  </motion.div>
                ) : (
                  <div className="h-6 w-32 bg-slate-900 rounded-full mx-auto relative overflow-hidden group-hover:border-brand-green/30 border border-transparent transition-colors">
                     {packing && (
                       <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        className="h-full bg-brand-green/20"
                       />
                     )}
                     <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                       {packing ? 'Syncing' : 'Awaiting Data'}
                     </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex gap-2">
                <Cloud className={`w-6 h-6 transition-all duration-500 ${success ? 'text-brand-green scale-110' : 'text-slate-800'}`} />
              </div>
          </div>
        </motion.div>

        {/* Status Text Below */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center w-full">
           <div className={`text-sm font-black uppercase tracking-[0.5em] transition-all duration-500 ${dragActive ? 'text-brand-green scale-110' : success ? 'text-white' : 'text-slate-600'}`}>
             {dragActive ? 'Release to Pack' : success ? 'Successfully Vaulted' : 'Drop Files to Attic'}
           </div>
           {success && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-brand-green font-bold mt-2 font-mono uppercase">
               Integrity Hash: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}
             </motion.div>
           )}
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ badge, title, subtitle, centered = false }: { badge: string, title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`${centered ? 'text-center' : 'text-left'} mb-16 lg:mb-24`}>
    <motion.div 
      initial={{ opacity: 0, x: centered ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black text-brand-navy uppercase tracking-[0.25em] mb-6"
    >
      <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
      {badge}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-7xl font-black tracking-tighter text-brand-navy leading-[0.9] uppercase max-w-4xl"
    >
      {title.split(' ').map((word, i) => (
        <span key={i} className={word === i.toString() ? 'text-brand-green' : ''}>{word} </span>
      ))}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-xl font-medium text-slate-500 max-w-2xl leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = "18683562706";
  const emailAddress = "decookman1@gmail.com";

  return (
    <div className="min-h-screen bg-white text-brand-navy font-sans selection:bg-brand-green/20 selection:text-brand-green overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] glow-aura opacity-[0.05]"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] glow-aura opacity-[0.03]"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-500 ${isScrolled ? 'glass-panel rounded-2xl py-3 px-6' : 'py-0 px-0'}`}>
            <div className="flex justify-between items-center">
              <Logo3D size="sm" />
              
              <div className="hidden lg:flex items-center space-x-12">
                {['Services', 'Reviews', 'About', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-green transition-all hover:tracking-[0.3em]"
                  >
                    {item}
                  </a>
                ))}
                <div className="h-6 w-[1px] bg-slate-200"></div>
                <button className="bg-brand-navy text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-crate hover:shadow-glow transition-all hover:scale-105 active:scale-95 group">
                  <span className="flex items-center gap-2">
                    Start Packing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              <div className="lg:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 bg-slate-50 rounded-xl">
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-150 dark-glass lg:hidden flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-24">
              <Logo3D size="sm" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {['Services', 'Reviews', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-5xl font-black uppercase tracking-tighter text-white hover:text-brand-green transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <button className="w-full bg-brand-green text-brand-navy py-6 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl">
                Start Packing Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        
        {/* --- Hero Section --- */}
        <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-64">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 flex items-center gap-4"
                >
                  <div className="h-[2px] w-12 bg-brand-green"></div>
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-green">Agency Grade Infrastructure</span>
                </motion.div>
                
                <h1 className="text-6xl md:text-[10vw] font-black tracking-tight leading-[0.85] uppercase text-brand-navy mb-12">
                  <motion.span 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="block"
                  >
                    Your Digital
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="block text-brand-green ml-[10vw]"
                  >
                    Attic
                  </motion.span>
                </h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-3xl font-medium text-slate-500 max-w-2xl leading-tight mb-12"
                >
                  The world's most stable, minimal web storage utility. Pack it. Save it. Forget it.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <button className="px-12 py-6 bg-brand-navy text-white rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center gap-4 group">
                    Get Started Free <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button className="px-12 py-6 glass-panel rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                    View Architecture
                  </button>
                </motion.div>
              </div>

              <div className="lg:col-span-4 hidden lg:block relative">
                <DropZone3D />
              </div>
            </div>
          </div>
          
          {/* Scroll Prompt */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Explore</span>
            <ChevronDown className="w-4 h-4 text-brand-green" />
          </motion.div>
        </section>

        {/* --- Services / Bento Grid --- */}
        <section id="services" className="py-32 lg:py-48">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader 
              badge="Architecture"
              title="The Industrial Standard For Archiving"
              subtitle="Everything we build is centered around the terminal relief of knowing your data is exactly as you left it."
            />

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
              {/* Feature 1: Large Span */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="md:col-span-4 lg:col-span-4 glass-card p-12 bg-brand-navy text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <Archive className="w-16 h-16 text-brand-green mb-8" />
                <h3 className="text-4xl font-black uppercase tracking-tight mb-4">Pure Web Storage</h3>
                <p className="text-xl text-slate-400 font-medium max-w-xl mb-12">
                  A specialized engine designed for the deep storage of static assets. No built-in editors. No tampering. Just pure, immutable archival stability.
                </p>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] font-black tracking-widest text-brand-green uppercase">01 / STABILITY</div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] font-black tracking-widest text-slate-400 uppercase">02 / INTEGRITY</div>
                </div>
              </motion.div>

              {/* Feature 2: Square */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="md:col-span-2 lg:col-span-2 glass-card p-12 flex flex-col justify-between group"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-brand-green transition-colors duration-500 shadow-sm">
                  <Zap className="w-8 h-8 text-brand-navy group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Offload</h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Instant device decongestion.</p>
                </div>
              </motion.div>

              {/* Feature 3: Long Vert */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="md:col-span-2 lg:col-span-2 glass-card p-12 flex flex-col group bg-slate-50"
              >
                <ShieldCheck className="w-12 h-12 text-brand-green mb-auto" />
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4 mt-12">Encrypted Vaulting</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  AES-256 industrial-grade encryption applied to every crate. Your files are shielded from the outside world.
                </p>
              </motion.div>

              {/* Feature 4: Wide Horiz */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="md:col-span-4 lg:col-span-4 glass-card p-12 flex flex-col md:flex-row gap-12 items-center"
              >
                <div className="flex-1">
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Developer Ready</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8">
                    Optimized for finalized project assets, raw code crates, and long-term diagnostic logs.
                  </p>
                  <div className="flex gap-2">
                    {['v2 API', 'Webhooks', 'CLI'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 rounded text-[9px] font-black uppercase text-slate-500">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-1/3 aspect-video bg-brand-navy rounded-2xl p-4 font-mono text-[10px] text-brand-green hidden md:block">
                  <div className="opacity-50">pack-cli upload --crate archival-01</div>
                  <div className="text-white mt-1">{" > "} hashing... [DONE]</div>
                  <div className="text-white">{" > "} encrypting... [DONE]</div>
                  <div className="mt-1">Vault secured at 0x4F...E1</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Testimonials / Elite Reviews --- */}
        <section id="reviews" className="py-32 lg:py-48 bg-brand-navy relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-green/20 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24">
              <div className="max-w-2xl">
                <div className="text-brand-green text-[11px] font-black uppercase tracking-[0.5em] mb-6">User Feedback</div>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
                  The Relief of <span className="text-brand-green">Packed</span> Data
                </h2>
              </div>
              <p className="text-slate-400 font-medium text-xl max-w-sm lg:text-right">
                Our community prioritizes peace of mind over feature bloat.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { 
                  name: "Marcus Chen", 
                  role: "Independent Architect", 
                  text: "I was tired of Google Drive trying to open every PDF in a new editor. Pack My Files just holds my stuff. It’s the digital box I’ve been looking for.",
                  avatar: "MC"
                },
                { 
                  name: "Sarah Jenkins", 
                  role: "Lead Motion Designer", 
                  text: "Offloading 200GB of raw project footage took minutes. No syncing errors, no 'smart' features—just pure storage. Finally, some peace of mind.",
                  avatar: "SJ"
                },
                { 
                  name: "David Vore", 
                  role: "Full Stack Developer", 
                  text: "The UI is incredibly clean. It feels like a physical tool. I pack my files, they stay packed. It's the most reliable archiving tool in my stack.",
                  avatar: "DV"
                }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-12 bg-white/5 border border-white/10 rounded-[3rem] group hover:bg-white/10 transition-all duration-500"
                >
                  <div className="mb-8 flex gap-1">
                    {[1,2,3,4,5].map(j => <Star key={j} className="w-5 h-5 text-brand-green fill-current" />)}
                  </div>
                  <p className="text-2xl font-medium text-slate-300 italic mb-12 leading-tight">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-brand-green/30 flex items-center justify-center font-black text-brand-green bg-brand-green/10">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase text-sm tracking-widest">{testimonial.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- About / Industrial Process --- */}
        <section id="about" className="py-32 lg:py-64 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative industrial-glow rounded-[4rem] border border-slate-200 overflow-hidden bg-slate-900 group">
                   <div className="aspect-square flex items-center justify-center">
                      <div className="w-64 h-64 relative animate-float">
                        <Box className="w-full h-full text-brand-green/20" strokeWidth={0.5} />
                        <div className="absolute inset-x-0 bottom-12 flex flex-col items-center">
                           <div className="text-[9px] font-mono text-brand-green/40 mb-2 mt-4 tracking-[0.5em]">DATA_PARKING_ACTIVE</div>
                           <Layers className="w-12 h-12 text-brand-green" />
                        </div>
                      </div>
                   </div>
                   <div className="absolute top-8 left-8 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   </div>
                   <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/5 backdrop-blur rounded-3xl border border-white/10">
                      <div className="text-[10px] font-black text-brand-green uppercase tracking-[0.3em] mb-4">Core Identity</div>
                      <div className="text-xl font-black text-white uppercase italic tracking-tight">"Exactly as you packed them—zero tampering, zero editing."</div>
                   </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-12">
                <SectionHeader 
                  badge="The Philosophy"
                  title="A Digital Attic For The Focused Mind"
                />
                <p className="text-2xl font-medium text-slate-500 leading-tight">
                  Pack My Files is a specialized manager designed for <span className="text-brand-navy">"Pure Storage."</span> We provide zero tools for editing—ensuring your files remain exactly as you packed them.
                </p>
                <div className="space-y-6">
                  {[
                    "Zero-Interference Storage Policy",
                    "Industrial AES-256 Encryption",
                    "Ultra-Simple 'Crate' UI Logic",
                    "High-Speed One-Click Transitions"
                  ].map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-6 group cursor-default"
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="text-xl font-black text-brand-navy uppercase tracking-tighter group-hover:text-brand-green transition-colors">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Contact / Action --- */}
        <section id="contact" className="py-32 lg:pb-64">
          <div className="max-w-7xl mx-auto px-6">
            <div className="glass-card shadow-industrial bg-brand-navy rounded-[4rem] p-12 lg:p-24 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="grid grid-cols-12 h-full opacity-30">
                    {Array.from({length: 48}).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-white/50"></div>
                    ))}
                 </div>
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
                <div>
                  <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.85] mb-12">
                    Let's <br />Archivize<br />The Clutter.
                  </h2>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 group">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-green border border-white/10 group-hover:bg-brand-green group-hover:text-brand-navy transition-all">
                        <Mail className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Inquiry</div>
                        <div className="text-xl font-black tracking-tight">{emailAddress}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                      <a href={`https://wa.me/${phoneNumber}`} className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <MessageCircle className="w-8 h-8" />
                      </a>
                      <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">WhatsApp Fast-track</div>
                        <div className="text-xl font-black tracking-tight">Message Our Concierge</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10">
                   <h3 className="text-2xl font-black uppercase tracking-tight mb-12">Quick Sync</h3>
                   <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Identity</label>
                        <input type="text" placeholder="Your Name" className="w-full py-6 px-8 bg-black/20 border border-white/5 rounded-2xl focus:outline-none focus:border-brand-green font-bold text-white transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Contact Gateway</label>
                        <input type="email" placeholder="Email@example.com" className="w-full py-6 px-8 bg-black/20 border border-white/5 rounded-2xl focus:outline-none focus:border-brand-green font-bold text-white transition-all" />
                      </div>
                      <button className="w-full py-8 bg-brand-green text-brand-navy rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Finalize Request
                      </button>
                   </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="py-24 border-t border-slate-100 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-24 mb-24">
            <div className="lg:col-span-6">
              <Logo3D size="md" />
              <p className="mt-12 text-2xl font-medium text-slate-400 max-w-md leading-tight">
                Muroga's industrial-grade archiving solution. Stability prioritized above all.
              </p>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 lg:grid-cols-3 gap-12">
              <div>
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.5em] mb-8">Ecosystem</h4>
                <ul className="space-y-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                  <li><a href="#services" className="hover:text-brand-green transition-colors">Services</a></li>
                  <li><a href="#reviews" className="hover:text-brand-green transition-colors">Reviews</a></li>
                  <li><a href="#about" className="hover:text-brand-green transition-colors">Philosophy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.5em] mb-8">Support</h4>
                <ul className="space-y-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                  <li><a href="#contact" className="hover:text-brand-green transition-colors">Contact</a></li>
                  <li className="hover:text-brand-green transition-colors cursor-pointer">Help Center</li>
                </ul>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.5em] mb-8">Follow</h4>
                <div className="flex gap-4">
                  {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200"></div>)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
              © {new Date().getFullYear()} PACK MY FILES. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-8">
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] cursor-pointer hover:text-brand-navy">Privacy</div>
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] cursor-pointer hover:text-brand-navy">Terms</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modern Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.a 
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          href={`https://wa.me/${phoneNumber}`}
          className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/20"
        >
          <MessageCircle className="w-8 h-8" />
        </motion.a>
      </div>

    </div>
  );
}
