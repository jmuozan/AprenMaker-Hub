// docs/javascript/authentication/auth.js
// Client-Side Authentication System for AprenMaker Hub

class EducatorAuth {
    constructor() {
        this.storageKey = 'aprenmaker_educator_session';
        this.analyticsKey = 'aprenmaker_analytics';
        this.sessionTimeout = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
        
        // Educator credentials - in production, these could be generated at build time
        this.educators = new Map([
            // ESO Teachers
            ['valencia_eso_2025', {
                name: 'ESO Technology Teacher',
                role: 'ESO Educator',
                school: 'Valencia Region',
                level: 'eso',
                permissions: ['create_curriculum', 'save_local', 'view_community', 'eso_content'],
                tools: ['arduino', '3d_printer', 'computers', 'basic_sensors', 'hand_tools'],
                maxStudents: 25,
                sessionDuration: 50
            }],
            ['madrid_eso_2025', {
                name: 'Madrid ESO Instructor', 
                role: 'ESO Technology Teacher',
                school: 'Madrid Education',
                level: 'eso',
                permissions: ['create_curriculum', 'save_local', 'view_community', 'eso_content'],
                tools: ['arduino', 'computers', 'basic_sensors', 'multimeter'],
                maxStudents: 30,
                sessionDuration: 50
            }],
            
            // FP Teachers
            ['fp_digital_2025', {
                name: 'FP Digital Fabrication Instructor',
                role: 'FP Technology Teacher', 
                school: 'FP Fabrication Center',
                level: 'fp',
                permissions: ['create_curriculum', 'save_local', 'view_community', 'advanced_tools', 'fp_content'],
                tools: ['laser_cutter', '3d_printer', 'cnc', 'arduino', 'advanced_electronics', 'soldering_station'],
                maxStudents: 15,
                sessionDuration: 120
            }],
            ['fp_design_2025', {
                name: 'FP Product Design Teacher',
                role: 'Design Technology Instructor',
                school: 'FP Design Institute',
                level: 'fp', 
                permissions: ['create_curriculum', 'save_local', 'view_community', 'design_tools', 'fp_content'],
                tools: ['laser_cutter', '3d_printer', 'computers', 'design_software'],
                maxStudents: 12,
                sessionDuration: 180
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
                sessionDuration: 0
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
                sessionDuration: 60
            }]
        ]);
        
        this.init();
    }
    
    init() {
        this.cleanupExpiredSessions();
        this.setupGlobalErrorHandling();
    }
    
    /**
     * Authenticate educator with access code
     */
    login(accessCode, rememberMe = false) {
        const educator = this.educators.get(accessCode.toLowerCase());
        
        if (!educator) {
            this.logEvent('login_failed', { code: accessCode });
            return {
                success: false,
                error: 'Invalid access code. Please check with your administrator.'
            };
        }
        
        const session = {
            code: accessCode,
            educator: educator,
            loginTime: new Date().toISOString(),
            expires: new Date(Date.now() + this.sessionTimeout).toISOString(),
            rememberMe: rememberMe,
            sessionId: this.generateSessionId()
        };
        
        // Store session
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(this.storageKey, JSON.stringify(session));
        
        this.logEvent('login_success', {
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
                this.logout();
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
                   'advanced_electronics', 'sensors', 'soldering_station', 'multimeter'];
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
                role: session.educator.role
            });
        }
        
        sessionStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.storageKey);
        
        // Clear any cached data
        this.clearUserData();
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
            if (key && key.startsWith('curriculum_') || key.startsWith('user_')) {
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
            eso: {
                complexityLevel: 'basic',
                projectDuration: 'short', // 1-4 weeks
                allowedMethodologies: ['project_based', 'collaborative', 'hands_on'],
                safetyLevel: 'supervised'
            },
            fp: {
                complexityLevel: 'advanced',
                projectDuration: 'extended', // 4-12 weeks  
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
        
        return restrictions[educator.level] || restrictions.demo;
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