// docs/javascript/authentication/auth.js
// Complete Authentication System with Netlify Identity Integration

class EducatorAuth {
    constructor() {
        this.storageKey = 'aprenmaker_educator_session';
        this.analyticsKey = 'aprenmaker_analytics';
        this.sessionTimeout = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
        
        // Institutional access codes (keep for admin/enhanced access)
        this.institutionalCodes = new Map([
            // ESO Teachers
            ['valencia_eso_2025', {
                name: 'ESO Technology Teacher',
                role: 'ESO Educator',
                school: 'Valencia Region',
                level: 'eso',
                permissions: ['create_curriculum', 'save_local', 'view_community', 'eso_content', 'enhanced_tools'],
                tools: ['arduino', '3d_printer', 'computers', 'basic_sensors', 'hand_tools'],
                maxStudents: 25,
                sessionDuration: 50,
                type: 'institutional'
            }],
            ['madrid_eso_2025', {
                name: 'Madrid ESO Instructor', 
                role: 'ESO Technology Teacher',
                school: 'Madrid Education',
                level: 'eso',
                permissions: ['create_curriculum', 'save_local', 'view_community', 'eso_content', 'enhanced_tools'],
                tools: ['arduino', 'computers', 'basic_sensors', 'multimeter'],
                maxStudents: 30,
                sessionDuration: 50,
                type: 'institutional'
            }],
            
            // FP Teachers
            ['fp_digital_2025', {
                name: 'FP Digital Fabrication Instructor',
                role: 'FP Technology Teacher', 
                school: 'FP Fabrication Center',
                level: 'fp',
                permissions: ['create_curriculum', 'save_local', 'view_community', 'advanced_tools', 'fp_content', 'enhanced_tools'],
                tools: ['laser_cutter', '3d_printer', 'cnc', 'arduino', 'advanced_electronics', 'soldering_station'],
                maxStudents: 15,
                sessionDuration: 120,
                type: 'institutional'
            }],
            ['fp_design_2025', {
                name: 'FP Product Design Teacher',
                role: 'Design Technology Instructor',
                school: 'FP Design Institute',
                level: 'fp', 
                permissions: ['create_curriculum', 'save_local', 'view_community', 'design_tools', 'fp_content', 'enhanced_tools'],
                tools: ['laser_cutter', '3d_printer', 'computers', 'design_software'],
                maxStudents: 12,
                sessionDuration: 180,
                type: 'institutional'
            }],
            
            // Administrators
            ['admin_hub_2025', {
                name: 'Platform Administrator',
                role: 'System Administrator',
                school: 'AprenMaker Hub',
                level: 'admin',
                permissions: ['all'],
                tools: ['all'],
                maxStudents: 0,
                sessionDuration: 0,
                type: 'institutional'
            }],
            
            // Demo/Guest accounts
            ['demo_teacher', {
                name: 'Demo Teacher Account',
                role: 'Demo User',
                school: 'Demo School',
                level: 'demo',
                permissions: ['create_curriculum', 'view_community'],
                tools: ['arduino', '3d_printer', 'computers'],
                maxStudents: 20,
                sessionDuration: 60,
                type: 'demo'
            }]
        ]);
        
        this.netlifyUser = null;
        this.netlifyReady = false;
        
        this.init();
    }
    
    init() {
        this.cleanupExpiredSessions();
        this.setupGlobalErrorHandling();
        this.initNetlifyIdentity();
    }
    
    /**
     * Initialize Netlify Identity
     */
    initNetlifyIdentity() {
        // Wait for Netlify Identity to load
        const checkNetlify = () => {
            if (window.netlifyIdentity) {
                this.setupNetlifyListeners();
                this.netlifyReady = true;
                
                // Check if user is already logged in
                const currentUser = window.netlifyIdentity.currentUser();
                if (currentUser) {
                    this.handleNetlifyLogin(currentUser);
                }
            } else {
                setTimeout(checkNetlify, 100);
            }
        };
        
        checkNetlify();
    }
    
    /**
     * Setup Netlify Identity event listeners
     */
    setupNetlifyListeners() {
        window.netlifyIdentity.on('init', (user) => {
            console.log('Netlify Identity initialized', user ? 'with user' : 'without user');
        });
        
        window.netlifyIdentity.on('login', (user) => {
            console.log('Netlify login event:', user);
            this.handleNetlifyLogin(user);
            window.netlifyIdentity.close();
        });
        
        window.netlifyIdentity.on('logout', () => {
            console.log('Netlify logout event');
            this.handleNetlifyLogout();
        });
        
        window.netlifyIdentity.on('error', (err) => {
            console.error('Netlify Identity error:', err);
            this.logEvent('netlify_error', { error: err.message });
        });
        
        window.netlifyIdentity.on('close', () => {
            console.log('Netlify Identity modal closed');
        });
    }
    
    /**
     * Handle Netlify user login
     */
    handleNetlifyLogin(user) {
        this.netlifyUser = user;
        
        // Create educator profile from Netlify user
        const educator = this.createEducatorFromNetlifyUser(user);
        
        const session = {
            code: `netlify_${user.id}`,
            educator: educator,
            loginTime: new Date().toISOString(),
            expires: new Date(Date.now() + this.sessionTimeout).toISOString(),
            rememberMe: true,
            sessionId: this.generateSessionId(),
            type: 'netlify',
            netlifyUser: {
                id: user.id,
                email: user.email,
                user_metadata: user.user_metadata,
                app_metadata: user.app_metadata
            }
        };
        
        // Store session
        localStorage.setItem(this.storageKey, JSON.stringify(session));
        
        this.logEvent('netlify_login_success', {
            userId: user.id,
            email: user.email,
            provider: user.app_metadata?.provider,
            role: educator.role,
            level: educator.level
        });
        
        // Trigger login event
        this.dispatchAuthEvent('login', { success: true, educator, session });
        
        return { success: true, educator, session };
    }
    
    /**
     * Handle Netlify user logout
     */
    handleNetlifyLogout() {
        const session = this.getSession();
        if (session) {
            this.logEvent('netlify_logout', {
                sessionDuration: Date.now() - new Date(session.loginTime).getTime(),
                role: session.educator.role
            });
        }
        
        this.netlifyUser = null;
        this.clearSession();
        this.dispatchAuthEvent('logout');
    }
    
    /**
     * Create educator profile from Netlify user
     */
    createEducatorFromNetlifyUser(user) {
        const email = user.email;
        const name = user.user_metadata?.full_name || user.user_metadata?.name || email.split('@')[0];
        const provider = user.app_metadata?.provider || 'email';
        
        // Determine educator level and permissions based on various factors
        let level = 'community';
        let permissions = ['create_curriculum', 'view_community', 'save_local'];
        let tools = ['arduino', '3d_printer', 'computers', 'basic_sensors'];
        let school = 'Online Community';
        let role = 'Community Member';
        
        // Enhanced permissions based on email domain
        if (email) {
            const domain = email.split('@')[1]?.toLowerCase();
            
            if (domain && (domain.includes('edu') || domain.includes('school') || domain.includes('university'))) {
                level = 'educator';
                permissions.push('eso_content', 'educational_resources');
                tools.push('hand_tools', 'multimeter');
                school = `Educational Institution (${domain})`;
                role = 'Educator';
            }
            
            // Specific institutional domains
            if (domain && domain.includes('valencia')) {
                level = 'eso';
                permissions.push('eso_content', 'enhanced_tools');
                role = 'ESO Educator';
                school = 'Valencia Education';
            }
            
            if (domain && domain.includes('fp')) {
                level = 'fp';
                permissions.push('fp_content', 'advanced_tools', 'enhanced_tools');
                tools.push('laser_cutter', 'cnc', 'advanced_electronics');
                role = 'FP Instructor';
                school = 'FP Institution';
            }
        }
        
        // Enhanced permissions for GitHub users with relevant repositories
        if (provider === 'github') {
            // In a real implementation, you could check GitHub API for education-related repos
            permissions.push('github_integration');
            role = `${role} (GitHub)`;
        }
        
        // Enhanced permissions for Google users with .edu emails
        if (provider === 'google' && email.includes('.edu')) {
            level = 'educator';
            permissions.push('google_classroom_integration');
            role = `${role} (Google Education)`;
        }
        
        return {
            name: name,
            role: role,
            school: school,
            level: level,
            permissions: permissions,
            tools: tools,
            maxStudents: level === 'fp' ? 15 : (level === 'eso' ? 25 : 20),
            sessionDuration: level === 'fp' ? 120 : (level === 'eso' ? 50 : 60),
            avatar: user.user_metadata?.avatar_url || this.generateAvatar(name),
            email: email,
            provider: provider,
            netlifyId: user.id,
            type: 'netlify'
        };
    }
    
    /**
     * Generate avatar URL for users without one
     */
    generateAvatar(name) {
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d8eb00&color=000000&size=128&font-size=0.5`;
    }
    
    /**
     * Enhanced login method supporting both institutional codes and Netlify
     */
    login(accessCode, rememberMe = false) {
        // Handle Netlify login
        if (accessCode === 'netlify' || accessCode === 'github' || accessCode === 'google') {
            if (!this.netlifyReady) {
                return {
                    success: false,
                    error: 'Authentication service not ready. Please try again in a moment.'
                };
            }
            
            window.netlifyIdentity.open();
            return {
                success: false,
                pending: true,
                message: 'Opening authentication dialog...'
            };
        }
        
        // Handle institutional access codes
        const educator = this.institutionalCodes.get(accessCode.toLowerCase());
        
        if (!educator) {
            this.logEvent('login_failed', { code: accessCode });
            return {
                success: false,
                error: 'Invalid access code. Please check with your administrator or sign in with your account.'
            };
        }
        
        const session = {
            code: accessCode,
            educator: educator,
            loginTime: new Date().toISOString(),
            expires: new Date(Date.now() + this.sessionTimeout).toISOString(),
            rememberMe: rememberMe,
            sessionId: this.generateSessionId(),
            type: 'institutional'
        };
        
        // Store session
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(this.storageKey, JSON.stringify(session));
        
        this.logEvent('institutional_login_success', {
            role: educator.role,
            school: educator.school,
            level: educator.level
        });
        
        return {
            success: true,
            educator: educator,
            session: session
        };
    }
    
    /**
     * Check if user is currently authenticated
     */
    isAuthenticated() {
        const session = this.getSession();
        if (!session) return false;
        
        // Check if session has expired
        if (new Date() > new Date(session.expires)) {
            this.logout();
            return false;
        }
        
        // For Netlify sessions, also check if Netlify user is still logged in
        if (session.type === 'netlify' && this.netlifyReady) {
            const currentUser = window.netlifyIdentity.currentUser();
            if (!currentUser || currentUser.id !== session.netlifyUser?.id) {
                this.logout();
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Get current educator session
     */
    getSession() {
        let session = null;
        
        // Try sessionStorage first, then localStorage
        const sessionData = sessionStorage.getItem(this.storageKey) || 
                           localStorage.getItem(this.storageKey);
        
        if (sessionData) {
            try {
                session = JSON.parse(sessionData);
            } catch (e) {
                console.error('Invalid session data:', e);
                this.clearSession();
            }
        }
        
        return session;
    }
    
    /**
     * Get current educator profile
     */
    getEducator() {
        const session = this.getSession();
        return session ? session.educator : null;
    }
    
    /**
     * Check if educator has specific permission
     */
    hasPermission(permission) {
        const educator = this.getEducator();
        if (!educator) return false;
        
        return educator.permissions.includes('all') || 
               educator.permissions.includes(permission);
    }
    
    /**
     * Get tools available to current educator
     */
    getAvailableTools() {
        const educator = this.getEducator();
        if (!educator) return [];
        
        if (educator.tools.includes('all')) {
            return ['arduino', '3d_printer', 'laser_cutter', 'cnc', 'computers', 
                   'advanced_electronics', 'sensors', 'soldering_station', 'multimeter', 'design_software'];
        }
        
        return educator.tools;
    }
    
    /**
     * Logout current user
     */
    logout() {
        const session = this.getSession();
        if (session) {
            this.logEvent('logout', {
                sessionDuration: Date.now() - new Date(session.loginTime).getTime(),
                role: session.educator.role,
                type: session.type
            });
        }
        
        // Clear local session
        this.clearSession();
        
        // If it's a Netlify session, also logout from Netlify
        if (session?.type === 'netlify' && this.netlifyReady) {
            window.netlifyIdentity.logout();
        } else {
            // Dispatch logout event for non-Netlify sessions
            this.dispatchAuthEvent('logout');
        }
        
        // Clear any cached data
        this.clearUserData();
    }
    
    /**
     * Clear session from storage
     */
    clearSession() {
        sessionStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.storageKey);
    }
    
    /**
     * Extend current session
     */
    extendSession() {
        const session = this.getSession();
        if (!session) return false;
        
        session.expires = new Date(Date.now() + this.sessionTimeout).toISOString();
        
        const storage = session.rememberMe ? localStorage : sessionStorage;
        storage.setItem(this.storageKey, JSON.stringify(session));
        
        return true;
    }
    
    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return 'sess_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    /**
     * Clean up expired sessions
     */
    cleanupExpiredSessions() {
        ['sessionStorage', 'localStorage'].forEach(storageType => {
            const storage = window[storageType];
            const sessionData = storage.getItem(this.storageKey);
            
            if (sessionData) {
                try {
                    const session = JSON.parse(sessionData);
                    if (new Date() > new Date(session.expires)) {
                        storage.removeItem(this.storageKey);
                    }
                } catch (e) {
                    storage.removeItem(this.storageKey);
                }
            }
        });
    }
    
    /**
     * Dispatch authentication events
     */
    dispatchAuthEvent(eventName, data = null) {
        const event = new CustomEvent(`auth:${eventName}`, {
            detail: data,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Log analytics events
     */
    logEvent(event, data = {}) {
        try {
            const events = JSON.parse(localStorage.getItem(this.analyticsKey) || '[]');
            
            const eventEntry = {
                event,
                data,
                timestamp: new Date().toISOString(),
                user: this.getEducator()?.role || 'anonymous',
                sessionId: this.getSession()?.sessionId || null
            };
            
            events.push(eventEntry);
            
            // Keep only last 200 events
            if (events.length > 200) {
                events.splice(0, events.length - 200);
            }
            
            localStorage.setItem(this.analyticsKey, JSON.stringify(events));
        } catch (e) {
            console.warn('Analytics logging failed:', e);
        }
    }
    
    /**
     * Get analytics data
     */
    getAnalytics() {
        try {
            const events = JSON.parse(localStorage.getItem(this.analyticsKey) || '[]');
            
            const stats = {
                totalEvents: events.length,
                uniqueUsers: new Set(events.map(e => e.user)).size,
                eventCounts: {},
                recentActivity: events.slice(-10)
            };
            
            events.forEach(event => {
                stats.eventCounts[event.event] = (stats.eventCounts[event.event] || 0) + 1;
            });
            
            return stats;
        } catch (e) {
            return { error: 'Unable to load analytics' };
        }
    }
    
    /**
     * Clear user-specific data
     */
    clearUserData() {
        // Clear any cached curriculum data
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('curriculum_') || key.startsWith('user_') || key.startsWith('demo_'))) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
    
    /**
     * Setup global error handling
     */
    setupGlobalErrorHandling() {
        window.addEventListener('error', (e) => {
            this.logEvent('js_error', {
                message: e.message,
                filename: e.filename,
                line: e.lineno
            });
        });
        
        // Handle session timeout
        setInterval(() => {
            if (this.isAuthenticated()) {
                const session = this.getSession();
                const timeLeft = new Date(session.expires) - new Date();
                
                // Warn when 15 minutes left
                if (timeLeft < 15 * 60 * 1000 && timeLeft > 14 * 60 * 1000) {
                    this.showSessionWarning();
                }
            }
        }, 60000); // Check every minute
    }
    
    /**
     * Show session timeout warning
     */
    showSessionWarning() {
        if (confirm('Your session will expire in 15 minutes. Would you like to extend it?')) {
            this.extendSession();
        }
    }
    
    /**
     * Get educator level restrictions
     */
    getLevelRestrictions() {
        const educator = this.getEducator();
        if (!educator) return null;
        
        const restrictions = {
            community: {
                complexityLevel: 'basic',
                projectDuration: 'short',
                allowedMethodologies: ['project_based', 'collaborative'],
                safetyLevel: 'supervised'
            },
            educator: {
                complexityLevel: 'intermediate',
                projectDuration: 'medium',
                allowedMethodologies: ['project_based', 'collaborative', 'hands_on'],
                safetyLevel: 'supervised'
            },
            eso: {
                complexityLevel: 'basic',
                projectDuration: 'short',
                allowedMethodologies: ['project_based', 'collaborative', 'hands_on'],
                safetyLevel: 'supervised'
            },
            fp: {
                complexityLevel: 'advanced',
                projectDuration: 'extended',
                allowedMethodologies: ['design_thinking', 'project_based', 'inquiry_based', 'industry_simulation'],
                safetyLevel: 'independent'
            },
            admin: {
                complexityLevel: 'all',
                projectDuration: 'all',
                allowedMethodologies: 'all',
                safetyLevel: 'all'
            },
            demo: {
                complexityLevel: 'basic',
                projectDuration: 'short',
                allowedMethodologies: ['project_based', 'collaborative'],
                safetyLevel: 'supervised'
            }
        };
        
        return restrictions[educator.level] || restrictions.community;
    }
    
    /**
     * Get user's Netlify profile (if logged in via Netlify)
     */
    getNetlifyUser() {
        if (this.netlifyReady) {
            return window.netlifyIdentity.currentUser();
        }
        return null;
    }
    
    /**
     * Check if Netlify Identity is ready
     */
    isNetlifyReady() {
        return this.netlifyReady;
    }
}

// Create global instance
window.educatorAuth = new EducatorAuth();

// Utility functions for easier access
window.isLoggedIn = () => window.educatorAuth.isAuthenticated();
window.getCurrentEducator = () => window.educatorAuth.getEducator();
window.hasPermission = (permission) => window.educatorAuth.hasPermission(permission);
window.getAvailableTools = () => window.educatorAuth.getAvailableTools();
window.logActivity = (event, data) => window.educatorAuth.logEvent(event, data);

// Auto-extend session on user activity
let activityTimer;
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
        if (window.educatorAuth.isAuthenticated()) {
            clearTimeout(activityTimer);
            activityTimer = setTimeout(() => {
                window.educatorAuth.extendSession();
            }, 5000); // Extend after 5 seconds of activity
        }
    }, true);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducatorAuth;
}