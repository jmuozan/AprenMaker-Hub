// docs/javascript/authentication/ui.js
// Authentication UI Components

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
     * Show login modal
     */
    showLogin(onSuccess = null) {
        const modal = this.createModal('login-modal', 'Educator Access');
        
        const content = `
            <div class="auth-form">
                <div class="auth-header">
                    <h3>Welcome to AprenMaker Hub</h3>
                    <p>Please enter your educator access code to continue</p>
                </div>
                
                <form id="login-form" class="auth-form-fields">
                    <div class="form-group">
                        <label for="access-code">Access Code</label>
                        <input 
                            type="text" 
                            id="access-code" 
                            placeholder="Enter your access code"
                            required
                            autocomplete="off"
                        >
                        <small class="form-help">Contact your administrator if you don't have an access code</small>
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
                
                <div class="auth-error" id="login-error" style="display: none;"></div>
                
                <div class="auth-help">
                    <details>
                        <summary>Need help accessing the platform?</summary>
                        <div class="help-content">
                            <h4>For ESO Teachers:</h4>
                            <p>Use code: <code>valencia_eso_2025</code> or <code>madrid_eso_2025</code></p>
                            
                            <h4>For FP Instructors:</h4>
                            <p>Use code: <code>fp_digital_2025</code> or <code>fp_design_2025</code></p>
                            
                            <h4>For Demo Access:</h4>
                            <p>Use code: <code>demo_teacher</code></p>
                            
                            <small>Note: These are demonstration codes. In production, you would receive your unique access code from your institution.</small>
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
            this.handleLogin(onSuccess);
        });
        
        // Focus on input
        setTimeout(() => {
            modal.querySelector('#access-code').focus();
        }, 100);
        
        this.showModal(modal);
    }
    
    /**
     * Show demo login options
     */
    showDemoLogin() {
        const modal = this.createModal('demo-modal', 'Demo Access');
        
        const content = `
            <div class="demo-options">
                <div class="demo-header">
                    <h3>Choose Your Demo Profile</h3>
                    <p>Experience the platform from different educator perspectives</p>
                </div>
                
                <div class="demo-profiles">
                    <div class="demo-profile" data-code="valencia_eso_2025">
                        <div class="profile-icon">🏫</div>
                        <div class="profile-info">
                            <h4>ESO Technology Teacher</h4>
                            <p>Valencia Region • 25 students • Basic tools</p>
                            <ul>
                                <li>Arduino projects</li>
                                <li>3D printing basics</li>
                                <li>50-minute sessions</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="demo-profile" data-code="fp_digital_2025">
                        <div class="profile-icon">⚙️</div>
                        <div class="profile-info">
                            <h4>FP Digital Fabrication</h4>
                            <p>FP Center • 15 students • Advanced tools</p>
                            <ul>
                                <li>Laser cutting & CNC</li>
                                <li>Advanced electronics</li>
                                <li>2-hour workshops</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="demo-profile" data-code="demo_teacher">
                        <div class="profile-icon">🎓</div>
                        <div class="profile-info">
                            <h4>General Demo Account</h4>
                            <p>Demo School • Limited features</p>
                            <ul>
                                <li>Basic curriculum creation</li>
                                <li>Community access</li>
                                <li>No save functionality</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="demo-actions">
                    <button class="btn btn-secondary" onclick="authUI.showLogin()">
                        ← Back to Login
                    </button>
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
     * Handle login form submission
     */
    async handleLogin(onSuccess = null) {
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
     * Login with specific code (for demo profiles)
     */
    async loginWithCode(code, remember = false) {
        const result = this.auth.login(code, remember);
        
        if (result.success) {
            this.showSuccessMessage(result.educator);
            this.hideModal();
            this.dispatchEvent('login', result);
        } else {
            alert(result.error);
        }
    }
    
    /**
     * Show user profile/status
     */
    showProfile() {
        const educator = this.auth.getEducator();
        if (!educator) return;
        
        const modal = this.createModal('profile-modal', 'Educator Profile');
        
        const session = this.auth.getSession();
        const timeLeft = new Date(session.expires) - new Date();
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        const content = `
            <div class="profile-info">
                <div class="profile-header">
                    <div class="profile-avatar">
                        ${this.getEducatorIcon(educator.level)}
                    </div>
                    <div class="profile-details">
                        <h3>${educator.name}</h3>
                        <p class="profile-role">${educator.role}</p>
                        <p class="profile-school">${educator.school}</p>
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
                        <span class="stat-label">Available Tools:</span>
                        <span class="stat-value">${educator.tools.length} tools</span>
                    </div>
                </div>
                
                <div class="profile-tools">
                    <h4>Available Tools & Equipment</h4>
                    <div class="tools-grid">
                        ${educator.tools.map(tool => `
                            <div class="tool-item">
                                ${this.getToolIcon(tool)}
                                <span>${this.formatToolName(tool)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="profile-permissions">
                    <h4>Permissions</h4>
                    <div class="permissions-list">
                        ${educator.permissions.map(permission => `
                            <div class="permission-item">
                                ✓ ${this.formatPermission(permission)}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="profile-actions">
                    <button class="btn btn-secondary" onclick="authUI.extendSession()">
                        Extend Session
                    </button>
                    <button class="btn btn-danger" onclick="authUI.confirmLogout()">
                        Logout
                    </button>
                </div>
            </div>
        `;
        
        modal.querySelector('.modal-body').innerHTML = content;
        this.showModal(modal);
    }
    
    /**
     * Confirm logout
     */
    confirmLogout() {
        if (confirm('Are you sure you want to logout? Any unsaved work will be lost.')) {
            this.auth.logout();
            this.hideModal();
            this.dispatchEvent('logout');
            location.reload();
        }
    }
    
    /**
     * Extend session
     */
    extendSession() {
        if (this.auth.extendSession()) {
            this.showNotification('Session extended successfully', 'success');
            this.hideModal();
        } else {
            this.showNotification('Failed to extend session', 'error');
        }
    }
    
    /**
     * Show success message after login
     */
    showSuccessMessage(educator) {
        this.showNotification(
            `Welcome back, ${educator.name}! You're now logged in.`,
            'success',
            4000
        );
    }
    
    /**
     * Show notification
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
                notification.remove();
            }
        }, duration);
    }
    
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
            'design_software': '🎨'
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
     * Inject CSS styles
     */
    injectStyles() {
        if (document.getElementById('auth-ui-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'auth-ui-styles';
        styles.textContent = `
            /* Auth Modal Styles using AprenMaker theme colors */
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
                max-width: 500px;
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
            
            /* Auth Form Styles */
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
                font-size: 1.3rem;
            }
            
            .auth-header p {
                margin: 0;
                color: var(--md-default-fg-color--light);
                font-size: 0.95rem;
            }
            
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
            }
            
            .help-content {
                font-size: 0.9rem;
                line-height: 1.6;
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
            }
            
            .demo-profiles {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .demo-profile {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                padding: 1.5rem;
                border: 2px solid #e0e0e0;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .demo-profile:hover {
                border-color: #d8eb00;
                background: rgba(216, 235, 0, 0.05);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(216, 235, 0, 0.1);
            }
            
            [data-md-color-scheme="slate"] .demo-profile {
                border-color: var(--md-default-fg-color--lightest);
            }
            
            [data-md-color-scheme="slate"] .demo-profile:hover {
                border-color: #d8eb00;
                background: rgba(216, 235, 0, 0.08);
            }
            
            .profile-icon {
                font-size: 2rem;
                flex-shrink: 0;
            }
            
            .profile-info h4 {
                margin: 0 0 0.5rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1.1rem;
            }
            
            .profile-info p {
                margin: 0 0 0.75rem 0;
                color: var(--md-default-fg-color--light);
                font-size: 0.9rem;
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
            
            .demo-actions {
                text-align: center;
            }
            
            /* Profile View */
            .profile-info {
                width: 100%;
            }
            
            .profile-header {
                display: flex;
                align-items: center;
                gap: 1rem;
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
            }
            
            .profile-details h3 {
                margin: 0 0 0.25rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1.3rem;
            }
            
            .profile-role {
                margin: 0 0 0.25rem 0;
                font-weight: 600;
                color: #d8eb00;
                font-size: 1rem;
            }
            
            .profile-school {
                margin: 0;
                color: var(--md-default-fg-color--light);
                font-size: 0.9rem;
            }
            
            .profile-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
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
            
            .profile-tools, .profile-permissions {
                margin-bottom: 2rem;
            }
            
            .profile-tools h4, .profile-permissions h4 {
                margin: 0 0 1rem 0;
                color: var(--md-primary-fg-color);
                font-size: 1.1rem;
            }
            
            .tools-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 0.75rem;
            }
            
            .tool-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem;
                background: rgba(216, 235, 0, 0.1);
                border-radius: 6px;
                font-size: 0.85rem;
            }
            
            .permissions-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .permission-item {
                font-size: 0.9rem;
                color: var(--md-default-fg-color);
            }
            
            .profile-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            /* Notifications */
            .auth-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 11000;
                max-width: 400px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: slideInRight 0.3s ease-out;
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
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                margin-left: auto;
            }
            
            .notification-close:hover {
                background: rgba(0, 0, 0, 0.1);
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .modal-dialog {
                    width: 95%;
                    margin: 1rem;
                }
                
                .modal-body {
                    padding: 0 1rem 1rem;
                }
                
                .modal-header {
                    padding: 1rem 1rem 0;
                }
                
                .demo-profile {
                    flex-direction: column;
                    text-align: center;
                }
                
                .profile-header {
                    flex-direction: column;
                    text-align: center;
                }
                
                .profile-stats {
                    grid-template-columns: 1fr;
                }
                
                .tools-grid {
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                }
                
                .profile-actions {
                    flex-direction: column;
                }
                
                .auth-notification {
                    left: 10px;
                    right: 10px;
                    max-width: none;
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