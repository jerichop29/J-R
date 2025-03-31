document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch data from backend API
        const response = await fetch("http://localhost:5000/api/about");
        const data = await response.json();

        // Check if data exists
        if (data) {
            document.getElementById(".section-title").textContent = data.title;
            document.getElementById(".about-caption p").textContent = data.description;

            // Handle CV Download
            if (data.cv) {
                const cvButton = document.getElementById(".about-cv");
                cvButton.style.display = "inline-block"; // Show button if CV exists
                cvButton.addEventListener("click", () => {
                    const blob = new Blob([new Uint8Array(data.cv.data)], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank"); // Open CV in a new tab
                });
            }
        }
    } catch (error) {
        console.error("Error fetching about data:", error);
    }
});
