document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:5000/api/about");
        const data = await response.json();

        if (data) {
            // IDs: Use without # in getElementById
            document.getElementById("about-title").textContent = data.title;
            document.getElementById("about-caption").textContent = data.description;

            // Classes: Use querySelector with .
            if (data.cv) {
                const cvButton = document.querySelector(".about-cv");
                cvButton.style.display = "inline-block";
                cvButton.addEventListener("click", () => {
                    const blob = new Blob([new Uint8Array(data.cv.data)], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank");
                });
            }
        }
    } catch (error) {
        console.error("Error fetching about data:", error);
    }
});