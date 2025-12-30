import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, History, Target, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import avatarImg from "@assets/generated_images/minimalist_portrait_avatar.png";

const MENU_ITEMS = [
  { icon: Settings, label: "Account Settings" },
  { icon: History, label: "Activity History" },
  { icon: Target, label: "Goals & Preferences" },
  { icon: HelpCircle, label: "Help & Support" },
];

export default function ProfilePage() {
  return (
    <div className="pb-24 pt-8 px-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl"></div>
          <Avatar className="w-24 h-24 border-4 border-background relative z-10">
            <AvatarImage src={avatarImg} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 z-20 w-6 h-6 bg-green-500 border-4 border-background rounded-full"></div>
        </div>
        
        <div className="text-center space-y-1">
          <h1 className="text-xl font-display font-semibold">John Doe</h1>
          <p className="text-sm text-muted-foreground">@johndoe • Free Member</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 py-4 px-8 bg-secondary/30 rounded-2xl border border-white/5">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">128</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Watched</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">42h</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Time</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">15</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Streak</span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-2">
        {MENU_ITEMS.map((item, i) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-between h-14 px-4 hover:bg-secondary/40 rounded-xl group"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <item.icon size={18} />
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground/50" />
          </Button>
        ))}
        
        <div className="my-4 h-px bg-border/50"></div>

        <Button
          variant="ghost"
          className="w-full justify-start h-14 px-4 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-red-900/20 flex items-center justify-center">
              <LogOut size={18} />
            </div>
            <span className="font-medium">Log Out</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
