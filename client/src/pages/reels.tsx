import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Send, MoreVertical, Ban } from "lucide-react"; // Import Ban for "Not Interested"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import reelThumb from "@assets/generated_images/moody_nature_reel_thumbnail.png";
import { Button } from "@/components/ui/button";

// Mock Data
const REELS = [
  {
    id: 1,
    video: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
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
  const [showInfo, setShowInfo] = useState(false); // Toggle for description/hashtags

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleInfo = () => setShowInfo(!showInfo); // Toggle visibility

  const currentReel = REELS[currentIndex];

  return (
    <div className="h-full w-full bg-black relative overflow-hidden">
      {/* Video Player Background */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
         <video 
           src={currentReel.video} 
           className="w-full h-full object-cover opacity-90"
           autoPlay
           loop
           muted={false} // Removed mute option, assuming sound on by default or controlled by device
           playsInline
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Top Bar - REMOVED "Reels" text and Mute button */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-6 flex justify-between items-center text-white">
        {/* Empty top bar now */}
      </div>

      {/* Center Play/Pause Overlay Interaction */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        {/* No play icon overlay needed usually for reels unless paused explicitly, keeping clean */}
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

        {/* Not Interested Button */}
         <div className="flex flex-col items-center gap-1">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Not Interested">
            <span className="text-2xl drop-shadow-sm">👎</span> {/* Emoji for Not Interested */}
          </button>
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

        <button 
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={toggleInfo} // Click 3 dots to show info
        >
          <MoreVertical size={24} className="text-white drop-shadow-sm" />
        </button>
      </div>

      {/* Bottom Info - HIDDEN by default, shown on click of 3 dots */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-0 bottom-20 z-10 p-4 w-[80%] text-white bg-black/40 backdrop-blur-md rounded-tr-2xl rounded-br-2xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm">{currentReel.author}</span>
              <button className="px-2 py-0.5 rounded-md border border-white/30 text-[10px] font-medium backdrop-blur-sm">Follow</button>
            </div>
            <p className="text-sm opacity-90 leading-relaxed drop-shadow-md">
              {currentReel.description}
            </p>
            {/* Removed Audio Info */}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* If info is hidden, maybe just show author name small? Or nothing as requested? 
          "hashtags and description should be hidden" implies completely hidden.
          But usually you need to see who posted it. Keeping it completely hidden as requested until toggle.
      */}
      {!showInfo && (
         <div className="absolute left-4 bottom-8 z-10 text-white opacity-80 text-xs">
            {/* Minimal persistent indicator if needed, otherwise empty */}
            @{currentReel.author.replace(" ", "").toLowerCase()}
         </div>
      )}
    </div>
  );
}
