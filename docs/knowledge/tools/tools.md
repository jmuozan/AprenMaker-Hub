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
// Tool filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const accessButtons = document.querySelectorAll('.access-btn');
    const toolCards = document.querySelectorAll('.tool-card');
    
    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterTools(category, getCurrentAccessLevel());
        });
    });
    
    // Access level filtering
    accessButtons.forEach(button => {
        button.addEventListener('click', function() {
            accessButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const level = this.dataset.level;
            filterTools(getCurrentCategory(), level);
        });
    });
    
    function getCurrentCategory() {
        return document.querySelector('.filter-btn.active').dataset.category;
    }
    
    function getCurrentAccessLevel() {
        return document.querySelector('.access-btn.active').dataset.level;
    }
    
    function filterTools(category, level) {
        toolCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardLevel = card.dataset.level;
            
            const categoryMatch = category === 'all' || cardCategory === category;
            const levelMatch = level === 'all' || cardLevel === level;
            
            if (categoryMatch && levelMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Add hover effects
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.querySelector('.tool-img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.querySelector('.tool-img').style.transform = 'scale(1)';
        });
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