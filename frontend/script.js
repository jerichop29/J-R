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
    const [aboutRes, skillsRes, projectsRes, memberRes] = await Promise.all([
      fetch("http://localhost:5000/api/about"),
      fetch("http://localhost:5000/api/skill"),
      fetch("http://localhost:5000/api/project"),
      fetch("http://localhost:5000/api/member"),
    ]);

    const aboutData = await aboutRes.json();
    const skillsData = await skillsRes.json();
    const projectsData = await projectsRes.json();
    const memberData = await memberRes.json();

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

    // ========== Modified Skills Section ==========
    if (skillsData?.data) {
      // Changed from skillsData to skillsData.data
      const skillContainer = document.getElementById("skill-container");
      skillContainer.innerHTML = "";
      const skillsArray = Array.isArray(skillsData.data)
        ? skillsData.data
        : [skillsData.data]; // Access .data

      skillsArray.forEach((skill) => {
        // Simplified image handling (remove Buffer check)
        const iconSrc = skill.icon
          ? `http://localhost:5000${skill.icon}` // Directly use the stored path
          : "assets/img/skill.svg";

        const skillCol = document.createElement("div");
        skillCol.className = "col-md-6 col-lg-3";
        skillCol.innerHTML = `
      <div class="skill-card">
          <div class="body">
              <img src="${iconSrc}" alt="${
          skill.title || "Skill"
        }" class="icon" 
                  onerror="this.src='assets/img/skill.svg'">
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

// ========== Modified Projects Section ==========
if (projectsData?.data) {
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = "";
  const projectsArray = Array.isArray(projectsData.data) 
    ? projectsData.data
    : [projectsData.data];

  projectsArray.forEach((project) => {
    // Directly use the image path from backend
    const imageSrc = project.image
      ? `http://localhost:5000${project.image}` // Use your backend URL
      : "assets/img/folio-1.jpg";

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
                  <p class="font-weight-normal">
                      ${project.description || "Project description"}
                  </p>
              </span>
          </span>
      </a>
    `;
    projectsContainer.appendChild(projectCol);
  });
}

// ========== Modified Team Section ==========
if (memberData?.data) {
  const memberContainer = document.getElementById("team-container");
  memberContainer.innerHTML = "";
  const memberArray = Array.isArray(memberData.data) 
    ? memberData.data
    : [memberData.data];

  memberArray.forEach((member) => {
    // Directly use avatar path from backend
    const avatarSrc = member.avatar
      ? `http://localhost:5000${member.avatar}`
      : "assets/img/avatar2.jpg";

    const memberCol = document.createElement("div");
    memberCol.className = "col-md-6"; // Added responsive columns
    memberCol.innerHTML = `
      <div class="team-card">
          <div class="team-card-img-holder">
              <img src="${avatarSrc}" class="team-card-img" 
                  alt="${member.name || "Team Member"}"
                  onerror="this.src='assets/img/avatar2.jpg'">
          </div>
          <div class="team-card-body">
              <p class="team-card-subtitle">${
                member.info || "Member description"
              }</p>
              <h6 class="team-card-title">${member.name || "Team Member"}</h6>
          </div>
      </div>
    `;
    memberContainer.appendChild(memberCol);
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
