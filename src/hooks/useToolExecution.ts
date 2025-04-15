
import { useState } from 'react';
import { mockToolExecution } from '@/services/mockToolService';
import { useToast } from '@/hooks/use-toast';

export const useToolExecution = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const executeTool = async (toolId: string, target: string) => {
    setIsExecuting(true);
    setResult(null);
    
    try {
      const response = await mockToolExecution(toolId, target);
      
      if (response.success) {
        setResult(response.data);
        toast({
          title: "Tool Execution Complete",
          description: "Results are now available",
        });
      } else {
        toast({
          title: "Execution Failed",
          description: response.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    isExecuting,
    result,
    executeTool
  };
};
