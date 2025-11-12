const form = document.getElementById("searchForm");
const input = document.getElementById("capitalInput");
const tbody = document.querySelector("#resultsTable tbody");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const capital = input.value.trim();
  tbody.innerHTML = "";
  message.textContent = "";

  if (!capital) {
    message.textContent = "Wpisz nazwę stolicy.";
    return;
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/capital/${encodeURIComponent(capital)}`,
    );
    if (!response.ok) {
      if (response.status === 404) {
        message.textContent = "Nie znaleziono kraju dla podanej stolicy.";
      } else {
        message.textContent = `Błąd serwera: ${response.status}`;
      }
      return;
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      message.textContent = "Brak danych.";
      return;
    }

    data.forEach((country) => {
      const row = document.createElement("tr");
      row.innerHTML = `
<td>${country.name?.common ?? "-"}</td>
<td>${country.capital?.[0] ?? "-"}</td>
<td>${country.population?.toLocaleString() ?? "-"}</td>
<td>${country.region ?? "-"}</td>
<td>${country.subregion ?? "-"}</td>
`;
      tbody.appendChild(row);
    });
  } catch (error) {
    message.textContent = `Błąd: ${error.message}`;
  }
});
