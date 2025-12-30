import { Link, useLocation } from "wouter";
import { Home, Compass, Library, User, Play, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { ChatContext } from "@/App";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isInChat } = useContext(ChatContext);

  const isReels = location === "/reels";
  const isStory = location.startsWith("/story/");
  const isLogin = location === "/auth";
  const hideNavigation = isReels || isStory || isInChat;

  if (isLogin) {
    return <main className="min-h-screen w-full bg-background text-foreground font-sans noise-bg">{children}</main>;
  }

  return (
    <div className="min-h-screen w-full text-foreground font-sans flex justify-center bg-black">
      <div className="w-full max-w-md h-[100dvh] bg-background relative flex flex-col overflow-hidden noise-bg border-0">
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {children}
        </main>
        
        {/* Bottom Navigation */}
        {!hideNavigation && (
          <nav className={cn(
            "w-full h-16 border-t border-white/5 flex items-center justify-around z-50 transition-colors duration-300",
            "bg-background/80 backdrop-blur-lg"
          )}>
          <Link href="/" className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
            <Home size={22} strokeWidth={location === "/" ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link href="/explore" className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/explore" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
            <Compass size={22} strokeWidth={location === "/explore" ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Explore</span>
          </Link>
          <Link href="/reels" className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/reels" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
            <div className={cn("rounded-full p-1", isReels ? "bg-white/10" : "")}>
              <Radio size={24} strokeWidth={location === "/reels" ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium">Bites</span>
          </Link>
          <Link href="/library" className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/library" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
            <Library size={22} strokeWidth={location === "/library" ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Library</span>
          </Link>
          <Link href="/profile" className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/profile" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
            <User size={22} strokeWidth={location === "/profile" ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </nav>
        )}
      </div>
    </div>
  );
}
