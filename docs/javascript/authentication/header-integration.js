// docs/javascript/authentication/header-integration.js
// Integration of authentication with MkDocs Material header

class HeaderAuthIntegration {
    constructor() {
        this.auth = null;
        this.ui = null;
        this.headerButton = null;
        
        this.init();
    }
    
    async init() {
        // Wait for auth system to be ready
        await this.waitForAuthSystem();
        
        // Initialize header integration
        this.injectLoginButton();
        this.setupEventListeners();
    }
    
    /**
     * Wait for authentication system to be loaded
     */
    async waitForAuthSystem() {
        return new Promise((resolve) => {
            const checkAuth = () => {
                if (window.educatorAuth && window.authUI) {
                    this.auth = window.educatorAuth;
                    this.ui = window.authUI;
                    resolve();
                } else {
                    setTimeout(checkAuth, 100);
                }
            };
            checkAuth();
        });
    }
    
    /**
     * Inject login button into Material Design header
     */
    injectLoginButton() {
        // Wait for header to be rendered
        const waitForHeader = () => {
            const header = document.querySelector('.md-header__inner');
            
            if (header) {
                this.createHeaderButton(header);
            } else {
                setTimeout(waitForHeader, 100);
            }
        };
        
        waitForHeader();
    }
    
    /**
     * Create and insert the authentication button
     */
    createHeaderButton(header) {
        // Remove existing auth button if present
        const existingAuth = header.querySelector('.md-header__auth');
        if (existingAuth) {
            existingAuth.remove();
        }
        
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'md-header__auth';
        
        // Check if user is already authenticated
        if (this.auth.isAuthenticated()) {
            this.createAuthenticatedButton(buttonContainer);
        } else {
            this.createLoginButton(buttonContainer);
        }
        
        // Strategy: Insert before the theme toggle (color palette), then before GitHub repo
        const paletteToggle = header.querySelector('.md-header__option');
        if (paletteToggle) {
            header.insertBefore(buttonContainer, paletteToggle);
        } else {
            // Fallback 1: Insert before the source link (GitHub repo link)
            const sourceLink = header.querySelector('.md-header__source');
            if (sourceLink) {
                header.insertBefore(buttonContainer, sourceLink);
            } else {
                // Fallback 2: Insert before search if it exists
                const searchButton = header.querySelector('[data-md-component="search"]');
                if (searchButton) {
                    header.insertBefore(buttonContainer, searchButton);
                } else {
                    // Last resort: append to the end of the header
                    header.appendChild(buttonContainer);
                }
            }
        }
        
        this.headerButton = buttonContainer;
    }
    
    /**
     * Create login button for unauthenticated users
     */
    createLoginButton(container) {
        container.innerHTML = `
            <button class="md-header__button md-auth-login" 
                    title="Educator Login" 
                    onclick="headerAuth.handleLogin()">
                <svg class="md-icon" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
                <span class="md-auth-text">Login</span>
            </button>
        `;
    }
    
    /**
     * Create authenticated user button with dropdown
     */
    createAuthenticatedButton(container) {
        const educator = this.auth.getEducator();
        const educatorIcon = this.getEducatorIcon(educator.level);
        
        container.innerHTML = `
            <div class="md-auth-dropdown">
                <button class="md-header__button md-auth-profile" 
                        title="${educator.name}" 
                        onclick="headerAuth.toggleDropdown()">
                    <span class="md-auth-icon">${educatorIcon}</span>
                    <span class="md-auth-text">${educator.name}</span>
                    <svg class="md-icon md-auth-arrow" viewBox="0 0 24 24">
                        <path d="M7,10L12,15L17,10H7Z"/>
                    </svg>
                </button>
                
                <div class="md-auth-menu" id="auth-dropdown-menu">
                    <div class="md-auth-menu-header">
                        <div class="md-auth-avatar">${educatorIcon}</div>
                        <div class="md-auth-info">
                            <div class="md-auth-name">${educator.name}</div>
                            <div class="md-auth-role">${educator.role}</div>
                        </div>
                    </div>
                    
                    <div class="md-auth-menu-items">
                        <a class="md-auth-menu-item" onclick="headerAuth.showProfile()">
                            <svg class="md-icon" viewBox="0 0 24 24">
                                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                            </svg>
                            <span>Profile</span>
                        </a>
                        
                        <a class="md-auth-menu-item" onclick="headerAuth.showSavedWork()">
                            <svg class="md-icon" viewBox="0 0 24 24">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                            </svg>
                            <span>My Work</span>
                        </a>
                        
                        <div class="md-auth-menu-divider"></div>
                        
                        <a class="md-auth-menu-item md-auth-logout" onclick="headerAuth.handleLogout()">
                            <svg class="md-icon" viewBox="0 0 24 24">
                                <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
                            </svg>
                            <span>Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Handle login button click
     */
    handleLogin() {
        this.ui.showLogin((result) => {
            if (result.success) {
                // Refresh the header button
                this.refreshHeaderButton();
            }
        });
    }
    
    /**
     * Handle logout
     */
    handleLogout() {
        if (confirm('Are you sure you want to logout? Any unsaved work will be lost.')) {
            this.auth.logout();
            this.refreshHeaderButton();
            this.closeDropdown();
        }
    }
    
    /**
     * Show profile modal
     */
    showProfile() {
        this.ui.showProfile();
        this.closeDropdown();
    }
    
    /**
     * Show saved work
     */
    showSavedWork() {
        if (window.authIntegration && window.authIntegration.showSavedCurricula) {
            window.authIntegration.showSavedCurricula();
        } else {
            this.ui.showNotification('Saved work feature not available', 'info');
        }
        this.closeDropdown();
    }
    
    /**
     * Toggle dropdown menu
     */
    toggleDropdown() {
        const menu = document.getElementById('auth-dropdown-menu');
        if (menu) {
            const isOpen = menu.classList.contains('md-auth-menu--open');
            if (isOpen) {
                this.closeDropdown();
            } else {
                this.openDropdown();
            }
        }
    }
    
    /**
     * Open dropdown menu
     */
    openDropdown() {
        const menu = document.getElementById('auth-dropdown-menu');
        if (menu) {
            menu.classList.add('md-auth-menu--open');
            
            // Close when clicking outside
            setTimeout(() => {
                document.addEventListener('click', this.outsideClickHandler.bind(this));
            }, 10);
        }
    }
    
    /**
     * Close dropdown menu
     */
    closeDropdown() {
        const menu = document.getElementById('auth-dropdown-menu');
        if (menu) {
            menu.classList.remove('md-auth-menu--open');
            document.removeEventListener('click', this.outsideClickHandler.bind(this));
        }
    }
    
    /**
     * Handle clicks outside dropdown
     */
    outsideClickHandler(event) {
        const dropdown = document.querySelector('.md-auth-dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
            this.closeDropdown();
        }
    }
    
    /**
     * Refresh header button after auth state change
     */
    refreshHeaderButton() {
        if (this.headerButton) {
            if (this.auth.isAuthenticated()) {
                this.createAuthenticatedButton(this.headerButton);
            } else {
                this.createLoginButton(this.headerButton);
            }
        }
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for auth state changes
        document.addEventListener('auth:login', () => {
            this.refreshHeaderButton();
        });
        
        document.addEventListener('auth:logout', () => {
            this.refreshHeaderButton();
        });
        
        // Handle escape key for dropdown
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });
    }
    
    /**
     * Get educator icon based on level
     */
    getEducatorIcon(level) {
        const icons = {
            'eso': '🏫',
            'fp': '⚙️',
            'admin': '👨‍💼',
            'demo': '🎓'
        };
        return icons[level] || '👤';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.headerAuth = new HeaderAuthIntegration();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderAuthIntegration;
}