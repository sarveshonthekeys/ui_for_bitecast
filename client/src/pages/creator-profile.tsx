import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import avatarImg from "@assets/generated_images/minimalist_portrait_avatar.png";
import discoverImg from "@assets/generated_images/abstract_discovery_card_art.png";
import textureImg from "@assets/generated_images/dark_abstract_gradient_texture.png";

const POPULAR_PODCASTS = [
  {
    id: 1,
    title: "Mindset Mastery",
    clips: 45,
    episodes: 120,
    color: "bg-blue-900/40",
    img: discoverImg,
  },
  {
    id: 2,
    title: "Deep Focus Daily",
    clips: 38,
    episodes: 98,
    color: "bg-purple-900/40",
    img: textureImg,
  },
  {
    id: 3,
    title: "Life Philosophy",
    clips: 52,
    episodes: 156,
    color: "bg-emerald-900/40",
    img: null,
  },
];

const CREATOR_PODCASTS = [
  { id: 1, title: "Mindset Mastery", episodes: 120, img: discoverImg },
  { id: 2, title: "Deep Focus Daily", episodes: 98, img: textureImg },
  { id: 3, title: "Life Philosophy", episodes: 156, img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=150&h=150&fit=crop&crop=faces" },
  { id: 4, title: "Growth Hacking", episodes: 87, img: "https://images.unsplash.com/photo-1505373877841-efb58603ba67?w=150&h=150&fit=crop&crop=faces" },
  { id: 5, title: "Success Stories", episodes: 134, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop&crop=faces" },
  { id: 6, title: "Think Tank", episodes: 92, img: "https://images.unsplash.com/photo-1484633569332-a0f79b18d444?w=150&h=150&fit=crop&crop=faces" },
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

export default function CreatorProfilePage() {
  const [_, setLocation] = useLocation();

  const handleReelClick = (reelId: number) => {
    setLocation(`/reels?from=creator&reelId=${reelId}`);
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      {/* Analytics Dashboard Header */}
      <div className="flex flex-col items-center space-y-6">
        {/* Avatar */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl"></div>
          <Avatar className="w-20 h-20 border-4 border-background relative z-10">
            <AvatarImage src={avatarImg} />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>

        {/* Creator Info */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-display font-bold">Alex Brilliance</h1>
          <p className="text-sm text-muted-foreground">@alexbrilliance • Creator</p>
        </div>

        {/* Analytics Dashboard */}
        <div className="w-full max-w-sm space-y-4">
          {/* Main Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="bg-secondary/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 text-center space-y-2 hover-elevate"
              data-testid="stat-podcasts"
            >
              <div className="text-2xl font-bold text-accent">24</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Podcasts</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-secondary/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 text-center space-y-2 hover-elevate relative"
              data-testid="stat-clips"
            >
              <div className="text-2xl font-bold text-accent">
                1.2K
                <span className="text-[10px] font-semibold text-white/60 absolute -top-1 -right-2">2.4K</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Clips</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-secondary/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 text-center space-y-2 hover-elevate"
              data-testid="stat-subscribers"
            >
              <div className="text-2xl font-bold text-accent">85K</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Subscribers</div>
            </motion.div>
          </div>

          {/* Total Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm border border-accent/20 rounded-2xl p-4 text-center space-y-1 hover-elevate"
            data-testid="stat-hours"
          >
            <div className="text-lg font-semibold text-accent">2,450+ Hours</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Total Listened</div>
          </motion.div>
        </div>
      </div>

      {/* Popular Podcasts Carousels */}
      <div className="space-y-6 pt-4">
        {POPULAR_PODCASTS.map((podcast, idx) => (
          <motion.div
            key={podcast.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="space-y-3"
            data-testid={`carousel-section-${podcast.id}`}
          >
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-display font-semibold">{podcast.title}</h2>
              <span className="text-xs text-accent cursor-pointer hover-elevate">{podcast.clips} clips</span>
            </div>
            <ReelCarousel onReelClick={handleReelClick} />
          </motion.div>
        ))}
      </div>

      {/* Creator's Podcasts Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-display font-semibold">All Podcasts</h2>
        <div className="grid grid-cols-2 gap-4">
          {CREATOR_PODCASTS.map((podcast, i) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              className="group cursor-pointer hover-elevate"
              data-testid={`podcast-card-${podcast.id}`}
            >
              <div className="relative overflow-hidden rounded-2xl bg-secondary/30 aspect-square mb-3">
                <img 
                  src={podcast.img} 
                  alt={podcast.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={16} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="text-[10px] font-semibold text-white/80 drop-shadow-md">{podcast.episodes} eps</span>
                </div>
              </div>
              <h3 className="font-display font-semibold text-sm line-clamp-2">{podcast.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
