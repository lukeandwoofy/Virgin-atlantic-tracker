// Map of ICAO codes to airport names
const airportNames = {
    "EGLL": "London Heathrow",
    "EGKK": "London Gatwick",
    "KLAX": "Los Angeles International",
    "JFK": "John F. Kennedy International",
    "MAN": "Manchester Airport",
    "BOS": "Boston Logan International",
    "ATL": "Hartsfield–Jackson Atlanta International",
    "SFO": "San Francisco International",
    // Add more airports as needed
};

const planeImages = {
    "Airbus A350": "a350.jpg",
    "Boeing 787": "b787.jpg",
    "Airbus A330": "a330.jpg",
};

async function fetchFlights() {
    const flightsDiv = document.getElementById('flights');
    flightsDiv.innerHTML = "<p>Fetching flight data...</p>";

    try {
        // Fetch data from the OpenSky API
        const response = await fetch('https://opensky-network.org/api/states/all');
        const data = await response.json();

        // Log raw API data for debugging
        console.log("Raw API Data:", data);

        // Filter for Virgin Atlantic flights (callsign starts with 'VIR')
        const virginFlights = data.states.filter(flight => flight[1]?.startsWith('VIR'));

        // Display the flights
        flightsDiv.innerHTML = virginFlights.map(flight => {
            const aircraft = flight[0] || "Unknown Aircraft"; // Default if aircraft type is missing
            const imageSrc = planeImages[aircraft] || "default.jpg"; // Fallback to default image

            // Get departure and arrival ICAO codes (if available)
            const departure = flight[2] || "Unknown Code";
            const arrival = flight[3] || "Unknown Code";

            // Map ICAO codes to airport names (fallback to raw code if not found)
            const departureName = airportNames[departure] || departure;
            const arrivalName = airportNames[arrival] || arrival;

            return `
                <div class="flight">
                    <img src="${imageSrc}" alt="${aircraft}">
                    <div>
                        <h3>Flight: ${flight[1]}</h3>
                        <p>Aircraft: ${aircraft}</p>
                        <p>From: ${departureName}</p>
                        <p>To: ${arrivalName}</p>
                    </div>
                </div>
            `;
        }).join('');

        // If no flights are found
        if (virginFlights.length === 0) {
            flightsDiv.innerHTML = "<p>No Virgin Atlantic flights found at the moment.</p>";
        }

    } catch (error) {
        // Handle errors
        flightsDiv.innerHTML = "<p>Failed to load flight data. Please try again later.</p>";
        console.error("Error fetching flight data:", error);
    }
}

// Fetch flight data on page load
fetchFlights();
