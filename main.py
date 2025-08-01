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
        Render a contributor card with footer-style social icons.
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
        
        # Social links section - Copy EXACT structure from MkDocs Material footer
        if socials:
            card_html += f'  <div class="contributor-socials">\n'
            
            # Use exact same HTML structure as Material footer generates
            social_icons = {
                'linkedin': ':material-linkedin:',
                'github': ':material-github:',
                'instagram': ':material-instagram:', 
                'twitter': ':material-twitter:',
                'youtube': ':material-youtube:',
                'facebook': ':material-facebook:',
                'email': ':fontawesome-solid-envelope:',
                'website': ':fontawesome-solid-globe:'
            }
            
            for platform, url in socials.items():
                if url and url.strip():
                    href = url
                    if platform == 'email' and not url.startswith('mailto:'):
                        href = f"mailto:{url}"
                    
                    icon_path = social_icons.get(platform, 'fontawesome/solid/link')
                    
                    # Generate exact HTML as Material footer does
                    card_html += f'    <a href="{href}" target="_blank" class="md-social__link" title="{platform.title()}">\n'
                    card_html += f'      <svg class="md-social__icon" focusable="false" width="1.92em" height="1.92em" viewBox="0 0 24 24">\n'
                    card_html += f'        <use href="#__{icon_path.replace("/", "-")}"></use>\n'
                    card_html += f'      </svg>\n'
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