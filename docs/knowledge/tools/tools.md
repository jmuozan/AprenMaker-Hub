# Tool Fundamentals

<style>
/* Inline styles to ensure they load */
.tools-header {
    margin: 1.5rem 0;
    padding: 0;
    background: transparent;
    border: none;
    text-align: center;
}

.search-filter-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 0.5rem;
    align-items: center;
}

.search-container {
    position: relative;
    max-width: 100%;
    width: 100%;
    text-align: center;
}

.search-button {
    display: none;
}

.search-expanded {
    display: block;
    text-align: center;
    max-width: 100%;
    width: 100%;
}

.search-title {
    font-size: 3rem;
    font-weight: 300;
    color: #ffffff;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    text-align: left;
}

.search-input-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.search-input {
    width: 100%;
    padding: 0.8rem 3rem 0.8rem 1rem;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 0;
    background: transparent;
    color: #ffffff;
    font-size: 0.7rem;
    transition: all 0.3s ease;
    box-sizing: border-box;
    display: block;
    text-align: left;
}

.search-input:focus {
    outline: none;
    border-bottom-color: #d8eb00;
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.7rem;
}

.search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    opacity: 0.6;
    fill: #ffffff;
    display: block;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: center;
}

.filter-btn {
    padding: 0.3rem 0.7rem;
    border: 1px solid;
    border-radius: 15px;
    background: transparent;
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.filter-btn.all { border-color: #d8eb00; color: #d8eb00; }
.filter-btn.software { border-color: #00d8eb; color: #00d8eb; }
.filter-btn.hardware { border-color: #eb7a00; color: #eb7a00; }
.filter-btn.electronics { border-color: #d8eb00; color: #d8eb00; }
.filter-btn.digital-fabrication { border-color: #eb00d8; color: #eb00d8; }
.filter-btn.design { border-color: #00eb7a; color: #00eb7a; }
.filter-btn.special { border-color: #7a00eb; color: #7a00eb; }

.filter-btn:hover,
.filter-btn.active {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.filter-btn.all:hover, .filter-btn.all.active { background: #d8eb00; color: #000000; }
.filter-btn.software:hover, .filter-btn.software.active { background: #00d8eb; color: #000000; }
.filter-btn.hardware:hover, .filter-btn.hardware.active { background: #eb7a00; color: #000000; }
.filter-btn.electronics:hover, .filter-btn.electronics.active { background: #d8eb00; color: #000000; }
.filter-btn.digital-fabrication:hover, .filter-btn.digital-fabrication.active { background: #eb00d8; color: #ffffff; }
.filter-btn.design:hover, .filter-btn.design.active { background: #00eb7a; color: #000000; }
.filter-btn.special:hover, .filter-btn.special.active { background: #7a00eb; color: #ffffff; }

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.6rem;
    margin: 2rem 0;
}

.tool-card {
    border: 2px solid;
    border-radius: 12px;
    padding: 0.2rem 0.8rem 1.6rem 0.4rem;
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
}

.tool-card.hidden {
    display: none;
}

.tool-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.tool-card.software {
    background: rgba(0, 216, 235, 0.05);
    border-color: #00d8eb;
    color: #000000;
}

.tool-card.software:hover {
    box-shadow: 0 6px 20px rgba(0, 216, 235, 0.2);
    border-color: #00c4d6;
}

.tool-card.hardware {
    background: rgba(235, 122, 0, 0.05);
    border-color: #eb7a00;
    color: #000000;
}

.tool-card.hardware:hover {
    box-shadow: 0 6px 20px rgba(235, 122, 0, 0.2);
    border-color: #d66a00;
}

.tool-card.electronics {
    background: rgba(216, 235, 0, 0.05);
    border-color: #d8eb00;
    color: #000000;
}

.tool-card.electronics:hover {
    box-shadow: 0 6px 20px rgba(216, 235, 0, 0.2);
    border-color: #c4d400;
}

.tool-card.digital-fabrication {
    background: rgba(235, 0, 216, 0.05);
    border-color: #eb00d8;
    color: #333333;
}

.tool-card.digital-fabrication:hover {
    box-shadow: 0 6px 20px rgba(235, 0, 216, 0.2);
    border-color: #d600c4;
}

.tool-card.design {
    background: rgba(0, 235, 122, 0.05);
    border-color: #00eb7a;
    color: #000000;
}

.tool-card.design:hover {
    box-shadow: 0 6px 20px rgba(0, 235, 122, 0.2);
    border-color: #00d66a;
}

.tool-card.special {
    background: rgba(122, 0, 235, 0.05);
    border-color: #7a00eb;
    color: #333333;
}

.tool-card.special:hover {
    box-shadow: 0 6px 20px rgba(122, 0, 235, 0.2);
    border-color: #6a00d6;
}

.tool-title {
    margin: 0 0 0.2rem 0;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.1;
    transition: all 0.3s ease;
}

.tool-card.software .tool-title { color: #00b8cc; }
.tool-card.hardware .tool-title { color: #cc5f00; }
.tool-card.electronics .tool-title { color: #b8cc00; }
.tool-card.digital-fabrication .tool-title { color: #cc00b8; }
.tool-card.design .tool-title { color: #00cc5f; }
.tool-card.special .tool-title { color: #5f00cc; }

.tool-card:hover .tool-title {
    /* Removed the scale transform */
}

.tool-description {
    margin: 0;
    font-size: 0.7rem;
    line-height: 1.3;
    opacity: 0.8;
    margin-top: auto;
    transition: opacity 0.3s ease;
    color: inherit;
}

/* Dark mode text color fix */
@media (prefers-color-scheme: dark) {
    .tool-description {
        color: #ffffff;
    }
}

[data-md-color-scheme="slate"] .tool-description {
    color: #ffffff;
}

.tool-card:hover .tool-description {
    opacity: 1;
}

@media (max-width: 1200px) {
    .tools-grid {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.5rem;
    }
}

@media (max-width: 768px) {
    .search-filter-section {
        gap: 0.8rem;
    }
    
    .search-container {
        max-width: 100%;
    }
    
    .search-button {
        font-size: 1.4rem;
        padding: 0.8rem 1rem;
    }
    
    .search-title {
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
    }
    
    .filter-buttons {
        justify-content: center;
    }
    
    .filter-btn {
        font-size: 0.65rem;
        padding: 0.25rem 0.6rem;
    }

    .tools-grid {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 0.5rem;
    }
    
    .tool-card {
        padding: 0.3rem 0.6rem 1.2rem 0.3rem;
        min-height: 120px;
    }
    
    .tool-title {
        font-size: 1rem;
        margin-bottom: 0.4rem;
    }
    
    .tool-description {
        font-size: 0.65rem;
    }
}

@media (max-width: 480px) {
    .tools-grid {
        grid-template-columns: 1fr;
        gap: 0.6rem;
    }
    
    .tool-card {
        padding: 0.4rem 0.8rem 1.3rem 0.4rem;
        min-height: 110px;
    }
    
    .tool-title {
        font-size: 0.95rem;
        margin-bottom: 0.4rem;
    }
    
    .tool-description {
        font-size: 0.6rem;
    }
}
</style>

<div class="tools-header">
  <div class="search-filter-section">
    <div class="search-container">
      <div class="search-expanded">
        <h2 class="search-title">What are you looking for?</h2>
        <div class="search-input-container">
          <svg class="search-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            type="text" 
            class="search-input" 
            placeholder="Type something" 
            id="toolSearch"
            onkeyup="filterTools()"
          />
        </div>
      </div>
    </div>
    
    <div class="filter-buttons">
      <button class="filter-btn all active" onclick="filterByCategory('all')">All Tools</button>
      <button class="filter-btn software" onclick="filterByCategory('software')">Software</button>
      <button class="filter-btn hardware" onclick="filterByCategory('hardware')">Hardware</button>
      <button class="filter-btn electronics" onclick="filterByCategory('electronics')">Electronics</button>
      <button class="filter-btn digital-fabrication" onclick="filterByCategory('digital-fabrication')">Digital Fabrication</button>
      <button class="filter-btn design" onclick="filterByCategory('design')">Design</button>
      <button class="filter-btn special" onclick="filterByCategory('special')">Special</button>
    </div>
  </div>
</div>

Explore the comprehensive technical documentation for all fab lab equipment and technologies. Click on any tool to learn about its capabilities, specifications, and applications in maker education.

<div class="tools-grid">

<div class="tool-card electronics" onclick="window.location.href='project-management.md'">
  <h3 class="tool-title">Project Management</h3>
  <p class="tool-description">Learn project planning, documentation, and workflow management for maker projects</p>
</div>

<div class="tool-card design" onclick="window.location.href='computer-aided-design.md'">
  <h3 class="tool-title">Computer-aided Design</h3>
  <p class="tool-description">Master 2D and 3D design software for creating digital models and technical drawings</p>
</div>

<div class="tool-card digital-fabrication" onclick="window.location.href='computer-controlled-cutting.md'">
  <h3 class="tool-title">Computer-controlled Cutting</h3>
  <p class="tool-description">Use laser cutters and vinyl plotters to precisely cut and engrave materials</p>
</div>

<div class="tool-card software" onclick="window.location.href='embedded-programming.md'">
  <h3 class="tool-title">Embedded Programming</h3>
  <p class="tool-description">Program microcontrollers and develop interactive electronic systems</p>
</div>

<div class="tool-card digital-fabrication" onclick="window.location.href='3d-scanning-printing.md'">
  <h3 class="tool-title">3D Scanning and Printing</h3>
  <p class="tool-description">Capture real objects digitally and create physical prototypes through additive manufacturing</p>
</div>

<div class="tool-card electronics" onclick="window.location.href='electronics-design.md'">
  <h3 class="tool-title">Electronics Design</h3>
  <p class="tool-description">Design and fabricate custom printed circuit boards and electronic systems</p>
</div>

<div class="tool-card hardware" onclick="window.location.href='computer-aided-machining.md'">
  <h3 class="tool-title">Computer-aided Machining</h3>
  <p class="tool-description">Program CNC machines to create precision parts through subtractive manufacturing</p>
</div>

<div class="tool-card electronics" onclick="window.location.href='electronic-production.md'">
  <h3 class="tool-title">Electronic Production</h3>
  <p class="tool-description">Fabricate, assemble, and test electronic circuits and PCB prototypes</p>
</div>

<div class="tool-card electronics" onclick="window.location.href='input-devices.md'">
  <h3 class="tool-title">Input Devices</h3>
  <p class="tool-description">Design and build sensors and interfaces for data collection and user interaction</p>
</div>

<div class="tool-card electronics" onclick="window.location.href='output-devices.md'">
  <h3 class="tool-title">Output Devices</h3>
  <p class="tool-description">Create actuators, displays, and other devices that respond to electronic signals</p>
</div>

<div class="tool-card software" onclick="window.location.href='networking-communications.md'">
  <h3 class="tool-title">Networking & Communications</h3>
  <p class="tool-description">Connect devices and systems through wireless and wired communication protocols</p>
</div>

<div class="tool-card hardware" onclick="window.location.href='mechanical-machine-design.md'">
  <h3 class="tool-title">Mechanical Design & Machine Design</h3>
  <p class="tool-description">Engineer mechanical systems and build automated machines and mechanisms</p>
</div>

<div class="tool-card digital-fabrication" onclick="window.location.href='molding-casting.md'">
  <h3 class="tool-title">Molding & Casting</h3>
  <p class="tool-description">Create molds and cast objects using various materials and techniques</p>
</div>

<div class="tool-card software" onclick="window.location.href='interface-application-programming.md'">
  <h3 class="tool-title">Interface & Application Programming</h3>
  <p class="tool-description">Develop user interfaces and applications for controlling digital fabrication projects</p>
</div>

<div class="tool-card software" onclick="window.location.href='system-integration.md'">
  <h3 class="tool-title">System Integration</h3>
  <p class="tool-description">Combine multiple subsystems into cohesive, functional integrated solutions</p>
</div>

<div class="tool-card special" onclick="window.location.href='wildcard-week.md'">
  <h3 class="tool-title">Wildcard Week</h3>
  <p class="tool-description">Explore innovative techniques and experimental approaches to digital fabrication</p>
</div>

</div>

---

## Understanding Digital Fabrication

Each module represents a different aspect of digital fabrication - from design and planning to manufacturing and integration. Understanding these fundamental processes helps you choose the right approach for each project.

### Module Categories Explained

**Software** (Cyan): Programming, networking, and application development  
**Hardware** (Orange): Mechanical engineering and machine design  
**Electronics** (Yellow): Circuit design, sensors, and electronic systems  
**Digital Fabrication** (Magenta): Manufacturing processes and material production  
**Design** (Green): 2D/3D modeling and design workflows  
**Special** (Purple): Experimental and innovative techniques

---

## Next Steps

**Ready to start learning?** Choose a module that matches your interests and skill level, then:

1. **Read the module overview** - Understand the learning objectives
2. **Follow the tutorials** - Build foundational knowledge  
3. **Complete the assignments** - Apply skills in practical exercises
4. **Join the community** - Connect with other learners and makers

<script>
let currentFilter = 'all';

function filterTools() {
    const searchTerm = document.getElementById('toolSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.tool-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.tool-title').textContent.toLowerCase();
        const description = card.querySelector('.tool-description').textContent.toLowerCase();
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesCategory = currentFilter === 'all' || card.classList.contains(currentFilter);
        
        if (matchesSearch && matchesCategory) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function filterByCategory(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.filter-btn.${category}`).classList.add('active');
    
    // Apply filters
    filterTools();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    filterTools();
});
</script>