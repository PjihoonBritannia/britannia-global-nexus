
import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, FileText, Settings, LogOut, ArrowLeft } from 'lucide-react';

const Workspace = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  // Determine if we're on the settings page to apply wider layout
  const isSettingsPage = location.pathname.includes('/workspace/settings');

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex justify-center pb-4 pt-2">
              <img
                src="https://cdn.jsdelivr.net/gh/PjihoonBritannia/britannia-global-nexus@main/public/statics/logo_black.svg"
                alt="Britannia Inc."
                className="h-8 w-auto cursor-pointer"
                onClick={() => navigate('/workspace')}
              />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Return to Website"
                >
                  <NavLink to="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Return to Web</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === '/workspace'} 
                  tooltip="Dashboard"
                >
                  <NavLink to="/workspace" end className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === '/workspace/accounts'} 
                  tooltip="Accounts"
                >
                  <NavLink to="/workspace/accounts" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Accounts</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === '/workspace/contents'} 
                  tooltip="Contents"
                >
                  <NavLink to="/workspace/contents" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Contents</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === '/workspace/settings'} 
                  tooltip="Settings"
                >
                  <NavLink to="/workspace/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            
            <div className="mt-auto px-2 pb-4 pt-2">
              {user && (
                <div className="mb-4 flex flex-col space-y-1 px-2">
                  <div className="text-sm font-medium">{user.email}</div>
                  <div className="text-xs text-gray-500">Admin User</div>
                </div>
              )}
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2" 
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className={`p-6 ${isSettingsPage ? 'w-full max-w-[1200px]' : ''}`}>
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Workspace;
