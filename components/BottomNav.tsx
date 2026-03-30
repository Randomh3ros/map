import { Map, Clapperboard, ScanFace, Library, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  const navItems = [
    { id: 'map', icon: Map, label: 'Map' },
    { id: 'reels', icon: Clapperboard, label: 'Reels' },
    { id: 'scout', icon: ScanFace, label: 'Scout' },
    { id: 'scrapbook', icon: Library, label: 'Scrapbook' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-surface-lowest/80 backdrop-blur-xl rounded-t-[2rem] border-t border-outline/20 shadow-[0_-4px_24px_rgba(212,175,55,0.12)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onChangeTab(item.id)}
            className={cn(
              "flex flex-col items-center justify-center transition-all duration-200 active:scale-90",
              isActive ? "text-secondary drop-shadow-[0_0_8px_rgba(0,227,253,0.5)]" : "text-on-surface/60 hover:text-primary"
            )}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="font-headline text-[10px] uppercase tracking-widest font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
