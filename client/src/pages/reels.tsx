import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Heart, MessageCircle, Send, MoreVertical, ThumbsDown, ChevronLeft, Bookmark } from "lucide-react";
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

const getSavedReels = (): Set<number> => {
  try {
    const stored = localStorage.getItem('savedReels');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const saveSavedReels = (reels: Set<number>) => {
  localStorage.setItem('savedReels', JSON.stringify(Array.from(reels)));
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
  const [showHashtags, setShowHashtags] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [likedReels, setLikedReels] = useState<Set<number>>(() => getLikedReels());
  const [savedReels, setSavedReels] = useState<Set<number>>(() => getSavedReels());
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isScrolling = useRef(false);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tapCountRef = useRef(0);
  const heartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const descriptionScrollRef = useRef(0);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleHashtags = () => setShowHashtags(!showHashtags);

  const currentReel = REELS[currentIndex];
  const isCurrentReelLiked = likedReels.has(currentReel.id);

  const goToNext = useCallback(() => {
    if (isScrolling.current || commentsOpen) return;
    if (currentIndex < REELS.length - 1) {
      isScrolling.current = true;
      setSlideDirection("left");
      setCurrentIndex(currentIndex + 1);
      setShowHashtags(false);
      setTimeout(() => { isScrolling.current = false; }, 400);
    }
  }, [currentIndex, commentsOpen]);

  const goToPrev = useCallback(() => {
    if (isScrolling.current || commentsOpen) return;
    if (currentIndex > 0) {
      isScrolling.current = true;
      setSlideDirection("right");
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

  const toggleSave = useCallback(() => {
    const newSavedReels = new Set(savedReels);
    if (newSavedReels.has(currentReel.id)) {
      newSavedReels.delete(currentReel.id);
    } else {
      newSavedReels.add(currentReel.id);
    }
    setSavedReels(newSavedReels);
    saveSavedReels(newSavedReels);
  }, [savedReels, currentReel.id]);

  const isCurrentReelSaved = savedReels.has(currentReel.id);

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
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (commentsOpen) return;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const diffY = touchStartY.current - touchEndY;
    const diffX = touchStartX.current - touchEndX;

    // Horizontal swipe for next/previous reels (inverted)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped left - next reel (inverted)
        goToNext();
      } else {
        // Swiped right - previous reel (inverted)
        goToPrev();
      }
      return;
    }

    // Vertical swipe for description panel and navigation (inverted)
    if (Math.abs(diffY) > 50) {
      if (showDescription) {
        if (diffY < 0) {
          // Swiped up in description (inverted)
          if (descriptionScrollRef.current === 0) {
            // First swipe up - hide description
            descriptionScrollRef.current = 1;
            setShowDescription(false);
          } else {
            // Second swipe up - go back
            descriptionScrollRef.current = 0;
            handleBack();
          }
        }
      } else {
        if (diffY > 0) {
          // Swiped down - show description (inverted)
          setShowDescription(true);
          descriptionScrollRef.current = 0;
        } else if (diffY < 0) {
          // Swiped up - go back to previous page (inverted)
          handleBack();
        }
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (commentsOpen) return;
    
    // Handle horizontal scrolling (left/right) - inverted
    if (Math.abs(e.deltaX) > 30) {
      if (e.deltaX < 0) {
        // Scrolling left - next reel (inverted)
        goToNext();
      } else if (e.deltaX > 0) {
        // Scrolling right - previous reel (inverted)
        goToPrev();
      }
      return;
    }
    
    // Handle vertical scrolling (up/down) - inverted
    if (showDescription) {
      if (e.deltaY < -30) {
        // Scrolling up in description (inverted)
        if (descriptionScrollRef.current === 0) {
          // First scroll up - hide description
          descriptionScrollRef.current = 1;
          setShowDescription(false);
        } else {
          // Second scroll up - go back
          descriptionScrollRef.current = 0;
          handleBack();
        }
      }
    } else {
      if (e.deltaY > 30) {
        // Scrolling down - show description (inverted)
        setShowDescription(true);
        descriptionScrollRef.current = 0;
      } else if (e.deltaY < -30) {
        // Scrolling up - go back to previous page (inverted)
        handleBack();
      }
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
    enter: (direction: "left" | "right") => ({
      x: direction === "left" ? "100%" : "-100%",
      opacity: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0.8,
    }),
  };

  const transitionConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
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
          transition={transitionConfig}
          className="absolute inset-0 z-0 bg-neutral-900"
        >
          <video 
            ref={(el) => { videoRefs.current[currentIndex] = el; }}
            src={currentReel.video} 
            className="w-full h-full object-cover opacity-90"
            autoPlay
            loop
            muted={false}
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
          <button 
            className="p-2 rounded-full hover:bg-white/10 transition-colors" 
            onClick={toggleSave}
            data-testid="button-reel-save"
          >
            <Bookmark 
              size={28} 
              className={isCurrentReelSaved ? "text-white fill-white drop-shadow-sm" : "text-white drop-shadow-sm"} 
            />
          </button>
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

      <AnimatePresence>
        {showDescription && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 z-30 bg-black/95 backdrop-blur-md flex flex-col"
            data-testid="panel-reel-description"
          >
            <div className="flex-1 overflow-y-auto p-6 pt-8">
              <button
                onClick={() => setShowDescription(false)}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                data-testid="button-description-close"
              >
                <ChevronLeft size={28} className="text-white" />
              </button>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">About</h2>
                  <p className="text-base text-white/80 leading-relaxed">{currentReel.title}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Creator</h3>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Avatar className="w-12 h-12 border-2 border-white/30">
                      <AvatarImage src={currentReel.avatar} />
                      <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-white" data-testid="text-description-author">{currentReel.author}</p>
                      <p className="text-xs text-white/60">Creator</p>
                    </div>
                    <button className="px-4 py-2 rounded-md border border-white/30 text-sm font-medium backdrop-blur-sm hover:bg-white/5 transition-colors" data-testid="button-description-follow">
                      Follow
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentReel.hashtags.split(" ").map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full border border-white/20" data-testid={`tag-${idx}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10">
                    <p className="text-2xl font-bold text-white">{currentReel.likes}</p>
                    <p className="text-xs text-white/60 mt-1">Likes</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10">
                    <p className="text-2xl font-bold text-white">{currentReel.comments}</p>
                    <p className="text-xs text-white/60 mt-1">Comments</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10">
                    <p className="text-2xl font-bold text-white">-</p>
                    <p className="text-xs text-white/60 mt-1">Shares</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-black/50">
              <p className="text-xs text-white/50 text-center">Scroll up to dismiss or swipe down to go back</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
