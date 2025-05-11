const planeImages = {
    "Airbus A350": "a350.jpg",
    "Boeing 787": "b787.jpg",
    "Airbus A330": "a330.jpg",
};

async function fetchFlights() {
    const flightsDiv = document.getElementById('flights');
    flightsDiv.innerHTML = "<p>Fetching flight data...</p>";

    try {
        // Replace with your API URL (example below)
        const response = await fetch('https://opensky-network.org/api/states/all');
        const data = await response.json();

        // Filter for Virgin Atlantic flights (callsign starts with VIR)
        const virginFlights = data.states.filter(flight => flight[1]?.startsWith('VIR'));

        // Display flights
        flightsDiv.innerHTML = virginFlights.map(flight => {
            const aircraft = flight[0] || "Unknown Aircraft"; // Default if aircraft type is missing
            const imageSrc = planeImages[aircraft] || "default.jpg"; // Fallback to default image

            return `
                <div class="flight">
                    <img src="${imageSrc}" alt="${aircraft}">
                    <div>
                        <h3>Flight: ${flight[1]}</h3>
                        <p>Aircraft: ${aircraft}</p>
                        <p>From: ${flight[2]}</p>
                        <p>To: ${flight[3]}</p>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        flightsDiv.innerHTML = "<p>Failed to load flight data. Please try again later.</p>";
        console.error(error);
    }
}

fetchFlights();
