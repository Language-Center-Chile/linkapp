const searchInput = document.getElementById("searchInput");
const linksList = document.getElementById("linksList");
const links = Array.from(linksList.querySelectorAll(".link-item"));

// filtrar mientras escribe (sin mandar)
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  let hasResults = false;

  if (value === "") {
    linksList.classList.add("hidden");
    links.forEach(link => link.style.display = "block");
    return;
  }

  links.forEach(link => {
    const text = link.textContent.toLowerCase();
    const match = text.includes(value);

    link.style.display = match ? "block" : "none";
    if (match) hasResults = true;
  });

  linksList.classList.toggle("hidden", !hasResults);
});


// 🚀 solo redirige cuando se presiona ENTER
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = searchInput.value.trim();
    if (value !== "") {
      window.location.href = `https://www.google.com/search?q=${value}`;
    }
  }
});
