
from fastapi import FastAPI, HTTPException, Depends, Request, Body
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import os
import json
from pydantic import BaseModel
import shlex
from typing import Dict, Any, List, Optional

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

@app.get("/")
async def root():
    return {"message": "Cyber Tools API is running"}

# Tool execution endpoint
@app.post("/api/tools/{tool_id}")
async def execute_tool(
    tool_id: str,
    request: ToolRequest = Body(...),
    authenticated: bool = Depends(verify_api_key)
):
    try:
        target = request.target
        
        # Define command mapping based on tool_id
        commands = {
            "social_finder": ["python3", "tools/Social_Finder.py", target],
            "endpoint_hunter": ["python3", "tools/endpoint_hunter.py", target],
            "subs_extractor": ["python3", "tools/subs_Extractor.py", target],
            "subdomain_extractor": ["python3", "tools/subdomain_extractor_new.py", target],
            "sql": ["python3", "tools/sql.py", target],
        }
        
        if tool_id not in commands:
            raise HTTPException(status_code=404, detail=f"Tool '{tool_id}' not found")
        
        # Execute the command
        print(f"Executing tool: {tool_id} with target: {target}")
        result = execute_command(commands[tool_id])
        
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

def execute_command(command: List[str]) -> Dict[str, Any]:
    """Execute a shell command and return its output."""
    try:
        # For security, make sure to validate and sanitize inputs before execution
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=True
        )
        
        # Try to parse output as JSON if possible
        try:
            return json.loads(result.stdout)
        except json.JSONDecodeError:
            # If not JSON, return as structured text
            lines = result.stdout.strip().split('\n')
            return {
                "raw_output": lines
            }
            
    except subprocess.CalledProcessError as e:
        print(f"Command execution failed: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Tool execution failed: {e.stderr}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
