// docs/javascript/authentication/integration.js
// Complete Integration with Netlify Identity

class AuthIntegration {
    constructor() {
        this.auth = window.educatorAuth;
        this.ui = window.authUI;
        this.curriculumBuilder = null;
        
        this.init();
    }
    
    init() {
        this.setupAuthenticationGate();
        this.setupEventListeners();
        this.checkInitialAuth();
        this.setupNetlifyIntegration();
    }
    
    /**
     * Setup Netlify-specific integration
     */
    setupNetlifyIntegration() {
        // Enhanced analytics for Netlify users
        document.addEventListener('auth:login', (e) => {
            const { educator, session } = e.detail;
            
            if (session.type === 'netlify') {
                this.handleNetlifyUserLogin(educator, session);
            }
        });
        
        // Netlify-specific logout handling
        document.addEventListener('auth:logout', (e) => {
            this.handleAuthLogout();
        });
    }
    
    /**
     * Handle Netlify user login with enhanced features
     */
    handleNetlifyUserLogin(educator, session) {
        // Log detailed Netlify analytics
        this.auth.logEvent('netlify_user_login', {
            provider: educator.provider,
            level: educator.level,
            hasAvatar: !!educator.avatar,
            emailDomain: educator.email ? educator.email.split('@')[1] : null,
            permissions: educator.permissions,
            toolCount: educator.tools.length
        });
        
        // Show personalized welcome for Netlify users
        this.showNetlifyWelcome(educator);
        
        // Auto-save preferences for Netlify users
        this.saveUserPreferences(educator);
    }
    
    /**
     * Show personalized welcome for Netlify users
     */
    showNetlifyWelcome(educator) {
        let welcomeMessage = `🎉 Welcome to AprenMaker Hub, ${educator.name}!`;
        
        if (educator.level === 'educator') {
            welcomeMessage += ` Your educational email domain has been recognized - you have enhanced access to educational resources.`;
        } else if (educator.provider === 'github') {
            welcomeMessage += ` Your GitHub account is connected - you can now save and sync your work.`;
        } else if (educator.provider === 'google') {
            welcomeMessage += ` Your Google account is connected - explore our curriculum tools designed for educators.`;
        }
        
        // Show enhanced notification with next steps
        setTimeout(() => {
            if (window.authUI) {
                window.authUI.showNotification(welcomeMessage, 'success', 6000);
            }
        }, 1000);
    }
    
    /**
     * Save user preferences for Netlify users
     */
    saveUserPreferences(educator) {
        const preferences = {
            lastLogin: new Date().toISOString(),
            provider: educator.provider,
            level: educator.level,
            preferredTools: educator.tools.slice(0, 3), // Top 3 tools
            theme: document.documentElement.getAttribute('data-md-color-scheme') || 'default'
        };
        
        localStorage.setItem(`prefs_${educator.netlifyId}`, JSON.stringify(preferences));
    }
    
    /**
     * Setup authentication gate for protected content
     */
    setupAuthenticationGate() {
        // Create authentication wrapper for curriculum builder
        const curriculumApp = document.getElementById('curriculum-app');
        if (curriculumApp) {
            this.protectCurriculumBuilder(curriculumApp);
        }
        
        // Protect other educational tools
        this.protectEducationalContent();
    }
    
    /**
     * Protect curriculum builder with enhanced authentication
     */
    protectCurriculumBuilder(container) {
        // Store original content
        const originalContent = container.innerHTML;
        
        // Check if user is authenticated
        if (!this.auth.isAuthenticated()) {
            this.showEnhancedAuthenticationRequired(container, originalContent);
        } else {
            this.initializeAuthenticatedCurriculum(container, originalContent);
        }
    }
    
    /**
     * Show enhanced authentication required message
     */
    showEnhancedAuthenticationRequired(container, originalContent) {
        container.innerHTML = `
            <div class="auth-gate enhanced">
                <div class="auth-gate-content">
                    <div class="auth-gate-hero">
                        <div class="auth-gate-icon">🚀</div>
                        <h3>Ready to Build Amazing Curricula?</h3>
                        <p class="auth-gate-tagline">
                            Join educators worldwide who are creating engaging, hands-on learning experiences
                        </p>
                    </div>
                    
                    <div class="auth-gate-features">
                        <div class="feature-grid">
                            <div class="feature-item">
                                <div class="feature-icon">🎯</div>
                                <div class="feature-text">
                                    <h4>Personalized Content</h4>
                                    <p>Get curriculum recommendations based on your teaching level and available tools</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon">💾</div>
                                <div class="feature-text">
                                    <h4>Save & Share</h4>
                                    <p>Save your curricula, share with colleagues, and build a library of resources</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon">🔧</div>
                                <div class="feature-text">
                                    <h4>Tool Integration</h4>
                                    <p>Match projects to your available equipment and fabrication tools</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon">👥</div>
                                <div class="feature-text">
                                    <h4>Community Access</h4>
                                    <p>Connect with other educators and access shared resources</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="auth-gate-actions">
                        <button class="btn btn-primary large" onclick="authIntegration.handleQuickLogin('${container.id}', \`${originalContent.replace(/`/g, '\\`')}\`)">
                            🎓 Get Started - Sign In
                        </button>
                        <button class="btn btn-secondary" onclick="authIntegration.showDemo()">
                            👀 Try Demo First
                        </button>
                    </div>
                    
                    <div class="auth-gate-options">
                        <div class="sign-in-options">
                            <p><strong>Sign in with:</strong></p>
                            <div class="provider-badges">
                                <span class="provider-badge github">GitHub</span>
                                <span class="provider-badge google">Google</span>
                                <span class="provider-badge email">Email</span>
                                <span class="provider-badge institutional">Institutional Code</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="auth-gate-help">
                        <details class="help-expandable">
                            <summary>What's the difference between account types?</summary>
                            <div class="help-comparison">
                                <div class="account-type">
                                    <h5>Personal Account (GitHub/Google/Email)</h5>
                                    <ul>
                                        <li>✅ Create and save curricula</li>
                                        <li>✅ Access community resources</li>
                                        <li>✅ Basic tool library</li>
                                        <li>✅ Progress tracking</li>
                                    </ul>
                                </div>
                                <div class="account-type">
                                    <h5>Institutional Access (Special Codes)</h5>
                                    <ul>
                                        <li>✅ Everything in Personal Account</li>
                                        <li>✅ Enhanced tool permissions</li>
                                        <li>✅ Advanced fabrication equipment</li>
                                        <li>✅ Educational standards alignment</li>
                                        <li>✅ Administrative features</li>
                                    </ul>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Initialize authenticated curriculum with enhanced personalization
     */
    initializeAuthenticatedCurriculum(container, originalContent) {
        const educator = this.auth.getEducator();
        const session = this.auth.getSession();
        
        // Restore original content
        container.innerHTML = originalContent;
        
        // Add enhanced educator toolbar
        this.addEnhancedEducatorToolbar(container);
        
        // Personalize curriculum builder
        this.personalizeCurriculumBuilder(educator);
        
        // Initialize enhanced features based on account type
        if (session.type === 'netlify') {
            this.initializeNetlifyFeatures(container, educator);
        } else {
            this.initializeInstitutionalFeatures(container, educator);
        }
        
        // Initialize common enhanced features
        this.initializeEnhancedFeatures(container);
    }
    
    /**
     * Add enhanced educator toolbar with Netlify integration
     */
    addEnhancedEducatorToolbar(container) {
        const educator = this.auth.getEducator();
        const session = this.auth.getSession();
        const isNetlify = session.type === 'netlify';
        
        const toolbar = document.createElement('div');
        toolbar.className = 'educator-toolbar enhanced';
        toolbar.innerHTML = `
            <div class="toolbar-left">
                <div class="educator-info">
                    <div class="educator-avatar">
                        ${educator.avatar ? 
                            `<img src="${educator.avatar}" alt="${educator.name}" class="avatar-img" />` : 
                            `<span class="avatar-icon">${this.getEducatorIcon(educator.level)}</span>`
                        }
                    </div>
                    <div class="educator-details">
                        <span class="educator-name">${educator.name}</span>
                        <span class="educator-role">${educator.role}</span>
                        ${isNetlify ? `<span class="educator-provider">via ${educator.provider}</span>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="toolbar-center">
                <div class="session-status">
                    <span class="status-indicator active"></span>
                    <span class="session-text">Active Session</span>
                </div>
                <div class="account-type">
                    <span class="type-badge ${session.type}">${session.type === 'netlify' ? 'Personal' : 'Institutional'}</span>
                </div>
            </div>
            
            <div class="toolbar-right">
                <div class="toolbar-stats">
                    <div class="stat-item">
                        <span class="stat-value">${educator.tools.length}</span>
                        <span class="stat-label">Tools</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${educator.permissions.length}</span>
                        <span class="stat-label">Permissions</span>
                    </div>
                </div>
                
                <div class="toolbar-actions">
                    <button class="toolbar-btn" onclick="authIntegration.showSavedCurricula()" title="My Curricula">
                        📚 <span class="btn-text">My Work</span>
                    </button>
                    ${isNetlify ? `
                        <button class="toolbar-btn" onclick="authIntegration.syncWithCloud()" title="Sync Data">
                            ☁️ <span class="btn-text">Sync</span>
                        </button>
                    ` : ''}
                    <button class="toolbar-btn" onclick="authUI.showProfile()" title="Profile">
                        👤 <span class="btn-text">Profile</span>
                    </button>
                    <button class="toolbar-btn logout-btn" onclick="authIntegration.confirmLogout()" title="Sign Out">
                        🚪 <span class="btn-text">Sign Out</span>
                    </button>
                </div>
            </div>
        `;
        
        // Insert toolbar at the beginning of the container
        container.insertBefore(toolbar, container.firstChild);
        
        // Update session status periodically
        this.startEnhancedSessionMonitoring(toolbar);
    }
    
    /**
     * Initialize Netlify-specific features
     */
    initializeNetlifyFeatures(container, educator) {
        // Add cloud sync functionality
        this.setupCloudSync(educator);
        
        // Add GitHub integration if available
        if (educator.provider === 'github') {
            this.setupGitHubIntegration(educator);
        }
        
        // Add Google integration if available
        if (educator.provider === 'google') {
            this.setupGoogleIntegration(educator);
        }
        
        // Add personalized recommendations
        this.setupPersonalizedRecommendations(educator);
    }
    
    /**
     * Initialize institutional features
     */
    initializeInstitutionalFeatures(container, educator) {
        // Add enhanced tool access
        this.setupEnhancedToolAccess(educator);
        
        // Add institutional reporting
        this.setupInstitutionalReporting(educator);
        
        // Add advanced templates
        this.setupAdvancedTemplates(educator);
    }
    
    /**
     * Setup cloud sync for Netlify users
     */
    setupCloudSync(educator) {
        // Implement cloud sync functionality
        window.syncWithCloud = () => {
            this.syncUserDataToCloud(educator);
        };
    }
    
    /**
     * Sync user data to cloud (Netlify Identity + localStorage)
     */
    async syncUserDataToCloud(educator) {
        try {
            // Get all user data
            const userData = this.collectUserData(educator);
            
            // In a real implementation, you would sync with a backend
            // For now, we'll use advanced localStorage with versioning
            const syncData = {
                userId: educator.netlifyId,
                lastSync: new Date().toISOString(),
                version: this.generateDataVersion(),
                data: userData
            };
            
            localStorage.setItem(`cloud_sync_${educator.netlifyId}`, JSON.stringify(syncData));
            
            this.auth.logEvent('cloud_sync_success', {
                dataSize: JSON.stringify(userData).length,
                itemCount: Object.keys(userData).length
            });
            
            if (window.authUI) {
                window.authUI.showNotification('✅ Data synced successfully!', 'success');
            }
            
        } catch (error) {
            console.error('Cloud sync failed:', error);
            this.auth.logEvent('cloud_sync_failed', { error: error.message });
            
            if (window.authUI) {
                window.authUI.showNotification('❌ Sync failed. Data saved locally.', 'warning');
            }
        }
    }
    
    /**
     * Collect all user data for syncing
     */
    collectUserData(educator) {
        const userData = {};
        
        // Collect curricula
        const savedCurricula = this.getSavedCurricula();
        userData.curricula = savedCurricula.filter(c => c.educatorId === educator.name);
        
        // Collect preferences
        const preferences = localStorage.getItem(`prefs_${educator.netlifyId}`);
        if (preferences) {
            userData.preferences = JSON.parse(preferences);
        }
        
        // Collect analytics
        const analytics = this.auth.getAnalytics();
        userData.analytics = analytics;
        
        return userData;
    }
    
    /**
     * Generate data version for sync conflict resolution
     */
    generateDataVersion() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    /**
     * Setup GitHub integration
     */
    setupGitHubIntegration(educator) {
        // Add GitHub-specific features
        this.addGitHubFeatures(educator);
    }
    
    /**
     * Add GitHub-specific features to the interface
     */
    addGitHubFeatures(educator) {
        // Find a suitable container for GitHub integration
        const curriculumApp = document.getElementById('curriculum-app');
        if (!curriculumApp) return;
        
        // Add GitHub integration section
        const githubSection = document.createElement('div');
        githubSection.className = 'github-integration-section';
        githubSection.innerHTML = `
            <div class="integration-header">
                <h4>🐙 GitHub Integration</h4>
                <p>Your GitHub account is connected! Export curricula as repositories.</p>
            </div>
            <div class="integration-actions">
                <button class="btn btn-secondary" onclick="authIntegration.exportToGitHub()">
                    📤 Export to GitHub
                </button>
                <button class="btn btn-secondary" onclick="authIntegration.viewGitHubProfile()">
                    👤 View GitHub Profile
                </button>
            </div>
        `;
        
        // Insert after the toolbar
        const toolbar = curriculumApp.querySelector('.educator-toolbar');
        if (toolbar) {
            toolbar.insertAdjacentElement('afterend', githubSection);
        }
    }
    
    /**
     * Setup Google integration
     */
    setupGoogleIntegration(educator) {
        // Add Google-specific features
        this.addGoogleFeatures(educator);
    }
    
    /**
     * Add Google-specific features
     */
    addGoogleFeatures(educator) {
        // Future: Google Classroom integration, Google Drive export, etc.
        console.log('Google integration ready for:', educator.email);
    }
    
    /**
     * Setup personalized recommendations
     */
    setupPersonalizedRecommendations(educator) {
        // Add recommendation engine based on user profile
        const recommendations = this.generateRecommendations(educator);
        this.displayRecommendations(recommendations);
    }
    
    /**
     * Generate personalized recommendations
     */
    generateRecommendations(educator) {
        const recommendations = [];
        
        // Based on educator level
        if (educator.level === 'community') {
            recommendations.push({
                type: 'getting_started',
                title: 'Start with Arduino Basics',
                description: 'Perfect introduction to electronics and programming',
                action: 'Load Template',
                templateId: 'arduino_basics'
            });
        }
        
        if (educator.level === 'educator') {
            recommendations.push({
                type: 'curriculum',
                title: 'Cross-Curricular STEAM Projects',
                description: 'Integrate maker activities with math and science',
                action: 'Explore Projects',
                templateId: 'steam_integration'
            });
        }
        
        // Based on provider
        if (educator.provider === 'github') {
            recommendations.push({
                type: 'workflow',
                title: 'Version Control Your Curricula',
                description: 'Export your lesson plans to GitHub repositories',
                action: 'Setup Export',
                feature: 'github_export'
            });
        }
        
        // Based on available tools
        if (educator.tools.includes('3d_printer')) {
            recommendations.push({
                type: 'project',
                title: 'Design Thinking with 3D Printing',
                description: 'Combine design methodology with digital fabrication',
                action: 'View Project',
                templateId: '3d_design_thinking'
            });
        }
        
        return recommendations;
    }
    
    /**
     * Display recommendations in the interface
     */
    displayRecommendations(recommendations) {
        if (recommendations.length === 0) return;
        
        const curriculumApp = document.getElementById('curriculum-app');
        if (!curriculumApp) return;
        
        const recommendationsSection = document.createElement('div');
        recommendationsSection.className = 'recommendations-section';
        recommendationsSection.innerHTML = `
            <div class="recommendations-header">
                <h4>💡 Recommended for You</h4>
                <p>Personalized suggestions based on your profile and interests</p>
            </div>
            <div class="recommendations-grid">
                ${recommendations.map(rec => `
                    <div class="recommendation-card" data-type="${rec.type}">
                        <div class="rec-content">
                            <h5>${rec.title}</h5>
                            <p>${rec.description}</p>
                        </div>
                        <div class="rec-action">
                            <button class="btn btn-sm btn-primary" onclick="authIntegration.handleRecommendation('${rec.templateId || rec.feature}', '${rec.type}')">
                                ${rec.action}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Insert recommendations after integration sections
        const existingIntegration = curriculumApp.querySelector('.github-integration-section, .google-integration-section');
        if (existingIntegration) {
            existingIntegration.insertAdjacentElement('afterend', recommendationsSection);
        } else {
            const toolbar = curriculumApp.querySelector('.educator-toolbar');
            if (toolbar) {
                toolbar.insertAdjacentElement('afterend', recommendationsSection);
            }
        }
    }
    
    /**
     * Handle recommendation clicks
     */
    handleRecommendation(id, type) {
        this.auth.logEvent('recommendation_clicked', { id, type });
        
        if (type === 'getting_started' || type === 'curriculum' || type === 'project') {
            // Load template
            this.loadTemplate(id);
        } else if (type === 'workflow') {
            // Handle workflow recommendations
            if (id === 'github_export') {
                this.setupGitHubExport();
            }
        }
    }
    
    /**
     * Personalize curriculum builder based on educator profile
     */
    personalizeCurriculumBuilder(educator) {
        // Filter available tools based on educator's equipment
        this.filterAvailableTools(educator.tools);
        
        // Filter content complexity based on level
        this.filterContentByLevel(educator.level);
        
        // Set up level-specific templates
        this.loadLevelSpecificTemplates(educator.level);
        
        // Configure save options
        this.configureSaveOptions(educator);
    }
    
    /**
     * Enhanced session monitoring
     */
    startEnhancedSessionMonitoring(toolbar) {
        const updateStatus = () => {
            const statusIndicator = toolbar.querySelector('.status-indicator');
            const sessionText = toolbar.querySelector('.session-text');
            const session = this.auth.getSession();
            
            if (!session) return;
            
            const timeLeft = new Date(session.expires) - new Date();
            const minutesLeft = Math.floor(timeLeft / (1000 * 60));
            const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
            
            if (timeLeft <= 0) {
                statusIndicator.className = 'status-indicator expired';
                sessionText.textContent = 'Session Expired';
            } else if (minutesLeft <= 15) {
                statusIndicator.className = 'status-indicator warning';
                sessionText.textContent = `${minutesLeft}m left`;
            } else if (hoursLeft < 2) {
                statusIndicator.className = 'status-indicator active';
                sessionText.textContent = `${hoursLeft}h ${minutesLeft % 60}m left`;
            } else {
                statusIndicator.className = 'status-indicator active';
                sessionText.textContent = 'Active Session';
            }
        };
        
        // Update immediately and then every minute
        updateStatus();
        setInterval(updateStatus, 60000);
    }
    
    /**
     * Handle quick login from auth gate
     */
    handleQuickLogin(containerId, originalContent) {
        if (window.authUI) {
            window.authUI.showLogin((result) => {
                // Reload the protected content with authentication
                const container = document.getElementById(containerId);
                if (container) {
                    this.initializeAuthenticatedCurriculum(container, originalContent);
                }
            });
        }
    }
    
    /**
     * Show demo without full authentication
     */
    showDemo() {
        // Login with demo account
        const result = this.auth.login('demo_teacher', false);
        if (result.success) {
            location.reload();
        }
    }
    
    /**
     * Enhanced logout confirmation
     */
    confirmLogout() {
        const session = this.auth.getSession();
        const isNetlify = session?.type === 'netlify';
        
        let message = 'Are you sure you want to sign out?';
        if (isNetlify) {
            message += ' This will sign you out of both AprenMaker Hub and your connected account.';
        }
        message += ' Any unsaved work will be lost.';
        
        if (confirm(message)) {
            // Offer to save work before logout
            if (this.hasUnsavedWork()) {
                if (confirm('You have unsaved work. Would you like to save it before signing out?')) {
                    this.saveCurrentWork();
                }
            }
            
            this.auth.logout();
        }
    }
    
    /**
     * Check if there's unsaved work
     */
    hasUnsavedWork() {
        // Check if there are unsaved curricula or active work
        const hasSelectedCards = window.selectedCards && window.selectedCards.size > 0;
        const hasGeneratedContent = document.getElementById('curriculum-content')?.innerHTML.trim();
        
        return hasSelectedCards || hasGeneratedContent;
    }
    
    /**
     * Save current work before logout
     */
    saveCurrentWork() {
        if (typeof window.saveCurriculum === 'function') {
            window.saveCurriculum();
        } else {
            this.saveEducatorCurriculum();
        }
    }
    
    /**
     * Enhanced curriculum save with cloud sync
     */
    saveEducatorCurriculum() {
        const educator = this.auth.getEducator();
        const session = this.auth.getSession();
        
        const curriculumData = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            educatorId: educator.name,
            educatorLevel: educator.level,
            accountType: session.type,
            school: educator.school,
            selectedCards: window.selectedCards ? Array.from(window.selectedCards) : [],
            generatedContent: this.getCurrentCurriculumContent(),
            version: '1.0',
            syncable: session.type === 'netlify' // Mark Netlify curricula as syncable
        };
        
        // Save to localStorage
        const savedCurricula = this.getSavedCurricula();
        savedCurricula.push(curriculumData);
        
        // Keep only last 20 curricula per educator
        const educatorCurricula = savedCurricula
            .filter(c => c.educatorId === educator.name)
            .slice(-20);
        
        const otherCurricula = savedCurricula
            .filter(c => c.educatorId !== educator.name);
        
        localStorage.setItem('educator_curricula', JSON.stringify([...otherCurricula, ...educatorCurricula]));
        
        // Auto-sync for Netlify users
        if (session.type === 'netlify') {
            this.syncUserDataToCloud(educator);
        }
        
        // Log the save event
        this.auth.logEvent('curriculum_saved', {
            curriculumId: curriculumData.id,
            cardCount: curriculumData.selectedCards.length,
            accountType: session.type
        });
        
        if (window.authUI) {
            window.authUI.showNotification('✅ Curriculum saved successfully!', 'success');
        }
    }
    
    // ... [Keep existing methods for basic functionality] ...
    
    /**
     * Export curriculum to GitHub (for GitHub users)
     */
    exportToGitHub() {
        const educator = this.auth.getEducator();
        if (educator.provider !== 'github') {
            if (window.authUI) {
                window.authUI.showNotification('GitHub export only available for GitHub users', 'warning');
            }
            return;
        }
        
        // In a real implementation, this would create a GitHub repository
        // For now, we'll simulate the process
        const curriculumContent = this.getCurrentCurriculumContent();
        if (!curriculumContent) {
            if (window.authUI) {
                window.authUI.showNotification('Please generate a curriculum first', 'warning');
            }
            return;
        }
        
        // Simulate GitHub export
        this.auth.logEvent('github_export_attempted', {
            educator: educator.name,
            contentLength: curriculumContent.length
        });
        
        if (window.authUI) {
            window.authUI.showNotification('🚀 GitHub export feature coming soon! Your curriculum is saved locally.', 'info', 5000);
        }
    }
    
    /**
     * View GitHub profile
     */
    viewGitHubProfile() {
        const educator = this.auth.getEducator();
        const netlifyUser = this.auth.getNetlifyUser();
        
        if (netlifyUser?.user_metadata?.user_name) {
            window.open(`https://github.com/${netlifyUser.user_metadata.user_name}`, '_blank');
        } else {
            window.open('https://github.com', '_blank');
        }
    }
    
    /**
     * Load template (enhanced version)
     */
    loadTemplate(templateId) {
        const educator = this.auth.getEducator();
        const templates = this.getCurriculumTemplates(educator.level);
        const template = templates.find(t => t.id === templateId);
        
        if (!template) {
            console.warn('Template not found:', templateId);
            return;
        }
        
        // Clear current selection
        if (typeof clearWorkspace === 'function') {
            clearWorkspace();
        }
        
        // Load template cards
        if (window.selectedCards && template.cards) {
            window.selectedCards.clear();
            template.cards.forEach(cardId => {
                window.selectedCards.add(cardId);
            });
        }
        
        // Re-render the curriculum builder
        if (typeof renderCards === 'function' && typeof renderSelectedCards === 'function') {
            renderCards();
            renderSelectedCards();
        }
        
        // Log the template usage
        this.auth.logEvent('template_loaded', {
            templateId,
            templateName: template.name,
            educatorLevel: educator.level,
            accountType: this.auth.getSession().type
        });
        
        if (window.authUI) {
            window.authUI.showNotification(`📋 Template "${template.name}" loaded successfully!`, 'success');
        }
    }
    
    // ... [Include all other existing methods from the original integration.js] ...
    
    /**
     * Get educator icon
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
     * Get saved curricula
     */
    getSavedCurricula() {
        try {
            return JSON.parse(localStorage.getItem('educator_curricula') || '[]');
        } catch (e) {
            return [];
        }
    }
    
    /**
     * Get current curriculum content
     */
    getCurrentCurriculumContent() {
        const outputDiv = document.getElementById('curriculum-content');
        return outputDiv ? outputDiv.innerHTML : '';
    }
    
    /**
     * Handle auth logout
     */
    handleAuthLogout() {
        // Clear any UI state
        const curriculumApp = document.getElementById('curriculum-app');
        if (curriculumApp) {
            // Reset to authentication gate
            location.reload();
        }
    }
    
    /**
     * Check initial authentication status
     */
    checkInitialAuth() {
        if (this.auth.isAuthenticated()) {
            const educator = this.auth.getEducator();
            const session = this.auth.getSession();
            
            this.auth.logEvent('session_resumed', {
                educatorLevel: educator.level,
                school: educator.school,
                accountType: session.type,
                provider: educator.provider || 'institutional'
            });
        }
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for authentication events
        document.addEventListener('auth:login', (e) => {
            // Reload to apply authentication changes
            setTimeout(() => location.reload(), 1000);
        });
        
        document.addEventListener('auth:logout', (e) => {
            // Reload to remove authentication
            location.reload();
        });
    }
    
    /**
     * Protect other educational content
     */
    protectEducationalContent() {
        // Add authentication checks to other educational tools
        const protectedSections = document.querySelectorAll('[data-auth-required]');
        
        protectedSections.forEach(section => {
            if (!this.auth.isAuthenticated()) {
                section.innerHTML = `
                    <div class="auth-required-notice">
                        <p>🔒 This content requires authentication.</p>
                        <button class="btn btn-primary" onclick="authUI.showLogin()">Sign In</button>
                    </div>
                `;
            }
        });
    }
    
    // ... [Include remaining utility methods] ...
}

// Initialize integration when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.authIntegration = new AuthIntegration();
});

// Enhanced CSS for integration components
const enhancedIntegrationStyles = document.createElement('style');
enhancedIntegrationStyles.textContent = `
    /* Enhanced Authentication Gate */
    .auth-gate.enhanced {
        background: linear-gradient(135deg, rgba(216, 235, 0, 0.05) 0%, rgba(216, 235, 0, 0.1) 100%);
        border: 2px solid rgba(216, 235, 0, 0.2);
        border-radius: 20px;
        min-height: 600px;
    }
    
    .auth-gate-hero {
        text-align: center;
        margin-bottom: 3rem;
    }
    
    .auth-gate-icon {
        font-size: 5rem;
        margin-bottom: 1rem;
        animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    .auth-gate-tagline {
        font-size: 1.2rem;
        color: var(--md-default-fg-color--light);
        margin: 0;
        line-height: 1.6;
    }
    
    .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .feature-item {
        display: flex;
        gap: 1rem;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 12px;
        transition: transform 0.3s ease;
    }
    
    .feature-item:hover {
        transform: translateY(-4px);
    }
    
    [data-md-color-scheme="slate"] .feature-item {
        background: rgba(255, 255, 255, 0.05);
    }
    
    .feature-icon {
        font-size: 2rem;
        flex-shrink: 0;
    }
    
    .feature-text h4 {
        margin: 0 0 0.5rem 0;
        color: var(--md-primary-fg-color);
        font-size: 1.1rem;
    }
    
    .feature-text p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--md-default-fg-color--light);
        line-height: 1.4;
    }
    
    .btn.large {
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 700;
        min-height: 56px;
    }
    
    .sign-in-options {
        text-align: center;
        margin: 2rem 0;
    }
    
    .provider-badges {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
    }
    
    .provider-badge {
        background: rgba(216, 235, 0, 0.1);
        color: #d8eb00;
        padding: 0.25rem 0.75rem;
        border-radius: 16px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid rgba(216, 235, 0, 0.3);
    }
    
    .help-comparison {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .account-type {
        background: rgba(216, 235, 0, 0.05);
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid rgba(216, 235, 0, 0.2);
    }
    
    .account-type h5 {
        margin: 0 0 0.5rem 0;
        color: var(--md-primary-fg-color);
        font-size: 1rem;
    }
    
    .account-type ul {
        margin: 0;
        padding-left: 1rem;
        font-size: 0.85rem;
    }
    
    .account-type li {
        margin-bottom: 0.25rem;
        color: var(--md-default-fg-color);
    }
    
    /* Enhanced Educator Toolbar */
    .educator-toolbar.enhanced {
        background: linear-gradient(135deg, rgba(216, 235, 0, 0.1) 0%, rgba(216, 235, 0, 0.05) 100%);
        border: 2px solid rgba(216, 235, 0, 0.2);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 12px rgba(216, 235, 0, 0.1);
    }
    
    .educator-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        background: rgba(216, 235, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .avatar-icon {
        font-size: 1.5rem;
    }
    
    .educator-provider {
        font-size: 0.75rem;
        color: #d8eb00;
        font-weight: 500;
    }
    
    .account-type {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .type-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 16px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .type-badge.netlify {
        background: #00ad9f;
        color: white;
    }
    
    .type-badge.institutional {
        background: #d8eb00;
        color: #000;
    }
    
    .toolbar-stats {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-right: 1rem;
    }
    
    .stat-item {
        text-align: center;
    }
    
    .stat-value {
        display: block;
        font-size: 1.2rem;
        font-weight: 700;
        color: #d8eb00;
        line-height: 1;
    }
    
    .stat-label {
        font-size: 0.7rem;
        color: var(--md-default-fg-color--light);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .toolbar-actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }
    
    /* Integration Sections */
    .github-integration-section, .google-integration-section {
        background: rgba(0, 0, 0, 0.02);
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
    }
    
    [data-md-color-scheme="slate"] .github-integration-section,
    [data-md-color-scheme="slate"] .google-integration-section {
        background: rgba(255, 255, 255, 0.02);
        border-color: var(--md-default-fg-color--lightest);
    }
    
    .integration-header {
        text-align: center;
        margin-bottom: 1rem;
    }
    
    .integration-header h4 {
        margin: 0 0 0.5rem 0;
        color: var(--md-primary-fg-color);
        font-size: 1.1rem;
    }
    
    .integration-header p {
        margin: 0;
        color: var(--md-default-fg-color--light);
        font-size: 0.9rem;
    }
    
    .integration-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    /* Recommendations Section */
    .recommendations-section {
        background: linear-gradient(135deg, rgba(216, 235, 0, 0.05) 0%, rgba(216, 235, 0, 0.1) 100%);
        border: 1px solid rgba(216, 235, 0, 0.2);
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 2rem;
    }
    
    .recommendations-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .recommendations-header h4 {
        margin: 0 0 0.5rem 0;
        color: var(--md-primary-fg-color);
        font-size: 1.3rem;
    }
    
    .recommendations-header p {
        margin: 0;
        color: var(--md-default-fg-color--light);
        font-size: 1rem;
    }
    
    .recommendations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .recommendation-card {
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(216, 235, 0, 0.3);
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .recommendation-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(216, 235, 0, 0.2);
        border-color: #d8eb00;
    }
    
    [data-md-color-scheme="slate"] .recommendation-card {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(216, 235, 0, 0.3);
    }
    
    .rec-content h5 {
        margin: 0 0 0.5rem 0;
        color: var(--md-primary-fg-color);
        font-size: 1.1rem;
    }
    
    .rec-content p {
        margin: 0;
        color: var(--md-default-fg-color--light);
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .rec-action {
        margin-top: 1rem;
        text-align: center;
    }
    
    .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
        min-height: auto;
    }
    
    /* Status Indicators */
    .status-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #28a745;
        display: inline-block;
        margin-right: 0.5rem;
    }
    
    .status-indicator.warning {
        background: #ffc107;
        animation: pulse 2s infinite;
    }
    
    .status-indicator.expired {
        background: #dc3545;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .educator-toolbar.enhanced {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
        }
        
        .toolbar-left, .toolbar-center, .toolbar-right {
            justify-content: center;
        }
        
        .toolbar-stats {
            justify-content: center;
            margin: 0;
        }
        
        .toolbar-actions {
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .toolbar-btn .btn-text {
            display: none;
        }
        
        .feature-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .feature-item {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
        }
        
        .help-comparison {
            grid-template-columns: 1fr;
        }
        
        .recommendations-grid {
            grid-template-columns: 1fr;
        }
        
        .integration-actions {
            flex-direction: column;
            align-items: stretch;
        }
        
        .provider-badges {
            justify-content: center;
        }
    }
    
    /* Extra animations and effects */
    .recommendation-card[data-type="getting_started"] {
        border-left: 4px solid #28a745;
    }
    
    .recommendation-card[data-type="curriculum"] {
        border-left: 4px solid #007bff;
    }
    
    .recommendation-card[data-type="project"] {
        border-left: 4px solid #ffc107;
    }
    
    .recommendation-card[data-type="workflow"] {
        border-left: 4px solid #6f42c1;
    }
    
    /* Loading states */
    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        z-index: 10;
    }
    
    [data-md-color-scheme="slate"] .loading-overlay {
        background: rgba(0, 0, 0, 0.9);
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e0e0e0;
        border-top: 4px solid #d8eb00;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    /* Success states */
    .success-checkmark {
        color: #28a745;
        font-size: 1.2rem;
        margin-right: 0.5rem;
    }
    
    .sync-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: var(--md-default-fg-color--light);
    }
    
    .sync-success {
        color: #28a745;
    }
    
    .sync-pending {
        color: #ffc107;
    }
    
    .sync-error {
        color: #dc3545;
    }
`;

document.head.appendChild(enhancedIntegrationStyles);