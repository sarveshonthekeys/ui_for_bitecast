import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clock, Download, Heart, Play } from "lucide-react";
import cardImg from "@assets/generated_images/moody_nature_reel_thumbnail.png";
import textureImg from "@assets/generated_images/dark_abstract_gradient_texture.png";

const SECTIONS = [
  {
    title: "Liked Podcasts",
    icon: <Heart size={16} className="text-red-400" />,
    items: [
      { id: 1, title: "Mental Models", author: "Farnam Street", img: cardImg },
      { id: 2, title: "Huberman Lab", author: "Andrew Huberman", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces" },
      { id: 3, title: "Naval", author: "Naval Ravikant", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces" },
    ]
  },
  {
    title: "Saved for Later",
    icon: <Clock size={16} className="text-blue-400" />,
    items: [
      { id: 4, title: "Atomic Habits", author: "James Clear", img: "https://images.unsplash.com/photo-1499750310159-52f0f83ad713?w=800&q=80" },
      { id: 5, title: "Deep Work", author: "Cal Newport", img: textureImg },
    ]
  },
  {
    title: "Downloads",
    icon: <Download size={16} className="text-green-400" />,
    items: [
      { id: 6, title: "The Daily Stoic", author: "Ryan Holiday", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces" },
    ]
  }
];

export default function LibraryPage() {
  return (
    <div className="pb-24 pt-4 px-4 space-y-8">
      <h1 className="font-display text-2xl font-semibold">Library</h1>

      {SECTIONS.map((section) => (
        <div key={section.title} className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {section.icon}
            {section.title}
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap -mx-4 px-4">
            <div className="flex w-max space-x-4 pb-4">
              {section.items.map((item) => (
                <div key={item.id} className="w-[140px] space-y-2 group cursor-pointer">
                  <div className="aspect-square rounded-xl overflow-hidden relative bg-secondary/30">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <Play size={14} fill="white" className="text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm truncate leading-none">{item.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{item.author}</p>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}
