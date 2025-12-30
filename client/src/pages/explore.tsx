import { useState, useRef } from "react";
import { Search, SlidersHorizontal, ArrowUpRight, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import discoverImg from "@assets/generated_images/abstract_discovery_card_art.png";
import textureImg from "@assets/generated_images/dark_abstract_gradient_texture.png";

const CATEGORIES = ["All", "Mindset", "Health", "Wealth", "Relationships", "Spirituality"];

const DISCOVERY_CARDS = [
  { id: 1, title: "Deep Work", subtitle: "Master Focus", color: "bg-blue-900/40", img: discoverImg },
  { id: 2, title: "Stoicism", subtitle: "Ancient Wisdom", color: "bg-orange-900/40", img: textureImg },
  { id: 3, title: "Biohacking", subtitle: "Optimize Health", color: "bg-emerald-900/40", img: null },
  { id: 4, title: "Psychology", subtitle: "Human Mind", color: "bg-purple-900/40", img: null },
  { id: 5, title: "Mindfulness", subtitle: "Mental Peace", color: "bg-teal-900/40", img: null },
  { id: 6, title: "Productivity", subtitle: "Time Mastery", color: "bg-amber-900/40", img: null },
];

const EXPLORE_FEED = [
  { id: 1, title: "The Art of Saying No" },
  { id: 2, title: "Sleep Smarter" },
  { id: 3, title: "Financial Freedom" },
  { id: 4, title: "Building Trust" },
  { id: 5, title: "The Power of Now" },
  { id: 6, title: "Atomic Habits" },
];

const REEL_THUMBNAILS = [
  { id: 1, img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=80", title: "Morning Routine" },
  { id: 2, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "Focus Tips" },
  { id: 3, img: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&q=80", title: "Deep Work" },
  { id: 4, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", title: "Mindfulness" },
  { id: 5, img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80", title: "Nature Calm" },
  { id: 6, img: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80", title: "Meditation" },
  { id: 7, img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&q=80", title: "Peaceful Mind" },
  { id: 8, img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80", title: "Growth" },
];

function ReelCarousel({ onReelClick }: { onReelClick: (id: number) => void }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div 
        ref={carouselRef}
        className="flex gap-3 overflow-x-auto no-scrollbar py-2 snap-x snap-mandatory"
      >
        {REEL_THUMBNAILS.map((reel) => (
          <motion.div
            key={reel.id}
            className="shrink-0 snap-start cursor-pointer"
            style={{ width: 110 }}
            onClick={() => onReelClick(reel.id)}
            data-testid={`reel-thumbnail-${reel.id}`}
          >
            <div 
              className="relative overflow-hidden rounded-xl shadow-md shadow-black/30"
              style={{ aspectRatio: '9/16' }}
            >
              <img 
                src={reel.img} 
                alt={reel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play size={14} className="text-white ml-0.5" fill="white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ExplorePage() {
  const [activeCat, setActiveCat] = useState("All");
  const [_, setLocation] = useLocation();

  const handleReelClick = (reelId: number) => {
    setLocation(`/reels?from=explore&reelId=${reelId}`);
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg pb-2 pt-2 -mx-4 px-4">
        <h1 className="font-display text-2xl font-semibold mb-4">Explore</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search topics, creators..." 
            className="pl-9 bg-secondary/50 border-transparent focus-visible:ring-1 focus-visible:ring-accent rounded-xl h-11" 
            data-testid="input-explore-search"
          />
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-2">
          {CATEGORIES.map((cat) => (
            <Badge 
              key={cat}
              variant={activeCat === cat ? "default" : "secondary"}
              onClick={() => setActiveCat(cat)}
              className={`rounded-full px-4 py-1.5 cursor-pointer whitespace-nowrap transition-colors ${activeCat === cat ? 'bg-white text-black hover:bg-white/90' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'}`}
              data-testid={`badge-category-${cat.toLowerCase()}`}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {DISCOVERY_CARDS.map((card, i) => (
          <motion.div 
            key={card.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`aspect-square rounded-2xl relative overflow-hidden group cursor-pointer ${card.color}`}
            onClick={() => setLocation("/reels?from=explore")}
            data-testid={`discover-card-${card.id}`}
          >
            {card.img && <img src={card.img} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-500 group-hover:scale-110" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <span className="text-[10px] uppercase tracking-wider text-white/60 font-medium mb-1 block">{card.subtitle}</span>
              <h3 className="text-lg font-display font-bold text-white leading-tight flex justify-between items-end">
                {card.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Trending for you</h2>
          <span className="text-xs text-accent cursor-pointer" data-testid="link-view-all">View all</span>
        </div>
        
        {EXPLORE_FEED.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.05) }}
            data-testid={`explore-feed-item-${item.id}`}
            className="space-y-3"
          >
            <h3 className="font-display font-medium text-lg text-white">{item.title}</h3>
            <ReelCarousel onReelClick={handleReelClick} />
            
            {i < EXPLORE_FEED.length - 1 && (
              <div className="mt-4 h-px bg-white/5 w-full" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
