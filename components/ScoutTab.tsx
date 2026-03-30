import { Menu, Search, Signal, BatteryFull, Brain, Aperture, Captions, Video, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';

export function ScoutTab() {
  return (
    <div className="relative w-full h-full bg-surface-lowest">
      {/* Camera Feed */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/sf/1080/1920"
          alt="Camera Feed"
          fill
          className="object-cover grayscale-[0.2] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/90 via-transparent to-surface-lowest/60" />
        
        {/* Viewfinder Corners */}
        <div className="absolute inset-8 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-xl" />
          <div className="absolute bottom-24 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-xl" />
          <div className="absolute bottom-24 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-xl" />
        </div>
      </div>

      {/* Top Nav for Camera */}
      <header className="absolute top-0 w-full flex justify-between items-center px-6 h-16 glass-panel border-b border-primary/10 z-50">
        <div className="flex items-center gap-4">
          <Menu className="text-primary w-6 h-6" />
          <h1 className="text-lg font-bold tracking-widest text-primary font-headline uppercase">Director&apos;s Cut</h1>
        </div>
        <Search className="text-primary w-5 h-5" />
      </header>

      {/* HUD Elements */}
      <div className="relative z-20 h-full flex flex-col justify-between pt-20 pb-32 px-6 pointer-events-none">
        
        {/* Top Stats */}
        <div className="flex justify-between items-start pointer-events-auto">
          <div className="glass-panel p-4 rounded-2xl border border-outline/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#00f1fe] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase">AI Guide Active</span>
            </div>
            <div className="font-headline text-lg font-bold text-primary">SCENE RECOGNITION</div>
            <div className="text-[10px] tracking-widest text-on-surface-variant uppercase mt-1">Match: Bullitt (1968)</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-3 glass-panel px-3 py-1.5 rounded-full border border-outline/10">
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3 text-on-surface" />
                <span className="text-[10px] font-bold">5G</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold">88%</span>
                <BatteryFull className="w-3 h-3 text-on-surface" />
              </div>
            </div>
            <div className="glass-panel px-3 py-1 rounded-lg border border-outline/10">
              <span className="text-[10px] text-secondary tabular-nums">37.7749° N, 122.4194° W</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar Toggles */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 glass-panel py-6 px-3 rounded-full border border-outline/15 pointer-events-auto">
          <button className="flex flex-col items-center gap-1">
            <Brain className="w-5 h-5 text-secondary drop-shadow-[0_0_8px_rgba(0,227,253,0.5)]" />
            <span className="text-[8px] uppercase font-bold text-on-surface/60">Narrator</span>
          </button>
          <div className="w-6 h-px bg-outline/30 mx-auto" />
          <button className="flex flex-col items-center gap-1">
            <Aperture className="w-5 h-5 text-on-surface/80" />
            <span className="text-[8px] uppercase font-bold text-on-surface/60">Grading</span>
          </button>
          <div className="w-6 h-px bg-outline/30 mx-auto" />
          <button className="flex flex-col items-center gap-1">
            <Captions className="w-5 h-5 text-on-surface/80" />
            <span className="text-[8px] uppercase font-bold text-on-surface/60">Captions</span>
          </button>
        </div>

        {/* Bottom Area */}
        <div className="flex flex-col items-center gap-6 pointer-events-auto">
          {/* Live Captions */}
          <div className="w-full max-w-md glass-panel p-5 rounded-2xl border-l-4 border-secondary shadow-2xl relative overflow-hidden">
            <p className="text-sm md:text-base leading-relaxed text-secondary/90 italic">
              &quot;The famous chase scene from Bullitt was filmed right here on this incline... Notice the camera angle used to emphasize the grade.&quot;
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[9px] tracking-widest uppercase opacity-50">Transcribing live narration</span>
            </div>
          </div>

          {/* Record Controls */}
          <div className="flex items-center justify-center gap-12">
            <button className="flex flex-col items-center gap-1">
              <Video className="w-6 h-6 text-on-surface-variant" />
              <span className="text-[8px] font-bold tracking-widest uppercase text-on-surface-variant">Filters</span>
            </button>
            
            <button className="relative flex items-center justify-center group">
              <div className="absolute inset-0 bg-error/30 rounded-full blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 rounded-full border-4 border-on-surface/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-error shadow-[0_0_25px_rgba(239,68,68,0.6)] flex items-center justify-center">
                  <div className="w-6 h-6 rounded-sm bg-surface-lowest/40" />
                </div>
              </div>
              <div className="absolute -top-6 bg-error px-3 py-1 rounded text-[10px] font-bold tracking-widest text-surface-lowest shadow-lg">
                REC 00:14:02
              </div>
            </button>

            <button className="flex flex-col items-center gap-1">
              <SlidersHorizontal className="w-6 h-6 text-on-surface-variant" />
              <span className="text-[8px] font-bold tracking-widest uppercase text-on-surface-variant">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
