
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tool } from '@/types/tools';

interface ToolCardProps {
  tool: Tool;
  onRunTool: (tool: Tool) => void;
  getCategoryIcon: (category: string) => React.ElementType;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onRunTool, getCategoryIcon }) => {
  const CategoryIcon = getCategoryIcon(tool.category);

  return (
    <Card className="bg-cyber-dark border-cyber hover:shadow-md hover:shadow-cyber/20 transition-all">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium text-cyber">{tool.name}</CardTitle>
          <CardDescription className="text-sm mt-1">{tool.description}</CardDescription>
        </div>
        <Badge className="bg-cyber text-cyber-dark font-semibold">{tool.category}</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center bg-cyber-background p-2 rounded font-mono text-xs overflow-x-auto">
          <CategoryIcon className="h-4 w-4 mr-2 text-cyber" />
          <code>{tool.command}</code>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-cyber hover:bg-cyber/80 text-cyber-dark"
          onClick={() => onRunTool(tool)}
        >
          <Play className="mr-2 h-4 w-4" />
          Run Tool
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
