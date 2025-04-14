
import React from 'react';
import { Shield, Code, Key, Database, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ToolStatus {
  name: string;
  category: string;
  status: 'online' | 'offline' | 'warning';
  uptime: number;
  icon: React.ElementType;
}

const toolsStatus: ToolStatus[] = [
  { 
    name: 'Nmap', 
    category: 'Network',
    status: 'online',
    uptime: 98,
    icon: Shield
  },
  { 
    name: 'SQLMap', 
    category: 'Web',
    status: 'online',
    uptime: 100,
    icon: Database
  },
  { 
    name: 'Hashcat', 
    category: 'Crypto',
    status: 'warning',
    uptime: 87,
    icon: Key
  },
  { 
    name: 'Dirb', 
    category: 'Web',
    status: 'offline',
    uptime: 0,
    icon: Code
  },
];

const ToolStatusPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      {toolsStatus.map((tool) => (
        <div key={tool.name} className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <tool.icon className="h-5 w-5 mr-3 text-cyber" />
            <div>
              <p className="text-sm font-medium">{tool.name}</p>
              <p className="text-xs text-muted-foreground">{tool.category}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 mr-3">
              <Progress 
                value={tool.uptime} 
                className="h-2" 
                indicatorClassName={
                  tool.status === 'online' 
                    ? 'bg-cyber' 
                    : tool.status === 'warning' 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                }
              />
            </div>
            {tool.status === 'online' && (
              <CheckCircle className="h-5 w-5 text-cyber" />
            )}
            {tool.status === 'warning' && (
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            )}
            {tool.status === 'offline' && (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolStatusPanel;
