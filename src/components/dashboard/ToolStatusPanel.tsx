import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Globe, Database, Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ToolStatus {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'warning';
  lastUpdated: string;
  usagePercentage: number;
  icon: React.ElementType;
}

const toolsData: ToolStatus[] = [
  {
    id: 1,
    name: 'Social_Finder.py',
    status: 'online',
    lastUpdated: '5 min ago',
    usagePercentage: 72,
    icon: Users
  },
  {
    id: 2,
    name: 'endpoint_hunter.py',
    status: 'online',
    lastUpdated: '15 min ago',
    usagePercentage: 45,
    icon: Globe
  },
  {
    id: 3,
    name: 'subs_Extractor.py',
    status: 'online',
    lastUpdated: '3 min ago',
    usagePercentage: 89,
    icon: Search
  },
  {
    id: 4,
    name: 'subdomain_extractor_new.py',
    status: 'warning',
    lastUpdated: '10 min ago',
    usagePercentage: 62,
    icon: Globe
  },
  {
    id: 5,
    name: 'sql.py',
    status: 'online',
    lastUpdated: '1 hr ago',
    usagePercentage: 35,
    icon: Database
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'text-green-500';
    case 'warning':
      return 'text-yellow-500';
    case 'offline':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const getProgressColor = (percentage: number) => {
  if (percentage >= 80) return 'bg-red-500';
  if (percentage >= 50) return 'bg-yellow-500';
  return 'bg-green-500';
};

const ToolStatusPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      {toolsData.map(tool => (
        <Card key={tool.id} className="hover:border-cyber transition-all duration-200 border-cyber-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <tool.icon className="h-5 w-5 mr-2 text-cyber" />
                <span className="font-medium">{tool.name}</span>
              </div>
              <div className={`text-sm font-semibold ${getStatusColor(tool.status)}`}>
                {tool.status.toUpperCase()}
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Usage</span>
                <span>{tool.usagePercentage}%</span>
              </div>
              <Progress 
                value={tool.usagePercentage} 
                className={`h-2 bg-gray-700 ${getProgressColor(tool.usagePercentage)}`}
              />
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground">
              Last updated: {tool.lastUpdated}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ToolStatusPanel;
