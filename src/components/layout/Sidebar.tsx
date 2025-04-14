
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Shield, 
  Terminal, 
  Database, 
  AlertTriangle, 
  Search,
  LucideIcon,
  Code,
  Key,
  Lock,
  BarChart2
} from 'lucide-react';

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter
} from '@/components/ui/sidebar';

interface MenuItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

const mainMenuItems: MenuItem[] = [
  { title: 'Dashboard', icon: Activity, path: '/' },
  { title: 'Tool Execution', icon: Terminal, path: '/tools' },
  { title: 'Scan Results', icon: Search, path: '/results' },
  { title: 'Vulnerabilities', icon: AlertTriangle, path: '/vulnerabilities' },
  { title: 'Analytics', icon: BarChart2, path: '/analytics' },
];

const toolsMenuItems: MenuItem[] = [
  { title: 'Network Tools', icon: Shield, path: '/tools/network' },
  { title: 'Web Tools', icon: Code, path: '/tools/web' },
  { title: 'Crypto Tools', icon: Key, path: '/tools/crypto' },
  { title: 'Forensics', icon: Search, path: '/tools/forensics' },
  { title: 'Database', icon: Database, path: '/tools/database' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <SidebarComponent>
      <SidebarHeader className="px-4 py-2">
        <Link to="/" className="flex items-center">
          <Lock className="h-8 w-8 text-cyber animate-pulse-glow" />
          <span className="ml-2 text-xl font-semibold animate-text-glow">CyberToolKit</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-3 py-2 border-t border-cyber-muted">
        <div className="flex items-center justify-center">
          <span className="text-xs text-cyber-foreground/50">© 2025 CyberToolKit</span>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
