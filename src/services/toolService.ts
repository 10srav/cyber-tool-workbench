
import { supabase } from "@/integrations/supabase/client";

export interface ToolResult {
  success: boolean;
  data: any;
  error?: string;
}

export const executeToolFunction = async (toolId: string, target: string): Promise<ToolResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('cyber-tools', {
      body: { toolId, target }
    });

    if (error) throw error;

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Tool execution error:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Failed to execute tool'
    };
  }
};
