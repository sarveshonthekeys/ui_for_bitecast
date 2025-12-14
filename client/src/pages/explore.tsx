import { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
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

export default function ExplorePage() {
  const [activeCat, setActiveCat] = useState("All");

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg pb-2 pt-2 -mx-4 px-4">
        <h1 className="font-display text-2xl font-semibold mb-4">Explore</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search topics, creators..." 
            className="pl-9 bg-secondary/50 border-transparent focus-visible:ring-1 focus-visible:ring-accent rounded-xl h-11" 
          />
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-2">
          {CATEGORIES.map((cat) => (
            <Badge 
              key={cat}
              variant={activeCat === cat ? "default" : "secondary"}
              onClick={() => setActiveCat(cat)}
              className={`rounded-full px-4 py-1.5 cursor-pointer whitespace-nowrap transition-colors ${activeCat === cat ? 'bg-white text-black hover:bg-white/90' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'}`}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Discovery Grid */}
      <div className="grid grid-cols-2 gap-4">
        {DISCOVERY_CARDS.map((card, i) => (
          <motion.div 
            key={card.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`aspect-square rounded-2xl relative overflow-hidden group cursor-pointer ${card.color}`}
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

      {/* Vertical Feed - UPDATED for better spacing and layout */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Trending for you</h2>
          <span className="text-xs text-accent cursor-pointer">View all</span>
        </div>
        
        <div className="grid grid-cols-1 gap-6"> {/* Increased gap for generous spacing */}
          {EXPLORE_FEED.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.05) }}
              className="group cursor-pointer"
            >
              {/* More spacious card layout */}
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
              
              {/* Subtle separator except for last item */}
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
