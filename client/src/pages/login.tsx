import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import bgImage from "@assets/generated_images/dark_abstract_gradient_texture.png";

export default function LoginPage() {
  const [_, setLocation] = useLocation();

  const handleLogin = () => {
    setLocation("/");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-sm flex flex-col items-center space-y-8 text-center"
      >
        {/* Logo Area */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl">
            <span className="font-hand text-3xl text-primary">B</span>
          </div>
          <h1 className="text-4xl font-display font-medium tracking-tight text-primary">Bitecast</h1>
          <p className="text-muted-foreground text-sm max-w-[200px]">Focus, clarity, and self-improvement in bite-sized audio.</p>
        </div>

        {/* Actions */}
        <div className="w-full space-y-3 pt-8">
          <Button 
            onClick={handleLogin}
            className="w-full h-12 bg-white text-black hover:bg-white/90 font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-2" alt="Google" />
            Continue with Google
          </Button>
          
          <Button 
            onClick={handleLogin}
            variant="outline"
            className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-5 h-5 mr-2" />
            Continue with Email
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button 
            onClick={handleLogin}
            variant="ghost" 
            className="w-full h-12 text-muted-foreground hover:text-white rounded-xl"
          >
            Continue as Guest
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>

      <div className="absolute bottom-8 z-10 text-xs text-muted-foreground/50">
        Bitecast Inc. © 2025
      </div>
    </div>
  );
}
