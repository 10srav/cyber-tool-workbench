
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ToolUsageGuideDialog: React.FC = () => {
  return (
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
  );
};

export default ToolUsageGuideDialog;
