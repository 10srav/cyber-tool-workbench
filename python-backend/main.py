
from fastapi import FastAPI, HTTPException, Depends, Request, Body
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import os
import json
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import sys
import importlib.util

app = FastAPI(title="Cyber Tools API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security - API key authentication
API_KEY = os.environ.get("PYTHON_API_KEY", "default-key")

def verify_api_key(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing API key")
    
    scheme, _, key = auth_header.partition(" ")
    if scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    
    if key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    return True

class ToolRequest(BaseModel):
    target: str

def import_tool(tool_name: str):
    """Dynamically import a Python tool from the tools directory."""
    try:
        tool_path = os.path.join("tools", f"{tool_name}.py")
        spec = importlib.util.spec_from_file_location(tool_name, tool_path)
        if spec is None:
            raise ImportError(f"Could not load spec for {tool_name}")
        
        module = importlib.util.module_from_spec(spec)
        if spec.loader is None:
            raise ImportError(f"Could not load {tool_name}")
            
        spec.loader.exec_module(module)
        return module
    except Exception as e:
        print(f"Error importing tool {tool_name}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to import tool: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Cyber Tools API is running"}

@app.post("/api/tools/{tool_id}")
async def execute_tool(
    tool_id: str,
    request: ToolRequest = Body(...),
    authenticated: bool = Depends(verify_api_key)
):
    try:
        target = request.target
        print(f"Executing tool {tool_id} with target: {target}")
        
        # Map tool_id to actual Python files
        tool_mapping = {
            "social_finder": "Social_Finder",
            "endpoint_hunter": "endpoint_hunter",
            "subs_extractor": "subs_Extractor",
            "subdomain_extractor": "subdomain_extractor_new",
            "sql": "sql"
        }
        
        if tool_id not in tool_mapping:
            raise HTTPException(status_code=404, detail=f"Tool '{tool_id}' not found")
            
        tool_name = tool_mapping[tool_id]
        tool_module = import_tool(tool_name)
        
        # Execute the main function of the tool
        if hasattr(tool_module, 'main'):
            result = tool_module.main(target)
        elif hasattr(tool_module, 'extract_social_links') and tool_id == 'social_finder':
            result = tool_module.extract_social_links(target)
        elif hasattr(tool_module, 'extract_subdomains') and tool_id in ['subdomain_extractor', 'subs_extractor']:
            result = tool_module.extract_subdomains(target)
        elif hasattr(tool_module, 'find_endpoints') and tool_id == 'endpoint_hunter':
            result = tool_module.find_endpoints(target)
        elif hasattr(tool_module, 'run_sql_tool') and tool_id == 'sql':
            result = tool_module.run_sql_tool(target)
        else:
            raise HTTPException(status_code=500, detail=f"Tool {tool_id} does not have a compatible main function")
            
        return {
            "success": True,
            "data": result
        }
        
    except Exception as e:
        print(f"Error executing tool {tool_id}: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
