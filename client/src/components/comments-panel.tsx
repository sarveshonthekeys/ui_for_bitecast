import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Heart } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

interface Comment {
  id: number;
  username: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  liked?: boolean;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    username: "mindful_sarah",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=faces",
    text: "This is exactly what I needed to hear today. Thank you for sharing!",
    time: "2h",
    likes: 24,
  },
  {
    id: 2,
    username: "alex_wellness",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    text: "Beautiful perspective on life. Keep creating content like this.",
    time: "3h",
    likes: 18,
  },
  {
    id: 3,
    username: "zen_journey",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    text: "The visuals are stunning! Where was this filmed?",
    time: "4h",
    likes: 12,
  },
  {
    id: 4,
    username: "daily_growth",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    text: "Sharing this with my friends. So inspiring!",
    time: "5h",
    likes: 31,
  },
  {
    id: 5,
    username: "peace_seeker",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    text: "I watch this every morning before starting my day. It sets the right tone.",
    time: "6h",
    likes: 45,
  },
  {
    id: 6,
    username: "nature_lover_23",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    text: "The music choice is perfect. What track is this?",
    time: "8h",
    likes: 8,
  },
  {
    id: 7,
    username: "morning_meditation",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    text: "Goosebumps. This hit different.",
    time: "10h",
    likes: 67,
  },
  {
    id: 8,
    username: "calm_mind_club",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces",
    text: "More content like this please! Your page is my safe space.",
    time: "12h",
    likes: 29,
  },
];

interface CommentsPanelProps {
  children: React.ReactNode;
  commentCount?: string;
}

export function CommentsPanel({ children, commentCount = "142" }: CommentsPanelProps) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(0.75);

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

  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={setOpen}
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
        >
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-neutral-600 cursor-grab active:cursor-grabbing" />
          
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center py-3 border-b border-neutral-800">
              <h3 className="text-base font-semibold text-white" data-testid="text-comments-count">
                {commentCount} Comments
              </h3>
            </div>
            
            <ScrollArea className="flex-1 px-4">
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
            
            <div className="p-4 border-t border-neutral-800 bg-neutral-900">
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
