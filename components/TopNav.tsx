import { Film, Search, MoreVertical } from 'lucide-react';

export function TopNav() {
  return (
    <header className="absolute top-0 left-0 w-full z-40 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-surface-lowest to-transparent pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        <Film className="text-primary w-6 h-6" />
        <h1 className="font-headline font-black text-xl uppercase tracking-widest text-primary">
          Director&apos;s Cut
        </h1>
      </div>
      <div className="flex items-center gap-4 pointer-events-auto">
        <button className="text-on-surface hover:text-primary transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-on-surface hover:text-primary transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
