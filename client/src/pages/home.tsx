import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import avatarImg from "@assets/generated_images/minimalist_portrait_avatar.png";
import cardImg from "@assets/generated_images/moody_nature_reel_thumbnail.png";
import { motion } from "framer-motion";

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
  },
];

import { Link } from "wouter";

// ... existing imports

export default function HomePage() {
  return (
    <div className="pb-24 pt-4">
      {/* Header / Status Bar Area - KEEP AS IS */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <h1 className="font-display text-2xl font-semibold">Bitecast</h1>
        <div className="flex gap-4">
          <Button size="icon" variant="ghost" className="rounded-full w-8 h-8">
             <span className="sr-only">Notifications</span>
             <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2" />
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </Button>
        </div>
      </div>

      {/* Stories */}
      <div className="pl-4 pb-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          {STORIES.map((story) => (
            <Link key={story.id} href={`/story/${story.id}`}>
              <div className="flex flex-col items-center space-y-1.5 min-w-[70px] cursor-pointer group">
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

      {/* Feed - KEEP AS IS */}
      <div className="px-4 space-y-6">
        {FEED_ITEMS.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>{item.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium leading-none">{item.author}</span>
                  <span className="text-[10px] text-muted-foreground">{item.handle}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreHorizontal size={16} />
              </Button>
            </div>

            {/* Card Content */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden group">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Play fill="white" className="text-white ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-medium text-white flex items-center gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                    Podcast Clip
                  </div>
                  <span className="text-[10px] text-white/70">{item.duration}</span>
                </div>
                <h3 className="text-lg font-display font-medium text-white leading-tight pr-4">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-1">
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent text-white gap-1.5">
                  <Heart className="w-6 h-6" />
                  <span className="text-xs font-medium text-muted-foreground">{item.likes}</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent text-white gap-1.5">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-xs font-medium text-muted-foreground">428</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent text-white">
                  <Share2 className="w-6 h-6" />
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent text-white">
                <Bookmark className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="h-px bg-border/50 w-full mt-2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
