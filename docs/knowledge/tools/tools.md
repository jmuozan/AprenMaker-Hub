# Tool Fundamentals

<style>
/* Inline styles to ensure they load */
.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem; /* Reduced from 1.5rem */
    margin: 2rem 0;
}

.tool-card {
    border-radius: 0;
    padding: 1.5rem 1.5rem 2.5rem 1.5rem; /* Reduced top and left padding */
    cursor: pointer;
    transition: transform 0.2s ease;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.tool-card:hover {
    transform: translateY(-2px);
}

.tool-card.software {
    background-color: #00d8eb;
    color: #000000;
}

.tool-card.hardware {
    background-color: #eb7a00;
    color: #000000;
}

.tool-card.electronics {
    background-color: #d8eb00;
    color: #000000;
}

.tool-card.digital-fabrication {
    background-color: #eb00d8;
    color: #ffffff;
}

.tool-card.design {
    background-color: #00eb7a;
    color: #000000;
}

.tool-card.special {
    background-color: #7a00eb;
    color: #ffffff;
}

.tool-title {
    margin: 0 0 0.8rem 0; /* Further reduced bottom margin */
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.2;
}

.tool-description {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.4;
    opacity: 1;
    margin-top: auto; /* Push description to bottom if needed */
}

@media (max-width: 1200px) {
    .tools-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 0.8rem; /* Reduced spacing */
    }
}

@media (max-width: 768px) {
    .tools-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 0.8rem; /* Reduced from 1rem */
    }
    
    .tool-card {
        padding: 1.5rem 1.2rem 2rem 1.2rem; /* Reduced top and left padding */
        min-height: 200px;
    }
    
    .tool-title {
        font-size: 1.5rem;
        margin-bottom: 0.8rem; /* Reduced from 1rem */
    }
    
    .tool-description {
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .tools-grid {
        grid-template-columns: 1fr;
        gap: 0.8rem; /* Reduced spacing */
    }
    
    .tool-card {
        padding: 1.2rem 1rem 1.5rem 1rem; /* Reduced top and left padding */
        min-height: 180px;
    }
    
    .tool-title {
        font-size: 1.3rem;
        margin-bottom: 0.8rem; /* Consistent reduced spacing */
    }
    
    .tool-description {
        font-size: 0.75rem;
    }
}
</style>

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