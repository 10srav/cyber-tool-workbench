
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Play, Save, Clock, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  command: string;
  icon: React.ElementType;
}

interface ToolInterfaceProps {
  tool: Tool;
  isRunning: boolean;
  onExecute: () => void;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ tool, isRunning, onExecute }) => {
  const [command, setCommand] = useState(tool.command);
  const [output, setOutput] = useState<string>('');

  // Parse the command and identify placeholders
  const parsedCommand = tool.command.match(/\[(.*?)\]/g) || [];
  const parameters = parsedCommand.map(param => param.replace(/[\[\]]/g, ''));

  const handleParameterChange = (origParam: string, value: string) => {
    const placeholder = `[${origParam}]`;
    setCommand(prev => prev.replace(placeholder, value ? `[${value}]` : placeholder));
  };

  const handleExecuteClick = () => {
    // Simulate command execution
    setOutput('');
    onExecute();
    
    // Generate fake output based on the tool
    setTimeout(() => {
      let fakeOutput = '';
      
      switch (tool.id) {
        case 'nmap':
          fakeOutput = `Starting Nmap scan...\n`;
          fakeOutput += `Scanning target...\n`;
          fakeOutput += `PORT     STATE  SERVICE        VERSION\n`;
          fakeOutput += `22/tcp   open   ssh            OpenSSH 8.2p1\n`;
          fakeOutput += `80/tcp   open   http           nginx 1.18.0\n`;
          fakeOutput += `443/tcp  open   https          nginx 1.18.0\n`;
          fakeOutput += `3306/tcp open   mysql          MySQL 5.7.32\n`;
          fakeOutput += `Nmap scan completed in 12.45 seconds\n`;
          break;
        case 'sqlmap':
          fakeOutput = `Starting sqlmap scan...\n`;
          fakeOutput += `Testing connection to the target URL\n`;
          fakeOutput += `Checking for SQL injection vulnerabilities\n`;
          fakeOutput += `[INFO] testing 'MySQL >= 5.0.12 AND time-based blind'\n`;
          fakeOutput += `[INFO] testing 'MySQL > 5.0.11 stacked queries'\n`;
          fakeOutput += `[CRITICAL] SQL injection vulnerability found!\n`;
          fakeOutput += `Available databases: [5]:\n`;
          fakeOutput += `[*] information_schema\n`;
          fakeOutput += `[*] mysql\n`;
          fakeOutput += `[*] performance_schema\n`;
          fakeOutput += `[*] sys\n`;
          fakeOutput += `[*] webapp_db\n`;
          break;
        default:
          fakeOutput = `Executing ${tool.name}...\n`;
          fakeOutput += `Command completed successfully!\n`;
          fakeOutput += `Check results in the output window.\n`;
      }
      
      setOutput(fakeOutput);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-semibold text-cyber mb-1">Command Parameters</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parameters.map((param, index) => (
            <div key={index}>
              <label className="text-sm text-cyber mb-1 block">{param}</label>
              <Input
                placeholder={`Enter ${param}`}
                className="cyber-input"
                onChange={(e) => handleParameterChange(param, e.target.value)}
                disabled={isRunning}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="font-semibold text-cyber mb-1">Command</div>
        <div className="flex items-center space-x-2">
          <div className="cyber-terminal font-mono text-sm flex-1">
            {command}
          </div>
          <Badge className={`${isRunning ? 'bg-yellow-600' : 'bg-cyber'} text-cyber-dark`}>
            {isRunning ? (
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1 animate-spin" />
                Running
              </span>
            ) : 'Ready'}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="font-semibold text-cyber mb-1">Output</div>
        <Textarea
          className="cyber-terminal font-mono text-sm h-64"
          placeholder="Tool output will appear here..."
          value={output}
          readOnly
        />
      </div>
      
      <div className="flex justify-between pt-3">
        <div className="space-x-2">
          <Button variant="outline" className="border-cyber text-cyber hover:bg-cyber hover:text-cyber-dark">
            <Save className="h-4 w-4 mr-2" />
            Save Command
          </Button>
          <Button 
            variant="outline" 
            className="border-cyber text-cyber hover:bg-cyber hover:text-cyber-dark"
            disabled={!output}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
        <Button 
          className="bg-cyber hover:bg-cyber/80 text-cyber-dark"
          disabled={isRunning}
          onClick={handleExecuteClick}
        >
          {isRunning ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Execute
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ToolInterface;
