document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch all sections concurrently
    const [aboutRes, skillsRes, projectsRes, teamRes] = await Promise.all([
      fetch("http://localhost:5000/api/about"),
      fetch("http://localhost:5000/api/skill"),
      fetch("http://localhost:5000/api/project"),
      fetch("http://localhost:5000/api/team"),
    ]);

    // Parse JSON responses
    const aboutData = await aboutRes.json();
    const skillsData = await skillsRes.json();
    const projectsData = await projectsRes.json();
    const teamData = await teamRes.json();

    // Update counts on the dashboard
    document.getElementById("about-count").textContent = aboutData ? 1 : 0;
    document.getElementById("skill-count").textContent = Array.isArray(skillsData) ? skillsData.length : 0;
    document.getElementById("project-count").textContent = Array.isArray(projectsData) ? projectsData.length : 0;
    document.getElementById("team-count").textContent = Array.isArray(teamData) ? teamData.length : 0;

  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    // Optional: show error message in the dashboard
  }


  
});
