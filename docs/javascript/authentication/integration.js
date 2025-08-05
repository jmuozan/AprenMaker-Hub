// docs/javascript/authentication/integration.js
// Integration helper for connecting authentication with curriculum builder

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
     * Protect curriculum builder with authentication
     */
    protectCurriculumBuilder(container) {
        // Store original content
        const originalContent = container.innerHTML;
        
        // Check if user is authenticated
        if (!this.auth.isAuthenticated()) {
            this.showAuthenticationRequired(container, originalContent);
        } else {
            this.initializeAuthenticatedCurriculum(container, originalContent);
        }
    }
    
    /**
     * Show authentication required message
     */
    showAuthenticationRequired(container, originalContent) {
        container.innerHTML = `
            <div class="auth-gate">
                <div class="auth-gate-content">
                    <div class="auth-gate-icon">🔐</div>
                    <h3>Educator Access Required</h3>
                    <p>
                        The Curriculum Builder is designed specifically for educators. 
                        Please authenticate with your educator access code to continue.
                    </p>
                    
                    <div class="auth-gate-features">
                        <h4>What you'll get access to:</h4>
                        <ul>
                            <li>✨ Interactive curriculum generation</li>
                            <li>🔧 Tool-based project suggestions</li>
                            <li>📊 Educational methodology integration</li>
                            <li>💾 Save and share curricula</li>
                            <li>🎯 Personalized content for your level (ESO/FP)</li>
                        </ul>
                    </div>
                    
                    <div class="auth-gate-actions">
                        <button class="btn btn-primary" onclick="authIntegration.handleLogin('${container.id}', \`${originalContent.replace(/`/g, '\\`')}\`)">
                            🚀 Access Curriculum Builder
                        </button>
                        <button class="btn btn-secondary" onclick="authIntegration.showDemo()">
                            👀 View Demo
                        </button>
                    </div>
                    
                    <div class="auth-gate-help">
                        <p><small>
                            Don't have an access code? Contact your educational institution 
                            or <a href="#" onclick="authUI.showDemoLogin()">try our demo accounts</a>.
                        </small></p>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Initialize authenticated curriculum with personalization
     */
    initializeAuthenticatedCurriculum(container, originalContent) {
        const educator = this.auth.getEducator();
        
        // Restore original content
        container.innerHTML = originalContent;
        
        // Add educator toolbar
        this.addEducatorToolbar(container);
        
        // Personalize curriculum builder
        this.personalizeCurriculumBuilder(educator);
        
        // Initialize enhanced features
        this.initializeEnhancedFeatures(container);
    }
    
    /**
     * Add educator toolbar to curriculum builder
     */
    addEducatorToolbar(container) {
        const educator = this.auth.getEducator();
        const session = this.auth.getSession();
        
        const toolbar = document.createElement('div');
        toolbar.className = 'educator-toolbar';
        toolbar.innerHTML = `
            <div class="toolbar-left">
                <div class="educator-info">
                    <span class="educator-icon">${this.getEducatorIcon(educator.level)}</span>
                    <div class="educator-details">
                        <span class="educator-name">${educator.name}</span>
                        <span class="educator-role">${educator.role}</span>
                    </div>
                </div>
            </div>
            
            <div class="toolbar-center">
                <div class="session-status">
                    <span class="status-indicator active"></span>
                    <span class="session-text">Session Active</span>
                </div>
            </div>
            
            <div class="toolbar-right">
                <button class="toolbar-btn" onclick="authIntegration.showSavedCurricula()" title="My Curricula">
                    📚 <span class="btn-text">My Work</span>
                </button>
                <button class="toolbar-btn" onclick="showProfile()" title="Profile">
                    👤 <span class="btn-text">Profile</span>
                </button>
                <button class="toolbar-btn logout-btn" onclick="authIntegration.confirmLogout()" title="Logout">
                    🚪 <span class="btn-text">Logout</span>
                </button>
            </div>
        `;
        
        // Insert toolbar at the beginning of the container
        container.insertBefore(toolbar, container.firstChild);
        
        // Update session status periodically
        this.startSessionMonitoring(toolbar);
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
     * Filter available tools in curriculum builder
     */
    filterAvailableTools(availableTools) {
        // This would integrate with your existing curriculum builder
        if (window.gameData && window.gameData.tools) {
            const filteredTools = window.gameData.tools.filter(tool => 
                availableTools.includes('all') || availableTools.includes(tool.id)
            );
            
            // Update the global game data
            window.gameData.tools = filteredTools;
            
            // Re-render if curriculum builder is already initialized
            if (typeof renderResourcesCards === 'function') {
                renderResourcesCards();
            }
        }
    }
    
    /**
     * Filter content by educational level
     */
    filterContentByLevel(level) {
        if (window.gameData && window.gameData.topics) {
            let allowedCategories = [];
            
            switch(level) {
                case 'eso':
                    allowedCategories = ['ESO'];
                    break;
                case 'fp':
                    allowedCategories = ['FP'];
                    break;
                case 'admin':
                case 'demo':
                    allowedCategories = ['ESO', 'FP'];
                    break;
            }
            
            const filteredTopics = window.gameData.topics.filter(topic => 
                allowedCategories.includes(topic.category)
            );
            
            window.gameData.topics = filteredTopics;
            
            // Re-render if needed
            if (typeof renderTopicsCards === 'function') {
                renderTopicsCards();
            }
        }
    }
    
    /**
     * Load level-specific curriculum templates
     */
    loadLevelSpecificTemplates(level) {
        const templates = this.getCurriculumTemplates(level);
        
        // Add templates section to curriculum builder
        const curriculumApp = document.getElementById('curriculum-app');
        if (curriculumApp && templates.length > 0) {
            const templatesSection = document.createElement('div');
            templatesSection.className = 'curriculum-templates';
            templatesSection.innerHTML = `
                <div class="templates-header">
                    <h3>📋 Quick Start Templates</h3>
                    <p>Pre-designed curricula for your educational level</p>
                </div>
                <div class="templates-grid">
                    ${templates.map(template => `
                        <div class="template-card" data-template-id="${template.id}">
                            <div class="template-icon">${template.icon}</div>
                            <div class="template-info">
                                <h4>${template.name}</h4>
                                <p>${template.description}</p>
                                <div class="template-meta">
                                    <span class="template-duration">⏱️ ${template.duration}</span>
                                    <span class="template-tools">🔧 ${template.toolCount} tools</span>
                                </div>
                            </div>
                            <button class="template-load-btn" onclick="authIntegration.loadTemplate('${template.id}')">
                                Load Template
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Insert templates section after the header
            const header = curriculumApp.querySelector('.curriculum-header');
            if (header) {
                header.insertAdjacentElement('afterend', templatesSection);
            }
        }
    }
    
    /**
     * Get curriculum templates for specific level
     */
    getCurriculumTemplates(level) {
        const allTemplates = {
            eso: [
                {
                    id: 'eso_basic_electronics',
                    name: 'Basic Electronics & Arduino',
                    description: 'Introduction to circuits and programming with Arduino',
                    icon: '🔌',
                    duration: '4 weeks',
                    toolCount: 3,
                    cards: ['programming-basics', 'electronics', 'arduino', 'sensors', 'project-based', 'collaborative'],
                    complexity: 'basic'
                },
                {
                    id: 'eso_3d_design',
                    name: '3D Design & Printing Basics',
                    description: 'Learn 3D modeling and create simple printed objects',
                    icon: '🖨️',
                    duration: '3 weeks',
                    toolCount: 2,
                    cards: ['3d-design', '3d-printer', 'computers', 'design-thinking', 'hands-on'],
                    complexity: 'basic'
                },
                {
                    id: 'eso_sustainable_tech',
                    name: 'Technology for Sustainability',
                    description: 'Explore renewable energy and eco-friendly technology',
                    icon: '🌱',
                    duration: '5 weeks',
                    toolCount: 4,
                    cards: ['sustainability', 'sensors', 'arduino', 'computers', 'inquiry-based', 'collaborative'],
                    complexity: 'basic'
                }
            ],
            fp: [
                {
                    id: 'fp_digital_fabrication',
                    name: 'Advanced Digital Fabrication',
                    description: 'Master laser cutting, CNC, and advanced 3D printing',
                    icon: '⚙️',
                    duration: '8 weeks',
                    toolCount: 6,
                    cards: ['digital-fabrication', 'laser-cutter', '3d-printer', 'cnc', 'design-thinking', 'project-based'],
                    complexity: 'advanced'
                },
                {
                    id: 'fp_iot_systems',
                    name: 'IoT Systems Development',
                    description: 'Build connected devices and smart systems',
                    icon: '📡',
                    duration: '10 weeks',
                    toolCount: 5,
                    cards: ['programming-basics', 'electronics', 'arduino', 'sensors', 'web-development', 'inquiry-based'],
                    complexity: 'advanced'
                },
                {
                    id: 'fp_product_design',
                    name: 'Complete Product Design Cycle',
                    description: 'From concept to prototype - full product development',
                    icon: '🎨',
                    duration: '12 weeks',
                    toolCount: 7,
                    cards: ['3d-design', 'digital-fabrication', 'laser-cutter', '3d-printer', 'design-thinking', 'project-based'],
                    complexity: 'advanced'
                }
            ]
        };
        
        return allTemplates[level] || [];
    }
    
    /**
     * Load a curriculum template
     */
    loadTemplate(templateId) {
        const educator = this.auth.getEducator();
        const templates = this.getCurriculumTemplates(educator.level);
        const template = templates.find(t => t.id === templateId);
        
        if (!template) return;
        
        // Clear current selection
        if (typeof clearWorkspace === 'function') {
            clearWorkspace();
        }
        
        // Load template cards
        if (window.selectedCards && template.cards) {
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
            educatorLevel: educator.level
        });
        
        // Show success message
        this.ui.showNotification(`Template "${template.name}" loaded successfully!`, 'success');
    }
    
    /**
     * Configure save options based on educator permissions
     */
    configureSaveOptions(educator) {
        // Add save functionality based on permissions
        if (educator.permissions.includes('save_local') || educator.permissions.includes('all')) {
            this.setupLocalSave();
        }
        
        // Future: Setup cloud save if available
        // if (educator.permissions.includes('save_cloud')) {
        //     this.setupCloudSave();
        // }
    }
    
    /**
     * Setup local save functionality
     */
    setupLocalSave() {
        // Override the global save function if it exists
        window.originalSaveCurriculum = window.saveCurriculum;
        
        window.saveCurriculum = () => {
            this.saveEducatorCurriculum();
        };
    }
    
    /**
     * Save curriculum with educator context
     */
    saveEducatorCurriculum() {
        const educator = this.auth.getEducator();
        const curriculumData = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            educatorId: educator.name,
            educatorLevel: educator.level,
            school: educator.school,
            selectedCards: window.selectedCards ? Array.from(window.selectedCards) : [],
            generatedContent: this.getCurrentCurriculumContent(),
            version: '1.0'
        };
        
        // Save to localStorage with educator context
        const savedCurricula = this.getSavedCurricula();
        savedCurricula.push(curriculumData);
        
        // Keep only last 10 curricula per educator
        const educatorCurricula = savedCurricula
            .filter(c => c.educatorId === educator.name)
            .slice(-10);
        
        const otherCurricula = savedCurricula
            .filter(c => c.educatorId !== educator.name);
        
        localStorage.setItem('educator_curricula', JSON.stringify([...otherCurricula, ...educatorCurricula]));
        
        // Log the save event
        this.auth.logEvent('curriculum_saved', {
            curriculumId: curriculumData.id,
            cardCount: curriculumData.selectedCards.length
        });
        
        this.ui.showNotification('Curriculum saved successfully!', 'success');
    }
    
    /**
     * Get saved curricula for current educator
     */
    getSavedCurricula() {
        try {
            return JSON.parse(localStorage.getItem('educator_curricula') || '[]');
        } catch (e) {
            return [];
        }
    }
    
    /**
     * Show saved curricula
     */
    showSavedCurricula() {
        const educator = this.auth.getEducator();
        const allCurricula = this.getSavedCurricula();
        const educatorCurricula = allCurricula.filter(c => c.educatorId === educator.name);
        
        const modal = this.ui.createModal('saved-curricula-modal', 'My Saved Curricula');
        
        const content = `
            <div class="saved-curricula-content">
                ${educatorCurricula.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-icon">📚</div>
                        <h3>No Saved Curricula Yet</h3>
                        <p>Create and save your first curriculum to see it here.</p>
                        <button class="btn btn-primary" onclick="authUI.hideModal()">
                            Start Creating
                        </button>
                    </div>
                ` : `
                    <div class="curricula-list">
                        ${educatorCurricula.map(curriculum => `
                            <div class="curriculum-item" data-id="${curriculum.id}">
                                <div class="curriculum-info">
                                    <h4>Curriculum from ${new Date(curriculum.timestamp).toLocaleDateString()}</h4>
                                    <p>${curriculum.selectedCards.length} cards selected</p>
                                    <small>Created: ${new Date(curriculum.timestamp).toLocaleString()}</small>
                                </div>
                                <div class="curriculum-actions">
                                    <button class="btn btn-secondary" onclick="authIntegration.loadCurriculum('${curriculum.id}')">
                                        Load
                                    </button>
                                    <button class="btn btn-danger" onclick="authIntegration.deleteCurriculum('${curriculum.id}')">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
        
        modal.querySelector('.modal-body').innerHTML = content;
        this.ui.showModal(modal);
    }
    
    /**
     * Load a saved curriculum
     */
    loadCurriculum(curriculumId) {
        const curricula = this.getSavedCurricula();
        const curriculum = curricula.find(c => c.id === curriculumId);
        
        if (!curriculum) return;
        
        // Clear current workspace
        if (typeof clearWorkspace === 'function') {
            clearWorkspace();
        }
        
        // Load the saved cards
        if (window.selectedCards && curriculum.selectedCards) {
            window.selectedCards.clear();
            curriculum.selectedCards.forEach(cardId => {
                window.selectedCards.add(cardId);
            });
        }
        
        // Re-render
        if (typeof renderCards === 'function' && typeof renderSelectedCards === 'function') {
            renderCards();
            renderSelectedCards();
        }
        
        // Hide modal
        this.ui.hideModal();
        
        // Log the load event
        this.auth.logEvent('curriculum_loaded', {
            curriculumId,
            cardCount: curriculum.selectedCards.length
        });
        
        this.ui.showNotification('Curriculum loaded successfully!', 'success');
    }
    
    /**
     * Delete a saved curriculum
     */
    deleteCurriculum(curriculumId) {
        if (!confirm('Are you sure you want to delete this curriculum?')) return;
        
        const curricula = this.getSavedCurricula();
        const updatedCurricula = curricula.filter(c => c.id !== curriculumId);
        
        localStorage.setItem('educator_curricula', JSON.stringify(updatedCurricula));
        
        // Refresh the modal
        this.showSavedCurricula();
        
        this.ui.showNotification('Curriculum deleted successfully!', 'success');
    }
    
    /**
     * Get current curriculum content
     */
    getCurrentCurriculumContent() {
        const outputDiv = document.getElementById('curriculum-content');
        return outputDiv ? outputDiv.innerHTML : '';
    }
    
    /**
     * Initialize enhanced features
     */
    initializeEnhancedFeatures(container) {
        // Add export functionality
        this.addExportOptions(container);
        
        // Add sharing options
        this.addSharingOptions(container);
        
        // Add analytics tracking
        this.setupAnalyticsTracking();
    }
    
    /**
     * Add export options
     */
    addExportOptions(container) {
        // Find the action buttons and add export button
        const actionButtons = container.querySelector('.action-buttons');
        if (actionButtons) {
            const exportBtn = document.createElement('button');
            exportBtn.className = 'btn btn-secondary';
            exportBtn.innerHTML = '📄 Export PDF';
            exportBtn.onclick = () => this.exportCurriculumPDF();
            
            actionButtons.appendChild(exportBtn);
        }
    }
    
    /**
     * Export curriculum as PDF
     */
    exportCurriculumPDF() {
        // Simple export functionality - in production you might use a library like jsPDF
        const content = this.getCurrentCurriculumContent();
        const educator = this.auth.getEducator();
        
        if (!content) {
            this.ui.showNotification('Please generate a curriculum first', 'warning');
            return;
        }
        
        // Create a new window with printable content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Curriculum - ${educator.name}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h3 { color: #333; border-bottom: 2px solid #d8eb00; padding-bottom: 10px; }
                    .curriculum-header { text-align: center; margin-bottom: 30px; }
                    .educator-info { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <div class="curriculum-header">
                    <h1>AprenMaker Hub - Curriculum Plan</h1>
                    <div class="educator-info">
                        <strong>Educator:</strong> ${educator.name}<br>
                        <strong>School:</strong> ${educator.school}<br>
                        <strong>Level:</strong> ${educator.level.toUpperCase()}<br>
                        <strong>Generated:</strong> ${new Date().toLocaleString()}
                    </div>
                </div>
                ${content}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
        
        // Log export event
        this.auth.logEvent('curriculum_exported', {
            format: 'pdf',
            educatorLevel: educator.level
        });
        
        this.ui.showNotification('Curriculum exported successfully!', 'success');
    }
    
    /**
     * Add sharing options
     */
    addSharingOptions(container) {
        // Placeholder for future sharing functionality
        // Could include: email sharing, link generation, community uploads, etc.
    }
    
    /**
     * Setup analytics tracking
     */
    setupAnalyticsTracking() {
        // Track curriculum builder interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.card')) {
                this.auth.logEvent('card_selected', {
                    cardId: e.target.closest('.card').dataset.cardId
                });
            }
            
            if (e.target.closest('.btn-primary') && e.target.textContent.includes('Generate')) {
                this.auth.logEvent('curriculum_generated', {
                    cardCount: window.selectedCards ? window.selectedCards.size : 0
                });
            }
        });
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for authentication events
        document.addEventListener('auth:login', (e) => {
            location.reload(); // Refresh to apply authentication
        });
        
        document.addEventListener('auth:logout', (e) => {
            location.reload(); // Refresh to remove authentication
        });
    }
    
    /**
     * Check initial authentication status
     */
    checkInitialAuth() {
        // If user is already authenticated, initialize features
        if (this.auth.isAuthenticated()) {
            const educator = this.auth.getEducator();
            this.auth.logEvent('session_resumed', {
                educatorLevel: educator.level,
                school: educator.school
            });
        }
    }
    
    /**
     * Handle login from authentication gate
     */
    handleLogin(containerId, originalContent) {
        this.ui.showLogin((result) => {
            // Reload the protected content with authentication
            const container = document.getElementById(containerId);
            if (container) {
                this.initializeAuthenticatedCurriculum(container, originalContent);
            }
        });
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
     * Confirm logout
     */
    confirmLogout() {
        if (confirm('Are you sure you want to logout? Any unsaved work will be lost.')) {
            this.auth.logout();
        }
    }
    
    /**
     * Start session monitoring
     */
    startSessionMonitoring(toolbar) {
        const updateStatus = () => {
            const statusIndicator = toolbar.querySelector('.status-indicator');
            const sessionText = toolbar.querySelector('.session-text');
            const session = this.auth.getSession();
            
            if (!session) return;
            
            const timeLeft = new Date(session.expires) - new Date();
            const minutesLeft = Math.floor(timeLeft / (1000 * 60));
            
            if (timeLeft <= 0) {
                statusIndicator.className = 'status-indicator expired';
                sessionText.textContent = 'Session Expired';
            } else if (minutesLeft <= 15) {
                statusIndicator.className = 'status-indicator warning';
                sessionText.textContent = `${minutesLeft}m left`;
            } else {
                statusIndicator.className = 'status-indicator active';
                sessionText.textContent = 'Session Active';
            }
        };
        
        // Update immediately and then every minute
        updateStatus();
        setInterval(updateStatus, 60000);
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
                        <p>🔒 This content requires educator authentication.</p>
                        <button class="btn btn-primary" onclick="showLogin()">Login</button>
                    </div>
                `;
            }
        });
    }
    
    /**
     * Get educator icon
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

// Initialize integration when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.authIntegration = new AuthIntegration();
});

// Add styles for integration components
const integrationStyles = document.createElement('style');
integrationStyles.textContent = `
    /* Authentication Gate Styles */
    .auth-gate {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 500px;
        padding: 2rem;
    }
    
    .auth-gate-content {
        text-align: center;
        max-width: 600px;
        background: rgba(216, 235, 0, 0.05);
        padding: 3rem 2rem;
        border-radius: 16px;
        border: 2px solid rgba(216, 235, 0, 0.2);
    }
    
    .auth-gate-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .auth-gate-content h3 {
        color: var(--md-primary-fg-color);
        margin-bottom: 1rem;
        font-size: 1.8rem;
    }
    
    .auth-gate-content p {
        color: var(--md-default-fg-color--light);
        margin-bottom: 2rem;
        font-size: 1.1rem;
        line-height: 1.6;
    }
    
    .auth-gate-features {
        text-align: left;
        margin: 2rem 0;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 8px;
    }
    
    .auth-gate-features h4 {
        color: var(--md-primary-fg-color);
        margin-bottom: 1rem;
        text-align: center;
    }
    
    .auth-gate-features ul {
        list-style: none;
        padding: 0;
    }
    
    .auth-gate-features li {
        padding: 0.5rem 0;
        color: var(--md-default-fg-color);
    }
    
    .auth-gate-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin: 2rem 0;
        flex-wrap: wrap;
    }
    
    .auth-gate-help {
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(216, 235, 0, 0.2);
    }
    
    /* Educator Toolbar */
    .educator-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(216, 235, 0, 0.1);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        border: 1px solid rgba(216, 235, 0, 0.2);
    }
    
    .toolbar-left, .toolbar-center, .toolbar-right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .educator-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .educator-icon {
        font-size: 1.5rem;
    }
    
    .educator-details {
        display: flex;
        flex-direction: column;
    }
    
    .educator-name {
        font-weight: 600;
        color: var(--md-primary-fg-color);
        font-size: 0.9rem;
    }
    
    .educator-role {
        font-size: 0.8rem;
        color: var(--md-default-fg-color--light);
    }
    
    .session-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
    }
    
    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #28a745;
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
    
    .toolbar-btn {
        background: none;
        border: 1px solid rgba(216, 235, 0, 0.3);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .toolbar-btn:hover {
        background: rgba(216, 235, 0, 0.1);
        border-color: rgba(216, 235, 0, 0.5);
    }
    
    .logout-btn {
        color: #dc3545;
        border-color: rgba(220, 53, 69, 0.3);
    }
    
    .logout-btn:hover {
        background: rgba(220, 53, 69, 0.1);
        border-color: rgba(220, 53, 69, 0.5);
    }
    
    /* Curriculum Templates */
    .curriculum-templates {
        background: rgba(216, 235, 0, 0.05);
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        border: 1px solid rgba(216, 235, 0, 0.2);
    }
    
    .templates-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .templates-header h3 {
        color: var(--md-primary-fg-color);
        margin-bottom: 0.5rem;
    }
    
    .templates-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .template-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        transition: all 0.2s ease;
        cursor: pointer;
    }
    
    .template-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(216, 235, 0, 0.2);
        border-color: #d8eb00;
    }
    
    .template-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .template-info h4 {
        color: var(--md-primary-fg-color);
        margin-bottom: 0.5rem;
    }
    
    .template-info p {
        color: var(--md-default-fg-color--light);
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }
    
    .template-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.8rem;
        color: var(--md-default-fg-color--light);
    }
    
    .template-load-btn {
        width: 100%;
        padding: 0.75rem;
        background: #d8eb00;
        color: var(--md-primary-fg-color);
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .template-load-btn:hover {
        background: #c4d400;
        transform: translateY(-1px);
    }
    
    /* Saved Curricula */
    .saved-curricula-content {
        max-width: 600px;
    }
    
    .empty-state {
        text-align: center;
        padding: 2rem;
    }
    
    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .empty-state h3 {
        color: var(--md-primary-fg-color);
        margin-bottom: 1rem;
    }
    
    .curricula-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .curriculum-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: rgba(216, 235, 0, 0.05);
        border-radius: 8px;
        border: 1px solid rgba(216, 235, 0, 0.2);
    }
    
    .curriculum-info h4 {
        color: var(--md-primary-fg-color);
        margin: 0 0 0.25rem 0;
        font-size: 1.1rem;
    }
    
    .curriculum-info p {
        margin: 0 0 0.25rem 0;
        color: var(--md-default-fg-color--light);
        font-size: 0.9rem;
    }
    
    .curriculum-info small {
        color: var(--md-default-fg-color--light);
        font-size: 0.8rem;
    }
    
    .curriculum-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .curriculum-actions .btn {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
        min-height: auto;
    }
    
    /* Auth Required Notice */
    .auth-required-notice {
        text-align: center;
        padding: 2rem;
        background: rgba(216, 235, 0, 0.05);
        border-radius: 8px;
        border: 1px solid rgba(216, 235, 0, 0.2);
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .educator-toolbar {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
        }
        
        .toolbar-left, .toolbar-center, .toolbar-right {
            justify-content: center;
        }
        
        .toolbar-btn .btn-text {
            display: none;
        }
        
        .auth-gate-content {
            padding: 2rem 1rem;
        }
        
        .auth-gate-actions {
            flex-direction: column;
        }
        
        .templates-grid {
            grid-template-columns: 1fr;
        }
        
        .curriculum-item {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
        }
        
        .curriculum-actions {
            justify-content: center;
        }
    }
`;

document.head.appendChild(integrationStyles);