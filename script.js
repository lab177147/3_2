const tableBody = document.querySelector("#stationsTable tbody");

fetch("stations.json")
  .then((res) => res.json())
  .then((data) => {
    tableBody.innerHTML = "";
    data.forEach((station) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${station.id || "—"}</td>
        <td>${station.name || "—"}</td>
        <td>${station.latitude ?? "—"}</td>
        <td>${station.longitude ?? "—"}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch((err) => {
    console.error("Błąd przy wczytywaniu pliku JSON:", err);
  });
