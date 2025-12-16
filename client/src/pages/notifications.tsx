import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, MessageCircle, UserPlus, AtSign, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

type NotificationType = "like" | "comment" | "follow" | "mention" | "reply";

interface Notification {
  id: number;
  type: NotificationType;
  users: { name: string; avatar: string }[];
  action: string;
  timestamp: string;
  read: boolean;
  thumbnail?: string;
  group?: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "like",
    users: [
      { name: "Naval Ravikant", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces" },
      { name: "James Clear", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" },
    ],
    action: "and 23 others liked your post",
    timestamp: "2m",
    read: false,
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=150&h=150&fit=crop",
    group: "Today",
  },
  {
    id: 2,
    type: "follow",
    users: [
      { name: "Andrew Huberman", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces" },
    ],
    action: "started following you",
    timestamp: "15m",
    read: false,
    group: "Today",
  },
  {
    id: 3,
    type: "comment",
    users: [
      { name: "Alex Hormozi", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces" },
    ],
    action: "commented: \"This is exactly what I needed to hear today!\"",
    timestamp: "1h",
    read: false,
    thumbnail: "https://images.unsplash.com/photo-1499750310159-52f0f83ad713?w=150&h=150&fit=crop",
    group: "Today",
  },
  {
    id: 4,
    type: "mention",
    users: [
      { name: "Tim Ferriss", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces" },
    ],
    action: "mentioned you in a comment",
    timestamp: "3h",
    read: true,
    group: "Today",
  },
  {
    id: 5,
    type: "like",
    users: [
      { name: "Ryan Holiday", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces" },
    ],
    action: "liked your story",
    timestamp: "5h",
    read: true,
    group: "Today",
  },
  {
    id: 6,
    type: "follow",
    users: [
      { name: "Mark Manson", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=faces" },
      { name: "Gary Vee", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=faces" },
    ],
    action: "and 5 others started following you",
    timestamp: "1d",
    read: true,
    group: "This Week",
  },
  {
    id: 7,
    type: "reply",
    users: [
      { name: "Cal Newport", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=faces" },
    ],
    action: "replied to your comment: \"Deep work is essential\"",
    timestamp: "2d",
    read: true,
    group: "This Week",
  },
  {
    id: 8,
    type: "like",
    users: [
      { name: "Jordan Peterson", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces" },
    ],
    action: "and 156 others liked your reel",
    timestamp: "3d",
    read: true,
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=150&h=150&fit=crop",
    group: "This Week",
  },
  {
    id: 9,
    type: "comment",
    users: [
      { name: "David Goggins", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces" },
    ],
    action: "commented on your post",
    timestamp: "1w",
    read: true,
    thumbnail: "https://images.unsplash.com/photo-1499750310159-52f0f83ad713?w=150&h=150&fit=crop",
    group: "Earlier",
  },
];

function NotificationIcon({ type }: { type: NotificationType }) {
  switch (type) {
    case "like":
      return <Heart className="w-3 h-3 text-red-500 fill-red-500" />;
    case "comment":
    case "reply":
      return <MessageCircle className="w-3 h-3 text-blue-400" />;
    case "follow":
      return <UserPlus className="w-3 h-3 text-green-400" />;
    case "mention":
      return <AtSign className="w-3 h-3 text-purple-400" />;
    default:
      return null;
  }
}

export default function NotificationsPage() {
  const groupedNotifications = NOTIFICATIONS.reduce(
    (acc, notification) => {
      const group = notification.group || "Other";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(notification);
      return acc;
    },
    {} as Record<string, Notification[]>
  );

  const groupOrder = ["Today", "This Week", "Earlier"];

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button size="icon" variant="ghost" className="rounded-full" data-testid="button-back">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="font-display text-xl font-semibold" data-testid="text-notifications-title">Notifications</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {groupOrder.map((group) => {
          const notifications = groupedNotifications[group];
          if (!notifications || notifications.length === 0) return null;

          return (
            <div key={group}>
              <div className="px-4 py-2">
                <span className="text-sm font-semibold text-foreground">{group}</span>
              </div>
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div
                    className={`flex items-center gap-3 px-4 py-3 hover-elevate active-elevate-2 cursor-pointer transition-colors ${!notification.read ? "bg-card/50" : ""}`}
                    data-testid={`notification-item-${notification.id}`}
                  >
                    <div className="relative flex-shrink-0">
                      {notification.users.length === 1 ? (
                        <Avatar className="w-11 h-11">
                          <AvatarImage src={notification.users[0].avatar} />
                          <AvatarFallback>{notification.users[0].name[0]}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="relative w-11 h-11">
                          <Avatar className="w-8 h-8 absolute top-0 left-0">
                            <AvatarImage src={notification.users[0].avatar} />
                            <AvatarFallback>{notification.users[0].name[0]}</AvatarFallback>
                          </Avatar>
                          <Avatar className="w-8 h-8 absolute bottom-0 right-0 border-2 border-background">
                            <AvatarImage src={notification.users[1].avatar} />
                            <AvatarFallback>{notification.users[1].name[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-background flex items-center justify-center">
                        <NotificationIcon type={notification.type} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug">
                        <span className="font-semibold">{notification.users[0].name}</span>{" "}
                        <span className={notification.read ? "text-muted-foreground" : "text-foreground"}>
                          {notification.action}
                        </span>
                      </p>
                      <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                    </div>

                    {notification.thumbnail && (
                      <div className="w-11 h-11 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={notification.thumbnail}
                          alt="Post thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {notification.type === "follow" && !notification.action.includes("others") && (
                      <Button size="sm" variant="secondary" className="flex-shrink-0" data-testid={`button-follow-back-${notification.id}`}>
                        Follow
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
