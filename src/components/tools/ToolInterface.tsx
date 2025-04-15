
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Play, Save, Clock, Download, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToolExecution } from '@/hooks/useToolExecution';
import { Tool } from '@/types/tools';

interface ToolInterfaceProps {
  tool: Tool;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ tool }) => {
  const [command, setCommand] = useState(tool.command);
  const { isExecuting, result, executeTool } = useToolExecution();

  // Parse the command and identify placeholders
  const parsedCommand = tool.command.match(/\[(.*?)\]/g) || [];
  const parameters = parsedCommand.map(param => param.replace(/[\[\]]/g, ''));
  const [target, setTarget] = useState('');

  const handleParameterChange = (origParam: string, value: string) => {
    setTarget(value);
    const placeholder = `[${origParam}]`;
    setCommand(prev => prev.replace(placeholder, value ? `[${value}]` : placeholder));
  };

  const handleExecuteClick = () => {
    if (!target) return;
    executeTool(tool.id, target);
  };

  const renderResults = () => {
    if (!result) return null;

    if (Array.isArray(result)) {
      return result.map((item, index) => (
        <div key={index} className="text-sm text-cyber-foreground">
          {typeof item === 'string' ? item : JSON.stringify(item, null, 2)}
        </div>
      ));
    }

    return <pre className="text-sm text-cyber-foreground whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>;
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
                disabled={isExecuting}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="font-semibold text-cyber mb-1">Command</div>
        <div className="flex items-center space-x-2">
          <div className="cyber-terminal font-mono text-sm flex-1 p-2 bg-cyber-dark/30 rounded border border-cyber/20">
            {command}
          </div>
          <Badge className={`${isExecuting ? 'bg-yellow-600' : 'bg-cyber'} text-cyber-dark`}>
            {isExecuting ? (
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
          className="cyber-terminal font-mono text-sm h-64 bg-cyber-dark/30 border-cyber/20"
          placeholder="Tool output will appear here..."
          value={result ? JSON.stringify(result, null, 2) : ''}
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
            disabled={!result}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
        <Button 
          className="bg-cyber hover:bg-cyber/80 text-cyber-dark"
          disabled={isExecuting || !target}
          onClick={handleExecuteClick}
        >
          {isExecuting ? (
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
