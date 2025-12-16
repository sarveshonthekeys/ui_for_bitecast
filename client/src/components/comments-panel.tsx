import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Heart } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Comment {
  id: number;
  username: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  liked?: boolean;
}

const USERNAMES = [
  "mindful_sarah", "alex_wellness", "zen_journey", "daily_growth",
  "peace_seeker", "nature_lover_23", "morning_meditation", "calm_mind_club",
  "focus_flow", "inner_balance", "soul_healer", "positive_vibes"
];

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces",
];

const COMMENT_TEXTS = [
  "This is exactly what I needed to hear today. Thank you for sharing!",
  "Beautiful perspective on life. Keep creating content like this.",
  "The visuals are stunning! Where was this filmed?",
  "Sharing this with my friends. So inspiring!",
  "I watch this every morning before starting my day. It sets the right tone.",
  "The music choice is perfect. What track is this?",
  "Goosebumps. This hit different.",
  "More content like this please! Your page is my safe space.",
  "This changed my whole perspective today.",
  "Needed this reminder. Thank you!",
  "Absolutely love this content. Keep it coming!",
  "This resonates so deeply. Bookmarked!",
];

const TIMES = ["1h", "2h", "3h", "4h", "5h", "6h", "8h", "10h", "12h", "1d", "2d"];

const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const generateMockComments = (contentId: string | number): Comment[] => {
  const seed = hashCode(String(contentId));
  const count = 5 + (seed % 6);
  const comments: Comment[] = [];
  
  for (let i = 0; i < count; i++) {
    const idx = (seed + i * 7) % USERNAMES.length;
    comments.push({
      id: seed * 1000 + i,
      username: USERNAMES[(idx + i) % USERNAMES.length],
      avatar: AVATARS[(idx + i * 3) % AVATARS.length],
      text: COMMENT_TEXTS[(idx + i * 5) % COMMENT_TEXTS.length],
      time: TIMES[(idx + i) % TIMES.length],
      likes: 5 + ((seed + i * 13) % 60),
    });
  }
  
  return comments;
};

interface CommentsPanelProps {
  children: React.ReactNode;
  commentCount?: string;
  contentId?: string | number;
  onOpenChange?: (open: boolean) => void;
}

export function CommentsPanel({ children, commentCount = "142", contentId = "default", onOpenChange }: CommentsPanelProps) {
  const [comments, setComments] = useState<Comment[]>(() => generateMockComments(contentId));
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(0.75);

  useEffect(() => {
    if (open) {
      setComments(generateMockComments(contentId));
    }
  }, [contentId, open]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange?.(isOpen);
    if (isOpen) {
      setSnap(0.75);
    }
  };

  const handleLike = (commentId: number) => {
    setComments(prev => prev.map(c => 
      c.id === commentId 
        ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
        : c
    ));
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      username: "you",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
      text: newComment.trim(),
      time: "now",
      likes: 0,
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const stopScrollPropagation = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={handleOpenChange}
      snapPoints={[0.5, 0.75, 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      modal={true}
    >
      <DrawerPrimitive.Trigger asChild>
        {children}
      </DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <DrawerPrimitive.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex flex-col bg-neutral-900 rounded-t-[20px] border-t border-neutral-800",
            "focus:outline-none"
          )}
          style={{ height: snap === 1 ? "100vh" : snap === 0.75 ? "75vh" : "50vh" }}
          data-testid="panel-comments"
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root>
            <DrawerPrimitive.Title>Comments</DrawerPrimitive.Title>
          </VisuallyHidden.Root>
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-neutral-600 cursor-grab active:cursor-grabbing" />
          
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center py-3 border-b border-neutral-800">
              <h3 className="text-base font-semibold text-white" data-testid="text-comments-count">
                {commentCount} Comments
              </h3>
            </div>
            
            <ScrollArea 
              className="flex-1 px-4"
              onTouchStart={stopScrollPropagation}
              onTouchMove={stopScrollPropagation}
              onTouchEnd={stopScrollPropagation}
            >
              <div className="py-4 space-y-5">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3" data-testid={`comment-item-${comment.id}`}>
                    <Avatar className="w-9 h-9 flex-shrink-0">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback className="bg-neutral-700 text-white text-xs">
                        {comment.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white" data-testid={`text-username-${comment.id}`}>
                          {comment.username}
                        </span>
                        <span className="text-xs text-neutral-500" data-testid={`text-time-${comment.id}`}>
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-300 mt-0.5 leading-relaxed" data-testid={`text-comment-${comment.id}`}>
                        {comment.text}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <button 
                          onClick={() => handleLike(comment.id)}
                          className="p-1 -ml-1 rounded-full"
                          data-testid={`button-like-comment-${comment.id}`}
                        >
                          <Heart 
                            size={14} 
                            className={comment.liked ? "fill-red-500 text-red-500" : "text-neutral-500"} 
                          />
                        </button>
                        <span className="text-xs text-neutral-500" data-testid={`text-likes-${comment.id}`}>
                          {comment.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div 
              className="p-4 border-t border-neutral-800 bg-neutral-900"
              onTouchStart={stopScrollPropagation}
              onTouchMove={stopScrollPropagation}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces" />
                  <AvatarFallback className="bg-neutral-700 text-white text-xs">YO</AvatarFallback>
                </Avatar>
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a comment..."
                  className="flex-1 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-600"
                  data-testid="input-new-comment"
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={handleSubmit}
                  disabled={!newComment.trim()}
                  className="text-white disabled:opacity-40"
                  data-testid="button-send-comment"
                >
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
