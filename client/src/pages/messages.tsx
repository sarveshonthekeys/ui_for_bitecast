import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Camera, Edit, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const CONVERSATIONS = [
  {
    id: 1,
    name: "Andrew Huberman",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    lastMessage: "Thanks for sharing that study! I'll check it out.",
    timestamp: "2m",
    unread: true,
    online: true,
  },
  {
    id: 2,
    name: "Naval Ravikant",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    lastMessage: "The key to wealth is leverage...",
    timestamp: "15m",
    unread: true,
    online: false,
  },
  {
    id: 3,
    name: "James Clear",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    lastMessage: "Sent you the new chapter draft",
    timestamp: "1h",
    unread: false,
    online: true,
  },
  {
    id: 4,
    name: "Alex Hormozi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    lastMessage: "Let's jump on a call tomorrow",
    timestamp: "3h",
    unread: false,
    online: false,
  },
  {
    id: 5,
    name: "Tim Ferriss",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces",
    lastMessage: "Have you tried the new morning routine?",
    timestamp: "5h",
    unread: false,
    online: false,
  },
  {
    id: 6,
    name: "Ryan Holiday",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces",
    lastMessage: "The obstacle is the way",
    timestamp: "1d",
    unread: false,
    online: false,
  },
  {
    id: 7,
    name: "Mark Manson",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=faces",
    lastMessage: "You sent a photo",
    timestamp: "2d",
    unread: false,
    online: true,
  },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = CONVERSATIONS.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button size="icon" variant="ghost" className="rounded-full" data-testid="button-back">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="font-display text-xl font-semibold" data-testid="text-messages-title">Messages</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-full" data-testid="button-camera">
              <Camera size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full" data-testid="button-new-message">
              <Edit size={20} />
            </Button>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search conversations"
              className="pl-9 bg-card border-none rounded-xl h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-messages"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filteredConversations.map((conversation, index) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 hover-elevate active-elevate-2 cursor-pointer transition-colors"
              data-testid={`conversation-item-${conversation.id}`}
            >
              <div className="relative">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-sm truncate ${conversation.unread ? "font-semibold text-foreground" : "font-medium text-foreground"}`}
                  >
                    {conversation.name}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {conversation.timestamp}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm truncate ${conversation.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
