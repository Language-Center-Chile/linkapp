const searchInput = document.getElementById("searchInput");
const linksList = document.getElementById("linksList");
const links = Array.from(linksList.querySelectorAll(".link-item"));
const historyList = document.getElementById("historyList");


// FILTRAR
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  let hasResults = false;

  if (value === "") {
    linksList.classList.add("hidden");
    return;
  }

  links.forEach(link => {
    const match = link.textContent.toLowerCase().includes(value);
    link.style.display = match ? "block" : "none";
    if (match) hasResults = true;
  });

  linksList.classList.toggle("hidden", !hasResults);
});


// ENTER = BUSCAR
searchInput.addEventListener("keydown", (e) => {

  if (e.key === "Enter") {
    const value = searchInput.value.trim();

    if (value !== "") {

      agregarAlHistorial(`https://www.google.com/search?q=${value}`);

      window.location.href =
      `https://www.google.com/search?q=${value}`;
    }
  }
});


// CLICK EN RESULTADOS
links.forEach(link => {

  link.addEventListener("click", () => {
    agregarAlHistorial(link.href);
  });
});


// ---------------------------
// GUARDAR EN HISTORIAL
// ---------------------------

function agregarAlHistorial(url) {

  let historial = JSON.parse(
    localStorage.getItem("historialLinks")
  ) || [];

  historial.push(url);

  localStorage.setItem(
    "historialLinks",
    JSON.stringify(historial)
  );

  renderHistory();
}


// ---------------------------
// MOSTRAR HISTORIAL
// ---------------------------

function addToHistory(url, index) {

  const li = document.createElement("li");
  li.classList.add("history-item");

  li.innerHTML = `
    <a href="${url}" target="_blank">${url}</a>

    <div class="btn-box">
      <button class="btn-history" onclick="saveLink('${url}')">
        Guardar
      </button>

      <button class="btn-history" onclick="deleteLink(${index})">
        Borrar
      </button>
    </div>
  `;

  historyList.appendChild(li);
}


function renderHistory() {

  historyList.innerHTML = "";

  let history =
    JSON.parse(localStorage.getItem("historialLinks")) || [];

  history.forEach((url, i) => {
    addToHistory(url, i);
  });
}

renderHistory();


// ---------------------------
// GUARDAR EN LISTA APARTE
// ---------------------------

function saveLink(url) {

  let savedLinks =
    JSON.parse(localStorage.getItem("savedLinks")) || [];

  if (!savedLinks.includes(url)) {
    savedLinks.push(url);
    alert("Link guardado ✔");
  } else {
    alert("Ya está guardado ⚠");
  }

  localStorage.setItem(
    "savedLinks",
    JSON.stringify(savedLinks)
  );
}


// ---------------------------
// BORRAR DEL HISTORIAL
// ---------------------------

function deleteLink(index) {

  let history =
    JSON.parse(localStorage.getItem("historialLinks")) || [];

  history.splice(index, 1);

  localStorage.setItem(
    "historialLinks",
    JSON.stringify(history)
  );

  renderHistory();
}
