import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import ExplorePage from "@/pages/explore";
import ReelsPage from "@/pages/reels";
import LibraryPage from "@/pages/library";
import ProfilePage from "@/pages/profile";
import MessagesPage from "@/pages/messages";
import NotificationsPage from "@/pages/notifications";
import StoryPage from "@/pages/story";

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
        <Route path="/messages" component={MessagesPage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
