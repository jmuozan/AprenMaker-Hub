# Curriculum Builder (Protected)

This page demonstrates the authentication system for educators.

<div id="curriculum-app">
    <div class="curriculum-builder-content">
        <h2>🎓 AprenMaker Curriculum Builder</h2>
        <p>Create personalized learning experiences for your students using our interactive curriculum generation tool.</p>
        
        <div class="curriculum-features">
            <div class="feature-card">
                <div class="feature-icon">🔧</div>
                <div class="feature-info">
                    <h3>Tool-Based Learning</h3>
                    <p>Select from available fabrication tools in your classroom</p>
                </div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📚</div>
                <div class="feature-info">
                    <h3>Curriculum Alignment</h3>
                    <p>Aligned with ESO and FP educational standards</p>
                </div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <div class="feature-info">
                    <h3>Personalized Content</h3>
                    <p>Adapted to your teaching style and student needs</p>
                </div>
            </div>
        </div>
        
        <div class="demo-curriculum-builder">
            <h3>Demo Curriculum Components</h3>
            <div class="curriculum-cards">
                <div class="curriculum-card" data-card-id="arduino">
                    <h4>🔌 Arduino Programming</h4>
                    <p>Introduction to microcontroller programming and basic electronics.</p>
                </div>
                
                <div class="curriculum-card" data-card-id="3d-printing">
                    <h4>🖨️ 3D Design & Printing</h4>
                    <p>Learn 3D modeling and additive manufacturing fundamentals.</p>
                </div>
                
                <div class="curriculum-card" data-card-id="design-thinking">
                    <h4>💡 Design Thinking</h4>
                    <p>Problem-solving methodology for creative innovation.</p>
                </div>
                
                <div class="curriculum-card" data-card-id="sustainability">
                    <h4>🌱 Sustainable Technology</h4>
                    <p>Explore eco-friendly design and renewable energy concepts.</p>
                </div>
            </div>
            
            <div class="curriculum-actions">
                <button class="btn btn-primary" onclick="generateDemo()">
                    📄 Generate Demo Curriculum
                </button>
                <button class="btn btn-secondary" onclick="saveDemoWork()">
                    💾 Save Work
                </button>
            </div>
            
            <div id="curriculum-output" class="curriculum-output" style="display: none;">
                <h3>Generated Curriculum Preview</h3>
                <div class="curriculum-preview">
                    <p><em>Your personalized curriculum will appear here...</em></p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.curriculum-builder-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: var(--nimbus-font);
}

.curriculum-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.feature-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(216, 235, 0, 0.05);
    border: 1px solid rgba(216, 235, 0, 0.2);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.feature-card:hover {
    background: rgba(216, 235, 0, 0.1);
    transform: translateY(-2px);
}

.feature-icon {
    font-size: 2rem;
    flex-shrink: 0;
}

.feature-info h3 {
    margin: 0 0 0.5rem 0;
    color: var(--md-primary-fg-color);
    font-size: 1.1rem;
}

.feature-info p {
    margin: 0;
    color: var(--md-default-fg-color--light);
    font-size: 0.9rem;
}

.demo-curriculum-builder {
    background: rgba(216, 235, 0, 0.03);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(216, 235, 0, 0.1);
    margin-top: 2rem;
}

.curriculum-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
}

.curriculum-card {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.curriculum-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(216, 235, 0, 0.15);
    border-color: #d8eb00;
}

.curriculum-card.selected {
    background: rgba(216, 235, 0, 0.1);
    border-color: #d8eb00;
}

.curriculum-card h4 {
    margin: 0 0 0.5rem 0;
    color: var(--md-primary-fg-color);
    font-size: 1rem;
}

.curriculum-card p {
    margin: 0;
    color: var(--md-default-fg-color--light);
    font-size: 0.85rem;
    line-height: 1.4;
}

.curriculum-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: var(--nimbus-font);
}

.btn-primary {
    background: var(--md-primary-fg-color);
    color: white;
}

.btn-primary:hover {
    background: #333;
    transform: translateY(-2px);
}

.btn-secondary {
    background: #d8eb00;
    color: var(--md-primary-fg-color);
}

.btn-secondary:hover {
    background: #c4d400;
    transform: translateY(-2px);
}

.curriculum-output {
    margin-top: 2rem;
    padding: 2rem;
    background: rgba(216, 235, 0, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(216, 235, 0, 0.2);
}

.curriculum-preview {
    background: white;
    padding: 1.5rem;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
}

/* Dark mode adjustments */
[data-md-color-scheme="slate"] .curriculum-card {
    background: var(--md-default-bg-color);
    border-color: var(--md-default-fg-color--lightest);
}

[data-md-color-scheme="slate"] .curriculum-preview {
    background: var(--md-default-bg-color);
    border-color: var(--md-default-fg-color--lightest);
}

/* Responsive design */
@media (max-width: 768px) {
    .curriculum-builder-content {
        padding: 1rem;
    }
    
    .curriculum-actions {
        flex-direction: column;
        align-items: stretch;
    }
    
    .curriculum-cards {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
// Demo curriculum builder functionality
let selectedCards = new Set();

// Initialize card selection
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.curriculum-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.dataset.cardId;
            
            if (selectedCards.has(cardId)) {
                selectedCards.delete(cardId);
                card.classList.remove('selected');
            } else {
                selectedCards.add(cardId);
                card.classList.add('selected');
            }
        });
    });
});

// Demo curriculum generation
function generateDemo() {
    const outputDiv = document.getElementById('curriculum-output');
    const previewDiv = outputDiv.querySelector('.curriculum-preview');
    
    if (selectedCards.size === 0) {
        alert('Please select at least one curriculum component!');
        return;
    }
    
    // Check if user is authenticated
    if (window.educatorAuth && !window.educatorAuth.isAuthenticated()) {
        if (window.authUI) {
            window.authUI.showLogin();
        } else {
            alert('Please login to generate curricula!');
        }
        return;
    }
    
    const selectedArray = Array.from(selectedCards);
    
    // Generate demo curriculum content
    const curriculumContent = generateDemoCurriculum(selectedArray);
    
    previewDiv.innerHTML = curriculumContent;
    outputDiv.style.display = 'block';
    
    // Log the event if auth system is available
    if (window.educatorAuth) {
        window.educatorAuth.logEvent('demo_curriculum_generated', {
            selectedCards: selectedArray,
            cardCount: selectedArray.length
        });
    }
    
    // Show success message
    if (window.authUI) {
        window.authUI.showNotification('Demo curriculum generated successfully!', 'success');
    }
}

// Save demo work
function saveDemoWork() {
    if (!window.educatorAuth || !window.educatorAuth.isAuthenticated()) {
        if (window.authUI) {
            window.authUI.showLogin();
        } else {
            alert('Please login to save your work!');
        }
        return;
    }
    
    if (selectedCards.size === 0) {
        alert('Please select some curriculum components first!');
        return;
    }
    
    // Demo save functionality
    const workData = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        selectedCards: Array.from(selectedCards),
        type: 'demo_curriculum'
    };
    
    // Save to localStorage
    const savedWork = JSON.parse(localStorage.getItem('demo_curricula') || '[]');
    savedWork.push(workData);
    localStorage.setItem('demo_curricula', JSON.stringify(savedWork));
    
    // Log the event
    window.educatorAuth.logEvent('demo_work_saved', {
        workId: workData.id,
        cardCount: selectedCards.size
    });
    
    // Show success message
    if (window.authUI) {
        window.authUI.showNotification('Demo work saved successfully!', 'success');
    }
}

// Generate demo curriculum content
function generateDemoCurriculum(selectedCards) {
    const cardDescriptions = {
        'arduino': {
            title: 'Arduino Programming Module',
            duration: '4 weeks',
            objectives: ['Understand basic electronics', 'Learn Arduino IDE', 'Create interactive projects'],
            activities: ['LED control circuits', 'Sensor reading projects', 'Simple automation systems']
        },
        '3d-printing': {
            title: '3D Design & Printing Module',
            duration: '3 weeks', 
            objectives: ['Learn 3D modeling basics', 'Understand printing processes', 'Design for manufacturing'],
            activities: ['CAD modeling exercises', 'Print parameter optimization', 'Functional part design']
        },
        'design-thinking': {
            title: 'Design Thinking Methodology',
            duration: '2 weeks',
            objectives: ['Apply design thinking process', 'Develop empathy skills', 'Create user-centered solutions'],
            activities: ['User research sessions', 'Ideation workshops', 'Prototype testing']
        },
        'sustainability': {
            title: 'Sustainable Technology Module',
            duration: '3 weeks',
            objectives: ['Understand environmental impact', 'Explore renewable energy', 'Design eco-friendly solutions'],
            activities: ['Solar panel experiments', 'Recycling projects', 'Energy efficiency analysis']
        }
    };
    
    let content = '<div class="generated-curriculum">';
    content += '<h4>🎯 Generated Curriculum Plan</h4>';
    content += `<p><strong>Selected Components:</strong> ${selectedCards.length}</p>`;
    
    const totalWeeks = selectedCards.reduce((total, cardId) => {
        const weeks = parseInt(cardDescriptions[cardId]?.duration?.match(/\d+/)?.[0] || '1');
        return total + weeks;
    }, 0);
    
    content += `<p><strong>Total Duration:</strong> ${totalWeeks} weeks</p>`;
    content += '<div class="curriculum-modules">';
    
    selectedCards.forEach((cardId, index) => {
        const module = cardDescriptions[cardId];
        if (module) {
            content += `
                <div class="module-section">
                    <h5>Module ${index + 1}: ${module.title}</h5>
                    <p><strong>Duration:</strong> ${module.duration}</p>
                    
                    <div class="module-objectives">
                        <strong>Learning Objectives:</strong>
                        <ul>
                            ${module.objectives.map(obj => `<li>${obj}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="module-activities">
                        <strong>Key Activities:</strong>
                        <ul>
                            ${module.activities.map(activity => `<li>${activity}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
    });
    
    content += '</div>';
    
    if (window.educatorAuth && window.educatorAuth.isAuthenticated()) {
        const educator = window.educatorAuth.getEducator();
        content += `
            <div class="curriculum-footer">
                <hr>
                <p><small>Generated for: <strong>${educator.name}</strong> (${educator.role})</small></p>
                <p><small>School: ${educator.school}</small></p>
                <p><small>Generated on: ${new Date().toLocaleString()}</small></p>
            </div>
        `;
    }
    
    content += '</div>';
    return content;
}
</script>