# Tool Fundamentals

Explore the comprehensive technical documentation for all fab lab equipment and technologies. Click on any tool to learn about its capabilities, specifications, and applications in maker education.

<link rel="stylesheet" href="../../stylesheets/knowledge/tools.css">

<div class="tools-hero">
  <div class="tools-hero-content">
    <h2>Digital Fabrication Equipment</h2>
    <p>From basic hand tools to advanced CNC machines, explore the complete toolkit that powers modern maker education</p>
  </div>
</div>

<div class="tools-filter-bar">
  <div class="filter-group">
    <label>Filter by Category:</label>
    <div class="filter-buttons">
      <button class="filter-btn active" data-category="all">All Tools</button>
      <button class="filter-btn" data-category="fabrication">Digital Fabrication</button>
      <button class="filter-btn" data-category="electronics">Electronics</button>
      <button class="filter-btn" data-category="measurement">Measurement</button>
      <button class="filter-btn" data-category="hand-tools">Hand Tools</button>
      <button class="filter-btn" data-category="software">Software</button>
    </div>
  </div>
  
  <div class="filter-group">
    <label>Access Level:</label>
    <div class="filter-buttons">
      <button class="access-btn active" data-level="all">All Levels</button>
      <button class="access-btn" data-level="basic">Basic</button>
      <button class="access-btn" data-level="intermediate">Intermediate</button>
      <button class="access-btn" data-level="advanced">Advanced</button>
    </div>
  </div>
</div>

<div class="tools-grid" id="tools-grid">

<!-- Digital Fabrication Tools -->
<div class="tool-card" data-category="fabrication" data-level="intermediate" onclick="window.location.href='3d-printer.md'">
  <div class="tool-image">
    <img src="../../assets/tools/3d-printer.jpg" alt="3D Printer" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge intermediate">Intermediate</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">3D Printer</h3>
    <p class="tool-subtitle">Additive Manufacturing</p>
  </div>
</div>

<div class="tool-card" data-category="fabrication" data-level="advanced" onclick="window.location.href='laser-cutter.md'">
  <div class="tool-image">
    <img src="../../assets/tools/laser-cutter.jpg" alt="Laser Cutter" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge advanced">Advanced</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Laser Cutter</h3>
    <p class="tool-subtitle">Precision Cutting & Engraving</p>
  </div>
</div>

<div class="tool-card" data-category="fabrication" data-level="advanced" onclick="window.location.href='cnc-machine.md'">
  <div class="tool-image">
    <img src="../../assets/tools/cnc-machine.jpg" alt="CNC Machine" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge advanced">Advanced</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">CNC Machine</h3>
    <p class="tool-subtitle">Computer Numerical Control</p>
  </div>
</div>

<!-- Electronics Tools -->
<div class="tool-card" data-category="electronics" data-level="basic" onclick="window.location.href='arduino.md'">
  <div class="tool-image">
    <img src="../../assets/tools/arduino.jpg" alt="Arduino" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge basic">Basic</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Arduino</h3>
    <p class="tool-subtitle">Microcontroller Platform</p>
  </div>
</div>

<div class="tool-card" data-category="electronics" data-level="intermediate" onclick="window.location.href='soldering-station.md'">
  <div class="tool-image">
    <img src="../../assets/tools/soldering-station.jpg" alt="Soldering Station" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge intermediate">Intermediate</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Soldering Station</h3>
    <p class="tool-subtitle">Electronics Assembly</p>
  </div>
</div>

<div class="tool-card" data-category="electronics" data-level="intermediate" onclick="window.location.href='electronics-kit.md'">
  <div class="tool-image">
    <img src="../../assets/tools/electronics-kit.jpg" alt="Electronics Kit" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge intermediate">Intermediate</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Electronics Kit</h3>
    <p class="tool-subtitle">Components & Sensors</p>
  </div>
</div>

<!-- Measurement Tools -->
<div class="tool-card" data-category="measurement" data-level="basic" onclick="window.location.href='multimeter.md'">
  <div class="tool-image">
    <img src="../../assets/tools/multimeter.jpg" alt="Multimeter" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge basic">Basic</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Multimeter</h3>
    <p class="tool-subtitle">Electrical Measurement</p>
  </div>
</div>

<div class="tool-card" data-category="measurement" data-level="basic" onclick="window.location.href='calipers.md'">
  <div class="tool-image">
    <img src="../../assets/tools/calipers.jpg" alt="Digital Calipers" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge basic">Basic</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Digital Calipers</h3>
    <p class="tool-subtitle">Precision Measurement</p>
  </div>
</div>

<!-- Hand Tools -->
<div class="tool-card" data-category="hand-tools" data-level="basic" onclick="window.location.href='hand-tools.md'">
  <div class="tool-image">
    <img src="../../assets/tools/hand-tools.jpg" alt="Hand Tools Set" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge basic">Basic</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Hand Tools Set</h3>
    <p class="tool-subtitle">Manual Assembly Tools</p>
  </div>
</div>

<div class="tool-card" data-category="hand-tools" data-level="basic" onclick="window.location.href='cutting-tools.md'">
  <div class="tool-image">
    <img src="../../assets/tools/cutting-tools.jpg" alt="Cutting Tools" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge basic">Basic</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Cutting Tools</h3>
    <p class="tool-subtitle">Material Cutting & Shaping</p>
  </div>
</div>

<!-- Software Tools -->
<div class="tool-card" data-category="software" data-level="intermediate" onclick="window.location.href='design-software.md'">
  <div class="tool-image">
    <img src="../../assets/tools/design-software.jpg" alt="Design Software" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge intermediate">Intermediate</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Design Software</h3>
    <p class="tool-subtitle">CAD & Vector Graphics</p>
  </div>
</div>

<div class="tool-card" data-category="software" data-level="basic" onclick="window.location.href='programming-tools.md'">
  <div class="tool-image">
    <img src="../../assets/tools/programming-tools.jpg" alt="Programming Tools" class="tool-img">
    <div class="tool-overlay">
      <span class="tool-badge basic">Basic</span>
    </div>
  </div>
  <div class="tool-info">
    <h3 class="tool-title">Programming Tools</h3>
    <p class="tool-subtitle">Arduino IDE & Code Editors</p>
  </div>
</div>

</div>

<div class="tools-info-section">
  <div class="safety-notice">
    <div class="notice-icon">⚠️</div>
    <div class="notice-content">
      <h3>Safety First</h3>
      <p>All fab lab tools require proper training and safety procedures. Always read safety guidelines and receive proper instruction before operating any equipment.</p>
    </div>
  </div>
  
  <div class="learning-paths">
    <h3>Recommended Learning Paths</h3>
    <div class="path-cards">
      <div class="path-card">
        <h4>🚀 Beginner Path</h4>
        <p>Start with hand tools → Arduino → 3D printer basics</p>
      </div>
      <div class="path-card">
        <h4>⚡ Electronics Path</h4>
        <p>Arduino → Soldering → Advanced sensors → PCB design</p>
      </div>
      <div class="path-card">
        <h4>🔧 Fabrication Path</h4>
        <p>Design software → 3D printing → Laser cutting → CNC</p>
      </div>
    </div>
  </div>
</div>

<script>
// Complete Tool Filtering and UI Enhancement Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeToolFiltering();
    initializeToolInteractions();
    initializeResponsiveDesign();
    
    /**
     * Initialize tool filtering functionality
     */
    function initializeToolFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const accessButtons = document.querySelectorAll('.access-btn');
        const toolCards = document.querySelectorAll('.tool-card');
        
        // Ensure we have elements to work with
        if (!filterButtons.length || !accessButtons.length || !toolCards.length) {
            console.warn('Tool filtering elements not found');
            return;
        }
        
        // Category filtering
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all category buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get current filters and apply
                const category = this.dataset.category || 'all';
                const level = getCurrentAccessLevel();
                filterTools(category, level);
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Access level filtering
        accessButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all access buttons
                accessButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get current filters and apply
                const level = this.dataset.level || 'all';
                const category = getCurrentCategory();
                filterTools(category, level);
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        /**
         * Get currently selected category
         */
        function getCurrentCategory() {
            const activeBtn = document.querySelector('.filter-btn.active');
            return activeBtn ? (activeBtn.dataset.category || 'all') : 'all';
        }
        
        /**
         * Get currently selected access level
         */
        function getCurrentAccessLevel() {
            const activeBtn = document.querySelector('.access-btn.active');
            return activeBtn ? (activeBtn.dataset.level || 'all') : 'all';
        }
        
        /**
         * Filter tools based on category and access level
         */
        function filterTools(category, level) {
            let visibleCount = 0;
            
            toolCards.forEach((card, index) => {
                const cardCategory = card.dataset.category || '';
                const cardLevel = card.dataset.level || '';
                
                const categoryMatch = category === 'all' || cardCategory === category;
                const levelMatch = level === 'all' || cardLevel === level;
                
                if (categoryMatch && levelMatch) {
                    // Show card with animation delay
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        requestAnimationFrame(() => {
                            card.style.transition = 'all 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    }, index * 50);
                    
                    visibleCount++;
                } else {
                    // Hide card
                    card.style.transition = 'all 0.2s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
            
            // Update results count if needed
            updateResultsCount(visibleCount);
        }
        
        /**
         * Update visible results count
         */
        function updateResultsCount(count) {
            let countElement = document.querySelector('.tools-count');
            
            if (!countElement) {
                // Create count element if it doesn't exist
                countElement = document.createElement('div');
                countElement.className = 'tools-count';
                countElement.style.cssText = `
                    text-align: center;
                    margin: 1rem 0;
                    color: var(--md-default-fg-color--light);
                    font-size: 0.9rem;
                    font-family: var(--nimbus-font);
                `;
                
                const toolsGrid = document.getElementById('tools-grid');
                if (toolsGrid) {
                    toolsGrid.parentNode.insertBefore(countElement, toolsGrid);
                }
            }
            
            if (countElement) {
                countElement.textContent = `Showing ${count} tool${count !== 1 ? 's' : ''}`;
            }
        }
    }
    
    /**
     * Initialize tool card interactions
     */
    function initializeToolInteractions() {
        const toolCards = document.querySelectorAll('.tool-card');
        
        toolCards.forEach(card => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.transition = 'all 0.3s ease';
                
                const img = this.querySelector('.tool-img');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                    img.style.transition = 'transform 0.4s ease';
                }
                
                const badge = this.querySelector('.tool-badge');
                if (badge) {
                    badge.style.transform = 'scale(1.1)';
                    badge.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                
                const img = this.querySelector('.tool-img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
                
                const badge = this.querySelector('.tool-badge');
                if (badge) {
                    badge.style.transform = 'scale(1)';
                }
            });
            
            // Click feedback
            card.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-4px) scale(0.98)';
            });
            
            card.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-8px) scale(1)';
            });
            
            // Keyboard navigation support
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            // Make cards focusable for accessibility
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }
        });
    }
    
    /**
     * Initialize responsive design enhancements
     */
    function initializeResponsiveDesign() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                adjustLayoutForScreenSize();
            }, 250);
        });
        
        // Initial layout adjustment
        adjustLayoutForScreenSize();
        
        /**
         * Adjust layout based on screen size
         */
        function adjustLayoutForScreenSize() {
            const toolsGrid = document.getElementById('tools-grid');
            if (!toolsGrid) return;
            
            const screenWidth = window.innerWidth;
            
            if (screenWidth <= 480) {
                // Extra small screens
                toolsGrid.style.gridTemplateColumns = '1fr';
                toolsGrid.style.gap = '1rem';
            } else if (screenWidth <= 768) {
                // Mobile screens
                toolsGrid.style.gridTemplateColumns = '1fr';
                toolsGrid.style.gap = '1.5rem';
            } else if (screenWidth <= 1024) {
                // Tablet screens
                toolsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                toolsGrid.style.gap = '1.5rem';
            } else {
                // Desktop screens
                toolsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
                toolsGrid.style.gap = '2rem';
            }
        }
    }
    
    /**
     * Initialize search functionality (bonus feature)
     */
    function initializeToolSearch() {
        // Create search input if it doesn't exist
        let searchInput = document.querySelector('.tools-search');
        
        if (!searchInput) {
            searchInput = document.createElement('input');
            searchInput.className = 'tools-search';
            searchInput.type = 'text';
            searchInput.placeholder = 'Search tools...';
            searchInput.style.cssText = `
                width: 100%;
                max-width: 300px;
                padding: 0.75rem 1rem;
                margin: 1rem auto;
                display: block;
                border: 2px solid rgba(216, 235, 0, 0.3);
                border-radius: 8px;
                background: rgba(216, 235, 0, 0.05);
                color: var(--md-default-fg-color);
                font-family: var(--nimbus-font);
                font-size: 0.9rem;
                transition: all 0.3s ease;
            `;
            
            const filterBar = document.querySelector('.tools-filter-bar');
            if (filterBar) {
                filterBar.appendChild(searchInput);
            }
        }
        
        // Search functionality
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = this.value.toLowerCase().trim();
                searchTools(searchTerm);
            }, 300);
        });
        
        // Search styling on focus
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#d8eb00';
            this.style.background = 'rgba(216, 235, 0, 0.1)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(216, 235, 0, 0.3)';
            this.style.background = 'rgba(216, 235, 0, 0.05)';
        });
        
        /**
         * Search through tools
         */
        function searchTools(searchTerm) {
            const toolCards = document.querySelectorAll('.tool-card');
            
            if (!searchTerm) {
                // If no search term, show all tools based on current filters
                const category = getCurrentCategory();
                const level = getCurrentAccessLevel();
                filterTools(category, level);
                return;
            }
            
            let visibleCount = 0;
            
            toolCards.forEach(card => {
                const title = card.querySelector('.tool-title')?.textContent.toLowerCase() || '';
                const subtitle = card.querySelector('.tool-subtitle')?.textContent.toLowerCase() || '';
                const category = card.dataset.category || '';
                const level = card.dataset.level || '';
                
                const matchesSearch = title.includes(searchTerm) || 
                                    subtitle.includes(searchTerm) || 
                                    category.includes(searchTerm) || 
                                    level.includes(searchTerm);
                
                if (matchesSearch) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            updateResultsCount(visibleCount);
        }
        
        function getCurrentCategory() {
            const activeBtn = document.querySelector('.filter-btn.active');
            return activeBtn ? (activeBtn.dataset.category || 'all') : 'all';
        }
        
        function getCurrentAccessLevel() {
            const activeBtn = document.querySelector('.access-btn.active');
            return activeBtn ? (activeBtn.dataset.level || 'all') : 'all';
        }
        
        function updateResultsCount(count) {
            let countElement = document.querySelector('.tools-count');
            if (countElement) {
                countElement.textContent = `Showing ${count} tool${count !== 1 ? 's' : ''}`;
            }
        }
        
        function filterTools(category, level) {
            // This would call the main filterTools function
            // Implementation depends on your existing filter structure
        }
    }
    
    // Initialize search (optional - uncomment to enable)
    // initializeToolSearch();
    
    /**
     * Initialize keyboard shortcuts (bonus feature)
     */
    function initializeKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Only handle shortcuts when not in an input field
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    clickFilterButton('all');
                    break;
                case '2':
                    e.preventDefault();
                    clickFilterButton('fabrication');
                    break;
                case '3':
                    e.preventDefault();
                    clickFilterButton('electronics');
                    break;
                case '4':
                    e.preventDefault();
                    clickFilterButton('measurement');
                    break;
                case '5':
                    e.preventDefault();
                    clickFilterButton('hand-tools');
                    break;
                case '6':
                    e.preventDefault();
                    clickFilterButton('software');
                    break;
                case 'Escape':
                    // Clear search and reset filters
                    const searchInput = document.querySelector('.tools-search');
                    if (searchInput) {
                        searchInput.value = '';
                        searchInput.dispatchEvent(new Event('input'));
                    }
                    break;
            }
        });
        
        function clickFilterButton(category) {
            const button = document.querySelector(`[data-category="${category}"]`);
            if (button) {
                button.click();
            }
        }
    }
    
    // Initialize keyboard shortcuts (optional - uncomment to enable)
    // initializeKeyboardShortcuts();
    
    /**
     * Add loading states for better UX
     */
    function addLoadingStates() {
        const toolCards = document.querySelectorAll('.tool-card');
        
        toolCards.forEach((card, index) => {
            // Add loading skeleton effect
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Add loading animation
    addLoadingStates();
    
    // Console log for debugging
    console.log('Tools page JavaScript initialized successfully');
});

// Error handling for any global errors
window.addEventListener('error', function(e) {
    console.warn('Tools page error caught:', e.error?.message || e.message);
});

// Handle any authentication-related elements that might not exist
document.addEventListener('DOMContentLoaded', function() {
    // Safely handle any missing auth elements
    const authElements = ['auth-dropdown-menu', 'profile-modal', 'login-modal'];
    
    authElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (!element) {
            // Element doesn't exist, which is fine for the tools page
            console.debug(`Element ${elementId} not found (expected on tools page)`);
        }
    });
});
</script>

---

## Understanding Digital Fabrication

!!! info "Technology Foundation"
    Each tool represents a different approach to material manipulation - additive (3D printing), subtractive (CNC), thermal (laser cutting), and manual (hand tools). Understanding these fundamental processes helps you choose the right tool for each project.

!!! tip "Start Simple"
    Begin with tools that match your current skill level. Master the basics before moving to advanced equipment. Each tool builds upon knowledge from simpler ones.

### Tool Categories Explained

=== "Digital Fabrication"

    **Computer-controlled manufacturing tools** that translate digital designs into physical objects:
    
    - **3D Printers**: Build objects layer by layer (additive manufacturing)
    - **Laser Cutters**: Use focused light to cut/engrave materials 
    - **CNC Machines**: Remove material with precise cutting tools
    
    These tools require digital design skills and understanding of toolpaths and material properties.

=== "Electronics"

    **Components and tools for electronic prototyping** and circuit construction:
    
    - **Arduino**: Programmable microcontroller for interactive projects
    - **Soldering Equipment**: For permanent electrical connections
    - **Sensors**: Input devices for environmental monitoring
    
    Electronics tools bridge physical making with programming and digital control.

=== "Measurement"

    **Precision instruments for verification** and troubleshooting:
    
    - **Multimeters**: Measure electrical properties
    - **Calipers**: Precise dimensional measurement
    - **Oscilloscopes**: Visualize electrical signals
    
    Essential for quality control and understanding how things work.

=== "Hand Tools"

    **Manual tools for assembly and modification**:
    
    - **Screwdrivers & Wrenches**: Mechanical fastening
    - **Pliers & Cutters**: Wire work and manipulation  
    - **Files & Sandpaper**: Surface finishing
    
    Foundation tools that every maker needs, regardless of technical complexity.

---

## Next Steps

**Ready to start learning?** Choose a tool that matches your interests and skill level, then:

1. **Read the safety guidelines** - Always prioritize safe operation
2. **Take the introductory course** - Build foundational knowledge  
3. **Start with guided projects** - Apply skills in structured exercises
4. **Join the community** - Connect with other learners and makers

[Browse Learning Modules →](../../guides/guides.md) | [Join Community Forum →](../../forum/forum.md)