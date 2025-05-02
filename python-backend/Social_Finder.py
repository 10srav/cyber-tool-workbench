
import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urlparse
from colorama import init, Fore
import concurrent.futures
import time

# Initialize colorama
init(autoreset=True)

# Social media patterns
social_media_patterns = {
    'Facebook': r'facebook\.com/[a-zA-Z0-9_.-]+',
    'X (formerly Twitter)': r'twitter\.com/([a-zA-Z0-9_.-]+|@[a-zA-Z0-9_.-]+)',
    'LinkedIn': r'linkedin\.com/[a-zA-Z0-9_.-]+',
    'LinkedIn Custom': r'linkedin\.com/company/[a-zA-Z0-9_.-]+',
    'TikTok': r'tiktok\.com/@[a-zA-Z0-9_.-]+',
    'Instagram': r'instagram\.com/[a-zA-Z0-9_.-]+',
    'Reddit': r'reddit\.com/[a-zA-Z0-9_.-]+',
    'Pinterest': r'pinterest\.com/[a-zA-Z0-9_.-]+',
    'Flickr': r'flickr\.com/[a-zA-Z0-9_.-]+',
    'Snapchat': r'snapchat\.com/[a-zA-Z0-9_.-]+',
    'Vimeo': r'vimeo\.com/[a-zA-Z0-9_.-]+',
    'Quora': r'quora\.com/[a-zA-Z0-9_.-]+',
    'Medium': r'medium\.com/[a-zA-Z0-9_.-]+',
    'Tumblr': r'tumblr\.com/[a-zA-Z0-9_.-]+',
    'YouTube': r'youtube\.com/(channel|user)/[a-zA-Z0-9_.-]+',
    'YouTube Custom': r'youtube\.com/[a-zA-Z0-9_.-]+',
    'YouTube Short': r'youtu\.be/[a-zA-Z0-9_.-]+',
    'Generic Social Media': r'(twitter|facebook|linkedin)\.com/[a-zA-Z0-9_.-]+',
    'X Custom': r'x\.com/[a-zA-Z0-9_.-]+'
}

def fetch_html(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(Fore.RED + f"Failed to fetch {url}: {e}")
        return None

def extract_social_media_links(html, base_url):
    if not html:
        return set()
    
    soup = BeautifulSoup(html, 'html.parser')
    links = soup.find_all('a', href=True)
    social_links = set()

    for link in links:
        href = link['href']
        parsed_url = urlparse(href)
        
        if not parsed_url.scheme:  # Handle relative URLs
            href = base_url + href
        
        for platform, pattern in social_media_patterns.items():
            if re.search(pattern, href, re.IGNORECASE):
                social_links.add((platform, href))
                break
    
    return social_links

def read_subdomains(file_path):
    try:
        with open(file_path, 'r') as file:
            subdomains = [line.strip() for line in file if line.strip()]
        return subdomains
    except FileNotFoundError:
        print(Fore.RED + f"File not found: {file_path}")
        return []

def process_subdomain(subdomain):
    url = subdomain if subdomain.startswith(("http://", "https://")) else f"http://{subdomain}"
    print(Fore.YELLOW + f"Fetching {url}...")
    html = fetch_html(url)
    if html:
        base_url = urlparse(url).scheme + "://" + urlparse(url).netloc
        social_links = extract_social_media_links(html, base_url)
        if social_links:
            print(Fore.GREEN + f"Social media links found for {url}:")
            for platform, link in social_links:
                print(Fore.CYAN + f"{platform}: {link}")
        else:
            print(Fore.YELLOW + f"No social media links found for {url}.")
        return social_links
    return set()

def save_social_links(all_social_links, output_file):
    with open(output_file, 'w') as file:
        for platform, link in all_social_links:
            file.write(f"{platform}: {link}\n")
    print(Fore.YELLOW + f"Saved social media links to {output_file}")

def extract_social_links(input_target):
    output_file = "social_links.txt"

    start_time = time.time()

    # Read subdomains or single target
    if input_target.endswith('.txt'):
        subdomains = read_subdomains(input_target)
    else:
        subdomains = [input_target]

    if not subdomains:
        print(Fore.RED + "No valid targets to process.")
        return []

    all_social_links = set()

    # Process subdomains concurrently
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future_to_subdomain = {executor.submit(process_subdomain, subdomain): subdomain for subdomain in subdomains}
        for future in concurrent.futures.as_completed(future_to_subdomain):
            try:
                social_links = future.result()
                all_social_links.update(social_links)
            except Exception as e:
                print(Fore.RED + f"Exception occurred: {e}")

    # Save and display results
    end_time = time.time()
    execution_time = end_time - start_time
    print(Fore.YELLOW + f"Execution completed in {execution_time:.2f} seconds.")

    if all_social_links:
        print(Fore.GREEN + "Unique social media links found:")
        for platform, link in all_social_links:
            print(Fore.CYAN + f"{platform}: {link}")
        save_social_links(all_social_links, output_file)
        return list(all_social_links)
    else:
        print(Fore.RED + "No social media links found.")
        return []
