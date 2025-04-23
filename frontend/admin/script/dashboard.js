document.addEventListener("DOMContentLoaded", async () => {
  // Helper function to safely update counts
  function updateCount(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) element.textContent = value;
  }

  try {
    // Fetch all counts concurrently using count endpoints
    const [aboutCountRes, skillCountRes, projectCountRes, memberCountRes] = await Promise.all([
      fetch("http://localhost:5000/api/about/count"),
      fetch("http://localhost:5000/api/skill/count"),
      fetch("http://localhost:5000/api/project/count"),
      fetch("http://localhost:5000/api/member/count")
    ]);

    // Parse count responses
    const aboutCount = aboutCountRes.ok ? (await aboutCountRes.json()).count : 1;
    const skillCount = skillCountRes.ok ? (await skillCountRes.json()).count : 0;
    const projectCount = projectCountRes.ok ? (await projectCountRes.json()).count : 0;
    const memberCount = memberCountRes.ok ? (await memberCountRes.json()).count : 0;

    // Update all counts
    updateCount("about-count", aboutCount);
    updateCount("skill-count", skillCount);
    updateCount("project-count", projectCount);
    updateCount("member-count", memberCount);

  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    // Reset all counts to 0 on error
    ["about-count", "skill-count", "project-count", "member-count"].forEach(id => {
      updateCount(id, 0);
    });
  }
});