
# Cyber Tools Python Backend

This Python backend serves as the execution environment for your cyber security tools. It provides an API that can be called from your frontend application through the Supabase Edge Function.

## Setup Instructions

### Local Development

1. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Place your Python tools in the `tools` directory:
   - Social_Finder.py
   - endpoint_hunter.py
   - subs_Extractor.py
   - subdomain_extractor_new.py
   - sql.py

4. Run the server:
   ```
   uvicorn main:app --reload
   ```

5. The API will be available at http://localhost:8000

### Docker Deployment

1. Build the Docker image:
   ```
   docker build -t cyber-tools-api .
   ```

2. Run the container:
   ```
   docker run -p 8000:8000 -e PYTHON_API_KEY=your-secret-key cyber-tools-api
   ```

### Cloud Deployment

Deploy to your preferred cloud platform that supports Docker containers or Python applications:

- AWS Lambda (with API Gateway)
- Google Cloud Run
- Azure Functions
- Heroku
- Fly.io
- Railway
- Render

## Environment Variables

- `PYTHON_API_KEY`: Secret key for API authentication (should match the key set in Supabase)

## API Documentation

After starting the server, visit http://localhost:8000/docs for the interactive API documentation.
