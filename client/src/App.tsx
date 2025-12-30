import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { createContext, useState } from "react";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import ExplorePage from "@/pages/explore";
import ReelsPage from "@/pages/reels";
import LibraryPage from "@/pages/library";
import ProfilePage from "@/pages/profile";
import NotificationsPage from "@/pages/notifications";
import StoryPage from "@/pages/story";

export const ChatContext = createContext<{
  isInChat: boolean;
  setIsInChat: (value: boolean) => void;
}>({
  isInChat: false,
  setIsInChat: () => {},
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={LoginPage} />
        <Route path="/" component={HomePage} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/reels" component={ReelsPage} />
        <Route path="/library" component={LibraryPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/story/:id" component={StoryPage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  const [isInChat, setIsInChat] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ChatContext.Provider value={{ isInChat, setIsInChat }}>
        <Toaster />
        <Router />
      </ChatContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
