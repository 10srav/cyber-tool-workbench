import requests
import re
from urllib.parse import urlparse
from colorama import init, Fore
import concurrent.futures
import time

init(autoreset=True)

def extract_subdomains(input_target):
    """Main function to extract subdomains that can be called from API"""
    try:
        # Initialize results
        subdomains = set()
        
        # Handle both single domain and file input
        if input_target.endswith('.txt'):
            with open(input_target) as f:
                domains = [line.strip() for line in f if line.strip()]
        else:
            domains = [input_target]

        if not domains:
            raise ValueError("No valid domains provided")

        # Common subdomain patterns
        patterns = [
            r'(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}'
        ]

        # Process each domain
        for domain in domains:
            try:
                # Normalize domain
                if not domain.startswith(('http://', 'https://')):
                    domain = f'http://{domain}'
                
                parsed = urlparse(domain)
                base_domain = parsed.netloc
                
                # Your actual subdomain extraction logic here
                # This is example placeholder logic
                if 'example' in base_domain:
                    subdomains.update([
                        f'admin.{base_domain}',
                        f'api.{base_domain}',
                        f'dev.{base_domain}'
                    ])
                else:
                    subdomains.add(base_domain)
                    
            except Exception as e:
                print(Fore.RED + f"Error processing {domain}: {str(e)}")
                continue

        return sorted(list(subdomains))

    except Exception as e:
        print(Fore.RED + f"Tool error: {str(e)}")
        raise

# Maintain original functionality if run directly
if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--input", required=True)
    args = parser.parse_args()
    
    results = extract_subdomains(args.input)
    for subdomain in results:
        print(subdomain)
