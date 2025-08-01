"""
main.py - Macros for mkdocs-macros-plugin
This file contains custom macros for processing contributor files.
"""

import os
import glob
from pathlib import Path
import yaml
import markdown
from typing import Dict, List, Any

def define_env(env):
    """
    This is the hook for the variables, macros and filters.
    
    - variables: add them to the `variables` dictionary
    - macros: use `macro()` decorator
    - filters: use `filter()` decorator
    """
    
    @env.macro
    def load_contributors() -> List[Dict[str, Any]]:
        """
        Load all contributor files from docs/About/contributors/ directory
        and return a list of contributor data.
        """
        contributors = []
        contributors_dir = Path("docs/About/contributors")
        
        if not contributors_dir.exists():
            return contributors
        
        # Find all .md files in the contributors directory
        contributor_files = list(contributors_dir.glob("*.md"))
        
        for file_path in contributor_files:
            try:
                contributor_data = parse_contributor_file(file_path)
                if contributor_data:
                    contributors.append(contributor_data)
            except Exception as e:
                print(f"Error processing {file_path}: {e}")
                continue
        
        # Sort contributors by name
        contributors.sort(key=lambda x: x.get('name', ''))
        return contributors
    
    @env.macro
    def render_contributor_card(contributor: Dict[str, Any]) -> str:
        """
        Render a contributor card with social icons using Material Design syntax.
        """
        name = contributor.get('name', 'Unknown')
        role = contributor.get('role', '')
        feature_img = contributor.get('feature_img', '')
        socials = contributor.get('socials', {})
        bio = contributor.get('bio', '')
        
        # Auto-generate image path if not provided
        if not feature_img and name:
            clean_name = name.replace(' ', '').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace('ñ', 'n')
            feature_img = f"/assets/contributors_pictures/Profile_{clean_name}.jpg"
        
        # Build contributor card
        card_html = f'<div class="contributor-card">\n'
        
        # Header section with name/role on left and image on right
        card_html += f'  <div class="contributor-header">\n'
        
        # Left side - Name and role
        card_html += f'    <div class="contributor-info">\n'
        card_html += f'      <h3 class="contributor-name">{name}</h3>\n'
        if role:
            card_html += f'      <h4 class="contributor-role">{role}</h4>\n'
        card_html += f'    </div>\n'
        
        # Right side - Image
        if feature_img:
            card_html += f'    <div class="contributor-image-container">\n'
            card_html += f'      <img src="{feature_img}" alt="{name}" class="contributor-image" />\n'
            card_html += f'    </div>\n'
        
        card_html += f'  </div>\n'  # Close contributor-header
        
        # Bio section
        if bio:
            card_html += f'  <div class="contributor-bio">\n'
            card_html += f'    <p>{bio}</p>\n'
            card_html += f'  </div>\n'
        
        # Social links section - Create proper HTML links that will work with Material icons
        if socials:
            card_html += f'  <div class="contributor-socials">\n'
            
            # Map platforms to their Material Design Unicode or HTML entities
            social_icons_html = {
                'linkedin': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
                'github': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>',
                'instagram': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>',
                'twitter': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg>',
                'youtube': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" /></svg>',
                'facebook': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073c0-6.627,5.373-12,12-12S24,5.445,24,12.073z"/></svg>',
                'email': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>',
                'website': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>'
            }
            
            for platform, url in socials.items():
                if url and url.strip():
                    href = url
                    if platform == 'email' and not url.startswith('mailto:'):
                        href = f"mailto:{url}"
                    
                    icon_svg = social_icons_html.get(platform, social_icons_html['website'])
                    
                    # Create proper HTML link with embedded SVG
                    card_html += f'    <a href="{href}" class="social-link" target="_blank" title="{platform.title()}">\n'
                    card_html += f'      {icon_svg}\n'
                    card_html += f'    </a>\n'
            
            card_html += f'  </div>\n'  # Close contributor-socials
        
        card_html += f'</div>\n'  # Close contributor-card
        
        return card_html
    
    @env.macro
    def render_all_contributors() -> str:
        """
        Load and render all contributors as a collection of cards.
        """
        contributors = load_contributors()
        
        if not contributors:
            return '<p><em>No contributors found. Be the first to contribute!</em></p>'
        
        html = '<div class="contributors-grid">\n'
        
        for contributor in contributors:
            html += render_contributor_card(contributor)
            html += '\n'
        
        html += '</div>\n'
        
        return html


def parse_contributor_file(file_path: Path) -> Dict[str, Any]:
    """
    Parse a contributor markdown file and extract frontmatter and content.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split frontmatter and content
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter_text = parts[1].strip()
            bio_content = parts[2].strip()
        else:
            frontmatter_text = parts[1].strip() if len(parts) > 1 else ''
            bio_content = ''
    else:
        frontmatter_text = ''
        bio_content = content.strip()
    
    # Parse frontmatter YAML
    contributor_data = {}
    if frontmatter_text:
        try:
            contributor_data = yaml.safe_load(frontmatter_text) or {}
        except yaml.YAMLError as e:
            print(f"Error parsing YAML frontmatter in {file_path}: {e}")
            contributor_data = {}
    
    # Add bio content
    if bio_content:
        contributor_data['bio'] = bio_content
    
    return contributor_data