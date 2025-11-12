// fetch_stations.js
import fetch from "node-fetch";
import fs from "fs";

const API_URL = "https://www.ncei.noaa.gov/cdo-web/api/v2/stations?limit=1000"; // pobieramy 1000 stacji
const TOKEN = "LqyZzQuweBgjfgSYnUlHnWAexSWhFTTl"; // wklej swój token NOAA

async function fetchStations() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        token: TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Błąd HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Zapisujemy wyniki w pliku JSON
    fs.writeFileSync("stations.json", JSON.stringify(data.results, null, 2));
    console.log("Dane stacji zapisane w stations.json");
  } catch (err) {
    console.error("Błąd podczas pobierania danych:", err);
  }
}

fetchStations();
