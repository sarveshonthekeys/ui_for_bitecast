import { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal, Heart, MessageCircle, Share2, Bookmark, Bell, MessageSquare } from "lucide-react";
import avatarImg from "@assets/generated_images/minimalist_portrait_avatar.png";
import cardImg from "@assets/generated_images/moody_nature_reel_thumbnail.png";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { CommentsPanel } from "@/components/comments-panel";

const STORIES = [
  { id: 1, name: "My Story", img: avatarImg, viewed: false },
  { id: 2, name: "Alex Hormozi", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces", viewed: false },
  { id: 3, name: "Huberman", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces", viewed: true },
  { id: 4, name: "Naval", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces", viewed: true },
  { id: 5, name: "Daily Stoic", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces", viewed: false },
];

const FEED_ITEMS = [
  {
    id: 1,
    author: "Andrew Huberman",
    handle: "@hubermanlab",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    title: "The Science of Focus & Productivity",
    duration: "2:15",
    image: cardImg,
    likes: "12.5k",
    comments: "428",
  },
  {
    id: 2,
    author: "Naval Ravikant",
    handle: "@naval",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    title: "How to Get Rich (Without Getting Lucky)",
    duration: "1:45",
    image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80",
    likes: "45.2k",
    comments: "892",
  },
  {
    id: 3,
    author: "James Clear",
    handle: "@jamesclear",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    title: "Atomic Habits: The 1% Rule",
    duration: "3:10",
    image: "https://images.unsplash.com/photo-1499750310159-52f0f83ad713?w=800&q=80",
    likes: "8.9k",
    comments: "156",
  },
];

export default function HomePage() {
  const [_, setLocation] = useLocation();
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const lastTapTimeRef = useRef<{ [key: number]: number }>({});

  const handlePostClick = (postId: number) => {
    setLocation("/reels");
  };

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleDoubleClick = (postId: number) => {
    if (!likedPosts.has(postId)) {
      toggleLike(postId);
    }
  };

  const handleCardTap = (e: React.MouseEvent, postId: number) => {
    const currentTime = new Date().getTime();
    const lastTap = lastTapTimeRef.current[postId] || 0;
    
    if (currentTime - lastTap < 300) {
      e.preventDefault();
      handleDoubleClick(postId);
    } else {
      handlePostClick(postId);
    }
    lastTapTimeRef.current[postId] = currentTime;
  };

  return (
    <div className="pb-24 pt-4">
      <div className="px-4 pb-4 flex justify-between items-center">
        <h1 className="font-display text-2xl font-semibold" data-testid="text-app-title">Bitecast</h1>
        <div className="flex gap-4 items-center">
          <Link href="/messages">
            <Button size="icon" variant="ghost" className="rounded-full" data-testid="button-messages">
              <MessageSquare size={20} />
            </Button>
          </Link>
          <Link href="/notifications">
            <Button size="icon" variant="ghost" className="rounded-full relative" data-testid="button-notifications">
               <span className="sr-only">Notifications</span>
               <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1.5" />
               <Bell size={20} />
            </Button>
          </Link>
        </div>
      </div>

      <div className="pl-4 pb-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          {STORIES.map((story) => (
            <Link key={story.id} href={`/story/${story.id}`}>
              <div className="flex flex-col items-center space-y-1.5 min-w-[70px] cursor-pointer group" data-testid={`story-item-${story.id}`}>
                <div className={`p-[2px] rounded-full bg-gradient-to-tr transition-transform duration-300 group-active:scale-95 ${story.viewed ? 'from-white/20 to-white/10' : 'from-accent to-purple-500'}`}>
                  <div className="p-[2px] bg-background rounded-full">
                    <Avatar className="w-16 h-16 border-none">
                      <AvatarImage src={story.img} className="object-cover" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                  {story.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6">
        {FEED_ITEMS.map((item, i) => {
          const isLiked = likedPosts.has(item.id);
          
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-3"
              data-testid={`feed-item-${item.id}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>{item.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-medium leading-none">{item.author}</span>
                       <button className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-sm transition-colors text-white font-medium" data-testid={`button-follow-${item.id}`}>Follow</button>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden group cursor-pointer"
                onClick={(e) => handleCardTap(e, item.id)}
                data-testid={`card-post-${item.id}`}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Play fill="white" className="text-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                  </div>
                  <h3 className="text-lg font-display font-medium text-white leading-tight pr-4">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-auto w-auto p-0 hover:bg-transparent gap-1.5"
                    onClick={() => toggleLike(item.id)}
                    data-testid={`button-like-${item.id}`}
                  >
                    <Heart 
                      className={`w-6 h-6 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                    />
                    <span className="text-xs font-medium text-muted-foreground">{item.likes}</span>
                  </Button>
                  <CommentsPanel commentCount={item.comments} contentId={`home-${item.id}`}>
                    <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent text-white gap-1.5" data-testid={`button-comment-${item.id}`}>
                      <MessageCircle className="w-6 h-6" />
                      <span className="text-xs font-medium text-muted-foreground">{item.comments}</span>
                    </Button>
                  </CommentsPanel>
                  <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent text-white" data-testid={`button-share-${item.id}`}>
                    <Share2 className="w-6 h-6" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent text-white" data-testid={`button-bookmark-${item.id}`}>
                  <Bookmark className="w-6 h-6" />
                </Button>
              </div>
              
              <div className="h-px bg-border/50 w-full mt-2" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
