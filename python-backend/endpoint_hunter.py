
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
from colorama import init, Fore
import concurrent.futures
import re

init(autoreset=True)

def find_endpoints(input_target):
    """Main function to find endpoints that can be called from API"""
    try:
        # Initialize results
        endpoints = set()
        
        # Handle both single URL and file input
        if input_target.endswith('.txt'):
            with open(input_target) as f:
                targets = [line.strip() for line in f if line.strip()]
        else:
            targets = [input_target]

        if not targets:
            raise ValueError("No valid targets provided")

        # Process each target
        for target in targets:
            try:
                # Normalize URL
                if not target.startswith(('http://', 'https://')):
                    target = f'http://{target}'
                
                parsed = urlparse(target)
                base_url = f"{parsed.scheme}://{parsed.netloc}"
                
                # Fetch page content
                response = requests.get(target, timeout=10)
                response.raise_for_status()
                
                # Parse HTML for endpoints
                soup = BeautifulSoup(response.text, 'html.parser')
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    if href.startswith(('http://', 'https://')):
                        endpoints.add(href)
                    else:
                        endpoints.add(urljoin(base_url, href))
                
                # Also check JavaScript files and forms
                for script in soup.find_all('script', src=True):
                    endpoints.add(urljoin(base_url, script['src']))
                
                for form in soup.find_all('form'):
                    if form.get('action'):
                        endpoints.add(urljoin(base_url, form['action']))
                        
            except Exception as e:
                print(Fore.RED + f"Error processing {target}: {str(e)}")
                continue

        return sorted(list(endpoints))

    except Exception as e:
        print(Fore.RED + f"Tool error: {str(e)}")
        raise
