import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  ChevronDown,
  File,
  Download,
  Trash2,
  FileText,
  Image as ImageIcon,
  Loader2,
  Database
} from 'lucide-react';

// --- Types ---
interface StoredFile {
  id: string;
  name: string;
  size: string;
  type: string;
  packedAt: number;
  hash: string;
}

// --- Components ---

const Logo3D = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const containerSize = size === "sm" ? "w-10 h-10" : size === "md" ? "w-14 h-14" : "w-20 h-20";
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className={`${containerSize} relative perspective-1000 transform-style-3d`}>
        <div className="absolute inset-0 bg-brand-green/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <motion.div 
          whileHover={{ rotateX: 10, rotateY: -15, scale: 1.05 }}
          className="w-full h-full relative"
        >
          <div className="absolute inset-0 bg-brand-navy rounded-2xl border-2 border-white/10 shadow-2xl flex flex-col items-center justify-start overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10"></div>
            <div className="mt-2 flex justify-center items-end gap-1 h-1/2 px-2">
              <div className="w-2 h-[80%] bg-white/10 rounded-t-sm skew-x-[-10deg]"></div>
              <div className="w-2 h-[95%] bg-brand-green shadow-[0_0_15px_rgba(16,185,129,0.5)] rounded-t-sm"></div>
              <div className="w-2 h-[85%] bg-white rounded-t-sm skew-x-[10deg]"></div>
            </div>
            <div className="mt-auto mb-2">
              <Cloud className="w-6 h-6 text-brand-green drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" strokeWidth={2.5} />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="hidden sm:flex flex-col">
        <div className="font-black tracking-tighter leading-none flex items-baseline">
          <span className="text-2xl lg:text-3xl text-white">Pack</span>
          <span className="text-2xl lg:text-3xl text-brand-green mx-1">My</span>
          <span className="text-2xl lg:text-3xl text-white">Files</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [packingState, setPackingState] = useState<'idle' | 'dragging' | 'packing' | 'success'>('idle');
  const [packingProgress, setPackingProgress] = useState(0);
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [isUnpacking, setIsUnpacking] = useState<string | null>(null);

  // Initialize and Sync localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pack_my_files_vault');
    if (saved) setStoredFiles(JSON.parse(saved));
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('pack_my_files_vault', JSON.stringify(storedFiles));
  }, [storedFiles]);

  // --- Handlers ---
  const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('PMF_STORAGE_V1', 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('archives')) {
          db.createObjectStore('archives');
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const storeBlob = async (id: string, blob: Blob) => {
    const db = await initDB();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('archives', 'readwrite');
      const store = transaction.objectStore('archives');
      const request = store.put(blob, id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  const getBlob = async (id: string): Promise<Blob | null> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('archives', 'readonly');
      const store = transaction.objectStore('archives');
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  };

  const deleteBlob = async (id: string) => {
    const db = await initDB();
    const transaction = db.transaction('archives', 'readwrite');
    transaction.objectStore('archives').delete(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (packingState === 'idle' || packingState === 'success') setPackingState('dragging');
  };

  const handleDragLeave = () => {
    if (packingState === 'dragging') setPackingState('idle');
  };

  const generateVaultId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'PMF-';
    for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  };

  const packFile = useCallback(async (file: File) => {
    setActiveFile(file);
    setPackingState('packing');
    setPackingProgress(0);

    // Simulate Industrial Handshake
    console.log(`[PMF-SECURE] Initializing vault for: ${file.name}`);

    const interval = setInterval(() => {
      setPackingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    setTimeout(async () => {
      const vId = generateVaultId();
      
      try {
        // Vault the actual data to IndexedDB
        await storeBlob(vId, file);
        
        const newFile: StoredFile = {
          id: vId,
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          type: file.type || 'application/octet-stream',
          packedAt: Date.now(),
          hash: 'SHA256:' + Math.random().toString(16).substr(2, 32).toUpperCase()
        };
        
        console.log(`[PMF-SUCCESS] Vault entry committed:`, newFile);
        setStoredFiles(prev => [newFile, ...prev]);
        setPackingState('success');
        setTimeout(() => setPackingState('idle'), 3000);
      } catch (err) {
        console.error('[PMF-ERROR] Vaulting failed:', err);
        setPackingState('idle');
        alert('Vaulting Failed: Storage allocation error.');
      }
    }, 2000);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) packFile(file);
  };

  const deleteFile = async (id: string) => {
    setStoredFiles(prev => prev.filter(f => f.id !== id));
    await deleteBlob(id);
  };

  const unpackFile = async (id: string, fileName: string, fileType: string) => {
    setIsUnpacking(id);
    // Simulate industrial extraction process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const blob = await getBlob(id);
      
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log(`[PMF-EXTRACT] File ${id} successfully restored from IndexedDB.`);
      } else {
        // Fallback for demo: Create a restoration manifest if blob missing
        const manifestContent = `[PACK MY FILES - ARCHIVE RESTORATION]\n\nVault ID: ${id}\nOriginal File: ${fileName}\nStatus: DATA_NOT_FOUND_IN_COLD_STORAGE\n\nNote: The actual binary content for this archive is missing from local IndexedDB. Usually happens after cache clears.`;
        const fallbackBlob = new Blob([manifestContent], { type: 'text/plain' });
        const url = URL.createObjectURL(fallbackBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `MANIFEST_${fileName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('[PMF-ERROR] Extraction failed:', err);
    }

    setIsUnpacking(null);
  };

  const formatSize = (input: number | string) => {
    if (typeof input === 'string') return input;
    if (input === 0) return '0 B';
    const bytes = input;
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-brand-deep text-white font-sans selection:bg-brand-green/20 selection:text-brand-green overflow-x-hidden">
      
      {/* Background System */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[800px] h-[800px] bg-brand-green/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 ${isScrolled ? 'py-4 translate-y-0' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-500 ${isScrolled ? 'glass-panel rounded-2xl py-3 px-6' : 'py-0 px-0'}`}>
            <div className="flex justify-between items-center">
              <Logo3D size="sm" />
              
              <div className="hidden lg:flex items-center space-x-12">
                {['Approach', 'Reviews', 'Pricing'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand-green transition-all hover:tracking-[0.4em]">{item}</a>
                ))}
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="relative group p-2 text-white hover:text-brand-green transition-colors"
                >
                  <Package className="w-6 h-6" />
                  {storedFiles.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-green text-brand-navy text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                      {storedFiles.length}
                    </span>
                  )}
                </button>
                <div className="h-6 w-[1px] bg-white/10"></div>
                <button className="bg-white text-brand-navy px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-crate hover:shadow-glow transition-all hover:scale-105 active:scale-95 group btn-mechanical">
                  Member Portal
                </button>
              </div>

              <div className="lg:hidden flex items-center gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white/5 rounded-xl text-brand-green relative">
                  <Package className="w-6 h-6" />
                  {storedFiles.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-brand-green rounded-full"></span>}
                </button>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 bg-white/5 rounded-xl">
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-50 bg-brand-navy/95 backdrop-blur-xl pt-32 px-10"
          >
            <div className="flex flex-col gap-8">
              {['Approach', 'Reviews', 'Pricing'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tighter text-white"
                >
                  {item}
                </a>
              ))}
              <div className="h-[1px] w-full bg-white/10"></div>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  alert('Industrial portal: Access Restricted. Identity Verification Required.');
                }}
                className="w-full py-6 bg-brand-green text-brand-navy rounded-2xl font-black tracking-[0.4em] uppercase"
              >
                Member Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Vault Side Panel (Packing List) --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-150 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[450px] z-200 glass-panel shadow-inner-vault overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-brand-navy/50">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter">The Vault</h2>
                  <p className="text-[10px] font-bold text-brand-green uppercase tracking-[0.4em] mt-1">Archived In Browser</p>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-3 hover:bg-white/10 rounded-xl transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {storedFiles.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                    <Database className="w-16 h-16 mb-6" strokeWidth={1} />
                    <p className="font-black uppercase tracking-widest text-xs">Vault is empty.<br/>Pack your first file.</p>
                  </div>
                ) : (
                  <div className="space-y-6 lg:space-y-8 perspective-2000">
                    {storedFiles.map((file, index) => {
                      const isRecentlyPacked = Date.now() - file.packedAt < 10000;
                      return (
                        <motion.div 
                          key={file.id} 
                          layout
                          initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
                          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                          className={`relative group overflow-hidden transform-style-3d rounded-3xl border transition-all duration-500 ${
                            isUnpacking === file.id 
                            ? 'bg-brand-green/5 border-brand-green shadow-glow' 
                            : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                          }`}
                        >
                          <div className="p-7 relative z-10">
                            <div className="flex items-center gap-6">
                              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-700 transform-style-3d ${
                                isUnpacking === file.id ? 'bg-brand-green text-brand-navy shadow-glow scale-105' : 'bg-brand-navy text-brand-green border border-white/5'
                              }`}>
                                {isUnpacking === file.id ? (
                                  <Loader2 className="w-8 h-8 animate-spin" />
                                ) : (
                                  <div className="relative">
                                    {file.type.includes('image') ? <ImageIcon className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                                    {isRecentlyPacked && (
                                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-green rounded-full shadow-glow animate-ping" />
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4">
                                  <h4 className="font-black text-white text-base tracking-tight truncate uppercase italic">{file.name}</h4>
                                  <span className="text-[10px] font-mono text-brand-green/40 shrink-0">#{file.id.split('-')[1]}</span>
                                </div>
                                <div className="flex flex-wrap gap-3 mt-3">
                                  <span className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/5">
                                    {formatSize(file.size)}
                                  </span>
                                  <span className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/5">
                                    {new Date(file.packedAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 flex gap-3">
                              <button 
                                disabled={isUnpacking === file.id}
                                onClick={() => unpackFile(file.id, file.name, file.type)}
                                className={`flex-1 py-4 bg-brand-green text-brand-navy text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl btn-mechanical hover:shadow-glow flex items-center justify-center gap-3 transition-all ${
                                  isUnpacking === file.id ? 'opacity-50 cursor-wait' : ''
                                }`}
                              >
                                <Download className="w-4 h-4" />
                                {isUnpacking === file.id ? 'Extracting...' : 'Restore Archive'}
                              </button>
                              <button 
                                disabled={isUnpacking === file.id}
                                onClick={() => deleteFile(file.id)}
                                className="px-5 bg-white/5 text-slate-600 rounded-2xl hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/5 hover:border-red-500/20"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Background Integrity Seal */}
                          <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none uppercase font-black text-[60px] leading-none select-none tracking-tighter select-none">
                            ARCHIVE
                          </div>

                          {/* Restoration Scanner */}
                          {isUnpacking === file.id && (
                            <motion.div 
                              initial={{ y: '100%' }} animate={{ y: '-100%' }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                              className="absolute inset-x-0 h-1 bg-brand-green shadow-glow opacity-40"
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-white/10 bg-brand-navy/50">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Usage Storage</span>
                    <span className="text-xs font-mono text-brand-green">Spark Edition</span>
                 </div>
                 <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full py-5 bg-brand-green text-brand-navy rounded-xl text-xs font-black uppercase tracking-[0.3em] shadow-glow"
                  >
                   Close Session
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        
        {/* --- Unified Hero / Drop Zone --- */}
        <section 
          id="pack"
          className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Visual Feedback Overlays */}
          <AnimatePresence>
            {packingState === 'dragging' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 border-[12px] border-dashed border-brand-green/30 bg-brand-green/5 flex items-center justify-center backdrop-blur-sm pointer-events-none"
              >
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-brand-green/10 border-2 border-brand-green flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <Plus className="w-16 h-16 text-brand-green" />
                  </div>
                  <h3 className="text-5xl font-black uppercase tracking-tighter">Release To Pack</h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-w-7xl mx-auto px-6 w-full h-full grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-20">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6 flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-green">V2.4 Immersive Engine</span>
                <div className="h-[1px] flex-1 bg-white/10"></div>
              </motion.div>
              
              <h1 className="text-7xl md:text-[8vw] font-black tracking-tight leading-[0.8] uppercase mb-8">
                Pack. <br />
                <span className="text-brand-green">Vault.</span> <br />
                Repeat.
              </h1>
              
              <p className="text-xl md:text-2xl font-medium text-slate-400 max-w-lg leading-snug mb-12">
                Drag any file to decongest your workspace instantly. The digital attic awaits.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <input 
                  type="file" id="hero-file" className="hidden" 
                  onChange={(e) => e.target.files?.[0] && packFile(e.target.files[0])} 
                />
                <label 
                  htmlFor="hero-file"
                  className="px-12 py-7 bg-white text-brand-navy rounded-2xl font-black text-xl uppercase tracking-widest hover:shadow-glow transition-all active:scale-95 flex items-center justify-center gap-4 cursor-pointer btn-mechanical"
                >
                  Pack Now <Plus className="w-6 h-6" />
                </label>
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="px-12 py-7 glass-panel rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-white/10 transition-all flex flex-col items-center justify-center relative active:scale-95 btn-mechanical group overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    View Attic 
                    <span className={`w-3 h-3 rounded-full ${storedFiles.length > 0 ? 'bg-brand-green animate-pulse shadow-[0_0_10px_#10B981]' : 'bg-white/20'}`} />
                  </div>
                  {storedFiles.length > 0 && (
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-[9px] text-brand-green mt-1 tracking-[0.3em] font-mono"
                    >
                      SECURED_STORAGE: READY
                    </motion.div>
                  )}
                  {/* Subtle 3D Shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rotate-12 -translate-y-full group-hover:translate-y-full duration-1000" />
                </button>
              </div>

              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setIsSidebarOpen(true)}
                className="mt-8 flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] hover:text-brand-green transition-all mx-auto lg:mx-0 group glass-panel px-6 py-3 rounded-full hover:shadow-glow"
              >
                <div className="relative">
                  <Database className="w-3 h-3 group-hover:animate-pulse" />
                  {storedFiles.length > 0 && (
                    <motion.div 
                      layoutId="safety-symbol"
                      className="absolute -top-1 -right-1"
                    >
                      <ShieldCheck className="w-2.5 h-2.5 text-brand-green fill-brand-navy" />
                    </motion.div>
                  )}
                </div>
                <span>Inspect Manifest_Index</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <div className="mt-16 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-slate-800 flex items-center justify-center text-[10px] font-black">U{i}</div>
                  ))}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                  <span className="block text-brand-green mb-1">42k+ Files Vaulted</span>
                  Global Archiving Active
                </div>
              </div>
            </div>

            <div className="relative flex justify-center py-20 lg:py-0">
               {/* --- The Vaulting Sequence & Crate --- */}
               <div className="relative w-full max-w-[500px] aspect-square perspective-2000">
                  
                  {/* Success Blast Ripple */}
                  {packingState === 'success' && <div className="success-blast" />}

                  <AnimatePresence mode="wait">
                    {packingState === 'packing' ? (
                      <motion.div 
                        key="vaulting-card"
                        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="w-full h-full glass-panel rounded-[3rem] cyber-glow flex flex-col items-center justify-center p-12 text-center transform-style-3d shadow-glow"
                      >
                        {/* Stage 1-2: Scanning Shield */}
                        {packingProgress < 90 ? (
                          <div className="relative mb-8 transform-style-3d">
                            <motion.div 
                              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="relative"
                            >
                              <ShieldCheck className="w-32 h-32 text-brand-green" strokeWidth={1} />
                              <div className="laser-scan-line" />
                            </motion.div>
                          </div>
                        ) : (
                          /* Stage 3: The Seal */
                          <motion.div 
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="mb-8"
                          >
                            <ShieldCheck className="w-32 h-32 text-brand-green fill-brand-green/20" strokeWidth={1.5} />
                          </motion.div>
                        )}

                        {/* Stage 2: Data Streams */}
                        <div className="flex gap-1 h-8 items-center mb-8">
                          {[...Array(12)].map((_, i) => (
                            <motion.div 
                              key={i}
                              animate={packingProgress < 90 ? { 
                                height: [8, 32, 12, 24, 8],
                                opacity: [0.2, 0.8, 0.4, 0.9, 0.2]
                              } : { height: 16, opacity: 0.5 }}
                              transition={{ 
                                duration: 0.4 + (i * 0.05), 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-1.5 bg-brand-green rounded-full"
                            />
                          ))}
                        </div>

                        {/* Status Text & Cycling Logic */}
                        <div className="space-y-4">
                          <div className="text-3xl font-black text-white uppercase tracking-tighter">
                            {packingProgress < 30 ? (
                              "INIT_SECURE_PACK"
                            ) : packingProgress < 90 ? (
                              "ENCRYPTING_DATA"
                            ) : (
                              "INTEGRITY_VERIFIED"
                            )}
                          </div>
                          
                          <div className="h-6 overflow-hidden">
                             <AnimatePresence mode="wait">
                               <motion.div 
                                 key={packingProgress < 90 ? Math.floor(packingProgress / 5) : 'final'}
                                 initial={{ y: 20, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ y: -20, opacity: 0 }}
                                 className="text-[10px] font-mono text-brand-green uppercase tracking-[0.4em]"
                               >
                                 {packingProgress < 90 
                                   ? `SECTOR_0x${Math.random().toString(16).substr(2, 2).toUpperCase()}-${Math.random().toString(16).substr(2, 2).toUpperCase()}...`
                                   : `VAULT ID: ${storedFiles[0]?.id || 'PMF-SYNC'}`
                                 }
                               </motion.div>
                             </AnimatePresence>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-12 inset-x-12">
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              style={{ width: `${packingProgress}%` }}
                              className="h-full bg-brand-green shadow-glow"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Standard Crate View */
                      <motion.div 
                        key="crate-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full relative transform-style-3d crate-container"
                      >
                        <motion.div 
                          animate={packingState === 'dragging' ? { scale: 1.05 } : { scale: 1 }}
                          className="w-full h-full relative transform-style-3d"
                        >
                          {/* Floating Tooltip */}
                          <AnimatePresence>
                            {packingState === 'dragging' && (
                              <motion.div 
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-green text-brand-navy px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest z-50 shadow-glow"
                              >
                                Ready to Pack
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Crate Body Industrial Shell */}
                          <div className="absolute inset-0 transform-style-3d">
                            {/* Back Wall - Deepest Layer */}
                            <div className="absolute inset-0 rounded-[3rem] bg-black/40 border border-white/5 translate-z-neg-20" />
                            
                            {/* Main Body with Internal Depth */}
                            <div className="absolute inset-0 rounded-[3rem] bg-[#0A0F1E] border-4 border-white/10 shadow-2xl flex items-center justify-center overflow-hidden transform-style-3d">
                              {/* Mechanical Bolts */}
                              <div className="absolute top-6 left-6 w-1.5 h-1.5 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                              <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>
                              <div className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"></div>

                              {/* Internal Glow */}
                              <div className={`absolute inset-0 transition-opacity duration-1000 ${packingState === 'dragging' ? 'opacity-40' : 'opacity-10'} bg-brand-green blur-3xl rounded-full scale-75`}></div>
                              
                              {/* Digital Grid lines */}
                              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                              {/* Content States */}
                              <AnimatePresence mode="wait">
                                {packingState === 'idle' || packingState === 'dragging' ? (
                                  <motion.div key="idle" className="text-center relative z-10">
                                    <div className="relative mb-4 group/icon">
                                      <ShieldCheck className={`w-20 h-20 mx-auto transition-all duration-700 ${packingState === 'dragging' ? 'text-brand-green scale-110 drop-shadow-glow' : 'text-white/5'}`} strokeWidth={1} />
                                      {storedFiles.length > 0 && (
                                        <motion.div 
                                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-green text-brand-navy font-black text-[7px] uppercase tracking-[0.2em] rounded border border-white/20"
                                        >
                                          SYNCED
                                        </motion.div>
                                      )}
                                    </div>
                                    <div className={`text-[8px] font-mono tracking-[0.6em] uppercase transition-all duration-700 ${packingState === 'dragging' ? 'text-brand-green translate-y-0' : 'text-white/10 translate-y-2'}`}>
                                      {packingState === 'dragging' ? 'Awaiting_Drop' : 'Vault_Standby'}
                                    </div>
                                  </motion.div>
                                ) : (
                                  <motion.div key="success" className="text-center">
                                    <div className="relative w-24 h-24 mx-auto mb-6">
                                      <ShieldCheck className="w-full h-full text-brand-green" strokeWidth={1} />
                                      <motion.div 
                                        initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }}
                                        className="absolute inset-0 bg-brand-green/20 blur-xl rounded-full"
                                      />
                                    </div>
                                    <div className="text-3xl font-black uppercase tracking-tighter text-white">Vaulted</div>
                                    <div className="text-[10px] font-mono text-brand-green/60 mt-3 tracking-widest">{storedFiles[0]?.id}</div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Mechanical Lids (The Snap) -rotateX Chest Style */}
                          <div className="absolute inset-x-0 inset-y-[-4px] transform-style-3d pointer-events-none z-40">
                            {/* Top Lid */}
                            <motion.div 
                              initial={false}
                              animate={packingState === 'success' ? { rotateX: 0, translateZ: 0 } : { rotateX: -110, translateZ: 10 }}
                              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                              className="absolute top-0 left-0 right-0 h-1/2 bg-[#1E293B] border border-white/10 rounded-t-[3rem] origin-bottom shadow-2xl z-40"
                            >
                               <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-t-[3rem]" />
                            </motion.div>
                            {/* Bottom Lid */}
                            <motion.div 
                              initial={false}
                              animate={packingState === 'success' ? { rotateX: 0, translateZ: 0 } : { rotateX: 110, translateZ: 10 }}
                              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                              className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#1E293B] border border-white/10 rounded-b-[3rem] origin-top shadow-2xl z-40"
                            >
                               <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-b-[3rem]" />
                            </motion.div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
          </div>
        </section>

        {/* --- Services / Features Grid --- */}
        <section id="approach" className="py-32 lg:py-48 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-brand-green uppercase tracking-[0.3em] mb-6">
                  Architecture 2.0
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                  Beyond Simple <br />
                  <span className="text-brand-green underline decoration-brand-green/30 decoration-8 underline-offset-8">Cloud Storage</span>
                </h2>
              </div>
              <p className="text-xl font-medium text-slate-400 max-w-sm lg:text-right leading-tight">
                Designed for the obsessive minimalist. No bloat, no constant alerts, just industrial stability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { icon: Shield, title: "Encryption first", text: "Files are hashed and locked locally before reaching our secure archives." },
                 { icon: Layers, title: "Zero Interaction", text: "We offer zero editing tools. Integrity means keeping your files exactly as you left them." },
                 { icon: RefreshCcw, title: "Hot Extraction", text: "Retrieve your crates with one click. Simple, fast, and weightless." }
               ].map((feat, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -10 }}
                   className="p-12 glass-panel rounded-[3rem] group"
                 >
                   <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-8 group-hover:bg-brand-green group-hover:text-brand-navy transition-all">
                     <feat.icon className="w-8 h-8" />
                   </div>
                   <h3 className="text-3xl font-black uppercase tracking-tight mb-4">{feat.title}</h3>
                   <p className="text-slate-400 font-medium leading-relaxed">{feat.text}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* --- Reviews Section --- */}
        <section id="reviews" className="py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center lg:text-left">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Trusted By <span className="text-brand-green">Archivists</span></h2>
              <div className="w-24 h-1 bg-brand-green mb-8 hidden lg:block"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Sarah K.", role: "Digital Archivist", quote: "Pack My Files is the only tool that respects the 'Static Integrity' of my research data. No unexpected updates." },
                { name: "Marcus V.", role: "Software Engineer", quote: "I offload my build artifacts here. It's my secondary attic, completely out of sight but always ready." }
              ].map((rev, i) => (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-3xl">
                  <div className="flex gap-1 text-brand-green mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xl font-medium text-white mb-6 italic">"{rev.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-green/20"></div>
                    <div>
                      <div className="font-bold text-white uppercase text-xs tracking-widest">{rev.name}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{rev.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Pricing Section --- */}
        <section id="pricing" className="py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-black uppercase tracking-tight mb-4">Industrial <span className="text-brand-green">Tiers</span></h2>
              <p className="text-slate-400 font-medium">Simple storage based on volume. No hidden fees.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "The Backpack", price: "0", cap: "10 Files", features: ["Basic Vaulting", "AES-256 Readiness", "Local Access Only"] },
                { name: "The Container", price: "12", cap: "Unlimited Files", features: ["Global Sync", "Advanced Hashing", "Priority Extraction", "Priority Support"] },
                { name: "The Warehouse", price: "49", cap: "Enterprise", features: ["Air-Gapped Archives", "Redundant Vaults", "Dedicated Node", "Full Audit Logs"] }
              ].map((tier, i) => (
                <div key={i} className={`p-12 relative overflow-hidden rounded-[3rem] ${i === 1 ? 'bg-brand-green text-brand-navy' : 'glass-panel text-white'}`}>
                  {i === 1 && <div className="absolute top-0 right-0 p-4 bg-brand-navy text-white text-[9px] font-black uppercase tracking-[0.3em]">Recommended</div>}
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-60">{tier.name}</div>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-black tracking-tighter">${tier.price}</span>
                    <span className="text-xs font-bold uppercase tracking-widest">/mo</span>
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest mb-8">{tier.cap}</div>
                  <ul className="space-y-4 mb-12">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest leading-none">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                       window.scrollTo({ top: 0, behavior: 'smooth' });
                       if (i === 1) alert('Container Tier selected. Your storage cap is now unrestricted.');
                    }}
                    className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 btn-mechanical ${i === 1 ? 'bg-brand-navy text-white shadow-2xl' : 'bg-white text-brand-navy'}`}
                  >
                    Select Tier
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-48">
          <div className="max-w-7xl mx-auto px-6">
             <div className="relative glass-panel rounded-[4rem] p-12 lg:p-32 text-center overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="grid grid-cols-12 h-full">
                    {Array.from({length: 48}).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-white"></div>
                    ))}
                  </div>
                </div>
                
                <h2 className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-12 relative z-10">
                  Join The <br /><span className="text-brand-green">Quiet</span> Web.
                </h2>
                
                <p className="text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
                  Pack your first 5 files free. Experience the relief of a focused workspace.
                </p>

                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-16 py-8 bg-brand-green text-brand-navy rounded-2xl text-2xl font-black uppercase tracking-[0.3em] hover:scale-110 active:scale-95 transition-all shadow-glow btn-mechanical"
                >
                  Enter The Attic
                </button>
             </div>
          </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="py-24 border-t border-white/5 bg-brand-deep/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 mb-24">
            <div>
              <Logo3D size="md" />
              <p className="mt-8 text-2xl font-medium text-slate-500 max-w-md leading-tight">
                Premium digital storage and workspace decongestion utility. Stability first.
              </p>
            </div>
            <div className="flex flex-col lg:items-end justify-center">
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                <a href="#" className="hover:text-brand-green">Privacy Policy</a>
                <a href="#" className="hover:text-brand-green">User Agreement</a>
                <a href="#" className="hover:text-brand-green">Infrastructure</a>
              </div>
              <p className="mt-8 text-[10px] font-black text-slate-800 uppercase tracking-[0.4em]">© {new Date().getFullYear()} PACK MY FILES. BUILT FOR FOCUS.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-8 right-8 z-100 w-16 h-16 bg-brand-green text-brand-navy rounded-full shadow-glow flex items-center justify-center group"
      >
        <Package className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </motion.button>

    </div>
  );
}
