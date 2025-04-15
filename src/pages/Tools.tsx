
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Terminal, Users, Globe, Database, Search, Clock } from 'lucide-react';
import ToolInterface from '@/components/tools/ToolInterface';
import ToolsList from '@/components/tools/ToolsList';
import ToolUsageGuideDialog from '@/components/tools/ToolUsageGuideDialog';
import { Tool } from '@/types/tools';

const toolsList: Tool[] = [
  { 
    id: 'social_finder',
    name: 'Social_Finder.py', 
    description: 'Find and analyze social media profiles for a target', 
    category: 'social',
    command: 'python3 Social_Finder.py [TARGET_USERNAME]',
    icon: Users
  },
  { 
    id: 'endpoint_hunter',
    name: 'endpoint_hunter.py', 
    description: 'Discover hidden endpoints and API paths', 
    category: 'reconnaissance',
    command: 'python3 endpoint_hunter.py [TARGET_URL]',
    icon: Globe
  },
  { 
    id: 'subs_extractor',
    name: 'subs_Extractor.py', 
    description: 'Extract and validate subdomains from target domain', 
    category: 'reconnaissance',
    command: 'python3 subs_Extractor.py [DOMAIN]',
    icon: Search
  },
  { 
    id: 'subdomain_extractor',
    name: 'subdomain_extractor_new.py', 
    description: 'Advanced subdomain discovery and analysis tool', 
    category: 'reconnaissance',
    command: 'python3 subdomain_extractor_new.py [DOMAIN]',
    icon: Globe
  },
  { 
    id: 'sql',
    name: 'sql.py', 
    description: 'SQL injection vulnerability scanner', 
    category: 'exploitation',
    command: 'python3 sql.py [TARGET_URL]',
    icon: Database
  }
];

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handleRunTool = (tool: Tool) => {
    setSelectedTool(tool);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-cyber">Social Cyber Tools</h1>
          <ToolUsageGuideDialog />
        </div>
        
        <ToolsList 
          toolsList={toolsList}
          onRunTool={handleRunTool}
        />
        
        {selectedTool && (
          <Card className="mt-6 bg-cyber-dark border-cyber">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-cyber flex items-center">
                  <selectedTool.icon className="h-5 w-5 mr-2" />
                  {selectedTool.name} Interface
                </CardTitle>
                <Badge className="bg-cyber-muted text-cyber">Tool Interface</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ToolInterface tool={selectedTool} />
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Tools;
