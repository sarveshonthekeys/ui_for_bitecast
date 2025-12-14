import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Send, MoreVertical, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import reelThumb from "@assets/generated_images/moody_nature_reel_thumbnail.png";

// Mock Data
const REELS = [
  {
    id: 1,
    video: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4", // Placeholder nature video
    author: "Mindset Daily",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    description: "The power of silence in a noisy world. #mindfulness #peace",
    likes: "24K",
    comments: "142",
  },
  {
    id: 2,
    video: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
    author: "Nature Focus",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    description: "Just breathe. 5 minutes a day changes everything. 🌿",
    likes: "12K",
    comments: "89",
  },
];

export default function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const currentReel = REELS[currentIndex];

  return (
    <div className="h-full w-full bg-black relative overflow-hidden">
      {/* Video Player Background */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
         {/* In a real app, use a proper Video component with IntersectionObserver */}
         <video 
           src={currentReel.video} 
           className="w-full h-full object-cover opacity-90"
           autoPlay
           loop
           muted={isMuted}
           playsInline
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-6 flex justify-between items-center text-white">
        <h2 className="font-display font-medium text-lg drop-shadow-md">Reels</h2>
        <button onClick={toggleMute} className="p-2 bg-black/20 backdrop-blur-md rounded-full">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Center Play/Pause Overlay Interaction */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        {!isPlaying && (
          <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Play fill="white" className="ml-1 text-white w-8 h-8" />
          </div>
        )}
      </div>

      {/* Right Sidebar Actions */}
      <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarImage src={currentReel.avatar} />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Heart size={28} className="text-white drop-shadow-sm" />
          </button>
          <span className="text-xs font-medium text-white drop-shadow-md">{currentReel.likes}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <MessageCircle size={28} className="text-white drop-shadow-sm" />
          </button>
          <span className="text-xs font-medium text-white drop-shadow-md">{currentReel.comments}</span>
        </div>

        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <Send size={28} className="text-white drop-shadow-sm -rotate-45" />
        </button>

        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <MoreVertical size={24} className="text-white drop-shadow-sm" />
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute left-0 bottom-20 z-10 p-4 w-[80%] text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm">{currentReel.author}</span>
          <button className="px-2 py-0.5 rounded-md border border-white/30 text-[10px] font-medium backdrop-blur-sm">Follow</button>
        </div>
        <p className="text-sm opacity-90 leading-relaxed drop-shadow-md">
          {currentReel.description}
        </p>
        <div className="mt-3 flex items-center gap-2 opacity-70">
           <div className="flex gap-0.5 items-end h-3">
             <div className="w-0.5 h-2 bg-white animate-pulse" />
             <div className="w-0.5 h-3 bg-white animate-pulse delay-75" />
             <div className="w-0.5 h-1.5 bg-white animate-pulse delay-150" />
           </div>
           <span className="text-xs">Original Audio - {currentReel.author}</span>
        </div>
      </div>
    </div>
  );
}
