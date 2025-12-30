import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clock, Heart, Play, Play as PlayIcon } from "lucide-react";
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
    title: "Continue Watching",
    icon: <PlayIcon size={16} className="text-emerald-400" />,
    items: [
      { id: 6, title: "Mindset Mastery", author: "Carol Dweck", img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=150&h=150&fit=crop&crop=faces", watched: 5, total: 12 },
      { id: 7, title: "The Tim Ferriss Show", author: "Tim Ferriss", img: "https://images.unsplash.com/photo-1505373877841-efb58603ba67?w=150&h=150&fit=crop&crop=faces", watched: 8, total: 20 },
      { id: 8, title: "Lex Fridman Podcast", author: "Lex Fridman", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop&crop=faces", watched: 3, total: 15 },
      { id: 9, title: "Rich Roll Podcast", author: "Rich Roll", img: "https://images.unsplash.com/photo-1484633569332-a0f79b18d444?w=150&h=150&fit=crop&crop=faces", watched: 11, total: 18 },
      { id: 10, title: "On Purpose with Jay Shetty", author: "Jay Shetty", img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=150&h=150&fit=crop&crop=faces", watched: 6, total: 14 },
      { id: 11, title: "The Joe Rogan Experience", author: "Joe Rogan", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop&crop=faces", watched: 2, total: 10 },
      { id: 12, title: "Bankless", author: "Ryan Sean Adams", img: "https://images.unsplash.com/photo-1505373877841-efb58603ba67?w=150&h=150&fit=crop&crop=faces", watched: 9, total: 16 },
      { id: 13, title: "StartUp Podcast", author: "Gimlet Media", img: "https://images.unsplash.com/photo-1499750310159-52f0f83ad713?w=150&h=150&fit=crop&crop=faces", watched: 7, total: 13 },
      { id: 14, title: "Philosophize This", author: "Stephen West", img: cardImg, watched: 4, total: 22 },
      { id: 15, title: "The Knowledge Project", author: "Shane Parrish", img: textureImg, watched: 10, total: 17 },
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
                    {'watched' in item && 'total' in item && (
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                        <span className="text-xs font-medium text-white">{item.watched}/{item.total}</span>
                      </div>
                    )}
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
