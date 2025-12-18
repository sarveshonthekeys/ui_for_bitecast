import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Heart, MessageCircle, Send, MoreVertical, ThumbsDown, ChevronLeft, Volume2, VolumeX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import reelThumb from "@assets/generated_images/moody_nature_reel_thumbnail.png";
import { Button } from "@/components/ui/button";
import { useLocation, useSearch } from "wouter";
import { CommentsPanel } from "@/components/comments-panel";

const REELS = [
  {
    id: 1,
    video: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    author: "Mindset Daily",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    title: "The power of silence in a noisy world.",
    hashtags: "#mindfulness #peace #meditation #growth",
    likes: "24K",
    comments: "142",
  },
  {
    id: 2,
    video: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
    author: "Nature Focus",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    title: "Just breathe. 5 minutes a day changes everything.",
    hashtags: "#nature #breathing #wellness #calm",
    likes: "12K",
    comments: "89",
  },
  {
    id: 3,
    video: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    author: "Daily Wisdom",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    title: "Success is the sum of small efforts repeated daily.",
    hashtags: "#success #motivation #habits #discipline",
    likes: "18K",
    comments: "256",
  },
];

const getLikedReels = (): Set<number> => {
  try {
    const stored = localStorage.getItem('likedReels');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const saveLikedReels = (reels: Set<number>) => {
  localStorage.setItem('likedReels', JSON.stringify(Array.from(reels)));
};

export default function ReelsPage() {
  const [_, setLocation] = useLocation();
  const searchString = useSearch();
  const fromExplore = useMemo(() => {
    const params = new URLSearchParams(searchString);
    return params.get("from") === "explore";
  }, [searchString]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showHashtags, setShowHashtags] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"up" | "down">("up");
  const [likedReels, setLikedReels] = useState<Set<number>>(() => getLikedReels());
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isScrolling = useRef(false);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tapCountRef = useRef(0);
  const heartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleHashtags = () => setShowHashtags(!showHashtags);
  const toggleMute = () => setIsMuted(!isMuted);

  const currentReel = REELS[currentIndex];
  const isCurrentReelLiked = likedReels.has(currentReel.id);

  const goToNext = useCallback(() => {
    if (isScrolling.current || commentsOpen) return;
    if (currentIndex < REELS.length - 1) {
      isScrolling.current = true;
      setSlideDirection("up");
      setCurrentIndex(currentIndex + 1);
      setShowHashtags(false);
      setTimeout(() => { isScrolling.current = false; }, 400);
    }
  }, [currentIndex, commentsOpen]);

  const goToPrev = useCallback(() => {
    if (isScrolling.current || commentsOpen) return;
    if (currentIndex > 0) {
      isScrolling.current = true;
      setSlideDirection("down");
      setCurrentIndex(currentIndex - 1);
      setShowHashtags(false);
      setTimeout(() => { isScrolling.current = false; }, 400);
    }
  }, [currentIndex, commentsOpen]);

  const showHeart = useCallback(() => {
    if (heartTimeoutRef.current) {
      clearTimeout(heartTimeoutRef.current);
    }
    setShowHeartAnimation(true);
    heartTimeoutRef.current = setTimeout(() => {
      setShowHeartAnimation(false);
      heartTimeoutRef.current = null;
    }, 800);
  }, []);

  const toggleLike = useCallback(() => {
    const newLikedReels = new Set(likedReels);
    if (newLikedReels.has(currentReel.id)) {
      newLikedReels.delete(currentReel.id);
    } else {
      newLikedReels.add(currentReel.id);
      showHeart();
    }
    setLikedReels(newLikedReels);
    saveLikedReels(newLikedReels);
  }, [likedReels, currentReel.id, showHeart]);

  const handleDoubleTap = useCallback(() => {
    if (!isCurrentReelLiked) {
      toggleLike();
    } else {
      showHeart();
    }
  }, [isCurrentReelLiked, toggleLike, showHeart]);

  useEffect(() => {
    return () => {
      if (heartTimeoutRef.current) {
        clearTimeout(heartTimeoutRef.current);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (commentsOpen) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (commentsOpen) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY.current - touchEndY;

    if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (commentsOpen) return;
    if (e.deltaY > 30) {
      goToNext();
    } else if (e.deltaY < -30) {
      goToPrev();
    }
  };

  const handleBack = () => {
    if (fromExplore) {
      setLocation("/explore");
    } else {
      setLocation("/");
    }
  };

  const handleCenterTap = (e: React.MouseEvent) => {
    if (commentsOpen) return;
    e.stopPropagation();
    tapCountRef.current += 1;

    if (tapCountRef.current === 1) {
      tapTimeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
        togglePlay();
      }, 300);
    } else if (tapCountRef.current === 2) {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
      tapCountRef.current = 0;
      handleDoubleTap();
    }
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex && isPlaying) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex, isPlaying]);

  const slideVariants = {
    enter: (direction: "up" | "down") => ({
      y: direction === "up" ? "100%" : "-100%",
      opacity: 0.8,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: "up" | "down") => ({
      y: direction === "up" ? "-100%" : "100%",
      opacity: 0.8,
    }),
  };

  return (
    <div 
      ref={containerRef}
      className="h-full w-full bg-black relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <AnimatePresence initial={false} custom={slideDirection}>
        <motion.div
          key={currentReel.id}
          custom={slideDirection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-neutral-900"
        >
          <video 
            ref={(el) => { videoRefs.current[currentIndex] = el; }}
            src={currentReel.video} 
            className="w-full h-full object-cover opacity-90"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-8 flex justify-between items-center text-white">
        <button 
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          data-testid="button-reels-back"
        >
          <ChevronLeft size={28} className="text-white drop-shadow-md" />
        </button>
        <button 
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          data-testid="button-reels-mute"
        >
          {isMuted ? (
            <VolumeX size={24} className="text-white drop-shadow-md" />
          ) : (
            <Volume2 size={24} className="text-white drop-shadow-md" />
          )}
        </button>
      </div>

      <div 
        className="absolute inset-0 z-5 flex items-center justify-center cursor-pointer"
        onClick={handleCenterTap}
      >
      </div>

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

      <div className="absolute right-4 bottom-28 z-20 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <button 
            className="p-2 rounded-full hover:bg-white/10 transition-colors" 
            onClick={toggleLike}
            data-testid="button-reel-like"
          >
            <Heart 
              size={28} 
              className={isCurrentReelLiked ? "text-red-500 fill-red-500 drop-shadow-sm" : "text-white drop-shadow-sm"} 
            />
          </button>
          <span className="text-xs font-medium text-white drop-shadow-md">{currentReel.likes}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Not Interested" data-testid="button-reel-dislike">
            <ThumbsDown size={28} className="text-white drop-shadow-sm" />
          </button>
        </div>

        <CommentsPanel 
          commentCount={currentReel.comments} 
          contentId={currentReel.id}
          onOpenChange={setCommentsOpen}
        >
          <div className="flex flex-col items-center gap-1">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors" data-testid="button-reel-comment">
              <MessageCircle size={28} className="text-white drop-shadow-sm" />
            </button>
            <span className="text-xs font-medium text-white drop-shadow-md">{currentReel.comments}</span>
          </div>
        </CommentsPanel>

        <button className="p-2 rounded-full hover:bg-white/10 transition-colors" data-testid="button-reel-share">
          <Send size={28} className="text-white drop-shadow-sm -rotate-45" />
        </button>
      </div>

      <button 
        className="absolute right-4 bottom-6 z-20 p-2 rounded-full hover:bg-white/10 transition-colors"
        onClick={toggleHashtags}
        data-testid="button-reel-more"
      >
        <MoreVertical size={24} className="text-white drop-shadow-sm" />
      </button>

      <div className="absolute left-0 bottom-2 z-10 p-4 pr-20 w-full text-white">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-12 h-12 border-2 border-white">
            <AvatarImage src={currentReel.avatar} />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-base drop-shadow-md" data-testid="text-reel-author">{currentReel.author}</span>
          <button className="px-3 py-1 rounded-md border border-white/30 text-xs font-medium backdrop-blur-sm" data-testid="button-reel-follow">Follow</button>
        </div>
        <p className="text-base opacity-90 leading-relaxed drop-shadow-md" data-testid="text-reel-title">
          {currentReel.title}
        </p>
        
        <AnimatePresence>
          {showHashtags && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-white/70 mt-2 drop-shadow-md"
              data-testid="text-reel-hashtags"
            >
              {currentReel.hashtags}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
