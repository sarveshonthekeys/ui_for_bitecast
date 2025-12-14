import { Link, useLocation } from "wouter";
import { Home, Compass, Library, User, Play, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const isReels = location === "/reels";
  const isLogin = location === "/auth";

  if (isLogin) {
    return <main className="min-h-screen w-full bg-background text-foreground font-sans noise-bg">{children}</main>;
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans flex justify-center bg-neutral-950">
      <div className="w-full max-w-md h-[100dvh] bg-background relative flex flex-col shadow-2xl overflow-hidden noise-bg">
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {children}
        </main>
        
        {/* Bottom Navigation */}
        <nav className={cn(
          "w-full h-16 border-t border-white/5 flex items-center justify-around z-50 transition-colors duration-300",
          isReels ? "absolute bottom-0 bg-transparent border-transparent bg-gradient-to-t from-black/80 to-transparent text-white" : "bg-background/80 backdrop-blur-lg"
        )}>
          <Link href="/">
            <a className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
              <Home size={22} strokeWidth={location === "/" ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Home</span>
            </a>
          </Link>
          <Link href="/explore">
            <a className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/explore" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
              <Compass size={22} strokeWidth={location === "/explore" ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Explore</span>
            </a>
          </Link>
          <Link href="/reels">
            <a className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/reels" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
              <div className={cn("rounded-full p-1", isReels ? "bg-white/10" : "")}>
                <Radio size={24} strokeWidth={location === "/reels" ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium">Reels</span>
            </a>
          </Link>
          <Link href="/library">
            <a className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/library" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
              <Library size={22} strokeWidth={location === "/library" ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Library</span>
            </a>
          </Link>
          <Link href="/profile">
            <a className={cn("flex flex-col items-center gap-1 p-2 transition-colors", location === "/profile" ? "text-primary" : "text-muted-foreground hover:text-primary/70")}>
              <User size={22} strokeWidth={location === "/profile" ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Profile</span>
            </a>
          </Link>
        </nav>
      </div>
    </div>
  );
}
