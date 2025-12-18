import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4 text-center space-y-6"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground">404</h1>
          <p className="text-xl font-medium text-foreground">Page Not Found</p>
          <p className="text-sm text-muted-foreground max-w-sm">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link href="/">
          <Button 
            className="w-full max-w-xs h-12 bg-white text-black hover:bg-white/90 font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
