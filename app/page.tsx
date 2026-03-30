'use client';

import { useState } from 'react';
import { TopNav } from '@/components/TopNav';
import { BottomNav } from '@/components/BottomNav';
import { MapTab } from '@/components/MapTab';
import { ScoutTab } from '@/components/ScoutTab';
import { ScrapbookTab } from '@/components/ScrapbookTab';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('map');

  const handleSelectLocation = (id: string) => {
    console.log('Selected location:', id);
    // In a real app, this would open a location details view or modal
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-surface-lowest text-on-surface">
      {/* Top Navigation - hidden on Scout tab as it has its own camera HUD nav */}
      {activeTab !== 'scout' && <TopNav />}

      {/* Main Content Area */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <MapTab onSelectLocation={handleSelectLocation} />
            </motion.div>
          )}
          
          {activeTab === 'reels' && (
            <motion.div
              key="reels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col items-center justify-center pt-20 pb-32 px-6"
            >
              <h2 className="text-3xl font-bold font-headline text-primary mb-4 uppercase tracking-widest">Reels</h2>
              <p className="text-on-surface-variant text-center max-w-md">
                Discover cinematic shots and storyboards from other directors. Coming soon.
              </p>
            </motion.div>
          )}

          {activeTab === 'scout' && (
            <motion.div
              key="scout"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <ScoutTab />
            </motion.div>
          )}

          {activeTab === 'scrapbook' && (
            <motion.div
              key="scrapbook"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <ScrapbookTab onSelectLocation={handleSelectLocation} />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col items-center justify-center pt-20 pb-32 px-6"
            >
              <div className="w-24 h-24 rounded-full bg-surface-high border-2 border-primary/30 mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
              <h2 className="text-3xl font-bold font-headline text-on-surface mb-2 uppercase tracking-widest">Director</h2>
              <p className="text-secondary text-sm tracking-[0.2em] uppercase font-bold mb-8">Pro Member</p>
              
              <div className="w-full max-w-md space-y-4">
                <div className="glass-panel p-4 rounded-2xl border border-outline/20 flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium">Saved Locations</span>
                  <span className="text-primary font-bold">142</span>
                </div>
                <div className="glass-panel p-4 rounded-2xl border border-outline/20 flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium">Active Projects</span>
                  <span className="text-primary font-bold">3</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </main>
  );
}
