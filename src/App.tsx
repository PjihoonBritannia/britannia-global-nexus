
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Media from "./pages/Media";
import Esg from "./pages/Esg";
import Careers from "./pages/Careers";
import UkProperty from "./pages/UkProperty";
import Contents from "./pages/Contents";
import ContentPost from "./pages/ContentPost"; // Import the new ContentPost component
import NotFound from "./pages/NotFound";
import Login from "./pages/workspace/Login";
import Workspace from "./pages/workspace/Workspace";
import WorkspaceAccounts from "./pages/workspace/Accounts";
import WorkspaceContents from "./pages/workspace/Contents";
import WorkspaceSettings from "./pages/workspace/Settings";
import WorkspaceHome from "./pages/workspace/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// ScrollToTop component to handle scroll and header reset behavior
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
    // Reset header to initial state by forcing scroll position to top
    // The header component already handles different states based on scroll position
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App component with routes
const AppRoutes = () => {
  const { pathname } = useLocation();
  const isWorkspace = pathname.startsWith('/workspace');

  // Define Footer props
  const footerProps = {
    footerTabs: [
      {
        title: "Company",
        links: [
          { text: "About Us", to: "/about" },
          { text: "ESG", to: "/esg" },
          { text: "Careers", to: "/careers" },
        ],
      },
      {
        title: "Business",
        links: [
          { text: "UK Property", to: "/uk-property" },
          { text: "Contents", to: "/contents" },
        ],
      },
      {
        title: "Resources",
        links: [
          { text: "Media", to: "/media" },
        ],
      },
    ],
    contactEmail: "contact@britannia.co.kr",
    contactPhone: "+82 2-1234-5678",
    address: "123 Britannia Road, Seoul, South Korea",
    socialLinks: [
      { icon: "linkedin", to: "https://www.linkedin.com/company/britannia-inc" },
      { icon: "twitter", to: "https://twitter.com/britannia_inc" },
    ],
    copyrightText: "© 2025 Britannia Inc. All Rights Reserved.",
  };

  return (
    <>
      <ScrollToTop />
      {!isWorkspace && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/uk-property" element={<UkProperty />} />
        <Route path="/media" element={<Media />} />
        <Route path="/esg" element={<Esg />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/contents/:slug" element={<ContentPost />} /> {/* Add route for individual posts */}
        <Route path="/workspace/login" element={<Login />} />
        
        {/* Protected Workspace Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/workspace" element={<Workspace />}>
            <Route index element={<WorkspaceHome />} />
            <Route path="accounts" element={<WorkspaceAccounts />} />
            <Route path="contents" element={<WorkspaceContents />} />
            <Route path="settings" element={<WorkspaceSettings />} />
          </Route>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isWorkspace && <Footer {...footerProps} />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
