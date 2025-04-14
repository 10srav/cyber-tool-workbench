
import React from 'react';
import { Bell, Settings, User, SidebarOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar: React.FC = () => {
  return (
    <header className="border-b border-cyber-muted bg-cyber-dark">
      <div className="flex h-16 items-center px-6">
        <SidebarTrigger className="mr-2 md:hidden text-cyber">
          <SidebarOpen size={20} />
        </SidebarTrigger>
        
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-cyber hover:text-white">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-cyber hover:text-white">
            <Settings size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-cyber hover:text-white">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
