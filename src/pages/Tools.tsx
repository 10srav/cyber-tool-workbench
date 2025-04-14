
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Terminal, Shield, Code, Key, Database, Search, Play, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ToolInterface from '@/components/tools/ToolInterface';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'network' | 'web' | 'crypto' | 'forensics' | 'database';
  command: string;
  icon: React.ElementType;
}

const toolsList: Tool[] = [
  { 
    id: 'nmap',
    name: 'Nmap', 
    description: 'Network discovery and security auditing', 
    category: 'network',
    command: 'nmap -sV -p 1-1000 [TARGET]',
    icon: Shield
  },
  { 
    id: 'sqlmap',
    name: 'SQLMap', 
    description: 'Automatic SQL injection and database takeover tool', 
    category: 'web',
    command: 'sqlmap -u [URL] --dbs',
    icon: Database
  },
  { 
    id: 'hashcat',
    name: 'Hashcat', 
    description: 'Advanced password recovery', 
    category: 'crypto',
    command: 'hashcat -m 0 -a 0 [HASH] [WORDLIST]',
    icon: Key
  },
  { 
    id: 'wireshark',
    name: 'Wireshark CLI', 
    description: 'Network protocol analyzer', 
    category: 'network',
    command: 'tshark -i [INTERFACE] -f "[FILTER]"',
    icon: Search
  },
  { 
    id: 'dirb',
    name: 'Dirb', 
    description: 'Web content scanner', 
    category: 'web',
    command: 'dirb [URL] [WORDLIST]',
    icon: Code
  },
  { 
    id: 'volatility',
    name: 'Volatility', 
    description: 'Memory forensics framework', 
    category: 'forensics',
    command: 'volatility -f [MEMORY_DUMP] imageinfo',
    icon: Search
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
      case 'network': return Shield;
      case 'web': return Code;
      case 'crypto': return Key;
      case 'forensics': return Search;
      case 'database': return Database;
      default: return Terminal;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-cyber">Cyber Tools</h1>
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
                  Learn how to effectively use the cyber tools in this interface.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-cyber mb-1">1. Select a Tool</h4>
                  <p className="text-sm text-cyber-foreground">Browse through the available tools and select one that matches your requirements.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-cyber mb-1">2. Configure Parameters</h4>
                  <p className="text-sm text-cyber-foreground">Modify the command parameters as needed for your specific task.</p>
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
            <TabsTrigger value="network" className="data-[state=active]:bg-cyber data-[state=active]:text-cyber-dark">
              Network
            </TabsTrigger>
            <TabsTrigger value="web" className="data-[state=active]:bg-cyber data-[state=active]:text-cyber-dark">
              Web
            </TabsTrigger>
            <TabsTrigger value="crypto" className="data-[state=active]:bg-cyber data-[state=active]:text-cyber-dark">
              Crypto
            </TabsTrigger>
            <TabsTrigger value="forensics" className="data-[state=active]:bg-cyber data-[state=active]:text-cyber-dark">
              Forensics
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-cyber data-[state=active]:text-cyber-dark">
              Database
            </TabsTrigger>
          </TabsList>
          
          {['all', 'network', 'web', 'crypto', 'forensics', 'database'].map((category) => (
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
