import { FileEdit, Camera, Star } from 'lucide-react';
import Image from 'next/image';

interface ScrapbookTabProps {
  onSelectLocation: (id: string) => void;
}

export function ScrapbookTab({ onSelectLocation }: ScrapbookTabProps) {
  return (
    <div className="w-full h-full overflow-y-auto pb-32 px-6 pt-24 no-scrollbar">
      {/* Header */}
      <div className="mb-8">
        <span className="text-secondary text-xs font-bold tracking-[0.2em] uppercase block mb-2">Production Vault</span>
        <h2 className="text-5xl font-bold tracking-tighter text-on-surface font-headline uppercase">Scrapbook</h2>
        <p className="text-on-surface-variant text-sm mt-2 max-w-[80%]">Curated filming locations and visual references for upcoming projects.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
        <button className="px-5 py-2 rounded-full bg-secondary text-surface-lowest font-bold text-xs tracking-widest uppercase whitespace-nowrap">
          All Locations
        </button>
        <button className="px-5 py-2 rounded-full glass-panel border border-outline/20 text-on-surface-variant font-bold text-xs tracking-widest uppercase whitespace-nowrap">
          Urban Noir
        </button>
        <button className="px-5 py-2 rounded-full glass-panel border border-outline/20 text-on-surface-variant font-bold text-xs tracking-widest uppercase whitespace-nowrap">
          Industrial
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Featured Card */}
        <div 
          className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl bg-surface-high shadow-[0_0_24px_rgba(212,175,55,0.12)] cursor-pointer"
          onClick={() => onSelectLocation('neon-alley')}
        >
          <Image 
            src="https://picsum.photos/seed/neon/800/800" 
            alt="Neon District" 
            fill 
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-surface-lowest/40 to-transparent opacity-90" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2 block">Interior / Night</span>
            <h3 className="text-3xl font-bold font-headline text-on-surface mb-2">Neon District Alleyway</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant">OCT 24, 2023</span>
              <div className="flex gap-1">
                <Star className="w-3 h-3 text-primary fill-current" />
                <Star className="w-3 h-3 text-primary fill-current" />
                <Star className="w-3 h-3 text-primary fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Small Cards */}
        <ScrapbookCard title="Concrete Void" date="SEPT 12" image="https://picsum.photos/seed/concrete/400/400" />
        <ScrapbookCard title="Mist Peak" date="AUG 30" image="https://picsum.photos/seed/mist/400/400" />
        <ScrapbookCard title="Glass Monolith" date="JUL 15" image="https://picsum.photos/seed/glass/400/400" />
        <ScrapbookCard title="Vintage Interior" date="JUN 02" image="https://picsum.photos/seed/vintage/400/400" />
      </div>

      {/* FABs */}
      <div className="fixed bottom-28 right-6 flex flex-col gap-3 z-40">
        <button className="w-12 h-12 rounded-full glass-panel border border-outline/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(242,202,80,0.2)] active:scale-90 transition-transform">
          <FileEdit className="w-5 h-5" />
        </button>
        <button className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-surface-lowest shadow-[0_0_24px_rgba(212,175,55,0.4)] active:scale-90 transition-transform">
          <Camera className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function ScrapbookCard({ title, date, image }: any) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-surface-high h-48 cursor-pointer">
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/90 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="font-bold text-on-surface text-sm font-headline">{title}</h3>
        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 block">{date}</span>
      </div>
    </div>
  );
}
