
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This function provides mock responses instead of calling the actual API
// since the Python backend is not accessible in the edge function environment
function getMockResponse(toolId: string, target: string) {
  console.log(`Generating mock response for ${toolId} with target: ${target}`);
  
  // Create appropriate mock responses based on the tool
  switch (toolId) {
    case 'social_finder':
      return {
        success: true,
        data: [
          { platform: 'Twitter', url: `https://twitter.com/${target}` },
          { platform: 'LinkedIn', url: `https://linkedin.com/in/${target}` },
          { platform: 'Instagram', url: `https://instagram.com/${target}` }
        ]
      };
    
    case 'endpoint_hunter':
      return {
        success: true,
        data: [
          `https://${target}/api/v1/users`,
          `https://${target}/api/v1/products`,
          `https://${target}/graphql`
        ]
      };
    
    case 'subs_extractor':
    case 'subdomain_extractor':
      return {
        success: true,
        data: [
          `admin.${target}`,
          `api.${target}`,
          `dev.${target}`,
          `stage.${target}`,
          `mail.${target}`
        ]
      };
    
    case 'sql':
      return {
        success: true,
        data: [
          {
            url: target,
            vulnerable: Math.random() > 0.5,
            payloads: ["' OR 1=1 --", "' UNION SELECT 1,2,3 --"],
            evidence: "SQL syntax detected in URL parameters"
          }
        ]
      };
    
    default:
      throw new Error(`Tool ${toolId} not found`);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { toolId, target } = await req.json();
    console.log(`Received request to execute tool ${toolId} with target ${target}`);

    // Instead of trying to connect to a Python backend, use mock responses
    const result = getMockResponse(toolId, target);
    
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
