import { useLocation, useRoute } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, MoreHorizontal, Heart, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import avatarImg from "@assets/generated_images/minimalist_portrait_avatar.png";
import storyImg from "@assets/generated_images/moody_nature_reel_thumbnail.png";
import { useSwipeable } from 'react-swipeable'; // Note: react-swipeable is not installed, so I'll implement custom touch handlers

// Mock Data matching home page
const STORIES_LIST = [
  { id: "1", name: "My Story", img: avatarImg, content: storyImg, time: "2h" },
  { id: "2", name: "Alex Hormozi", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80", time: "5h" },
  { id: "3", name: "Huberman", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=800&q=80", time: "12h" },
  { id: "4", name: "Naval", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80", time: "1h" },
  { id: "5", name: "Daily Stoic", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80", time: "30m" },
];

export default function StoryPage() {
  const [match, params] = useRoute("/story/:id");
  const [_, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [lastTapTime, setLastTapTime] = useState(0);

  const storyId = params?.id || "1";
  const currentIndex = STORIES_LIST.findIndex(s => s.id === storyId);
  const story = STORIES_LIST[currentIndex !== -1 ? currentIndex : 0];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0; // Reset for next or just to keep it clean before unmount
        }
        return prev + 1; // 5 seconds roughly
      });
    }, 50);

    return () => clearInterval(timer);
  }, [storyId, isPaused]); // Reset timer when story changes

  const handleNext = () => {
    if (currentIndex < STORIES_LIST.length - 1) {
      setProgress(0);
      setLocation(`/story/${STORIES_LIST[currentIndex + 1].id}`);
    } else {
      setLocation("/");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setProgress(0);
      setLocation(`/story/${STORIES_LIST[currentIndex - 1].id}`);
    } else {
      // If first story, maybe restart or do nothing? Let's restart
      setProgress(0);
    }
  };

  const handleClose = () => {
    setLocation("/");
  };

  // Touch handlers for swipe
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true); // Pause on hold (start of touch)
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false); // Resume on release
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Detect horizontal swipe
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext(); // Swipe Left -> Next
      } else {
        handlePrev(); // Swipe Right -> Prev
      }
    }
  };

  // Double tap handler
  const handleTap = (e: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    
    if (tapLength < 300 && tapLength > 0) {
      setIsLiked(!isLiked);
      e.preventDefault();
    } else {
      // Single tap logic (left/right zones) is handled by the zones below
      // But since those zones are on top, this might not be reached directly
      // We'll let the zones handle navigation and this wrapper handle double tap visualization if needed?
      // Actually, let's put the double tap logic on the zones.
    }
    setLastTapTime(currentTime);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div 
        className="relative w-full h-full max-w-md bg-neutral-900 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        
        {/* Story Content */}
        <div className="absolute inset-0 z-0">
          <img 
            src={story.content} 
            alt="Story" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
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

        {/* Interaction Zones for Tap Navigation & Double Tap Like */}
        <div className="absolute inset-0 z-10 flex">
          <div 
            className="w-1/3 h-full" 
            onClick={(e) => {
               const currentTime = new Date().getTime();
               if (currentTime - lastTapTime < 300) {
                 setIsLiked(!isLiked);
               } else {
                 handlePrev();
               }
               setLastTapTime(currentTime);
            }} 
          /> 
          <div 
            className="w-2/3 h-full" 
            onClick={(e) => {
               const currentTime = new Date().getTime();
               if (currentTime - lastTapTime < 300) {
                 setIsLiked(!isLiked);
               } else {
                 handleNext();
               }
               setLastTapTime(currentTime);
            }} 
          /> 
        </div>

        {/* Liked Heart Indicator */}
        {isLiked && (
          <div className="absolute bottom-6 right-4 z-30">
            <Heart size={24} className="text-red-500 fill-red-500 drop-shadow-md" />
          </div>
        )}

        {/* Big Heart Animation on Double Tap (Optional visual flair) */}
        <AnimatePresence>
          {isLiked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
              key="big-heart"
            >
               <Heart size={100} className="text-white/80 fill-white/80 drop-shadow-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
