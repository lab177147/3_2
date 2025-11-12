(function () {
  const API_URL = "https://www.ncei.noaa.gov/cdo-web/api/v2/stations";
  const TOKEN = "LqyZzQuweBgjfgSYnUlHnWAexSWhFTTl";
  const tableBody = document.querySelector("#stationsTable tbody");
  const loadBtn = document.querySelector("#loadBtn");

  async function loadStations() {
    try {
      tableBody.innerHTML = "";

      // Dodajemy limit, żeby nie pobierać zbyt wielu danych
      const response = await fetch(${API_URL}?limit=10, {
        headers: {
          token: TOKEN,
        },
      });

      if (!response.ok) {
        throw new Error(Błąd HTTP: ${response.status});
      }

      const data = await response.json();

      // Sprawdzamy, czy dane istnieją
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Brak danych w odpowiedzi API");
      }

      // Iterujemy po stacjach
      data.results.forEach((station) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${station.id || "—"}</td>
          <td>${station.name || "—"}</td>
          <td>${station.latitude ?? "—"}</td>
          <td>${station.longitude ?? "—"}</td>
        `;

        tableBody.appendChild(row);
      });
    } catch (err) {
      console.error("Błąd podczas pobierania danych:", err);
      alert(
        "Nie udało się pobrać danych. Sprawdź token lub połączenie z internetem.",
      );
    }
  }

  loadBtn.addEventListener("click", loadStations);
})();
www.ncei.noaa.gov