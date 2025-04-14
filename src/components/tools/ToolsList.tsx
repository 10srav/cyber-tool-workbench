
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Globe, Database, Terminal } from 'lucide-react';
import ToolCard from './ToolCard';
import { Tool } from '@/types/tools';

interface ToolsListProps {
  toolsList: Tool[];
  onRunTool: (tool: Tool) => void;
}

const ToolsList: React.FC<ToolsListProps> = ({ toolsList, onRunTool }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return Users;
      case 'reconnaissance': return Globe;
      case 'exploitation': return Database;
      default: return Terminal;
    }
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="bg-cyber-dark">
        <TabsTrigger value="all" className="data-[state=active]:bg-cyber data-[state=active]:text-cyber-dark">
          All Tools
        </TabsTrigger>
        <TabsTrigger value="social" className="data-[state=active]:bg-cyber data-[state=active]:text-cyber-dark">
          Social
        </TabsTrigger>
        <TabsTrigger value="reconnaissance" className="data-[state=active]:bg-cyber data-[state=active]:text-cyber-dark">
          Reconnaissance
        </TabsTrigger>
        <TabsTrigger value="exploitation" className="data-[state=active]:bg-cyber data-[state=active]:text-cyber-dark">
          Exploitation
        </TabsTrigger>
      </TabsList>
      
      {['all', 'social', 'reconnaissance', 'exploitation'].map((category) => (
        <TabsContent key={category} value={category} className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolsList
              .filter(tool => category === 'all' || tool.category === category)
              .map((tool) => (
                <ToolCard 
                  key={tool.id}
                  tool={tool}
                  onRunTool={onRunTool}
                  getCategoryIcon={getCategoryIcon}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ToolsList;
