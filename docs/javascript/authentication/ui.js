// docs/javascript/authentication/ui.js
// Complete Authentication UI with Netlify Identity Integration

class AuthUI {
    constructor(authSystem) {
        this.auth = authSystem;
        this.currentModal = null;
        
        this.init();
    }
    
    init() {
        this.injectStyles();
        this.setupEventListeners();
    }
    
    /**
     * Show enhanced login modal with Netlify options
     */
    showLogin(onSuccess = null) {
        const modal = this.createModal('login-modal', 'Welcome to AprenMaker Hub');
        
        const content = `
            <div class="auth-form">
                <div class="auth-header">
                    <h3>Sign in to get started</h3>
                    <p>Access the curriculum builder, save your work, and join our maker community</p>
                </div>
                
                <!-- Netlify Identity Login Options -->
                <div class="auth-section netlify-section">
                    <h4>Sign in with your account</h4>
                    <div class="auth-buttons">
                        <button class="auth-button netlify-btn" onclick="authUI.handleNetlifyLogin()">
                            <svg class="auth-icon" viewBox="0 0 24 24">
                                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                            </svg>
                            <span>Sign in / Create Account</span>
                        </button>
                        
                        <div class="provider-options">
                            <small>Supports GitHub, Google, Email, and more</small>
                        </div>
                    </div>
                </div>
                
                <div class="auth-divider">
                    <span>or</span>
                </div>
                
                <!-- Institutional Access Codes -->
                <div class="auth-section code-section">
                    <h4>Institutional Access</h4>
                    <form id="login-form" class="auth-form-fields">
                        <div class="form-group">
                            <label for="access-code">Access Code</label>
                            <input 
                                type="text" 
                                id="access-code" 
                                placeholder="Enter your institutional code"
                                required
                                autocomplete="off"
                            >
                            <small class="form-help">Have an enhanced access code from your institution?</small>
                        </div>
                        
                        <div class="form-group checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="remember-me">
                                <span class="checkmark"></span>
                                Keep me logged in
                            </label>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                <span class="btn-text">Access Platform</span>
                                <div class="btn-loader" style="display: none;"></div>
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="authUI.showDemoLogin()">
                                Try Demo
                            </button>
                        </div>
                    </form>
                </div>
                
                <div class="auth-error" id="login-error" style="display: none;"></div>
                
                <div class="auth-benefits">
                    <h4>Why sign in?</h4>
                    <div class="benefits-grid">
                        <div class="benefit-item">
                            <div class="benefit-icon">💾</div>
                            <div class="benefit-text">Save your curricula and projects</div>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-icon">🎯</div>
                            <div class="benefit-text">Get personalized content recommendations</div>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-icon">👥</div>
                            <div class="benefit-text">Connect with the maker community</div>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-icon">📊</div>
                            <div class="benefit-text">Track your learning progress</div>
                        </div>
                    </div>
                </div>
                
                <div class="auth-help">
                    <details>
                        <summary>Need help or have questions?</summary>
                        <div class="help-content">
                            <h4>Account Options:</h4>
                            <p><strong>Personal Account:</strong> Sign in with GitHub, Google, or email for community access</p>
                            <p><strong>Institutional Access:</strong> Enhanced permissions with special access codes</p>
                            
                            <h4>Demo Access Codes:</h4>
                            <p>ESO Educator: <code>valencia_eso_2025</code></p>
                            <p>FP Instructor: <code>fp_digital_2025</code></p>
                            <p>Quick Demo: <code>demo_teacher</code></p>
                            
                            <h4>Having trouble?</h4>
                            <p>Contact us at <a href="mailto:jmuozan@gmail.com">jmuozan@gmail.com</a></p>
                            
                            <small>Note: Personal accounts get community access. Institutional codes provide enhanced tools and permissions.</small>
                        </div>
                    </details>
                </div>
            </div>
        `;
        
        modal.querySelector('.modal-body').innerHTML = content;
        
        // Setup form handling
        const form = modal.querySelector('#login-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCodeLogin(onSuccess);
        });
        
        this.showModal(modal);
    }
    
    /**
     * Handle Netlify Identity login
     */
    handleNetlifyLogin() {
        if (!this.auth.isNetlifyReady()) {
            this.showNotification('Authentication service is loading. Please try again in a moment.', 'warning');
            return;
        }
        
        try {
            // Close the current modal
            this.hideModal();
            
            // Open Netlify Identity modal
            window.netlifyIdentity.open();
            
            this.showNotification('Opening sign-in options...', 'info', 2000);
            
        } catch (error) {
            console.error('Netlify login error:', error);
            this.showNotification('Authentication service unavailable. Please try again later.', 'error');
        }
    }
    
    /**
     * Handle institutional code login
     */
    async handleCodeLogin(onSuccess = null) {
        const form = document.getElementById('login-form');
        const codeInput = document.getElementById('access-code');
        const rememberCheckbox = document.getElementById('remember-me');
        const submitBtn = form.querySelector('button[type="submit"]');
        const errorDiv = document.getElementById('login-error');
        
        // Show loading state
        this.setButtonLoading(submitBtn, true);
        errorDiv.style.display = 'none';
        
        try {
            // Simulate network delay for better UX
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const result = this.auth.login(
                codeInput.value.trim(),
                rememberCheckbox.checked
            );
            
            if (result.success) {
                this.showSuccessMessage(result.educator);
                this.hideModal();
                
                if (onSuccess) {
                    onSuccess(result);
                }
                
                // Trigger login event
                this.dispatchEvent('login', result);
                
            } else if (result.pending) {
                this.showNotification(result.message, 'info');
                this.hideModal();
            } else {
                errorDiv.textContent = result.error;
                errorDiv.style.display = 'block';
                codeInput.focus();
                codeInput.select();
            }
            
        } catch (error) {
            errorDiv.textContent = 'An unexpected error occurred. Please try again.';
            errorDiv.style.display = 'block';
            
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }
    
    /**
     * Show demo login options
     */
    showDemoLogin() {
        const modal = this.createModal('demo-modal', 'Try AprenMaker Hub');
        
        const content = `
            <div class="demo-options">
                <div class="demo-header">
                    <h3>Choose Your Experience</h3>
                    <p>Explore the platform with different educator perspectives</p>
                </div>
                
                <div class="demo-profiles">
                    <div class="demo-profile" data-code="valencia_eso_2025">
                        <div class="profile-icon">🏫</div>
                        <div class="profile-info">
                            <h4>ESO Technology Teacher</h4>
                            <p>Secondary education • 25 students • Basic fabrication tools</p>
                            <ul>
                                <li>Arduino programming projects</li>
                                <li>3D printing fundamentals</li>
                                <li>50-minute class sessions</li>
                                <li>Educational standards alignment</li>
                            </ul>
                        </div>
                        <div class="profile-badge">Enhanced Access</div>
                    </div>
                    
                    <div class="demo-profile" data-code="fp_digital_2025">
                        <div class="profile-icon">⚙️</div>
                        <div class="profile-info">
                            <h4>FP Digital Fabrication</h4>
                            <p>Vocational training • 15 students • Professional tools</p>
                            <ul>
                                <li>Laser cutting & CNC machining</li>
                                <li>Advanced electronics & IoT</li>
                                <li>2-hour workshop sessions</li>
                                <li>Industry-standard workflows</li>
                            </ul>
                        </div>
                        <div class="profile-badge">Professional Tools</div>
                    </div>
                    
                    <div class="demo-profile" data-code="demo_teacher">
                        <div class="profile-icon">🎓</div>
                        <div class="profile-info">
                            <h4>Community Member</h4>
                            <p>General access • Basic features</p>
                            <ul>
                                <li>Curriculum creation basics</li>
                                <li>Community resource access</li>
                                <li>Standard tool library</li>
                                <li>Getting started tutorials</li>
                            </ul>
                        </div>
                        <div class="profile-badge">Quick Start</div>
                    </div>
                </div>
                
                <div class="demo-actions">
                    <button class="btn btn-secondary" onclick="authUI.showLogin()">
                        ← Back to Sign In
                    </button>
                </div>
                
                <div class="demo-note">
                    <p><strong>Note:</strong> Demo accounts showcase different permission levels. 
                    Sign in with your personal account for full community access and the ability to save your work.</p>
                </div>
            </div>
        `;
        
        modal.querySelector('.modal-body').innerHTML = content;
        
        // Setup profile selection
        modal.querySelectorAll('.demo-profile').forEach(profile => {
            profile.addEventListener('click', () => {
                const code = profile.dataset.code;
                this.loginWithCode(code, false);
            });
        });
        
        this.showModal(modal);
    }
    
    /**
     * Login with specific code (for demo profiles)
     */
    async loginWithCode(code, remember = false) {
        const result = this.auth.login(code, remember);
        
        if (result.success) {
            this.showSuccessMessage(result.educator);
            this.hideModal();
            this.dispatchEvent('login', result);
        } else {
            this.showNotification(result.error || 'Login failed', 'error');
        }
    }
    
    /**
     * Show enhanced user profile with Netlify integration
     */
    showProfile() {
        const educator = this.auth.getEducator();
        if (!educator) return;
        
        const modal = this.createModal('profile-modal', 'Your Profile');
        
        const session = this.auth.getSession();
        const timeLeft = new Date(session.expires) - new Date();
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        const netlifyUser = this.auth.getNetlifyUser();
        const isNetlifyUser = session.type === 'netlify';
        
        const content = `
            <div class="profile-info">
                <div class="profile-header">
                    <div class="profile-avatar">
                        ${educator.avatar ? 
                            `<img src="${educator.avatar}" alt="${educator.name}" class="avatar-image" />` : 
                            this.getEducatorIcon(educator.level)
                        }
                    </div>
                    <div class="profile-details">
                        <h3>${educator.name}</h3>
                        <p class="profile-role">${educator.role}</p>
                        <p class="profile-school">${educator.school}</p>
                        ${educator.email ? `<p class="profile-email">${educator.email}</p>` : ''}
                        ${isNetlifyUser ? `<p class="profile-provider">Connected via ${educator.provider}</p>` : ''}
                    </div>
                </div>
                
                <div class="profile-stats">
                    <div class="stat-item">
                        <span class="stat-label">Session Expires In:</span>
                        <span class="stat-value">${hoursLeft}h ${minutesLeft}m</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Access Level:</span>
                        <span class="stat-value">${educator.level.toUpperCase()}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Account Type:</span>
                        <span class="stat-value">${session.type === 'netlify' ? 'Personal Account' : 'Institutional Access'}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Available Tools:</span>
                        <span class="stat-value">${educator.tools.length} tools</span>
                    </div>
                </div>
                
                <div class="profile-permissions">
                    <h4>Your Permissions</h4>
                    <div class="permissions-grid">
                        ${educator.permissions.map(permission => `
                            <div class="permission-item">
                                <span class="permission-icon">✓</span>
                                <span>${this.formatPermission(permission)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="profile-tools">
                    <h4>Available Tools & Equipment</h4>
                    <div class="tools-grid">
                        ${educator.tools.map(tool => `
                            <div class="tool-item">
                                <span class="tool-icon">${this.getToolIcon(tool)}</span>
                                <span class="tool-name">${this.formatToolName(tool)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${isNetlifyUser && netlifyUser ? `
                    <div class="profile-netlify">
                        <h4>Account Information</h4>
                        <div class="netlify-info">
                            <div class="netlify-item">
                                <span class="netlify-label">User ID:</span>
                                <span class="netlify-value">${netlifyUser.id.substring(0, 8)}...</span>
                            </div>
                            ${netlifyUser.user_metadata?.full_name ? `
                                <div class="netlify-item">
                                    <span class="netlify-label">Full Name:</span>
                                    <span class="netlify-value">${netlifyUser.user_metadata.full_name}</span>
                                </div>
                            ` : ''}
                            <div class="netlify-item">
                                <span class="netlify-label">Sign-in Method:</span>
                                <span class="netlify-value">${educator.provider}</span>
                            </div>
                            <div class="netlify-item">
                                <span class="netlify-label">Email Verified:</span>
                                <span class="netlify-value">${netlifyUser.email_confirmed_at ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="profile-actions">
                    <button class="btn btn-secondary" onclick="authUI.extendSession()">
                        Extend Session
                    </button>
                    ${isNetlifyUser ? `
                        <button class="btn btn-secondary" onclick="authUI.updateNetlifyProfile()">
                            Update Profile
                        </button>
                    ` : ''}
                    <button class="btn btn-danger" onclick="authUI.confirmLogout()">
                        Sign Out
                    </button>
                </div>
            </div>
        `;
        
        modal.querySelector('.modal-body').innerHTML = content;
        this.showModal(modal);
    }
    
    /**
     * Update Netlify profile
     */
    updateNetlifyProfile() {
        if (this.auth.isNetlifyReady()) {
            this.hideModal();
            window.netlifyIdentity.open('signup');
        } else {
            this.showNotification('Profile update unavailable', 'warning');
        }
    }
    
    /**
     * Confirm logout with enhanced messaging
     */
    confirmLogout() {
        const session = this.auth.getSession();
        const isNetlify = session?.type === 'netlify';
        
        const message = isNetlify 
            ? 'Are you sure you want to sign out? This will sign you out of both AprenMaker Hub and your connected account. Any unsaved work will be lost.'
            : 'Are you sure you want to sign out? Any unsaved work will be lost.';
            
        if (confirm(message)) {
            this.auth.logout();
            this.hideModal();
            this.showNotification('You have been signed out successfully', 'info');
        }
    }
    
    /**
     * Extend session
     */
    extendSession() {
        if (this.auth.extendSession()) {
            this.showNotification('Session extended successfully', 'success');
            
            // Refresh profile modal if open
            const modal = document.getElementById('profile-modal');
            if (modal) {
                this.showProfile();
            }
        } else {
            this.showNotification('Failed to extend session', 'error');
        }
    }
    
    /**
     * Show success message after login
     */
    showSuccessMessage(educator) {
        const welcomeMessage = educator.type === 'netlify' 
            ? `Welcome, ${educator.name}! You're signed in with your ${educator.provider} account.`
            : `Welcome back, ${educator.name}! You're logged in with institutional access.`;
            
        this.showNotification(welcomeMessage, 'success', 4000);
    }
    
    /**
     * Show notification with enhanced styling
     */
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `auth-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.add('notification-fade-out');
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }
    
    // ... [Keep all existing utility methods like createModal, showModal, etc.]
    
    /**
     * Create modal structure
     */
    createModal(id, title) {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.id = id;
        
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="authUI.hideModal()"></div>
            <div class="modal-dialog">
                <div class="modal-header">
                    <h2 class="modal-title">${title}</h2>
                    <button class="modal-close" onclick="authUI.hideModal()">×</button>
                </div>
                <div class="modal-body"></div>
            </div>
        `;
        
        return modal;
    }
    
    /**
     * Show modal
     */
    showModal(modal) {
        this.hideModal(); // Hide any existing modal
        document.body.appendChild(modal);
        this.currentModal = modal;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus trap
        this.setupFocusTrap(modal);
        
        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    /**
     * Hide modal
     */
    hideModal() {
        if (this.currentModal) {
            document.body.removeChild(this.currentModal);
            this.currentModal = null;
            document.body.style.overflow = '';
        }
    }
    
    /**
     * Setup focus trap for accessibility
     */
    setupFocusTrap(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
            
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    }
    
    /**
     * Set button loading state
     */
    setButtonLoading(button, loading) {
        const text = button.querySelector('.btn-text');
        const loader = button.querySelector('.btn-loader');
        
        if (loading) {
            text.style.opacity = '0';
            loader.style.display = 'block';
            button.disabled = true;
        } else {
            text.style.opacity = '1';
            loader.style.display = 'none';
            button.disabled = false;
        }
    }
    
    /**
     * Dispatch custom events
     */
    dispatchEvent(eventName, data = null) {
        const event = new CustomEvent(`auth:${eventName}`, {
            detail: data,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for auth events
        document.addEventListener('auth:login', (e) => {
            console.log('User logged in:', e.detail);
        });
        
        document.addEventListener('auth:logout', (e) => {
            console.log('User logged out');
        });
    }
    
    /**
     * Get educator icon based on level
     */
    getEducatorIcon(level) {
        const icons = {
            'community': '👤',
            'educator': '👨‍🏫',
            'eso': '🏫',
            'fp': '⚙️',
            'admin': '👨‍💼',
            'demo': '🎓'
        };
        return icons[level] || '👤';
    }
    
    /**
     * Get tool icon
     */
    getToolIcon(tool) {
        const icons = {
            'arduino': '🔌',
            '3d_printer': '🖨️',
            'laser_cutter': '⚡',
            'cnc': '🔧',
            'computers': '💻',
            'advanced_electronics': '🔬',
            'sensors': '📡',
            'soldering_station': '🔥',
            'multimeter': '📊',
            'hand_tools': '🔨',
            'design_software': '🎨',
            'basic_sensors': '📊'
        };
        return icons[tool] || '⚒️';
    }
    
    /**
     * Format tool name for display
     */
    formatToolName(tool) {
        return tool.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    /**
     * Format permission for display
     */
    formatPermission(permission) {
        const descriptions = {
            'create_curriculum': 'Create and modify curricula',
            'save_local': 'Save work locally',
            'view_community': 'Access community resources',
            'eso_content': 'Access ESO-specific content',
            'fp_content': 'Access FP-specific content',
            'advanced_tools': 'Use advanced fabrication tools',
            'design_tools': 'Access design software tools',
            'enhanced_tools': 'Enhanced tool permissions',
            'educational_resources': 'Educational resource library',
            'github_integration': 'GitHub integration features',
            'google_classroom_integration': 'Google Classroom integration',
            'all': 'Full administrator access'
        };
        return descriptions[permission] || permission.replace(/_/g, ' ');
    }
    
    /**
     * Get notification icon
     */
    getNotificationIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    }
    
    /**
     * Inject enhanced CSS styles
     */
    injectStyles() {
        if (document.getElementById('auth-ui-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'auth-ui-styles';
        styles.textContent = `
            /* Enhanced Auth Modal Styles with Netlify Integration */
            .auth-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--nimbus-font, 'Nimbus Sans L', sans-serif);
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(4px);
            }
            
            .modal-dialog {
                position: relative;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                max-width: 520px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: modalSlideIn 0.3s ease-out;
            }
            
            [data-md-color-scheme="slate"] .modal-dialog {
                background: var(--md-default-bg-color);
                color: var(--md-default-fg-color);
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem 0;
                border-bottom: 1px solid #e0e0e0;
                margin-bottom: 2rem;
            }
            
            [data-md-color-scheme="slate"] .modal-header {
                border-bottom-color: var(--md-default-fg-color--lightest);
            }
            
            .modal-title {
                margin: 0;
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--md-primary-fg-color);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: rgba(216, 235, 0, 0.1);
                color: #d8eb00;
            }
            
            .modal-body {
                padding: 0 2rem 2rem;
            }
            
            /* Enhanced Auth Form Styles */
            .auth-form {
                width: 100%;
            }
            
            .auth-header {
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .auth-header h3 {
                margin: 0 0 0.5rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1.4rem;
                font-weight: 700;
            }
            
            .auth-header p {
                margin: 0;
                color: var(--md-default-fg-color--light);
                font-size: 1rem;
                line-height: 1.5;
            }
            
            /* Auth Sections */
            .auth-section {
                margin-bottom: 2rem;
            }
            
            .auth-section h4 {
                margin: 0 0 1rem 0;
                color: var(--md-default-fg-color);
                font-size: 1rem;
                font-weight: 600;
                text-align: center;
            }
            
            /* Netlify Section */
            .netlify-section {
                background: rgba(216, 235, 0, 0.05);
                padding: 1.5rem;
                border-radius: 12px;
                border: 1px solid rgba(216, 235, 0, 0.2);
            }
            
            .auth-buttons {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .auth-button {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.75rem;
                padding: 1rem 1.5rem;
                border: 2px solid #d8eb00;
                border-radius: 8px;
                background: #d8eb00;
                color: #000000;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
            }
            
            .auth-button:hover {
                background: #c4d400;
                border-color: #c4d400;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(216, 235, 0, 0.3);
            }
            
            .auth-icon {
                width: 20px;
                height: 20px;
                fill: currentColor;
            }
            
            .provider-options {
                text-align: center;
                margin-top: 0.5rem;
            }
            
            .provider-options small {
                color: var(--md-default-fg-color--light);
                font-size: 0.85rem;
            }
            
            /* Auth Divider */
            .auth-divider {
                text-align: center;
                margin: 2rem 0;
                position: relative;
            }
            
            .auth-divider::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 1px;
                background: #e0e0e0;
            }
            
            .auth-divider span {
                background: white;
                padding: 0 1rem;
                color: var(--md-default-fg-color--light);
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            [data-md-color-scheme="slate"] .auth-divider span {
                background: var(--md-default-bg-color);
            }
            
            [data-md-color-scheme="slate"] .auth-divider::before {
                background: var(--md-default-fg-color--lightest);
            }
            
            /* Code Section */
            .code-section {
                background: rgba(0, 0, 0, 0.02);
                padding: 1.5rem;
                border-radius: 12px;
                border: 1px solid #e0e0e0;
            }
            
            [data-md-color-scheme="slate"] .code-section {
                background: rgba(255, 255, 255, 0.02);
                border-color: var(--md-default-fg-color--lightest);
            }
            
            /* Form Elements */
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: var(--md-default-fg-color);
            }
            
            .form-group input[type="text"], 
            .form-group input[type="password"] {
                width: 100%;
                padding: 0.75rem 1rem;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                font-family: inherit;
                transition: all 0.2s ease;
                box-sizing: border-box;
            }
            
            .form-group input:focus {
                outline: none;
                border-color: #d8eb00;
                box-shadow: 0 0 0 3px rgba(216, 235, 0, 0.1);
            }
            
            [data-md-color-scheme="slate"] .form-group input {
                background: var(--md-default-bg-color);
                border-color: var(--md-default-fg-color--lightest);
                color: var(--md-default-fg-color);
            }
            
            .form-help {
                display: block;
                margin-top: 0.25rem;
                font-size: 0.8rem;
                color: var(--md-default-fg-color--light);
            }
            
            .checkbox-group {
                margin: 1rem 0;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                cursor: pointer;
                font-size: 0.9rem;
            }
            
            .checkbox-label input[type="checkbox"] {
                margin-right: 0.5rem;
                width: auto;
            }
            
            .form-actions {
                display: flex;
                gap: 1rem;
                flex-direction: column;
            }
            
            .btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 48px;
                font-family: inherit;
            }
            
            .btn-primary {
                background: var(--md-primary-fg-color);
                color: white;
            }
            
            .btn-primary:hover:not(:disabled) {
                background: #333;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            .btn-secondary {
                background: #d8eb00;
                color: var(--md-primary-fg-color);
            }
            
            .btn-secondary:hover:not(:disabled) {
                background: #c4d400;
                transform: translateY(-2px);
            }
            
            .btn-danger {
                background: #dc3545;
                color: white;
            }
            
            .btn-danger:hover:not(:disabled) {
                background: #c82333;
                transform: translateY(-2px);
            }
            
            .btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none !important;
            }
            
            .btn-loader {
                width: 20px;
                height: 20px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            /* Error Messages */
            .auth-error {
                background: #f8d7da;
                color: #721c24;
                padding: 0.75rem 1rem;
                border-radius: 6px;
                margin-top: 1rem;
                border: 1px solid #f5c6cb;
            }
            
            [data-md-color-scheme="slate"] .auth-error {
                background: rgba(220, 53, 69, 0.1);
                color: #ff6b7a;
                border-color: rgba(220, 53, 69, 0.2);
            }
            
            /* Auth Benefits */
            .auth-benefits {
                background: rgba(216, 235, 0, 0.05);
                padding: 1.5rem;
                border-radius: 12px;
                margin: 2rem 0;
                border: 1px solid rgba(216, 235, 0, 0.2);
            }
            
            .auth-benefits h4 {
                margin: 0 0 1rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1.1rem;
                text-align: center;
            }
            
            .benefits-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }
            
            .benefit-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 8px;
            }
            
            [data-md-color-scheme="slate"] .benefit-item {
                background: rgba(255, 255, 255, 0.05);
            }
            
            .benefit-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .benefit-text {
                font-size: 0.9rem;
                color: var(--md-default-fg-color);
                line-height: 1.4;
            }
            
            /* Help Section */
            .auth-help {
                margin-top: 2rem;
                padding-top: 1.5rem;
                border-top: 1px solid #e0e0e0;
            }
            
            [data-md-color-scheme="slate"] .auth-help {
                border-top-color: var(--md-default-fg-color--lightest);
            }
            
            .auth-help details {
                cursor: pointer;
            }
            
            .auth-help summary {
                font-weight: 600;
                color: var(--md-default-fg-color);
                margin-bottom: 1rem;
                padding: 0.5rem;
                border-radius: 4px;
                transition: background 0.2s ease;
            }
            
            .auth-help summary:hover {
                background: rgba(216, 235, 0, 0.1);
            }
            
            .help-content {
                font-size: 0.9rem;
                line-height: 1.6;
                padding: 0 0.5rem;
            }
            
            .help-content h4 {
                margin: 1rem 0 0.5rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1rem;
            }
            
            .help-content code {
                background: rgba(216, 235, 0, 0.1);
                padding: 0.2rem 0.4rem;
                border-radius: 4px;
                font-family: var(--code-font, monospace);
                color: #d8eb00;
                font-weight: 600;
            }
            
            /* Demo Profiles */
            .demo-options {
                width: 100%;
            }
            
            .demo-header {
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .demo-header h3 {
                margin: 0 0 0.5rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1.4rem;
            }
            
            .demo-profiles {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .demo-profile {
                position: relative;
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                padding: 1.5rem;
                border: 2px solid #e0e0e0;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: white;
            }
            
            .demo-profile:hover {
                border-color: #d8eb00;
                background: rgba(216, 235, 0, 0.05);
                transform: translateY(-4px);
                box-shadow: 0 8px 24px rgba(216, 235, 0, 0.15);
            }
            
            [data-md-color-scheme="slate"] .demo-profile {
                background: var(--md-default-bg-color);
                border-color: var(--md-default-fg-color--lightest);
            }
            
            [data-md-color-scheme="slate"] .demo-profile:hover {
                border-color: #d8eb00;
                background: rgba(216, 235, 0, 0.08);
            }
            
            .profile-icon {
                font-size: 2.5rem;
                flex-shrink: 0;
                width: 60px;
                text-align: center;
            }
            
            .profile-info {
                flex: 1;
            }
            
            .profile-info h4 {
                margin: 0 0 0.5rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1.2rem;
                font-weight: 700;
            }
            
            .profile-info p {
                margin: 0 0 0.75rem 0;
                color: var(--md-default-fg-color--light);
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .profile-info ul {
                margin: 0;
                padding-left: 1rem;
                font-size: 0.85rem;
                color: var(--md-default-fg-color--light);
            }
            
            .profile-info li {
                margin-bottom: 0.25rem;
            }
            
            .profile-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: #d8eb00;
                color: #000;
                padding: 0.25rem 0.75rem;
                border-radius: 16px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            
            .demo-actions {
                text-align: center;
                margin-bottom: 1rem;
            }
            
            .demo-note {
                background: rgba(0, 0, 0, 0.02);
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid #e0e0e0;
                font-size: 0.9rem;
                line-height: 1.5;
            }
            
            [data-md-color-scheme="slate"] .demo-note {
                background: rgba(255, 255, 255, 0.02);
                border-color: var(--md-default-fg-color--lightest);
            }
            
            /* Enhanced Profile View */
            .profile-info {
                width: 100%;
            }
            
            .profile-header {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                margin-bottom: 2rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #e0e0e0;
            }
            
            [data-md-color-scheme="slate"] .profile-header {
                border-bottom-color: var(--md-default-fg-color--lightest);
            }
            
            .profile-avatar {
                font-size: 3rem;
                width: 80px;
                height: 80px;
                background: rgba(216, 235, 0, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                overflow: hidden;
            }
            
            .avatar-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
            
            .profile-details h3 {
                margin: 0 0 0.25rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1.4rem;
            }
            
            .profile-role {
                margin: 0 0 0.25rem 0;
                font-weight: 600;
                color: #d8eb00;
                font-size: 1rem;
            }
            
            .profile-school, .profile-email, .profile-provider {
                margin: 0 0 0.125rem 0;
                color: var(--md-default-fg-color--light);
                font-size: 0.9rem;
            }
            
            .profile-provider {
                font-weight: 500;
                color: #d8eb00;
            }
            
            .profile-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: rgba(216, 235, 0, 0.05);
                border-radius: 12px;
                border: 1px solid rgba(216, 235, 0, 0.2);
            }
            
            .stat-item {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .stat-label {
                font-size: 0.85rem;
                color: var(--md-default-fg-color--light);
                font-weight: 500;
            }
            
            .stat-value {
                font-size: 1.1rem;
                font-weight: 700;
                color: #d8eb00;
            }
            
            .profile-permissions, .profile-tools, .profile-netlify {
                margin-bottom: 2rem;
            }
            
            .profile-permissions h4, .profile-tools h4, .profile-netlify h4 {
                margin: 0 0 1rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1.1rem;
            }
            
            .permissions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 0.75rem;
            }
            
            .permission-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem;
                background: rgba(216, 235, 0, 0.1);
                border-radius: 6px;
                font-size: 0.9rem;
            }
            
            .permission-icon {
                color: #28a745;
                font-weight: bold;
            }
            
            .tools-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 0.75rem;
            }
            
            .tool-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem;
                background: rgba(216, 235, 0, 0.1);
                border-radius: 6px;
                font-size: 0.85rem;
            }
            
            .tool-icon {
                font-size: 1.2rem;
            }
            
            .tool-name {
                font-weight: 500;
            }
            
            /* Netlify Info Section */
            .netlify-info {
                background: rgba(0, 0, 0, 0.02);
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid #e0e0e0;
            }
            
            [data-md-color-scheme="slate"] .netlify-info {
                background: rgba(255, 255, 255, 0.02);
                border-color: var(--md-default-fg-color--lightest);
            }
            
            .netlify-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }
            
            .netlify-item:last-child {
                border-bottom: none;
            }
            
            [data-md-color-scheme="slate"] .netlify-item {
                border-bottom-color: rgba(255, 255, 255, 0.05);
            }
            
            .netlify-label {
                font-size: 0.9rem;
                color: var(--md-default-fg-color--light);
                font-weight: 500;
            }
            
            .netlify-value {
                font-size: 0.9rem;
                color: var(--md-default-fg-color);
                font-weight: 600;
            }
            
            .profile-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            /* Enhanced Notifications */
            .auth-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 11000;
                max-width: 400px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: slideInRight 0.3s ease-out;
                opacity: 1;
                transition: opacity 0.3s ease;
            }
            
            .notification-fade-out {
                opacity: 0;
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem 1.25rem;
            }
            
            .auth-notification.success {
                background: #d4edda;
                color: #155724;
                border-left: 4px solid #28a745;
            }
            
            .auth-notification.error {
                background: #f8d7da;
                color: #721c24;
                border-left: 4px solid #dc3545;
            }
            
            .auth-notification.warning {
                background: #fff3cd;
                color: #856404;
                border-left: 4px solid #ffc107;
            }
            
            .auth-notification.info {
                background: #d1ecf1;
                color: #0c5460;
                border-left: 4px solid #17a2b8;
            }
            
            [data-md-color-scheme="slate"] .auth-notification.success {
                background: rgba(40, 167, 69, 0.1);
                color: #4caf50;
            }
            
            [data-md-color-scheme="slate"] .auth-notification.error {
                background: rgba(220, 53, 69, 0.1);
                color: #ff6b7a;
            }
            
            [data-md-color-scheme="slate"] .auth-notification.warning {
                background: rgba(255, 193, 7, 0.1);
                color: #ffc107;
            }
            
            [data-md-color-scheme="slate"] .auth-notification.info {
                background: rgba(23, 162, 184, 0.1);
                color: #17a2b8;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                margin-left: auto;
                opacity: 0.7;
                transition: opacity 0.2s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
                background: rgba(0, 0, 0, 0.1);
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .modal-dialog {
                    width: 95%;
                    margin: 1rem;
                    max-height: 95vh;
                }
                
                .modal-body {
                    padding: 0 1rem 1rem;
                }
                
                .modal-header {
                    padding: 1rem 1rem 0;
                }
                
                .benefits-grid {
                    grid-template-columns: 1fr;
                    gap: 0.75rem;
                }
                
                .demo-profile {
                    flex-direction: column;
                    text-align: center;
                    gap: 1rem;
                }
                
                .profile-badge {
                    position: static;
                    align-self: center;
                    margin-top: 0.5rem;
                }
                
                .profile-header {
                    flex-direction: column;
                    text-align: center;
                    gap: 1rem;
                }
                
                .profile-stats {
                    grid-template-columns: 1fr;
                    gap: 0.75rem;
                }
                
                .tools-grid, .permissions-grid {
                    grid-template-columns: 1fr;
                }
                
                .profile-actions {
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .auth-notification {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }
                
                .form-actions {
                    gap: 0.75rem;
                }
            }
            
            /* Extra small screens */
            @media (max-width: 480px) {
                .modal-dialog {
                    width: 98%;
                    margin: 0.5rem;
                }
                
                .auth-section {
                    margin-bottom: 1.5rem;
                }
                
                .netlify-section, .code-section {
                    padding: 1rem;
                }
                
                .auth-benefits {
                    padding: 1rem;
                }
                
                .demo-profiles {
                    gap: 1rem;
                }
                
                .demo-profile {
                    padding: 1rem;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Create global instance
window.authUI = new AuthUI(window.educatorAuth);

// Convenience methods
window.showLogin = (onSuccess) => window.authUI.showLogin(onSuccess);
window.showProfile = () => window.authUI.showProfile();
window.showDemoLogin = () => window.authUI.showDemoLogin();