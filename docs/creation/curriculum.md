# Curriculum Builder - Interactive Card Game

Welcome to the **AprenMaker-Hub Curriculum Builder**! This interactive tool helps teachers create maker-focused "Situacions d'Aprenentatge" (Learning Situations) by combining course topics, available lab tools, and pedagogical methodologies through an engaging card-based interface.

## How It Works

This curriculum builder transforms the complex process of curriculum design into an intuitive **"game of cards"** where you can:

1. **📚 Select Course Topics** - Choose from ESO and FP curriculum areas
2. **🔧 Pick Available Tools** - Match content with your lab's equipment  
3. **🎯 Choose Methodologies** - Apply maker-focused pedagogical approaches
4. **✨ Generate Curriculum** - Get a complete learning situation with projects, assessments, and resources

!!! tip "Getting Started"
    Click on cards from the left and right panels to build your learning situation. The more thoughtful your combination, the more targeted and practical your generated curriculum will be!

---

<div id="curriculum-app">
    <style>
        :root {
            --primary-color: #000000;
            --accent-color: #d8eb00;
            --accent-hover: #c4d400;
            --card-bg: #ffffff;
            --card-shadow: rgba(0, 0, 0, 0.1);
            --text-dark: #333333;
            --text-light: #666666;
            --border-radius: 12px;
            --spacing-sm: 8px;
            --spacing-md: 16px;
            --spacing-lg: 24px;
        }

        .curriculum-container {
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .curriculum-header {
            text-align: center;
            margin-bottom: var(--spacing-lg);
        }

        .curriculum-header h2 {
            color: var(--primary-color);
            font-size: 2rem;
            margin-bottom: var(--spacing-sm);
        }

        .curriculum-header p {
            color: var(--text-light);
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
        }

        .game-board {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-lg);
        }

        .card-deck {
            background: white;
            border-radius: var(--border-radius);
            padding: var(--spacing-lg);
            box-shadow: 0 4px 20px var(--card-shadow);
            border: 1px solid #e0e0e0;
        }

        .deck-title {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: var(--spacing-md);
            color: var(--primary-color);
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: var(--spacing-sm);
        }

        .cards-container {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
            max-height: 400px;
            overflow-y: auto;
        }

        .card {
            background: var(--card-bg);
            border: 2px solid #e0e0e0;
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px var(--card-shadow);
            border-color: var(--accent-color);
        }

        .card.selected {
            border-color: var(--accent-color);
            background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
            color: white;
            transform: scale(1.02);
        }

        .card-category {
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: var(--spacing-sm);
            opacity: 0.7;
        }

        .card-title {
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: var(--spacing-sm);
        }

        .card-description {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        .workspace {
            background: white;
            border-radius: var(--border-radius);
            padding: var(--spacing-lg);
            box-shadow: 0 4px 20px var(--card-shadow);
            border: 1px solid #e0e0e0;
            min-height: 500px;
        }

        .workspace-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: var(--spacing-lg);
            color: var(--primary-color);
            text-align: center;
        }

        .selected-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
        }

        .workspace-card {
            background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
            color: white;
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            position: relative;
        }

        .remove-card {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            color: white;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .remove-card:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .action-buttons {
            display: flex;
            gap: var(--spacing-md);
            justify-content: center;
            margin-top: var(--spacing-lg);
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: var(--border-radius);
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background: var(--primary-color);
            color: white;
        }

        .btn-primary:hover {
            background: #333333;
            transform: translateY(-2px);
        }

        .btn-secondary {
            background: var(--accent-color);
            color: var(--primary-color);
        }

        .btn-secondary:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
        }

        .curriculum-output {
            background: white;
            border-radius: var(--border-radius);
            padding: var(--spacing-lg);
            box-shadow: 0 4px 20px var(--card-shadow);
            border: 1px solid #e0e0e0;
            margin-top: var(--spacing-lg);
            display: none;
        }

        .curriculum-output.visible {
            display: block;
        }

        .output-section {
            margin-bottom: var(--spacing-lg);
        }

        .output-section h3 {
            color: var(--primary-color);
            margin-bottom: var(--spacing-md);
            border-left: 4px solid var(--accent-color);
            padding-left: var(--spacing-md);
        }

        .output-section h4 {
            color: var(--primary-color);
            margin-bottom: var(--spacing-sm);
        }

        .output-section h5 {
            color: var(--text-dark);
            margin-bottom: var(--spacing-sm);
            font-size: 1rem;
        }

        .filter-tabs {
            display: flex;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-md);
            flex-wrap: wrap;
        }

        .filter-tab {
            padding: var(--spacing-sm) var(--spacing-md);
            background: #f0f0f0;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .filter-tab.active {
            background: var(--accent-color);
            color: var(--primary-color);
        }

        .filter-tab:hover {
            background: var(--accent-hover);
            color: var(--primary-color);
        }

        /* Dark mode compatibility */
        [data-md-color-scheme="slate"] .card-deck,
        [data-md-color-scheme="slate"] .workspace,
        [data-md-color-scheme="slate"] .curriculum-output {
            background: var(--md-default-bg-color);
            border-color: var(--md-default-fg-color--lightest);
        }

        [data-md-color-scheme="slate"] .card {
            background: var(--md-default-bg-color);
            border-color: var(--md-default-fg-color--lightest);
            color: var(--md-default-fg-color);
        }

        [data-md-color-scheme="slate"] .deck-title,
        [data-md-color-scheme="slate"] .workspace-title,
        [data-md-color-scheme="slate"] .output-section h3,
        [data-md-color-scheme="slate"] .output-section h4 {
            color: var(--md-default-fg-color);
        }

        @media (max-width: 1024px) {
            .game-board {
                grid-template-columns: 1fr;
                gap: var(--spacing-md);
            }
            
            .cards-container {
                max-height: 200px;
            }
        }

        @media (max-width: 768px) {
            .curriculum-container {
                padding: 0 0.5rem;
            }
            
            .selected-cards {
                grid-template-columns: 1fr;
            }
        }
    </style>

    <div class="curriculum-container">
        <div class="curriculum-header">
            <h2>🎯 Interactive Curriculum Builder</h2>
            <p>Combine course topics, available tools, and pedagogical methodologies to create your perfect learning situation</p>
        </div>

        <div class="game-board">
            <!-- Course Topics Deck -->
            <div class="card-deck">
                <div class="deck-title">📚 Course Topics</div>
                <div class="filter-tabs">
                    <button class="filter-tab active" data-filter="all" data-deck="topics">All</button>
                    <button class="filter-tab" data-filter="ESO" data-deck="topics">ESO</button>
                    <button class="filter-tab" data-filter="FP" data-deck="topics">FP</button>
                </div>
                <div class="cards-container" id="topics-cards"></div>
            </div>

            <!-- Workspace -->
            <div class="workspace">
                <div class="workspace-title">🎲 Your Learning Situation</div>
                <div class="selected-cards" id="selected-cards"></div>
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="clearWorkspace()">🗑️ Clear All</button>
                    <button class="btn btn-primary" onclick="generateCurriculum()">✨ Generate Curriculum</button>
                </div>
            </div>

            <!-- Tools & Methodologies Deck -->
            <div class="card-deck">
                <div class="filter-tabs">
                    <button class="filter-tab active" data-filter="tools" data-deck="resources">🔧 Tools</button>
                    <button class="filter-tab" data-filter="methodologies" data-deck="resources">🎯 Methods</button>
                </div>
                <div class="cards-container" id="resources-cards"></div>
            </div>
        </div>

        <!-- Curriculum Output -->
        <div class="curriculum-output" id="curriculum-output">
            <div class="output-section">
                <h3>📋 Generated Learning Situation</h3>
                <div id="curriculum-content"></div>
            </div>
        </div>
    </div>

    <script>
        // Game data
        const gameData = {
            topics: [
                {
                    id: 'programming-basics',
                    title: 'Programming Fundamentals',
                    category: 'ESO',
                    description: 'Basic programming concepts, variables, loops, and functions'
                },
                {
                    id: 'electronics',
                    title: 'Electronics & Circuits',
                    category: 'ESO',
                    description: 'Understanding electrical components, circuits, and basic electronics'
                },
                {
                    id: '3d-design',
                    title: '3D Design & Modeling',
                    category: 'FP',
                    description: 'CAD software, 3D modeling techniques, and design principles'
                },
                {
                    id: 'robotics',
                    title: 'Robotics & Automation',
                    category: 'FP',
                    description: 'Building and programming robots, sensors, and actuators'
                },
                {
                    id: 'web-development',
                    title: 'Web Development',
                    category: 'FP',
                    description: 'HTML, CSS, JavaScript, and modern web technologies'
                },
                {
                    id: 'sustainability',
                    title: 'Sustainable Technology',
                    category: 'ESO',
                    description: 'Environmental awareness, renewable energy, and eco-design'
                },
                {
                    id: 'ai-basics',
                    title: 'Artificial Intelligence Basics',
                    category: 'FP',
                    description: 'Machine learning concepts, AI applications, and ethics'
                },
                {
                    id: 'digital-fabrication',
                    title: 'Digital Fabrication',
                    category: 'FP',
                    description: 'Laser cutting, 3D printing, CNC machining processes'
                },
                {
                    id: 'mathematics-applied',
                    title: 'Applied Mathematics',
                    category: 'ESO',
                    description: 'Mathematical concepts applied to real-world problems'
                },
                {
                    id: 'physics-mechanics',
                    title: 'Physics & Mechanics',
                    category: 'ESO',
                    description: 'Understanding forces, motion, and mechanical systems'
                }
            ],
            tools: [
                {
                    id: 'arduino',
                    title: 'Arduino',
                    category: 'tools',
                    description: 'Microcontroller platform for interactive projects'
                },
                {
                    id: '3d-printer',
                    title: '3D Printer',
                    category: 'tools',
                    description: 'Create physical objects from digital designs'
                },
                {
                    id: 'laser-cutter',
                    title: 'Laser Cutter',
                    category: 'tools',
                    description: 'Precision cutting and engraving tool'
                },
                {
                    id: 'computers',
                    title: 'Computers/Laptops',
                    category: 'tools',
                    description: 'Programming, design, and research workstations'
                },
                {
                    id: 'sensors',
                    title: 'Various Sensors',
                    category: 'tools',
                    description: 'Temperature, motion, light, and environmental sensors'
                },
                {
                    id: 'hand-tools',
                    title: 'Traditional Hand Tools',
                    category: 'tools',
                    description: 'Screwdrivers, pliers, measuring tools, etc.'
                },
                {
                    id: 'soldering-station',
                    title: 'Soldering Station',
                    category: 'tools',
                    description: 'For electronic component assembly and repair'
                },
                {
                    id: 'multimeter',
                    title: 'Multimeter',
                    category: 'tools',
                    description: 'Measure voltage, current, and resistance'
                }
            ],
            methodologies: [
                {
                    id: 'project-based',
                    title: 'Project-Based Learning',
                    category: 'methodologies',
                    description: 'Students learn through engaging in real-world projects'
                },
                {
                    id: 'design-thinking',
                    title: 'Design Thinking',
                    category: 'methodologies',
                    description: 'Human-centered approach to innovation and problem-solving'
                },
                {
                    id: 'collaborative',
                    title: 'Collaborative Learning',
                    category: 'methodologies',
                    description: 'Students work together in teams to solve challenges'
                },
                {
                    id: 'inquiry-based',
                    title: 'Inquiry-Based Learning',
                    category: 'methodologies',
                    description: 'Students learn through asking questions and investigating'
                },
                {
                    id: 'maker-pedagogy',
                    title: 'Maker Pedagogy',
                    category: 'methodologies',
                    description: 'Learning through making, creating, and hands-on experiences'
                },
                {
                    id: 'flipped-classroom',
                    title: 'Flipped Classroom',
                    category: 'methodologies',
                    description: 'Students explore topics at home and practice in class'
                },
                {
                    id: 'gamification',
                    title: 'Gamification',
                    category: 'methodologies',
                    description: 'Using game elements to enhance learning engagement'
                },
                {
                    id: 'peer-assessment',
                    title: 'Peer Assessment',
                    category: 'methodologies',
                    description: 'Students evaluate and provide feedback on each other\'s work'
                }
            ]
        };

        let selectedCards = new Set();
        let currentFilter = {
            topics: 'all',
            resources: 'tools'
        };

        // Initialize the game
        function initGame() {
            renderCards();
            setupEventListeners();
        }

        function renderCards() {
            renderTopicsCards();
            renderResourcesCards();
        }

        function renderTopicsCards() {
            const container = document.getElementById('topics-cards');
            const filter = currentFilter.topics;
            
            let cards = gameData.topics;
            if (filter !== 'all') {
                cards = cards.filter(card => card.category === filter);
            }

            container.innerHTML = cards.map(card => `
                <div class="card ${selectedCards.has(card.id) ? 'selected' : ''}" 
                     data-card-id="${card.id}" data-deck="topics">
                    <div class="card-category">${card.category}</div>
                    <div class="card-title">${card.title}</div>
                    <div class="card-description">${card.description}</div>
                </div>
            `).join('');
        }

        function renderResourcesCards() {
            const container = document.getElementById('resources-cards');
            const filter = currentFilter.resources;
            
            let cards = filter === 'tools' ? gameData.tools : gameData.methodologies;

            container.innerHTML = cards.map(card => `
                <div class="card ${selectedCards.has(card.id) ? 'selected' : ''}" 
                     data-card-id="${card.id}" data-deck="resources">
                    <div class="card-category">${card.category}</div>
                    <div class="card-title">${card.title}</div>
                    <div class="card-description">${card.description}</div>
                </div>
            `).join('');
        }

        function renderSelectedCards() {
            const container = document.getElementById('selected-cards');
            const allCards = [...gameData.topics, ...gameData.tools, ...gameData.methodologies];
            
            const selectedCardsData = Array.from(selectedCards).map(id => 
                allCards.find(card => card.id === id)
            ).filter(Boolean);

            container.innerHTML = selectedCardsData.map(card => `
                <div class="workspace-card">
                    <button class="remove-card" onclick="removeCard('${card.id}')">×</button>
                    <div class="card-category">${card.category}</div>
                    <div class="card-title">${card.title}</div>
                    <div class="card-description">${card.description}</div>
                </div>
            `).join('');
        }

        function setupEventListeners() {
            // Card selection
            document.addEventListener('click', (e) => {
                if (e.target.closest('.card') && !e.target.closest('.workspace-card') && e.target.closest('#curriculum-app')) {
                    const card = e.target.closest('.card');
                    const cardId = card.dataset.cardId;
                    toggleCard(cardId);
                }
            });

            // Filter tabs
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-tab') && e.target.closest('#curriculum-app')) {
                    const filter = e.target.dataset.filter;
                    const deck = e.target.dataset.deck;
                    
                    // Update active tab
                    e.target.parentNode.querySelectorAll('.filter-tab').forEach(tab => 
                        tab.classList.remove('active')
                    );
                    e.target.classList.add('active');
                    
                    // Update filter and re-render
                    if (deck === 'topics') {
                        currentFilter.topics = filter;
                        renderTopicsCards();
                    } else if (deck === 'resources') {
                        currentFilter.resources = filter;
                        renderResourcesCards();
                    }
                }
            });
        }

        function toggleCard(cardId) {
            if (selectedCards.has(cardId)) {
                selectedCards.delete(cardId);
            } else {
                selectedCards.add(cardId);
            }
            renderCards();
            renderSelectedCards();
        }

        function removeCard(cardId) {
            selectedCards.delete(cardId);
            renderCards();
            renderSelectedCards();
        }

        function clearWorkspace() {
            selectedCards.clear();
            renderCards();
            renderSelectedCards();
            document.getElementById('curriculum-output').classList.remove('visible');
        }

        function generateCurriculum() {
            if (selectedCards.size === 0) {
                alert('Please select at least one card to generate a curriculum!');
                return;
            }

            const allCards = [...gameData.topics, ...gameData.tools, ...gameData.methodologies];
            const selectedCardsData = Array.from(selectedCards).map(id => 
                allCards.find(card => card.id === id)
            ).filter(Boolean);

            const topics = selectedCardsData.filter(card => gameData.topics.includes(card));
            const tools = selectedCardsData.filter(card => gameData.tools.includes(card));
            const methodologies = selectedCardsData.filter(card => gameData.methodologies.includes(card));

            let curriculumContent = `
                <div class="output-section">
                    <h4>🎯 Learning Objectives</h4>
                    <p>Based on your selected cards, this learning situation will help students:</p>
                    <ul>
                        ${topics.map(topic => `<li>Understand and apply ${topic.title.toLowerCase()}</li>`).join('')}
                        ${tools.length > 0 ? `<li>Gain hands-on experience with ${tools.map(t => t.title).join(', ')}</li>` : ''}
                        ${methodologies.length > 0 ? `<li>Develop skills through ${methodologies.map(m => m.title).join(', ')}</li>` : ''}
                    </ul>
                </div>

                <div class="output-section">
                    <h4>🔧 Required Resources</h4>
                    ${tools.length > 0 ? `
                        <h5>Tools & Equipment:</h5>
                        <ul>${tools.map(tool => `<li><strong>${tool.title}</strong>: ${tool.description}</li>`).join('')}</ul>
                    ` : '<p>No specific tools selected - consider adding some from the tools deck!</p>'}
                </div>

                <div class="output-section">
                    <h4>📚 Pedagogical Approach</h4>
                    ${methodologies.length > 0 ? `
                        <ul>${methodologies.map(method => `<li><strong>${method.title}</strong>: ${method.description}</li>`).join('')}</ul>
                    ` : '<p>No methodologies selected - consider adding some pedagogical approaches!</p>'}
                </div>

                <div class="output-section">
                    <h4>💡 Suggested Project Ideas</h4>
                    ${generateProjectIdeas(selectedCardsData)}
                </div>

                <div class="output-section">
                    <h4>📊 Assessment Strategies</h4>
                    ${generateAssessmentStrategies(selectedCardsData)}
                </div>

                <div class="output-section">
                    <h4>⏱️ Estimated Timeline</h4>
                    ${generateTimeline(selectedCardsData)}
                </div>
            `;

            document.getElementById('curriculum-content').innerHTML = curriculumContent;
            document.getElementById('curriculum-output').classList.add('visible');
            
            // Scroll to output
            document.getElementById('curriculum-output').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }

        function generateProjectIdeas(cards) {
            const topics = cards.filter(card => gameData.topics.includes(card));
            const tools = cards.filter(card => gameData.tools.includes(card));
            
            const ideas = [];
            
            if (topics.some(t => t.id === 'programming-basics') && tools.some(t => t.id === 'arduino')) {
                ideas.push("Create an interactive LED display that responds to environmental sensors");
            }
            
            if (topics.some(t => t.id === '3d-design') && tools.some(t => t.id === '3d-printer')) {
                ideas.push("Design and print a functional object that solves a real-world problem");
            }
            
            if (topics.some(t => t.id === 'sustainability') && tools.some(t => t.id === 'sensors')) {
                ideas.push("Build an environmental monitoring system for your school");
            }
            
            if (topics.some(t => t.id === 'robotics') && tools.some(t => t.id === 'arduino')) {
                ideas.push("Develop an autonomous robot that can navigate obstacles");
            }
            
            if (topics.some(t => t.id === 'web-development') && tools.some(t => t.id === 'computers')) {
                ideas.push("Create a web application to control IoT devices in your classroom");
            }

            if (topics.some(t => t.id === 'mathematics-applied') && tools.some(t => t.id === '3d-printer')) {
                ideas.push("Design and print geometric models to visualize mathematical concepts");
            }
            
            if (ideas.length === 0) {
                ideas.push("Design a creative project that combines your selected topics and available tools");
                ideas.push("Develop a solution to a problem in your local community");
                ideas.push("Create an educational tool to teach others about your chosen topics");
            }
            
            return `<ul>${ideas.map(idea => `<li>${idea}</li>`).join('')}</ul>`;
        }

        function generateAssessmentStrategies(cards) {
            const methodologies = cards.filter(card => gameData.methodologies.includes(card));
            
            let strategies = [];
            
            if (methodologies.some(m => m.id === 'project-based')) {
                strategies.push("Portfolio assessment tracking project development stages");
                strategies.push("Peer evaluation of final project presentations");
            }
            
            if (methodologies.some(m => m.id === 'collaborative')) {
                strategies.push("Team reflection journals documenting collaboration process");
                strategies.push("Individual contributions assessment within group work");
            }
            
            if (methodologies.some(m => m.id === 'design-thinking')) {
                strategies.push("Documentation of design process from empathy to testing");
                strategies.push("Critique sessions for iterative design improvements");
            }

            if (methodologies.some(m => m.id === 'peer-assessment')) {
                strategies.push("Structured peer feedback forms for project milestones");
                strategies.push("Peer mentoring assignments between students");
            }
            
            if (strategies.length === 0) {
                strategies = [
                    "Formative assessment through regular check-ins and progress reviews",
                    "Practical demonstration of skills and knowledge application",
                    "Self-reflection on learning process and outcomes",
                    "Creative presentation of final learning products"
                ];
            } else {
                phases = [
                    "<strong>Week 1:</strong> Introduction and Setup - Introduce concepts and prepare materials",
                    "<strong>Week 2-3:</strong> Learning and Practice - Skill development and guided exercises",
                    "<strong>Week 4-5:</strong> Application and Creation - Independent work on projects",
                    "<strong>Week 6:</strong> Evaluation and Showcase - Assessment and sharing results"
                ];
            }
            
            if (topics.length > 3) {
                duration = "6-8 weeks";
            }
            
            return `
                <p><strong>Estimated Duration:</strong> ${duration}</p>
                <ul>${phases.map(phase => `<li>${phase}</li>`).join('')}</ul>
            `;
        }

        // Initialize the game when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Only initialize if we're on the curriculum page
            if (document.getElementById('curriculum-app')) {
                initGame();
            }
        });
    </script>
</div>

---

## Features of This Curriculum Builder

!!! success "Smart Curriculum Generation"
    - **Contextual Project Suggestions**: The system analyzes your card combinations to suggest relevant, practical projects
    - **Assessment Alignment**: Automatically generates assessment strategies that match your chosen pedagogical methods
    - **Resource Planning**: Lists exactly what tools and equipment you'll need based on your selections
    - **Timeline Estimation**: Provides realistic timeframes based on complexity and chosen methodologies

!!! info "Expandable Card Database"
    The current card set includes:
    
    **📚 Course Topics (10 cards)**
    - ESO: Programming, Electronics, Sustainability, Applied Mathematics, Physics
    - FP: 3D Design, Robotics, Web Development, AI Basics, Digital Fabrication
    
    **🔧 Tools (8 cards)**
    - Arduino, 3D Printer, Laser Cutter, Computers, Sensors, Hand Tools, Soldering Station, Multimeter
    
    **🎯 Methodologies (8 cards)**
    - Project-Based Learning, Design Thinking, Collaborative Learning, Inquiry-Based Learning, Maker Pedagogy, Flipped Classroom, Gamification, Peer Assessment

## How to Expand and Customize

Want to add your own cards or modify the content? Here's how:

=== "Adding New Course Topics"
    
    Add entries to the `gameData.topics` array in the JavaScript section:
    
    ```javascript
    {
        id: 'your-topic-id',
        title: 'Your Topic Name',
        category: 'ESO', // or 'FP'
        description: 'Brief description of what students will learn'
    }
    ```

=== "Adding New Tools"
    
    Add entries to the `gameData.tools` array:
    
    ```javascript
    {
        id: 'your-tool-id',
        title: 'Tool Name',
        category: 'tools',
        description: 'What this tool is used for'
    }
    ```

=== "Adding New Methodologies"
    
    Add entries to the `gameData.methodologies` array:
    
    ```javascript
    {
        id: 'your-method-id',
        title: 'Methodology Name',
        category: 'methodologies',
        description: 'How this teaching method works'
    }
    ```

=== "Customizing Project Logic"
    
    Modify the `generateProjectIdeas()` function to add custom project combinations:
    
    ```javascript
    if (topics.some(t => t.id === 'your-topic') && tools.some(t => t.id === 'your-tool')) {
        ideas.push("Your custom project idea here");
    }
    ```

## Future Enhancements

This curriculum builder can be extended with:

- **💾 Save/Export functionality** - Export generated curricula as PDF or markdown files
- **👥 Community sharing** - Share successful card combinations with other teachers
- **🎨 Custom card creation** - Allow teachers to create their own topic/tool/methodology cards
- **📊 Analytics** - Track which combinations work best for different student groups
- **🌍 Localization** - Adapt cards for different educational systems and languages
- **⚡ Real-time collaboration** - Multiple teachers working on curricula together

## Getting Started

1. **Explore the Cards**: Click through the different categories to see what's available
2. **Start Simple**: Begin with 2-3 cards to see how the system works
3. **Experiment**: Try different combinations to see how projects and assessments change
4. **Iterate**: Use the generated curriculum as a starting point and refine based on your students' needs

!!! tip "Pro Tips for Better Curricula"
    - **Balance is key**: Include at least one card from each category (topic, tool, methodology)
    - **Match complexity**: ESO topics work well with simpler tools and more guided methodologies
    - **Consider resources**: Only select tools you actually have access to in your lab
    - **Think progression**: Start with foundational topics before moving to advanced ones
            }
            
            return `<ul>${strategies.map(strategy => `<li>${strategy}</li>`).join('')}</ul>`;
        }

        function generateTimeline(cards) {
            const topics = cards.filter(card => gameData.topics.includes(card));
            const methodologies = cards.filter(card => gameData.methodologies.includes(card));
            
            let duration = "4-6 weeks";
            let phases = [];
            
            if (methodologies.some(m => m.id === 'design-thinking')) {
                phases = [
                    "<strong>Week 1:</strong> Empathize and Define - Research and problem identification",
                    "<strong>Week 2-3:</strong> Ideate and Prototype - Brainstorming and initial creation",
                    "<strong>Week 4-5:</strong> Build and Test - Development and iteration",
                    "<strong>Week 6:</strong> Present and Reflect - Final presentations and evaluation"
                ];
            } else if (methodologies.some(m => m.id === 'project-based')) {
                phases = [
                    "<strong>Week 1:</strong> Project Planning - Goals, resources, and team formation",
                    "<strong>Week 2-4:</strong> Development Phase - Active project work and progress reviews",
                    "<strong>Week 5:</strong> Integration and Testing - Combining components and debugging",
                    "<strong>Week 6:</strong> Presentation and Documentation - Final delivery and reflection"
                ];