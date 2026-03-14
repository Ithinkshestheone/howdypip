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
  Crosshair,
  Sword,
  Bomb,
  Hammer,
  Shirt,
  ShieldAlert,
  Syringe,
  FlaskConical,
  GlassWater,
  Trash2,
  Box,
  Cog,
  ZapOff,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  Navigation,
  Info,
  X,
  Signal,
  Activity as ActivityIcon,
  Search,
  Star,
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

interface InventoryItem {
  name: string;
  description: string;
  weight: number;
  value: number;
  icon: React.ReactNode;
  stats?: Record<string, string | number>;
}

const InvView: React.FC<{ subTab: string }> = ({ subTab }) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const items: Record<string, InventoryItem[]> = {
    WEAPONS: [
      { 
        name: '10mm Pistol', 
        description: 'A reliable semi-automatic sidearm. A staple of the wasteland.',
        weight: 3.5, 
        value: 50,
        icon: <Crosshair size={24} />,
        stats: { DAMAGE: 18, AMMO: '10mm', FIRE_RATE: 46, RANGE: 83 }
      },
      { 
        name: 'Combat Rifle', 
        description: 'Versatile rifle capable of semi-auto or automatic fire.',
        weight: 11.1, 
        value: 120,
        icon: <Crosshair size={24} />,
        stats: { DAMAGE: 33, AMMO: '.45', FIRE_RATE: 33, RANGE: 119 }
      },
      { 
        name: 'Frag Grenade', 
        description: 'Standard fragmentation grenade. Pull pin, throw, and run.',
        weight: 0.5, 
        value: 25,
        icon: <Bomb size={24} />,
        stats: { DAMAGE: 150, RADIUS: 15 }
      },
      { 
        name: 'Sledgehammer', 
        description: 'A heavy, two-handed hammer. Good for smashing things.',
        weight: 12.0, 
        value: 40,
        icon: <Hammer size={24} />,
        stats: { DAMAGE: 25, SPEED: 'Slow' }
      },
    ],
    APPAREL: [
      { 
        name: 'Vault 111 Jumpsuit', 
        description: 'Standard issue Vault-Tec jumpsuit. Provides mild protection.',
        weight: 1.0, 
        value: 20,
        icon: <Shirt size={24} />,
        stats: { DR: 5, ER: 10, RR: 5 }
      },
      { 
        name: 'Leather Chest Piece', 
        description: 'Treated leather armor. Lightweight and effective against physical damage.',
        weight: 5.0, 
        value: 35,
        icon: <Shield size={24} />,
        stats: { DR: 12, ER: 8 }
      },
      { 
        name: 'Military Cap', 
        description: 'A standard military cap. Offers little protection but looks sharp.',
        weight: 0.5, 
        value: 10,
        icon: <Shirt size={24} />,
        stats: { DR: 1, PER: '+1' }
      },
    ],
    AID: [
      { 
        name: 'Stimpak', 
        description: 'A miracle of pre-war medicine. Restores health rapidly.',
        weight: 0.1, 
        value: 50,
        icon: <Syringe size={24} />,
        stats: { HEAL: '30% HP' }
      },
      { 
        name: 'Rad-Away', 
        description: 'Chemical solution that flushes radiation from the body.',
        weight: 0.1, 
        value: 80,
        icon: <FlaskConical size={24} />,
        stats: { RADS: '-300' }
      },
      { 
        name: 'Purified Water', 
        description: 'Clean, radiation-free water. Essential for survival.',
        weight: 0.5, 
        value: 20,
        icon: <GlassWater size={24} />,
        stats: { HP: '+20', RADS: 0 }
      },
    ],
    JUNK: [
      { 
        name: 'Duct Tape', 
        description: 'The universal fix-all. Highly valued for its adhesive properties.',
        weight: 0.1, 
        value: 5,
        icon: <Box size={24} />,
        stats: { ADHESIVE: 1, CLOTH: 1 }
      },
      { 
        name: 'Desk Fan', 
        description: 'A common pre-war office fan. Contains useful mechanical parts.',
        weight: 3.0, 
        value: 15,
        icon: <Cog size={24} />,
        stats: { GEARS: 2, SCREWS: 2, STEEL: 2 }
      },
      { 
        name: 'Wonderglue', 
        description: 'Industrial-strength adhesive. Sticks to almost anything.',
        weight: 0.1, 
        value: 10,
        icon: <Box size={24} />,
        stats: { ADHESIVE: 2 }
      },
    ]
  };

  const currentItems = items[subTab] || [];

  // Set initial selected item if none selected or if tab changed
  useEffect(() => {
    if (currentItems.length > 0) {
      setSelectedItem(currentItems[0]);
    } else {
      setSelectedItem(null);
    }
  }, [subTab]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-8">
      <div className="flex flex-col gap-1 overflow-y-auto pr-2 custom-scrollbar">
        {currentItems.map((item) => (
          <div 
            key={item.name} 
            onClick={() => setSelectedItem(item)}
            className={`flex justify-between items-center p-2 transition-colors cursor-pointer border-l-4 ${
              selectedItem?.name === item.name 
                ? 'bg-pip-green text-pip-bg border-pip-green' 
                : 'border-transparent hover:bg-pip-green/10 hover:border-pip-green/30'
            }`}
          >
            <span className="font-bold uppercase">{item.name}</span>
            <span className="text-xs opacity-60">{item.weight}</span>
          </div>
        ))}
      </div>
      
      <div className="hidden md:flex flex-col p-4 border-l border-pip-green/20 gap-4 overflow-y-auto">
        {selectedItem ? (
          <motion.div 
            key={selectedItem.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4 border-b border-pip-green/30 pb-4">
              <div className="p-4 border-2 border-pip-green/30 rounded-lg">
                {selectedItem.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase">{selectedItem.name}</h3>
                <p className="text-xs opacity-70 italic">{selectedItem.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {selectedItem.stats && Object.entries(selectedItem.stats).map(([key, val]) => (
                <div key={key} className="flex justify-between text-xs border-b border-pip-green/10 pb-1">
                  <span className="opacity-60">{key}</span>
                  <span className="font-bold">{val}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-xs border-b border-pip-green/30 pb-1">
                <span>WEIGHT</span>
                <span>{selectedItem.weight}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-pip-green/30 pb-1">
                <span>VALUE</span>
                <span>{selectedItem.value}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center opacity-30 italic">
            Select an item to view details
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-pip-green/20 flex flex-col gap-1">
          <div className="flex justify-between text-[10px] opacity-60">
            <span>TOTAL WEIGHT</span>
            <span>142/250</span>
          </div>
          <div className="flex justify-between text-[10px] opacity-60">
            <span>CAPS</span>
            <span>1,240</span>
          </div>
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

interface Location {
  id: string;
  name: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
}

const locations: Location[] = [
  { id: 'sanctuary', name: 'Sanctuary', description: 'Your pre-war home. A quiet neighborhood now serving as a primary settlement for survivors.', x: 20, y: 20 },
  { id: 'concord', name: 'Concord', description: 'The site of the first major battle for the Minutemen. Home to the Museum of Freedom.', x: 35, y: 35 },
  { id: 'lexington', name: 'Lexington', description: 'A once-bustling suburb, now a dangerous territory filled with Feral Ghouls and Raiders.', x: 45, y: 45 },
  { id: 'diamond-city', name: 'Diamond City', description: 'The Great Green Jewel. A massive settlement built within the fortified walls of Fenway Park.', x: 65, y: 70 },
  { id: 'goodneighbor', name: 'Goodneighbor', description: 'A town of misfits and outcasts, built around the Old State House in the heart of Boston.', x: 75, y: 60 },
  { id: 'bunker-hill', name: 'Bunker Hill', description: 'A historic monument turned trade hub, serving as a neutral ground for caravans.', x: 70, y: 55 },
];

const MapView: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const resetMap = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="h-full w-full relative border border-pip-green/20 overflow-hidden bg-pip-bg cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      ref={mapRef}
    >
      {/* Map Content Container */}
      <motion.div 
        className="absolute inset-0 w-full h-full origin-center"
        animate={{ 
          scale: zoom,
          x: offset.x,
          y: offset.y
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Background Grid */}
        <div className="absolute inset-[-100%] grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] opacity-10">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-pip-green/30" />
          ))}
        </div>

        {/* Map Background Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <MapIcon size={600} />
        </div>

        {/* Locations */}
        {locations.map((loc) => (
          <div 
            key={loc.id}
            className="absolute flex flex-col items-center group cursor-pointer"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLocation(loc);
            }}
          >
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className={`w-4 h-4 rotate-45 border-2 border-pip-green ${selectedLocation?.id === loc.id ? 'bg-pip-green' : 'bg-transparent'} transition-colors`}
            />
            <span className="text-[10px] mt-1 bg-pip-bg px-1 border border-pip-green/20 whitespace-nowrap font-bold uppercase">
              {loc.name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Map Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button onClick={zoomIn} className="p-2 bg-pip-bg border border-pip-green/50 hover:bg-pip-green hover:text-pip-bg transition-colors">
          <ZoomIn size={16} />
        </button>
        <button onClick={zoomOut} className="p-2 bg-pip-bg border border-pip-green/50 hover:bg-pip-green hover:text-pip-bg transition-colors">
          <ZoomOut size={16} />
        </button>
        <button onClick={resetMap} className="p-2 bg-pip-bg border border-pip-green/50 hover:bg-pip-green hover:text-pip-bg transition-colors">
          <Navigation size={16} className="rotate-45" />
        </button>
      </div>

      {/* Location Details Panel */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute top-4 right-4 bottom-16 w-64 bg-pip-bg border-2 border-pip-green p-4 z-20 flex flex-col gap-4 shadow-[0_0_20px_rgba(26,255,26,0.2)]"
          >
            <div className="flex justify-between items-start border-b border-pip-green/30 pb-2">
              <h3 className="text-lg font-bold uppercase leading-tight">{selectedLocation.name}</h3>
              <button onClick={() => setSelectedLocation(null)} className="hover:text-pip-green/50">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <div className="flex items-center gap-2 text-xs mb-4 opacity-70">
                <Info size={14} />
                <span>LOCATION DATA</span>
              </div>
              <p className="text-sm italic opacity-80">{selectedLocation.description}</p>
              
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex justify-between text-[10px] border-b border-pip-green/10 pb-1">
                  <span>COORDINATES</span>
                  <span>{selectedLocation.x.toFixed(1)}, {selectedLocation.y.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-[10px] border-b border-pip-green/10 pb-1">
                  <span>STATUS</span>
                  <span>DISCOVERED</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 border border-pip-green hover:bg-pip-green hover:text-pip-bg transition-colors font-bold text-xs uppercase">
              Set Waypoint
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 text-[10px] opacity-70 font-bold uppercase tracking-widest pointer-events-none">
        Commonwealth Map v4.2
      </div>
    </div>
  );
};

const RadioView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeIndicator, setShowVolumeIndicator] = useState(false);
  const [activeStation, setActiveStation] = useState('Diamond City Radio');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['Diamond City Radio']);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const volumeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const stations = [
    { 
      name: 'Diamond City Radio', 
      freq: '98.3', 
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      strength: 95
    },
    { 
      name: 'Classical Radio', 
      freq: '102.1', 
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      strength: 80
    },
    { 
      name: 'Radio Freedom', 
      freq: '88.5', 
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      strength: 45
    },
    { 
      name: 'Vault-Tec Radio', 
      freq: '107.9', 
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      strength: 60
    },
  ];

  const toggleFavorite = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const filteredStations = stations
    .filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.freq.includes(searchQuery)
    )
    .sort((a, b) => {
      const aFav = favorites.includes(a.name);
      const bFav = favorites.includes(b.name);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });

  const currentStation = stations.find(s => s.name === activeStation);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    
    // Show volume indicator
    setShowVolumeIndicator(true);
    if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
    volumeTimerRef.current = setTimeout(() => setShowVolumeIndicator(false), 1500);

    return () => {
      if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
    };
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeStation]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col gap-4 h-full relative">
      <audio 
        ref={audioRef} 
        src={currentStation?.url} 
        loop 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Volume Indicator Overlay */}
      <AnimatePresence>
        {showVolumeIndicator && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-30 bg-pip-green text-pip-bg px-4 py-1 font-bold text-xs rounded-b-lg shadow-lg"
          >
            VOLUME: {Math.round(volume * 100)}%
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="relative group">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-pip-green/50 group-focus-within:text-pip-green transition-colors" />
        <input 
          type="text"
          placeholder="SEARCH FREQUENCY OR NAME..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-pip-green/5 border border-pip-green/20 focus:border-pip-green focus:bg-pip-green/10 outline-none py-2 pl-10 pr-4 text-xs font-bold uppercase tracking-widest transition-all placeholder:text-pip-green/30"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-pip-green/50"
          >
            <X size={14} />
          </button>
        )}
      </div>
      
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
        {filteredStations.length > 0 ? (
          filteredStations.map((s) => (
            <div 
              key={s.name} 
              onClick={() => {
                setActiveStation(s.name);
                setIsPlaying(true);
              }}
              className={`flex justify-between items-center p-4 border transition-all cursor-pointer relative overflow-hidden ${
                activeStation === s.name ? 'bg-pip-green text-pip-bg border-pip-green' : 'border-pip-green/20 hover:border-pip-green/50'
              }`}
            >
              {activeStation === s.name && isPlaying && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-white/10 pointer-events-none"
                />
              )}
              <div className="flex items-center gap-3 z-10">
                <button 
                  onClick={(e) => toggleFavorite(s.name, e)}
                  className={`transition-colors ${favorites.includes(s.name) ? 'text-pip-bg' : 'text-pip-green/40 hover:text-pip-green'}`}
                >
                  <Star size={16} fill={favorites.includes(s.name) ? "currentColor" : "none"} />
                </button>
                <RadioIcon size={20} className={activeStation === s.name && isPlaying ? 'animate-pulse' : ''} />
                <div className="flex flex-col">
                  <span className="font-bold uppercase">{s.name}</span>
                  <div className="flex items-center gap-2 text-[10px] opacity-70">
                    <Signal size={10} />
                    <span>SIGNAL: {s.strength}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end z-10">
                <span className="text-sm font-bold">{s.freq} FM</span>
                {activeStation === s.name && isPlaying && (
                  <span className="text-[8px] animate-pulse">TUNED IN</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30 gap-2 italic">
            <Signal size={48} className="animate-pulse" />
            <span className="text-sm uppercase font-bold tracking-widest">No Signal Found</span>
          </div>
        )}
      </div>

      {/* Audio Controls */}
      <div className="p-4 border-t-2 border-pip-green/30 flex flex-col gap-4 bg-pip-bg/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className={`p-2 border-2 border-pip-green rounded-full transition-all ${
                isPlaying ? 'bg-pip-green text-pip-bg shadow-[0_0_15px_rgba(26,255,26,0.5)]' : 'hover:bg-pip-green hover:text-pip-bg'
              }`}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-60 uppercase">Now Playing</span>
                {isPlaying && <ActivityIcon size={12} className="text-pip-green animate-pulse" />}
              </div>
              <motion.span 
                animate={isPlaying ? { opacity: [1, 0.7, 1], scale: [1, 1.02, 1] } : { opacity: 1, scale: 1 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="font-bold uppercase truncate max-w-[120px] md:max-w-none"
              >
                {activeStation}
              </motion.span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-32 md:w-48 group">
            <button 
              onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
              className="hover:text-pip-green transition-colors"
            >
              {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <div className="flex-1 relative h-6 flex items-center">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-pip-green h-1 bg-pip-green/20 rounded-lg appearance-none cursor-pointer z-10"
              />
              {/* Volume Glow Track */}
              <div 
                className="absolute left-0 h-1 bg-pip-green shadow-[0_0_10px_rgba(26,255,26,0.8)] rounded-lg pointer-events-none transition-all"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Improved Visualizer */}
        <div className="h-16 bg-pip-green/5 border border-pip-green/10 rounded relative overflow-hidden flex items-center px-2">
          <motion.div 
            animate={isPlaying ? { opacity: [0.3, 0.1, 0.3] } : { opacity: 0.3 }}
            transition={{ repeat: Infinity, duration: 0.1 }}
            className="absolute top-1 left-2 text-[8px] font-bold uppercase tracking-tighter z-20"
          >
            Audio Spectrum Analysis
          </motion.div>
          
          <motion.div 
            animate={isPlaying ? { x: [-150, 150] } : { x: 0 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute h-full w-1 bg-pip-green/20 blur-[2px] z-0"
          />
          
          <div className="absolute inset-0 flex justify-around items-end px-2 gap-[2px] z-10">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div 
                key={i} 
                animate={isPlaying ? { 
                  height: [
                    `${10 + Math.random() * 10 * volume}%`, 
                    `${20 + Math.random() * 60 * volume}%`, 
                    `${15 + Math.random() * 30 * volume}%`, 
                    `${30 + Math.random() * 70 * volume}%`, 
                    `${10 + Math.random() * 10 * volume}%`
                  ] 
                } : { height: '10%' }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.3 + Math.random() * 0.4, 
                  delay: i * 0.03 
                }}
                className="w-1 bg-pip-green shadow-[0_0_5px_rgba(26,255,26,0.3)]" 
                style={{ opacity: 0.3 + (i % 5 === 0 ? 0.4 : 0.2) }}
              />
            ))}
          </div>
          
          {/* Visualizer Grid Overlay with subtle animation */}
          <motion.div 
            animate={isPlaying ? { opacity: [0.1, 0.15, 0.1] } : { opacity: 0.1 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 grid grid-rows-4 pointer-events-none z-20"
          >
            <div className="border-b border-pip-green" />
            <div className="border-b border-pip-green" />
            <div className="border-b border-pip-green" />
          </motion.div>

          {/* Static/Noise Background Layer */}
          {isPlaying && (
            <motion.div 
              animate={{ opacity: [0.02, 0.05, 0.02] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="absolute inset-0 bg-pip-green pointer-events-none z-0"
            />
          )}
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
