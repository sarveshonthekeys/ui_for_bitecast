import { useLocation, useRoute } from "wouter";
import { useState, useEffect, useRef, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, MoreHorizontal, Heart, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import avatarImg from "@assets/generated_images/minimalist_portrait_avatar.png";
import storyImg from "@assets/generated_images/moody_nature_reel_thumbnail.png";

const STORIES_LIST = [
  { id: "1", name: "My Story", img: avatarImg, content: storyImg, time: "2h" },
  { id: "2", name: "Alex Hormozi", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80", time: "5h" },
  { id: "3", name: "Huberman", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=800&q=80", time: "12h" },
  { id: "4", name: "Naval", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80", time: "1h" },
  { id: "5", name: "Daily Stoic", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces", content: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80", time: "30m" },
];

const getLikedAccounts = (): Set<string> => {
  try {
    const stored = localStorage.getItem('likedStoryAccounts');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const saveLikedAccounts = (accounts: Set<string>) => {
  localStorage.setItem('likedStoryAccounts', JSON.stringify(Array.from(accounts)));
};

export default function StoryPage() {
  const [match, params] = useRoute("/story/:id");
  const [_, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [likedAccounts, setLikedAccounts] = useState<Set<string>>(() => getLikedAccounts());
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");

  const storyId = params?.id || "1";
  const currentIndex = STORIES_LIST.findIndex(s => s.id === storyId);
  const story = STORIES_LIST[currentIndex !== -1 ? currentIndex : 0];
  
  const isCurrentAccountLiked = likedAccounts.has(story.id);

  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tapCountRef = useRef(0);
  const isHoldingRef = useRef(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    if (currentIndex < STORIES_LIST.length - 1) {
      setSlideDirection("left");
      setProgress(0);
      setLocation(`/story/${STORIES_LIST[currentIndex + 1].id}`);
    } else {
      setLocation("/");
    }
  }, [currentIndex, setLocation]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSlideDirection("right");
      setProgress(0);
      setLocation(`/story/${STORIES_LIST[currentIndex - 1].id}`);
    } else {
      setProgress(0);
    }
  }, [currentIndex, setLocation]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [storyId, isPaused, handleNext]);

  const handleClose = () => {
    setLocation("/");
  };

  const toggleLike = useCallback(() => {
    const newLikedAccounts = new Set(likedAccounts);
    if (newLikedAccounts.has(story.id)) {
      newLikedAccounts.delete(story.id);
    } else {
      newLikedAccounts.add(story.id);
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 800);
    }
    setLikedAccounts(newLikedAccounts);
    saveLikedAccounts(newLikedAccounts);
  }, [likedAccounts, story.id]);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleHoldStart = () => {
    isHoldingRef.current = true;
    holdTimeoutRef.current = setTimeout(() => {
      if (isHoldingRef.current) {
        setIsPaused(true);
      }
    }, 150);
  };

  const handleHoldEnd = () => {
    isHoldingRef.current = false;
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
    }
    setIsPaused(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    handleHoldStart();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    handleHoldEnd();
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const onMouseDown = () => {
    handleHoldStart();
  };

  const onMouseUp = () => {
    handleHoldEnd();
  };

  const onMouseLeave = () => {
    handleHoldEnd();
  };

  const handleCenterDoubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    tapCountRef.current += 1;

    if (tapCountRef.current === 1) {
      tapTimeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 300);
    } else if (tapCountRef.current === 2) {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
      tapCountRef.current = 0;
      toggleLike();
    }
  };

  const handleLeftZoneTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePrev();
  };

  const handleRightZoneTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleNext();
  };

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "left" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div 
        className="relative w-full h-full max-w-md bg-neutral-900 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={story.id}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={story.content} 
              alt="Story" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          </motion.div>
        </AnimatePresence>

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
            <button className="text-white/80 hover:text-white" data-testid="button-story-more">
              <MoreHorizontal size={24} />
            </button>
            <button onClick={handleClose} className="text-white/80 hover:text-white" data-testid="button-story-close">
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex">
          <div 
            className="w-1/4 h-full" 
            onClick={handleLeftZoneTap}
            data-testid="zone-story-prev"
          /> 
          <div 
            className="w-1/2 h-full" 
            onClick={handleCenterDoubleTap}
            data-testid="zone-story-center"
          /> 
          <div 
            className="w-1/4 h-full" 
            onClick={handleRightZoneTap}
            data-testid="zone-story-next"
          /> 
        </div>

        {isCurrentAccountLiked && (
          <button 
            onClick={toggleLike}
            className="absolute bottom-6 right-4 z-30 p-2 rounded-full hover:bg-white/10 transition-colors"
            data-testid="button-story-unlike"
          >
            <Heart size={24} className="text-red-500 fill-red-500 drop-shadow-md" />
          </button>
        )}

        <AnimatePresence>
          {showHeartAnimation && (
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
