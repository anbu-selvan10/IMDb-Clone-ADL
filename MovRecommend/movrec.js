async function getRecommendations() {
    let movieName = document.getElementById("movieInput").value;
    let loadingIndicator = document.getElementById("loading");
    let recommendationContainer = document.getElementById("recommendation-container");

    if (!movieName) {
        alert("Please enter a movie name!");
        return;
    }

    loadingIndicator.style.display = "block";
    recommendationContainer.innerHTML = "";

    try {
        let response = await fetch(`http://localhost:5000/recommend?movie=${movieName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch recommendations.");
        }

        let data = await response.json();

        loadingIndicator.style.display = "none";

        let output = document.createElement("div");
        output.innerHTML = `<p><strong>Movie:</strong> ${data.movie}</p>`;
        output.innerHTML += `<p><strong>Recommended Movies:</strong></p>`;

        data.recommendations.forEach((rec, index) => {
            let movieElement = document.createElement("p");
            movieElement.innerHTML = `<strong>${rec.title} (${rec.year})</strong> - ${rec.description}`;
            output.appendChild(movieElement);
        });

        recommendationContainer.appendChild(output);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching movie recommendations. Please try again later.");

        // Hide loading indicator in case of error
        loadingIndicator.style.display = "none";
    }
}
