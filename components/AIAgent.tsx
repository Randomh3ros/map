'use client';

import { useState, useEffect } from 'react';
import { Bot, X, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'fixing' | 'done'>('idle');
  const [logs, setLogs] = useState<{ id: number; text: string; type: 'info' | 'error' | 'success' }[]>([]);

  useEffect(() => {
    if (status === 'scanning') {
      const scanLogs = [
        { text: 'Analyzing component tree...', type: 'info' as const },
        { text: 'Checking for memory leaks...', type: 'info' as const },
        { text: 'Validating prop types...', type: 'info' as const },
        { text: 'Found unescaped quote in TopNav.tsx', type: 'error' as const },
        { text: 'Found missing key prop in MapTab.tsx', type: 'error' as const },
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i < scanLogs.length) {
          setLogs(prev => [...prev, { id: Date.now(), ...scanLogs[i] }]);
          i++;
        } else {
          clearInterval(interval);
          setStatus('fixing');
        }
      }, 800);

      return () => clearInterval(interval);
    }

    if (status === 'fixing') {
      const fixLogs = [
        { text: 'Applying fix to TopNav.tsx...', type: 'info' as const },
        { text: 'Resolved unescaped quote.', type: 'success' as const },
        { text: 'Applying fix to MapTab.tsx...', type: 'info' as const },
        { text: 'Added missing key prop.', type: 'success' as const },
        { text: 'All issues resolved.', type: 'success' as const },
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i < fixLogs.length) {
          setLogs(prev => [...prev, { id: Date.now(), ...fixLogs[i] }]);
          i++;
        } else {
          clearInterval(interval);
          setStatus('done');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status]);

  const handleStartScan = () => {
    setLogs([]);
    setStatus('scanning');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 left-6 z-50 w-12 h-12 rounded-full bg-surface-high border border-outline/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,227,253,0.2)] hover:scale-110 transition-transform"
      >
        <Bot className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-48 left-6 z-50 w-80 bg-surface-high rounded-2xl border border-outline/20 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-outline/10 flex justify-between items-center bg-surface-lowest/50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="font-bold text-sm tracking-widest uppercase text-on-surface font-headline">AI Auto-Fix</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto flex flex-col gap-2 font-mono text-xs">
              {logs.length === 0 && status === 'idle' && (
                <div className="text-on-surface-variant text-center mt-8">
                  Ready to scan codebase for errors.
                </div>
              )}
              {logs.map(log => (
                <div key={log.id} className="flex items-start gap-2">
                  {log.type === 'info' && <span className="text-secondary mt-0.5">›</span>}
                  {log.type === 'error' && <AlertCircle className="w-3 h-3 text-error mt-0.5 shrink-0" />}
                  {log.type === 'success' && <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 shrink-0" />}
                  <span className={`
                    ${log.type === 'info' ? 'text-on-surface/80' : ''}
                    ${log.type === 'error' ? 'text-error' : ''}
                    ${log.type === 'success' ? 'text-primary' : ''}
                  `}>
                    {log.text}
                  </span>
                </div>
              ))}
              {status !== 'idle' && status !== 'done' && (
                <div className="flex items-center gap-2 text-on-surface-variant mt-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>{status === 'scanning' ? 'Scanning...' : 'Fixing...'}</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-outline/10 bg-surface-lowest/50">
              <button
                onClick={handleStartScan}
                disabled={status === 'scanning' || status === 'fixing'}
                className="w-full py-2 rounded-lg bg-primary text-surface-lowest font-bold text-xs tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-primary/90"
              >
                {status === 'done' ? 'Scan Again' : 'Start Scan'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
