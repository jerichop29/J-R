document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch data from API
        const [aboutRes, skillsRes, projectsRes, teamRes] = await Promise.all([
            fetch("http://localhost:5000/api/about"),
            fetch("http://localhost:5000/api/skill"),
            fetch("http://localhost:5000/api/project"),
            fetch("http://localhost:5000/api/team")
        ]);

        const aboutData = await aboutRes.json();
        const skillsData = await skillsRes.json();
        const projectsData = await projectsRes.json();
        const teamData = await teamRes.json();

        // Update About Section (unchanged)
        if (aboutData) {
            document.getElementById("about-title").textContent = aboutData.title || '';
            document.getElementById("about-description").textContent = aboutData.description || '';

            if (aboutData.cv) {
                const cvButton = document.querySelector(".about-cv");
                cvButton.style.display = "inline-block";
                cvButton.addEventListener("click", () => {
                    const blob = new Blob([new Uint8Array(aboutData.cv.data)], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                });
            }
        }

        // Update Skill Section - modified for multiple skills
        const skillsContainer = document.querySelector("#skill .row");
        if (skillsData && Array.isArray(skillsData)) {
            skillsContainer.innerHTML = ''; // Clear the template
            
            skillsData.forEach(skill => {
                const skillCol = document.createElement("div");
                skillCol.className = "col-md-6 col-lg-3 mb-4";
                skillCol.innerHTML = `
                    <div class="skill-card">
                        <div class="body">
                            <img src="${skill.icon || ''}" alt="${skill.title || 'Skill'}" class="icon">
                            <h6 class="title">${skill.title || ''}</h6>
                            <p class="subtitle">${skill.description || ''}</p>
                        </div>
                    </div>
                `;
                skillsContainer.appendChild(skillCol);
            });
        }

        // Update Project Section - modified for multiple projects
        const projectsContainer = document.querySelector("#projects .row");
        if (projectsData && Array.isArray(projectsData)) {
            projectsContainer.innerHTML = ''; // Clear the template
            
            projectsData.forEach(project => {
                const projectCol = document.createElement("div");
                projectCol.className = "col-md-4 mb-4";
                projectCol.innerHTML = `
                    <a href="${project.link || '#'}" class="projects-card">
                        <img src="${project.image || ''}" class="projects-card-img" alt="${project.title || 'Project'}">    
                        <span class="projects-card-overlay">
                            <span class="projects-card-caption">
                                <h4>${project.title || ''}</h4>
                                <p class="font-weight-normal">${project.description || ''}</p>
                            </span>                         
                        </span>                     
                    </a>
                `;
                projectsContainer.appendChild(projectCol);
            });
        }

        // Update Team Section - modified for multiple team members
        const teamContainer = document.querySelector("#team .row");
        if (teamData && Array.isArray(teamData)) {
            teamContainer.innerHTML = ''; // Clear the template
            
            teamData.forEach(member => {
                const memberCol = document.createElement("div");
                memberCol.className = "col-md-6";
                memberCol.innerHTML = `
                    <div class="team-card">
                        <div class="team-card-img-holder">
                            <img src="${member.avatar || ''}" class="team-card-img" alt="${member.name || 'Team member'}">                           
                        </div>
                        <div class="team-card-body">
                            <p class="team-card-subtitle">${member.position || ''}</p>
                            <h6 class="team-card-title">${member.name || ''}</h6>
                            <p class="team-card-description">${member.description || ''}</p>
                        </div>
                    </div>
                `;
                teamContainer.appendChild(memberCol);
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});