import { useState, useRef, useContext, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Camera, Edit, MoreHorizontal, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { ChatContext } from "@/App";

const EMOJIS = ["👍", "❤️", "😂", "🔥", "😍"];

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
];

interface Message {
  id: number;
  senderId: "you" | "other";
  content: string;
  timestamp: string;
  reactions: string[];
}

function ConversationsList({ onSelectConversation }: { onSelectConversation: (id: number) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [_, setLocation] = useLocation();

  const filteredConversations = CONVERSATIONS.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setLocation("/")} data-testid="button-back">
              <ArrowLeft size={20} />
            </Button>
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
            onClick={() => onSelectConversation(conversation.id)}
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

function ChatScreen({ conversationId, onBack }: { conversationId: number; onBack: () => void }) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, senderId: "you", content: "Hey, did you see the latest research on sleep?", timestamp: "10:30 AM", reactions: [] },
    { id: 2, senderId: "other", content: "Not yet! Send me the link", timestamp: "10:32 AM", reactions: ["👍"] },
    { id: 3, senderId: "you", content: "Just shared it", timestamp: "10:33 AM", reactions: [] },
    { id: 4, senderId: "other", content: "Thanks for sharing that study! I'll check it out.", timestamp: "10:35 AM", reactions: ["🔥"] },
  ]);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageRefsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const { setIsInChat } = useContext(ChatContext);
  const conversation = CONVERSATIONS.find((c) => c.id === conversationId);

  useEffect(() => {
    setIsInChat(true);
    return () => setIsInChat(false);
  }, [setIsInChat]);

  if (!conversation) return null;

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      senderId: "you",
      content: messageText,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      reactions: [],
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const handleMessageLongPress = (messageId: number) => {
    const messageEl = messageRefsRef.current.get(messageId);
    if (messageEl) {
      const rect = messageEl.getBoundingClientRect();
      setPickerPosition({
        top: rect.top - 60,
        left: rect.left,
      });
    }
    setSelectedMessageId(messageId);
    setShowEmojiPicker(true);
  };

  const handleEmojiSelect = (emoji: string) => {
    if (selectedMessageId === null) return;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === selectedMessageId
          ? {
              ...msg,
              reactions: msg.reactions.includes(emoji)
                ? msg.reactions.filter((e) => e !== emoji)
                : [...msg.reactions, emoji],
            }
          : msg
      )
    );

    setShowEmojiPicker(false);
    setSelectedMessageId(null);
  };

  const handleMouseDown = (messageId: number) => {
    longPressTimeoutRef.current = setTimeout(() => {
      handleMessageLongPress(messageId);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-white/5">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" className="rounded-full" onClick={onBack} data-testid="button-back-chat">
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src={conversation.avatar} />
                <AvatarFallback>{conversation.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{conversation.name}</span>
                <span className="text-xs text-muted-foreground">Active now</span>
              </div>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="rounded-full" data-testid="button-chat-more">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex ${msg.senderId === "you" ? "justify-end" : "justify-start"}`}
            data-testid={`message-${msg.id}`}
            onMouseDown={() => handleMouseDown(msg.id)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            ref={(el) => {
              if (el) messageRefsRef.current.set(msg.id, el);
            }}
          >
            <div className="relative">
              <div
                className={`max-w-xs px-3 py-2 rounded-2xl ${
                  msg.senderId === "you"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-white/10 text-white rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>

              {msg.reactions.length > 0 && (
                <div
                  className={`absolute top-full mt-1 flex gap-1 ${
                    msg.senderId === "you" ? "right-0" : "left-0"
                  }`}
                >
                  {msg.reactions.map((emoji, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded-full cursor-pointer hover:bg-white/30 transition-colors"
                      onClick={() => setMessages(prev => prev.map(m => m.id === msg.id ? {...m, reactions: m.reactions.filter(e => e !== emoji)} : m))}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showEmojiPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => {
                setShowEmojiPicker(false);
                setSelectedMessageId(null);
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bg-background rounded-xl p-3 flex gap-2 justify-center border border-white/10 z-50"
              style={{
                top: `${pickerPosition.top}px`,
                left: `${pickerPosition.left}px`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="text-2xl p-2 rounded-lg hover:bg-white/10 transition-colors"
                  data-testid={`emoji-${emoji.codePointAt(0)}`}
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="sticky bottom-0 bg-background border-t border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Message..."
            className="flex-1 bg-card border-none rounded-full h-10"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            data-testid="input-message"
          />
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            disabled={!messageText.trim()}
            onClick={handleSendMessage}
            data-testid="button-send"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  if (selectedConversation) {
    return (
      <ChatScreen
        conversationId={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    );
  }

  return <ConversationsList onSelectConversation={setSelectedConversation} />;
}
