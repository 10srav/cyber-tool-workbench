
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to execute Python tools via API calls
async function executePythonTool(toolId: string, target: string) {
  console.log(`Executing Python tool: ${toolId} with target: ${target}`);
  
  // Python backend API URL - update this to your actual deployed Python API URL
  // For local development, you'll need to expose your local server via a service like ngrok
  const PYTHON_BACKEND_URL = Deno.env.get("PYTHON_BACKEND_URL") || "http://localhost:8000";
  
  try {
    console.log(`Sending request to ${PYTHON_BACKEND_URL}/api/tools/${toolId}`);
    
    const response = await fetch(`${PYTHON_BACKEND_URL}/api/tools/${toolId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("PYTHON_API_KEY") || "default-key"}`
      },
      body: JSON.stringify({ target })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Python API error (${response.status}): ${errorText}`);
      throw new Error(`Python tool execution failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log(`Tool execution result:`, result);
    return result;
  } catch (error) {
    console.error(`Error executing Python tool:`, error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { toolId, target } = await req.json();
    console.log(`Received request to execute tool ${toolId} with target ${target}`);

    // Execute the Python tool and return real results
    const result = await executePythonTool(toolId, target);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to execute tool',
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
