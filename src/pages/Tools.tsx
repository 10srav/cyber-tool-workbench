
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Terminal, Users, Globe, Database, Search, Play, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ToolInterface from '@/components/tools/ToolInterface';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'social' | 'reconnaissance' | 'exploitation';
  command: string;
  icon: React.ElementType;
}

const toolsList: Tool[] = [
  { 
    id: 'social_finder',
    name: 'Social_Finder.py', 
    description: 'Find social media profiles for a target', 
    category: 'social',
    command: 'python3 Social_Finder.py [TARGET_USERNAME]',
    icon: Users
  },
  { 
    id: 'endpoint_hunter',
    name: 'endpoint_hunter.py', 
    description: 'Discover hidden endpoints and APIs', 
    category: 'reconnaissance',
    command: 'python3 endpoint_hunter.py [TARGET_URL]',
    icon: Globe
  },
  { 
    id: 'subs_extractor',
    name: 'subs_Extractor.py', 
    description: 'Extract subdomains from a target domain', 
    category: 'reconnaissance',
    command: 'python3 subs_Extractor.py [DOMAIN]',
    icon: Search
  },
  { 
    id: 'subdomain_extractor',
    name: 'subdomain_extractor_new.py', 
    description: 'Advanced subdomain discovery tool', 
    category: 'reconnaissance',
    command: 'python3 subdomain_extractor_new.py [DOMAIN] [WORDLIST]',
    icon: Globe
  },
  { 
    id: 'sql',
    name: 'sql.py', 
    description: 'SQL injection detection and exploitation', 
    category: 'exploitation',
    command: 'python3 sql.py [TARGET_URL]',
    icon: Database
  }
];

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleRunTool = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleExecute = () => {
    if (!selectedTool) return;
    
    setIsRunning(true);
    toast({
      title: "Tool Execution Started",
      description: `Running ${selectedTool.name}...`,
      duration: 3000,
    });
    
    // Simulate tool execution
    setTimeout(() => {
      setIsRunning(false);
      toast({
        title: "Tool Execution Completed",
        description: `${selectedTool.name} completed successfully!`,
        duration: 3000,
      });
    }, 3000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return Users;
      case 'reconnaissance': return Globe;
      case 'exploitation': return Database;
      default: return Terminal;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-cyber">Social Cyber Tools</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-cyber hover:bg-cyber/80 text-cyber-dark">
                <Info className="mr-2 h-4 w-4" />
                Tool Usage Guide
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-cyber-dark border-cyber">
              <DialogHeader>
                <DialogTitle className="text-cyber">Tool Usage Guide</DialogTitle>
                <DialogDescription>
                  Learn how to effectively use the social cyber tools in this interface.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-cyber mb-1">1. Select a Tool</h4>
                  <p className="text-sm text-cyber-foreground">Choose from our specialized social reconnaissance tools.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-cyber mb-1">2. Configure Parameters</h4>
                  <p className="text-sm text-cyber-foreground">Modify the command parameters with your target information.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-cyber mb-1">3. Execute and Monitor</h4>
                  <p className="text-sm text-cyber-foreground">Run the tool and monitor its progress in the terminal window.</p>
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-cyber hover:bg-cyber/80 text-cyber-dark">Got it</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
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
                  .map((tool) => {
                    const CategoryIcon = getCategoryIcon(tool.category);
                    return (
                      <Card key={tool.id} className="bg-cyber-dark border-cyber hover:shadow-md hover:shadow-cyber/20 transition-all">
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
                            onClick={() => handleRunTool(tool)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Run Tool
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {selectedTool && (
          <Card className="mt-6 bg-cyber-dark border-cyber">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-cyber flex items-center">
                  <selectedTool.icon className="h-5 w-5 mr-2" />
                  {selectedTool.name} Interface
                </CardTitle>
                <Badge className="bg-cyber-muted text-cyber">
                  {isRunning ? (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 animate-spin" />
                      Running...
                    </div>
                  ) : "Ready"}
                </Badge>
              </div>
              <CardDescription>Configure and execute {selectedTool.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <ToolInterface 
                tool={selectedTool} 
                isRunning={isRunning} 
                onExecute={handleExecute} 
              />
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Tools;
