import { useState, useEffect } from 'react';
import { Search, Mic, Star, Clapperboard, MapPinPlus, X, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';
import { motion, AnimatePresence } from 'motion/react';

interface MapTabProps {
  onSelectLocation: (id: string) => void;
}

const LOCATIONS_DATA: Record<string, any> = {
  orpheum: {
    id: 'orpheum',
    title: 'The Orpheum Theatre',
    movies: 'Inception, La La Land',
    rating: '4.9',
    distance: '1.2 mi',
    image: 'https://picsum.photos/seed/orpheum/400/300',
    description: 'A historic movie palace in downtown Los Angeles. It has a Beaux Arts facade and a French Renaissance interior.',
  },
  bradbury: {
    id: 'bradbury',
    title: 'Bradbury Building',
    movies: 'Blade Runner (1982)',
    rating: '4.7',
    distance: '3.5 mi',
    image: 'https://picsum.photos/seed/bradbury/400/300',
    description: 'An architectural landmark in downtown Los Angeles, known for its extraordinary skylit atrium and open-cage elevators.',
  },
  griffith: {
    id: 'griffith',
    title: 'Griffith Observatory',
    movies: 'Rebel Without a Cause',
    rating: '4.9',
    distance: '4.1 mi',
    image: 'https://picsum.photos/seed/griffith/400/300',
    description: 'Sitting on the south-facing slope of Mount Hollywood, it offers spectacular views of the Los Angeles basin.',
  }
};

export function MapTab({ onSelectLocation }: MapTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  useEffect(() => {
    if (debouncedSearch) {
      console.log('Searching for:', debouncedSearch);
      // Implement actual search logic here
    }
  }, [debouncedSearch]);

  const handleShare = async (e: React.MouseEvent, location: any) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: location.title,
          text: `Check out this filming location: ${location.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.log('Web Share API not supported');
      // Fallback copy to clipboard could go here
    }
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, shows, or locations" 
            className="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/50 w-full font-medium outline-none"
          />
          {searchQuery ? (
            <button onClick={() => setSearchQuery('')} className="text-on-surface-variant hover:text-on-surface">
              <X className="w-5 h-5" />
            </button>
          ) : (
            <Mic className="text-on-surface-variant w-5 h-5" />
          )}
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
          <div className="absolute inset-0 bg-primary/40 rounded-lg animate-ping" />
          <div className="relative bg-primary-container p-2 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.6)] transform rotate-3 scale-110">
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
          {Object.values(LOCATIONS_DATA).map((loc) => (
            <LocationCard 
              key={loc.id}
              {...loc}
              onClick={() => setSelectedLocation(loc)}
              onShare={(e: React.MouseEvent) => handleShare(e, loc)}
            />
          ))}
        </div>
      </div>

      {/* FAB */}
      <button className="absolute bottom-32 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.4)] active:scale-90 transition-transform">
        <MapPinPlus className="text-surface-lowest w-6 h-6" />
      </button>

      {/* Location Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-lowest/80 backdrop-blur-sm"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-surface-high rounded-3xl overflow-hidden shadow-2xl border border-outline/20"
            >
              <div className="relative h-48 w-full">
                <Image src={selectedLocation.image} alt={selectedLocation.title} fill className="object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-4 right-4 p-2 bg-surface-lowest/50 backdrop-blur-md rounded-full text-on-surface hover:bg-surface-lowest transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold font-headline text-on-surface">{selectedLocation.title}</h3>
                  <div className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded text-secondary">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold">{selectedLocation.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant mb-4">{selectedLocation.distance} away</p>
                <p className="text-on-surface mb-6 leading-relaxed">{selectedLocation.description}</p>
                
                <div className="bg-surface-low p-4 rounded-xl mb-6 border border-outline/10">
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-2">Notable Films</span>
                  <div className="flex items-center gap-2 text-on-surface">
                    <Clapperboard className="w-4 h-4 text-primary" />
                    <span className="font-medium">{selectedLocation.movies}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    className="flex-1 bg-primary text-surface-lowest py-3 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      onSelectLocation(selectedLocation.id);
                      setSelectedLocation(null);
                    }}
                  >
                    View on Map
                  </button>
                  <button 
                    className="p-3 bg-surface-low text-on-surface rounded-xl border border-outline/20 hover:bg-surface-low/80 transition-colors"
                    onClick={(e) => handleShare(e, selectedLocation)}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LocationCard({ title, movies, rating, distance, image, onClick, onShare }: any) {
  return (
    <div className="min-w-[260px] group cursor-pointer relative" onClick={onClick}>
      <div className="relative h-36 rounded-2xl overflow-hidden mb-3 border border-outline/10">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/90 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Star className="text-primary w-3 h-3 fill-current" />
          <span className="text-on-surface text-xs font-bold">{rating} • {distance}</span>
        </div>
        <button 
          onClick={onShare}
          className="absolute top-3 right-3 p-2 bg-surface-lowest/50 backdrop-blur-md rounded-full text-on-surface opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface-lowest"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
      <h3 className="font-bold text-base leading-tight text-on-surface font-headline">{title}</h3>
      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
        <Clapperboard className="w-3 h-3" /> {movies}
      </p>
    </div>
  );
}
