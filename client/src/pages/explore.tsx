import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, ArrowUpRight, ChevronLeft, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import discoverImg from "@assets/generated_images/abstract_discovery_card_art.png";
import textureImg from "@assets/generated_images/dark_abstract_gradient_texture.png";

const CATEGORIES = ["All", "Mindset", "Health", "Wealth", "Relationships", "Spirituality"];

const DISCOVERY_CARDS = [
  { id: 1, title: "Deep Work", subtitle: "Master Focus", color: "bg-blue-900/40", img: discoverImg },
  { id: 2, title: "Stoicism", subtitle: "Ancient Wisdom", color: "bg-orange-900/40", img: textureImg },
  { id: 3, title: "Biohacking", subtitle: "Optimize Health", color: "bg-emerald-900/40", img: null },
  { id: 4, title: "Psychology", subtitle: "Human Mind", color: "bg-purple-900/40", img: null },
];

const EXPLORE_FEED = [
  { id: 1, title: "The Art of Saying No", author: "Greg McKeown", category: "Mindset", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80" },
  { id: 2, title: "Sleep Smarter", author: "Shawn Stevenson", category: "Health", img: "https://images.unsplash.com/photo-1511296933631-18b5f0bc0846?w=800&q=80" },
  { id: 3, title: "Financial Freedom", author: "Morgan Housel", category: "Wealth", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80" },
  { id: 4, title: "Building Trust", author: "Simon Sinek", category: "Relationships", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80" },
  { id: 5, title: "The Power of Now", author: "Eckhart Tolle", category: "Spirituality", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" },
  { id: 6, title: "Atomic Habits", author: "James Clear", category: "Mindset", img: "https://images.unsplash.com/photo-1499750310159-52f0f83ad713?w=800&q=80" },
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

export default function ExplorePage() {
  const [activeCat, setActiveCat] = useState("All");
  const [selectedTrending, setSelectedTrending] = useState<typeof EXPLORE_FEED[0] | null>(null);
  const [_, setLocation] = useLocation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(3);

  const handleItemClick = (item: typeof EXPLORE_FEED[0]) => {
    setSelectedTrending(item);
    setActiveCardIndex(3);
  };

  const handleReelClick = (reelId: number) => {
    setLocation(`/reels?from=explore&reelId=${reelId}`);
  };

  const handleBack = () => {
    setSelectedTrending(null);
  };

  useEffect(() => {
    if (selectedTrending && carouselRef.current) {
      const cardWidth = 140;
      const gap = 16;
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollTo = (activeCardIndex * (cardWidth + gap)) - (containerWidth / 2) + (cardWidth / 2);
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }, [selectedTrending, activeCardIndex]);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = 140;
      const gap = 16;
      const containerWidth = carouselRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - cardWidth / 2;
      const newIndex = Math.round((scrollLeft + centerOffset) / (cardWidth + gap));
      setActiveCardIndex(Math.max(0, Math.min(newIndex, REEL_THUMBNAILS.length - 1)));
    }
  };

  if (selectedTrending) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-lg px-4 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
              data-testid="button-trending-back"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <div className="flex-1">
              <h1 className="font-display text-xl font-semibold text-white">{selectedTrending.title}</h1>
              <p className="text-sm text-muted-foreground">{selectedTrending.author}</p>
            </div>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {selectedTrending.category}
            </Badge>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center py-8">
          <div className="mb-6 px-4">
            <h2 className="text-lg font-medium text-white mb-1">Related Reels</h2>
            <p className="text-sm text-muted-foreground">Swipe to explore</p>
          </div>

          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-4 snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{ 
              scrollPaddingLeft: 'calc(50% - 70px)',
              scrollPaddingRight: 'calc(50% - 70px)',
            }}
          >
            <div className="shrink-0" style={{ width: 'calc(50% - 70px - 8px)' }} />
            
            {REEL_THUMBNAILS.map((reel, index) => {
              const isActive = index === activeCardIndex;
              return (
                <motion.div
                  key={reel.id}
                  className="shrink-0 snap-center cursor-pointer"
                  style={{ width: 140 }}
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => handleReelClick(reel.id)}
                  data-testid={`reel-thumbnail-${reel.id}`}
                >
                  <div 
                    className={`relative overflow-hidden rounded-2xl transition-shadow duration-300 ${
                      isActive ? 'shadow-2xl shadow-black/50' : 'shadow-lg shadow-black/30'
                    }`}
                    style={{ aspectRatio: '9/16' }}
                  >
                    <img 
                      src={reel.img} 
                      alt={reel.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}>
                        <Play size={20} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className={`text-sm font-medium text-white text-center drop-shadow-lg transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-70'
                      }`}>
                        {reel.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            <div className="shrink-0" style={{ width: 'calc(50% - 70px - 8px)' }} />
          </div>

          <div className="flex justify-center gap-1.5 mt-6">
            {REEL_THUMBNAILS.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeCardIndex 
                    ? 'w-6 bg-white' 
                    : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            {card.img && <img src={card.img} alt={`${card.title} background`} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-500 group-hover:scale-110" />}
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
        
        <div className="grid grid-cols-1 gap-6">
          {EXPLORE_FEED.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.05) }}
              className="group cursor-pointer"
              onClick={() => handleItemClick(item)}
              data-testid={`explore-feed-item-${item.id}`}
            >
              <div className="flex gap-5 items-start">
                 <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-lg relative">
                   <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                 </div>
                 
                 <div className="flex flex-col flex-1 py-1 space-y-2">
                   <span className="text-[10px] text-accent font-semibold tracking-wider uppercase">{item.category}</span>
                   <h4 className="font-display font-medium text-lg leading-tight text-white group-hover:text-primary transition-colors">{item.title}</h4>
                   <p className="text-sm text-muted-foreground">{item.author}</p>
                 </div>

                 <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    <ArrowUpRight className="text-white w-5 h-5" />
                 </div>
              </div>
              
              {i < EXPLORE_FEED.length - 1 && (
                <div className="mt-6 h-px bg-white/5 w-full" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
