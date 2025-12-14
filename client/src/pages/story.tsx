import { useLocation, useRoute } from "wouter";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, MoreHorizontal, Heart, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import avatarImg from "@assets/generated_images/minimalist_portrait_avatar.png";
import storyImg from "@assets/generated_images/moody_nature_reel_thumbnail.png";

// Mock Data matching home page
const STORIES = {
  "1": { name: "My Story", img: avatarImg, content: storyImg, time: "2h" },
  "2": { name: "Alex Hormozi", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80", time: "5h" },
  "3": { name: "Huberman", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=800&q=80", time: "12h" },
  "4": { name: "Naval", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80", time: "1h" },
  "5": { name: "Daily Stoic", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80", time: "30m" },
};

export default function StoryPage() {
  const [match, params] = useRoute("/story/:id");
  const [_, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);

  const storyId = params?.id || "1";
  const story = STORIES[storyId as keyof typeof STORIES] || STORIES["1"];

  useEffect(() => {
    // Simple progress bar timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setLocation("/"); // Auto-close when done
          return 100;
        }
        return prev + 1; // 5 seconds roughly (100 ticks * 50ms)
      });
    }, 50);

    return () => clearInterval(timer);
  }, [setLocation]);

  const handleClose = () => {
    setLocation("/");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Container to maintain aspect ratio on desktop if needed, usually stories are full screen */}
      <div className="relative w-full h-full max-w-md bg-neutral-900 overflow-hidden">
        
        {/* Story Content */}
        <div className="absolute inset-0 z-0">
          <img 
            src={story.content} 
            alt="Story" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
          <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-4 left-0 right-0 z-20 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border border-white/20">
              <AvatarImage src={story.img} />
              <AvatarFallback>{story.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2 items-center">
              <span className="text-white font-medium text-sm drop-shadow-md">{story.name}</span>
              <span className="text-white/60 text-xs drop-shadow-md">{story.time}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-white/80 hover:text-white">
              <MoreHorizontal size={24} />
            </button>
            <button onClick={handleClose} className="text-white/80 hover:text-white">
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Interaction Zones */}
        <div className="absolute inset-0 z-10 flex">
          <div className="w-1/3 h-full" onClick={() => setProgress(0)} /> {/* Back/Replay */}
          <div className="w-2/3 h-full" onClick={() => setLocation("/")} /> {/* Next/Close */}
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-8 flex items-center gap-4">
           <div className="flex-1 relative">
             <input 
               type="text" 
               placeholder="Send message" 
               className="w-full bg-transparent border border-white/40 rounded-full px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:border-white focus:bg-white/10 transition-colors backdrop-blur-sm"
             />
           </div>
           <button className="p-2 text-white hover:scale-110 transition-transform">
             <Heart size={28} />
           </button>
           <button className="p-2 text-white hover:scale-110 transition-transform">
             <Send size={28} className="-rotate-45" />
           </button>
        </div>
      </div>
    </div>
  );
}
