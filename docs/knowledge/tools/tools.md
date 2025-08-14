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
    border: 2px solid;
    border-radius: 12px;
    padding: 1rem 1.5rem 2.5rem 1.5rem; /* Reduced top padding to match left */
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
}

.tool-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.tool-card.software {
    background: rgba(0, 216, 235, 0.05);
    border-color: #00d8eb;
    color: #000000;
}

.tool-card.software:hover {
    box-shadow: 0 8px 24px rgba(0, 216, 235, 0.2);
    border-color: #00c4d6;
}

.tool-card.hardware {
    background: rgba(235, 122, 0, 0.05);
    border-color: #eb7a00;
    color: #000000;
}

.tool-card.hardware:hover {
    box-shadow: 0 8px 24px rgba(235, 122, 0, 0.2);
    border-color: #d66a00;
}

.tool-card.electronics {
    background: rgba(216, 235, 0, 0.05);
    border-color: #d8eb00;
    color: #000000;
}

.tool-card.electronics:hover {
    box-shadow: 0 8px 24px rgba(216, 235, 0, 0.2);
    border-color: #c4d400;
}

.tool-card.digital-fabrication {
    background: rgba(235, 0, 216, 0.05);
    border-color: #eb00d8;
    color: #333333;
}

.tool-card.digital-fabrication:hover {
    box-shadow: 0 8px 24px rgba(235, 0, 216, 0.2);
    border-color: #d600c4;
}

.tool-card.design {
    background: rgba(0, 235, 122, 0.05);
    border-color: #00eb7a;
    color: #000000;
}

.tool-card.design:hover {
    box-shadow: 0 8px 24px rgba(0, 235, 122, 0.2);
    border-color: #00d66a;
}

.tool-card.special {
    background: rgba(122, 0, 235, 0.05);
    border-color: #7a00eb;
    color: #333333;
}

.tool-card.special:hover {
    box-shadow: 0 8px 24px rgba(122, 0, 235, 0.2);
    border-color: #6a00d6;
}

.tool-title {
    margin: 0 0 0.8rem 0; /* Further reduced bottom margin */
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.2;
    transition: color 0.3s ease;
}

.tool-card.software .tool-title {
    color: #00b8cc;
}

.tool-card.hardware .tool-title {
    color: #cc5f00;
}

.tool-card.electronics .tool-title {
    color: #b8cc00;
}

.tool-card.digital-fabrication .tool-title {
    color: #cc00b8;
}

.tool-card.design .tool-title {
    color: #00cc5f;
}

.tool-card.special .tool-title {
    color: #5f00cc;
}

.tool-card:hover .tool-title {
    transform: scale(1.02);
}

.tool-description {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.4;
    opacity: 0.8;
    margin-top: auto; /* Push description to bottom if needed */
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