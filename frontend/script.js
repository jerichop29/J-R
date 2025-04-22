document.addEventListener("DOMContentLoaded", async () => {
  try {
    // ========== Add PDF Modal HTML ==========
    const pdfModalHTML = `
      <div class="modal fade" id="pdfModal" tabindex="-1">
          <div class="modal-dialog modal-xl modal-dialog-centered">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">CV Preview</h5>
                  </div>
                  <div class="modal-body position-relative">
                      <div class="pdf-loading text-center py-5">
                          <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div>
                          <p class="mt-3">Loading CV...</p>
                      </div>
                      <iframe id="pdfViewer" class="w-100" style="height: 70vh; display: none;"></iframe>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="manualCloseModal">Close</button>
                      <a id="pdfDownload" class="btn btn-primary" download>
                          <i class="bi bi-download"></i> Download CV
                      </a>
                  </div>
              </div>
          </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", pdfModalHTML);

    // ========== Initialize Modal ==========
    const pdfModal = new bootstrap.Modal(document.getElementById("pdfModal")); 
    const closeModalBtn = document.getElementById("manualCloseModal");
    const pdfViewer = document.getElementById("pdfViewer");
    const loadingSpinner = document.querySelector(".pdf-loading");
    
    // ========== Manual Modal Close ==========
    closeModalBtn.addEventListener("click", () => {
      pdfModal.hide();
    });


    // ========== Original Fetch Code ==========
    const [aboutRes, skillsRes, projectsRes, teamRes] = await Promise.all([
      fetch("http://localhost:5000/api/about"),
      fetch("http://localhost:5000/api/skill"),
      fetch("http://localhost:5000/api/project"),
      fetch("http://localhost:5000/api/team"),
    ]);

    const aboutData = await aboutRes.json();
    const skillsData = await skillsRes.json();
    const projectsData = await projectsRes.json();
    const teamData = await teamRes.json();

    
    // ========== Modified About Section ==========
    if (aboutData?.data) {
      document.getElementById("about-title").textContent =
        aboutData.data.title || "";
      document.getElementById("about-description").textContent =
        aboutData.data.description || "";

      const cvButton = document.querySelector(".about-cv");
      if (aboutData.data.cv) {
        const cvPath = aboutData.data.cv.replace(/\\/g, "/");
        const cvUrl = `http://127.0.0.1:5500/backend${cvPath}`;

        cvButton.style.display = "inline-block";
        cvButton.addEventListener("click", (e) => {
          e.preventDefault();

          // Show loading state
          pdfViewer.style.display = "none";
          loadingSpinner.style.display = "block";
          document.getElementById("pdfDownload").href = cvUrl;

          // Load PDF
          pdfViewer.src = cvUrl;
          pdfViewer.onload = () => {
            loadingSpinner.style.display = "none";
            pdfViewer.style.display = "block";
          };

          pdfModal.show();
        });
      } else {
        cvButton.style.display = "none";
      }
    }

    // ========== Original Skills Section ==========
    if (skillsData) {
      const skillContainer = document.getElementById("skill-container");
      skillContainer.innerHTML = "";
      const skillsArray = Array.isArray(skillsData) ? skillsData : [skillsData];

      skillsArray.forEach((skill) => {
        const iconSrc = getImagePath(skill.icon, "assets/img/pencil-case.svg");

        const skillCol = document.createElement("div");
        skillCol.className = "col-md-6 col-lg-3";
        skillCol.innerHTML = `
                  <div class="skill-card">
                      <div class="body">
                          <img src="${iconSrc}" alt="${
          skill.title || "Skill"
        }" class="icon" 
                              onerror="this.src='assets/img/pencil-case.svg'">
                          <h6 class="title">${skill.title || "Skill Title"}</h6>
                          <p class="subtitle">${
                            skill.description || "Skill description"
                          }</p>
                      </div>
                  </div>
              `;
        skillContainer.appendChild(skillCol);
      });
    }

    // ========== Original Projects Section ==========
    if (projectsData) {
      const projectsContainer = document.getElementById("projects-container");
      projectsContainer.innerHTML = "";
      const projectsArray = Array.isArray(projectsData)
        ? projectsData
        : [projectsData];

      projectsArray.forEach((project) => {
        const imageSrc = getImagePath(project.image, "assets/img/folio-1.jpg");

        const projectCol = document.createElement("div");
        projectCol.className = "col-md-4";
        projectCol.innerHTML = `
                  <a href="#" class="projects-card">
                      <img src="${imageSrc}" class="projects-card-img" 
                          alt="${project.title || "Project"}"
                          onerror="this.src='assets/img/folio-1.jpg'">
                      <span class="projects-card-overlay">
                          <span class="projects-card-caption">
                              <h4>${project.title || "Project Title"}</h4>
                              <p class="font-weight-normal">${
                                project.description || "Project description"
                              }</p>
                          </span>
                      </span>
                  </a>
              `;
        projectsContainer.appendChild(projectCol);
      });
    }

    // ========== Original Team Section ==========
    if (teamData) {
      const teamContainer = document.getElementById("team-container");
      teamContainer.innerHTML = "";
      const teamArray = Array.isArray(teamData) ? teamData : [teamData];

      teamArray.forEach((member) => {
        const avatarSrc = getImagePath(member.avatar, "assets/img/avatar2.jpg");

        const teamCol = document.createElement("div");
        teamCol.className = "col-md-6";
        teamCol.innerHTML = `
                  <div class="team-card">
                      <div class="team-card-img-holder">
                          <img src="${avatarSrc}" class="team-card-img" 
                              alt="${member.title || "Team Member"}"
                              onerror="this.src='assets/img/avatar2.jpg'">
                      </div>
                      <div class="team-card-body">
                          <p class="team-card-subtitle">${
                            member.description || "Team member description"
                          }</p>
                          <h6 class="team-card-title">${
                            member.title || "Team Member Name"
                          }</h6>
                      </div>
                  </div>
              `;
        teamContainer.appendChild(teamCol);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorElement = document.createElement("div");
    errorElement.className = "alert alert-danger text-center";
    errorElement.textContent = "Failed to load data. Please try again later.";
    document.body.prepend(errorElement);
  }
});

// ========== Original Helper Function ==========
function getImagePath(bufferData, defaultImage) {
  try {
    if (bufferData && bufferData.type === "Buffer") {
      const imageName = String.fromCharCode(...bufferData.data);
      const imagePath = `assets/img/${imageName}`;

      const img = new Image();
      img.src = imagePath;

      return img.complete ? imagePath : defaultImage;
    }
    return defaultImage;
  } catch (error) {
    console.error("Error processing image:", error);
    return defaultImage;
  }
}
