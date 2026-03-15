const fs = require('fs');
let content = fs.readFileSync('fullStack.html', 'utf8');

const newHero = `
    <!-- Hero -->
    <section class="roadmap-hero">
        <h1 class="main-title">Full Stack Web Development</h1>
        <p class="subtitle">Complete 24-Week Cohort Journey</p>
    </section>
`;

const newTimeline = `
    <!-- Timeline -->
    <div class="timeline-container">
        <div class="timeline-line"></div>
        <div class="timeline-progress"></div>

        <!-- Week 0 -->
        <div class="level-card card left-card card-l0">
            <div class="beacon"></div>
            <div class="level-header">
                 <div>
                    <span class="level-number" style="background: var(--l0); color: black;">Week 0</span>
                </div>
                <h2 class="level-title" style="background: linear-gradient(to right, #fff, var(--l0)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Kickoff & Onboarding</h2>
            </div>
            
            <div class="sub-section">
                <p style="color: var(--text-muted); line-height: 1.6; font-size: 1.05rem;">
                    Program introduction, setting up development environments, understanding modalities, and preparing for the 24-week journey.
                </p>
            </div>
             <div class="skills-grid">
                <span class="skill-tag"><i class="fas fa-rocket tag-icon"></i> Orientation</span>
                <span class="skill-tag"><i class="fas fa-tools tag-icon"></i> Environment Setup</span>
            </div>
        </div>

        <!-- M1: Week 1-3 -->
        <div class="level-card card right-card card-l1">
            <div class="beacon"></div>
            <div class="level-header">
                <div>
                    <span class="level-number" style="background: var(--l1); color: black;">Week 1-3 • Milestone 1</span>
                </div>
                <h2 class="level-title" style="background: linear-gradient(to right, #fff, var(--l1)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Web Foundation</h2>
            </div>
            
            <div class="sub-section">
                <p style="color: var(--text-muted); line-height: 1.6; font-size: 1.05rem;">
                    Learn HTML & CSS to build structured, styled, and responsive web pages with layouts, forms, Flexbox, animations, and modern design principles.
                </p>
            </div>
            <div class="skills-grid">
                <span class="skill-tag"><i class="fab fa-html5 tag-icon"></i> HTML5</span>
                <span class="skill-tag"><i class="fab fa-css3-alt tag-icon"></i> CSS3</span>
                <span class="skill-tag"><i class="fas fa-border-all tag-icon"></i> Flexbox & Grid</span>
                <span class="skill-tag"><i class="fas fa-mobile-alt tag-icon"></i> Responsive Design</span>
            </div>
        </div>

        <!-- M2: Week 4-8 -->
        <div class="level-card card left-card card-l2">
            <div class="beacon"></div>
            <div class="level-header">
               <div>
                    <span class="level-number" style="background: var(--l2); color: black;">Week 4-8 • Milestone 2</span>
                </div>
                <h2 class="level-title" style="background: linear-gradient(to right, #fff, var(--l2)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Core Frontend Dev</h2>
            </div>
            
            <div class="sub-section">
                <p style="color: var(--text-muted); line-height: 1.6; font-size: 1.05rem;">
                    Master JavaScript, DOM, events, local storage, Bootstrap, and responsive design while converting Figma designs into functional, interactive websites.
                </p>
            </div>
            <div class="skills-grid">
                <span class="skill-tag"><i class="fab fa-js tag-icon"></i> JavaScript ES6+</span>
                <span class="skill-tag"><i class="fas fa-sitemap tag-icon"></i> DOM Manipulation</span>
                <span class="skill-tag"><i class="fab fa-bootstrap tag-icon"></i> Bootstrap</span>
                <span class="skill-tag star"><i class="fab fa-figma tag-icon"></i> Figma to HTML</span>
            </div>
        </div>

        <!-- M3: Week 9-12 -->
        <div class="level-card card right-card card-l3">
            <div class="beacon"></div>
            <div class="level-header">
                <div>
                    <span class="level-number" style="background: var(--l3); color: black;">Week 9-12 • Milestone 3</span>
                </div>
                <h2 class="level-title" style="background: linear-gradient(to right, #fff, var(--l3)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Modern Frontend with React</h2>
            </div>

            <div class="sub-section">
                <p style="color: var(--text-muted); line-height: 1.6; font-size: 1.05rem;">
                   Build dynamic web apps using React, Redux, and Next.js with API handling, routing, and real-world eCommerce projects.
                </p>
            </div>
            <div class="skills-grid">
                <span class="skill-tag star"><i class="fab fa-react tag-icon"></i> React.js</span>
                <span class="skill-tag"><i class="fas fa-project-diagram tag-icon"></i> Redux</span>
                <span class="skill-tag"><i class="fas fa-bolt tag-icon"></i> Next.js</span>
                <span class="skill-tag"><i class="fas fa-network-wired tag-icon"></i> API Integration</span>
            </div>
        </div>

        <!-- M4: Week 13-17 -->
        <div class="level-card card left-card card-l4">
            <div class="beacon"></div>
            <div class="level-header">
                <div>
                    <span class="level-number" style="background: var(--l4); color: black;">Week 13-17 • Milestone 4</span>
                </div>
                <h2 class="level-title" style="background: linear-gradient(to right, #fff, var(--l4)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Backend (Node, GenAI)</h2>
            </div>

            <div class="sub-section">
                <p style="color: var(--text-muted); line-height: 1.6; font-size: 1.05rem;">
                   Build scalable backend systems with Node, Express, and MongoDB, complete with eCommerce admin panel, payment gateway integration, and integrate AI into web apps.
                </p>
            </div>
            <div class="skills-grid">
                <span class="skill-tag"><i class="fab fa-node-js tag-icon"></i> Node.js & Express</span>
                <span class="skill-tag"><i class="fas fa-leaf tag-icon"></i> MongoDB</span>
                <span class="skill-tag star"><i class="fas fa-brain tag-icon"></i> Generative AI</span>
                <span class="skill-tag"><i class="fas fa-credit-card tag-icon"></i> Payment Gateways</span>
            </div>
        </div>

        <!-- M5: Week 18-19 -->
        <div class="level-card card right-card card-l5">
            <div class="beacon"></div>
            <div class="level-header">
               <div>
                    <span class="level-number" style="background: var(--l5); color: black;">Week 18-19 • Milestone 5</span>
                </div>
                <h2 class="level-title" style="background: linear-gradient(to right, #fff, var(--l5)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Programming with Python</h2>
            </div>

            <div class="sub-section">
                <p style="color: var(--text-muted); line-height: 1.6; font-size: 1.05rem;">
                    Understand core Python programming, data structures, functions, and OOPs to write clean, scalable, and modular code.
                </p>
            </div>
            <div class="skills-grid">
                <span class="skill-tag star"><i class="fab fa-python tag-icon"></i> Python Core</span>
                <span class="skill-tag"><i class="fas fa-cubes tag-icon"></i> OOPs</span>
                <span class="skill-tag"><i class="fas fa-link tag-icon"></i> Modular Code</span>
            </div>
        </div>

        <!-- M6: Week 20-24 -->
        <div class="level-card card left-card card-l6">
            <div class="beacon"></div>
            <div class="level-header">
                <div>
                    <span class="level-number" style="background: var(--l6); color: black;">Week 20-24 • Milestone 6</span>
                </div>
                <h2 class="level-title" style="background: linear-gradient(to right, #fff, var(--l6)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Data Structures & Algorithms</h2>
            </div>
            
            <div class="sub-section">
                <p style="color: var(--text-muted); line-height: 1.6; font-size: 1.05rem;">
                   Solve problems using arrays, recursion, trees, graphs, and dynamic programming while optimizing for time and space.
                </p>
            </div>
            <div class="skills-grid">
                <span class="skill-tag"><i class="fas fa-layer-group tag-icon"></i> Arrays & Linked Lists</span>
                <span class="skill-tag"><i class="fas fa-project-diagram tag-icon"></i> Trees & Graphs</span>
                <span class="skill-tag star"><i class="fas fa-brain tag-icon"></i> Dynamic Programming</span>
                <span class="skill-tag"><i class="fas fa-stopwatch tag-icon"></i> Time Complexity</span>
            </div>
        </div>

        <!-- Capstone -->
        <div class="level-card card right-card card-l7" style="margin-bottom: 2rem;">
            <div class="beacon"></div>
            <div class="level-header">
                <div>
                    <span class="level-number" style="background: var(--l7); color: black;">Program Runway</span>
                </div>
                <h2 class="level-title" style="background: linear-gradient(to right, #fff, var(--l7)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Capstone Project</h2>
            </div>

            <div class="sub-section">
                <p style="color: var(--text-muted); line-height: 1.6; font-size: 1.05rem;">
                    Applying all the skills learned to build, test, and deploy a comprehensive, real-world Full Stack application from scratch.
                </p>
            </div>
            <div class="skills-grid">
                <span class="skill-tag"><i class="fas fa-rocket tag-icon"></i> Deployment</span>
                <span class="skill-tag"><i class="fas fa-shield-alt tag-icon"></i> Security</span>
                <span class="skill-tag"><i class="fas fa-star tag-icon"></i> Portfolio Ready</span>
            </div>
        </div>

    </div>
`;

content = content.replace(/<!-- Hero -->[\s\S]*?<\/section>/, newHero);
content = content.replace(/<!-- Timeline -->[\s\S]*?<!-- Footer -->/i, newTimeline + '\n\n    <!-- Footer -->');

fs.writeFileSync('fullStack.html', content);
console.log('Replaced hero and timeline sections.');
