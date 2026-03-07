/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Map as MapIcon, 
  Radio as RadioIcon,
  User,
  Shield,
  Zap,
  Skull,
} from 'lucide-react';

type Tab = 'STAT' | 'INV' | 'DATA' | 'MAP' | 'RADIO';

const StatView: React.FC<{ subTab: string }> = ({ subTab }) => {
  if (subTab === 'STATUS') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-8">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 border-2 border-pip-green/20 rounded-full flex items-center justify-center">
            <User size={120} className="text-pip-green animate-pulse" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pip-bg px-2 text-xs">HEAD</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-pip-bg px-2 text-xs">LEGS</div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-pip-bg px-2 text-xs">L. ARM</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-pip-bg px-2 text-xs">R. ARM</div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="flex justify-between items-center border-b border-pip-green/30 pb-2">
            <div className="flex items-center gap-2"><Shield size={16} /> DAMAGE RESIST</div>
            <span>45</span>
          </div>
          <div className="flex justify-between items-center border-b border-pip-green/30 pb-2">
            <div className="flex items-center gap-2"><Zap size={16} /> ENERGY RESIST</div>
            <span>32</span>
          </div>
          <div className="flex justify-between items-center border-b border-pip-green/30 pb-2">
            <div className="flex items-center gap-2"><Skull size={16} /> RAD RESIST</div>
            <span>10</span>
          </div>
        </div>
      </div>
    );
  }

  if (subTab === 'SPECIAL') {
    const special = [
      { name: 'STRENGTH', val: 6, desc: 'Strength is a measure of your raw physical power.' },
      { name: 'PERCEPTION', val: 7, desc: 'Perception is your environmental awareness and "sixth sense".' },
      { name: 'ENDURANCE', val: 5, desc: 'Endurance is a measure of your overall physical fitness.' },
      { name: 'CHARISMA', val: 8, desc: 'Charisma is your ability to charm and convince others.' },
      { name: 'INTELLIGENCE', val: 9, desc: 'Intelligence is a measure of your overall mental acuity.' },
      { name: 'AGILITY', val: 4, desc: 'Agility is a measure of your overall finesse and reflexes.' },
      { name: 'LUCK', val: 3, desc: 'Luck is a measure of your general good fortune.' },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-8 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {special.map((s) => (
            <div key={s.name} className="flex justify-between items-center p-2 hover:bg-pip-green hover:text-pip-bg transition-colors cursor-pointer group">
              <span className="font-bold">{s.name}</span>
              <span className="font-bold text-xl">{s.val}</span>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-col justify-center items-center text-center p-4 border-l border-pip-green/20">
          <Activity size={80} className="mb-4" />
          <p className="text-sm opacity-80">Select a S.P.E.C.I.A.L. attribute to see its description.</p>
        </div>
      </div>
    );
  }

  return <div className="flex items-center justify-center h-full opacity-50 italic">No perks unlocked yet...</div>;
};

const InvView: React.FC<{ subTab: string }> = ({ subTab }) => {
  const items: Record<string, { name: string; dmg?: number; wt: number; val: number }[]> = {
    WEAPONS: [
      { name: '10mm Pistol', dmg: 18, wt: 3.5, val: 50 },
      { name: 'Combat Rifle', dmg: 33, wt: 11.1, val: 120 },
      { name: 'Frag Grenade (4)', dmg: 150, wt: 0.5, val: 25 },
      { name: 'Sledgehammer', dmg: 25, wt: 12.0, val: 40 },
    ],
    APPAREL: [
      { name: 'Vault 111 Jumpsuit', wt: 1.0, val: 20 },
      { name: 'Leather Chest Piece', wt: 5.0, val: 35 },
      { name: 'Military Cap', wt: 0.5, val: 10 },
    ],
    AID: [
      { name: 'Stimpak (12)', wt: 0.1, val: 50 },
      { name: 'Rad-Away (5)', wt: 0.1, val: 80 },
      { name: 'Purified Water (8)', wt: 0.5, val: 20 },
    ]
  };

  const currentItems = items[subTab] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-8">
      <div className="flex flex-col gap-1 overflow-y-auto pr-2">
        {currentItems.map((item) => (
          <div key={item.name} className="flex justify-between items-center p-2 hover:bg-pip-green hover:text-pip-bg transition-colors cursor-pointer">
            <span className="font-bold uppercase">{item.name}</span>
            {item.dmg && <span className="text-xs">DMG: {item.dmg}</span>}
          </div>
        ))}
      </div>
      <div className="hidden md:flex flex-col justify-end p-4 border-l border-pip-green/20 gap-2">
        <div className="flex justify-between text-xs border-b border-pip-green/30 pb-1">
          <span>WEIGHT</span>
          <span>142/250</span>
        </div>
        <div className="flex justify-between text-xs border-b border-pip-green/30 pb-1">
          <span>CAPS</span>
          <span>1,240</span>
        </div>
      </div>
    </div>
  );
};

const DataView: React.FC<{ subTab: string }> = ({ subTab }) => {
  const quests = [
    { name: 'Out of Time', status: 'COMPLETED' },
    { name: 'When Freedom Calls', status: 'ACTIVE' },
    { name: 'Jewel of the Commonwealth', status: 'ACTIVE' },
    { name: 'Sanctuary', status: 'ACTIVE' },
  ];

  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto">
      {quests.map((q) => (
        <div key={q.name} className="flex justify-between items-center p-3 border border-pip-green/20 hover:bg-pip-green hover:text-pip-bg transition-colors cursor-pointer">
          <span className="font-bold uppercase">{q.name}</span>
          <span className={`text-xs px-2 py-1 border border-current ${q.status === 'COMPLETED' ? 'opacity-50' : ''}`}>
            {q.status}
          </span>
        </div>
      ))}
    </div>
  );
};

const MapView: React.FC = () => {
  return (
    <div className="h-full w-full relative border border-pip-green/20 overflow-hidden bg-pip-green/5">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <MapIcon size={200} className="opacity-10" />
      </div>
      {/* Mock Map Grid */}
      <div className="grid grid-cols-10 grid-rows-10 h-full w-full opacity-20">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-pip-green/30" />
        ))}
      </div>
      {/* Map Markers */}
      <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
        <div className="w-3 h-3 bg-pip-green rotate-45 animate-pulse" />
        <span className="text-[10px] mt-1 bg-pip-bg px-1">SANCTUARY</span>
      </div>
      <div className="absolute top-1/2 left-1/2 flex flex-col items-center">
        <div className="w-3 h-3 bg-pip-green rotate-45" />
        <span className="text-[10px] mt-1 bg-pip-bg px-1">CONCORD</span>
      </div>
      <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
        <div className="w-3 h-3 bg-pip-green rotate-45" />
        <span className="text-[10px] mt-1 bg-pip-bg px-1">DIAMOND CITY</span>
      </div>
      
      <div className="absolute bottom-4 left-4 text-[10px] opacity-70">
        COMMONWEALTH
      </div>
    </div>
  );
};

const RadioView: React.FC = () => {
  const stations = [
    { name: 'Diamond City Radio', freq: '98.3', active: true },
    { name: 'Classical Radio', freq: '102.1', active: false },
    { name: 'Radio Freedom', freq: '88.5', active: false },
    { name: 'Vault-Tec Radio', freq: '107.9', active: false },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {stations.map((s) => (
          <div key={s.name} className={`flex justify-between items-center p-4 border transition-all cursor-pointer ${
            s.active ? 'bg-pip-green text-pip-bg border-pip-green' : 'border-pip-green/20 hover:border-pip-green/50'
          }`}>
            <div className="flex items-center gap-3">
              <RadioIcon size={20} />
              <span className="font-bold uppercase">{s.name}</span>
            </div>
            <span className="text-sm">{s.freq} FM</span>
          </div>
        ))}
      </div>
      <div className="h-24 border-t-2 border-pip-green/30 flex items-center justify-center gap-4">
        <div className="w-full h-8 bg-pip-green/10 relative overflow-hidden flex items-center">
          <motion.div 
            animate={{ x: [-100, 100] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute h-full w-1 bg-pip-green shadow-[0_0_10px_var(--color-pip-green)]"
          />
          <div className="absolute inset-0 flex justify-around opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={`w-[1px] bg-pip-green ${i % 5 === 0 ? 'h-full' : 'h-1/2'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('STAT');
  const [subTab, setSubTab] = useState<string>('STATUS');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs: Tab[] = ['STAT', 'INV', 'DATA', 'MAP', 'RADIO'];
  
  const subTabs: Record<Tab, string[]> = {
    STAT: ['STATUS', 'SPECIAL', 'PERKS'],
    INV: ['WEAPONS', 'APPAREL', 'AID', 'MISC', 'JUNK', 'MODS', 'AMMO'],
    DATA: ['QUESTS', 'WORKSHOPS', 'STATS'],
    MAP: ['WORLD'],
    RADIO: ['STATIONS']
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'STAT':
        return <StatView subTab={subTab} />;
      case 'INV':
        return <InvView subTab={subTab} />;
      case 'DATA':
        return <DataView subTab={subTab} />;
      case 'MAP':
        return <MapView />;
      case 'RADIO':
        return <RadioView />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden select-none bg-pip-bg">
      <div className="crt-overlay" />
      <div className="scanline" />
      
      {/* Main Pip-Boy Screen Container */}
      <div className="relative w-full max-w-5xl h-full border-4 border-pip-green/30 rounded-[40px] p-6 md:p-10 flex flex-col bg-pip-bg shadow-[0_0_50px_rgba(26,255,26,0.1)] overflow-hidden">
        
        {/* Header Tabs */}
        <div className="flex justify-between items-end border-b-2 border-pip-green mb-6 pb-2">
          <div className="flex gap-4 md:gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSubTab(subTabs[tab][0]);
                }}
                className={`text-xl md:text-2xl font-bold px-2 transition-all ${
                  activeTab === tab ? 'pip-tab-active scale-110' : 'hover:text-pip-green/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="hidden md:block text-sm opacity-70">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex gap-4 mb-6 overflow-x-auto no-scrollbar">
          {subTabs[activeTab].map((st) => (
            <button
              key={st}
              onClick={() => setSubTab(st)}
              className={`text-sm md:text-base font-bold whitespace-nowrap transition-all ${
                subTab === st ? 'text-pip-green border-b-2 border-pip-green' : 'text-pip-green/40 hover:text-pip-green/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${subTab}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 pt-4 border-t-2 border-pip-green flex justify-between items-center text-xs md:text-sm font-bold">
          <div className="flex gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <span>HP</span>
              <div className="w-24 md:w-32 h-3 border border-pip-green p-[1px]">
                <div className="h-full bg-pip-green w-[85%]" />
              </div>
              <span>185/210</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span>LEVEL 42</span>
              <div className="w-24 md:w-32 h-3 border border-pip-green p-[1px]">
                <div className="h-full bg-pip-green w-[60%]" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>AP</span>
            <div className="w-24 md:w-32 h-3 border border-pip-green p-[1px]">
              <div className="h-full bg-pip-green w-[92%]" />
            </div>
            <span>92/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
