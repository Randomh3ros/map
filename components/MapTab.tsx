import { Search, Mic, Star, Clapperboard, MapPinPlus } from 'lucide-react';
import Image from 'next/image';

interface MapTabProps {
  onSelectLocation: (id: string) => void;
}

export function MapTab({ onSelectLocation }: MapTabProps) {
  return (
    <div className="relative w-full h-full">
      {/* Map Background */}
      <div className="absolute inset-0 z-0 bg-surface-low">
        <Image
          src="https://picsum.photos/seed/map/1080/1920?grayscale&blur=2"
          alt="Map Background"
          fill
          className="object-cover opacity-40 contrast-125 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-lowest/80 via-transparent to-surface-lowest/80" />
      </div>

      {/* Floating Search */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-30">
        <div className="glass-panel p-4 rounded-2xl border border-outline/20 shadow-2xl flex items-center gap-4">
          <Search className="text-primary w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search movies, shows, or locations" 
            className="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/50 w-full font-medium outline-none"
          />
          <Mic className="text-on-surface-variant w-5 h-5" />
        </div>
        
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
          <button className="whitespace-nowrap bg-secondary text-surface-lowest px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2">
            <Star className="w-3 h-3 fill-current" /> Top Rated
          </button>
          <button className="whitespace-nowrap glass-panel text-on-surface px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-outline/20">
            Studios
          </button>
          <button className="whitespace-nowrap glass-panel text-on-surface px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-outline/20">
            Noir Scenes
          </button>
        </div>
      </div>

      {/* Map Markers */}
      <div className="absolute top-1/3 left-1/4 z-20">
        <div className="relative group cursor-pointer" onClick={() => onSelectLocation('paramount')}>
          <div className="bg-primary-container p-2 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.6)] transform rotate-3 scale-110">
            <Clapperboard className="text-surface-lowest w-6 h-6" />
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap glass-panel px-3 py-1 rounded-full border border-outline/20">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Paramount Backlot</span>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-24 left-0 w-full z-30 glass-panel rounded-t-[2.5rem] border-t border-outline/20 pt-4 pb-8">
        <div className="w-12 h-1.5 bg-outline/40 rounded-full mx-auto mb-6" />
        <div className="px-6 flex justify-between items-end mb-6">
          <div>
            <span className="text-[10px] text-secondary font-black uppercase tracking-[0.2em] mb-1 block">Discover Nearby</span>
            <h2 className="text-2xl font-bold tracking-tight text-on-surface font-headline">Filming Locations</h2>
          </div>
          <button className="text-primary text-xs font-bold uppercase tracking-widest">
            View All
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
          <LocationCard 
            id="orpheum"
            title="The Orpheum Theatre"
            movies="Inception, La La Land"
            rating="4.9"
            distance="1.2 mi"
            image="https://picsum.photos/seed/orpheum/400/300"
            onClick={() => onSelectLocation('orpheum')}
          />
          <LocationCard 
            id="bradbury"
            title="Bradbury Building"
            movies="Blade Runner (1982)"
            rating="4.7"
            distance="3.5 mi"
            image="https://picsum.photos/seed/bradbury/400/300"
            onClick={() => onSelectLocation('bradbury')}
          />
          <LocationCard 
            id="griffith"
            title="Griffith Observatory"
            movies="Rebel Without a Cause"
            rating="4.9"
            distance="4.1 mi"
            image="https://picsum.photos/seed/griffith/400/300"
            onClick={() => onSelectLocation('griffith')}
          />
        </div>
      </div>

      {/* FAB */}
      <button className="absolute bottom-32 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.4)] active:scale-90 transition-transform">
        <MapPinPlus className="text-surface-lowest w-6 h-6" />
      </button>
    </div>
  );
}

function LocationCard({ title, movies, rating, distance, image, onClick }: any) {
  return (
    <div className="min-w-[260px] group cursor-pointer" onClick={onClick}>
      <div className="relative h-36 rounded-2xl overflow-hidden mb-3 border border-outline/10">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/90 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Star className="text-primary w-3 h-3 fill-current" />
          <span className="text-on-surface text-xs font-bold">{rating} • {distance}</span>
        </div>
      </div>
      <h3 className="font-bold text-base leading-tight text-on-surface font-headline">{title}</h3>
      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
        <Clapperboard className="w-3 h-3" /> {movies}
      </p>
    </div>
  );
}
