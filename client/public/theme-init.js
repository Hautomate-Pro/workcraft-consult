(function () {
  try {
    var saved = localStorage.getItem("workcraft-theme");
    document.documentElement.setAttribute("data-theme", saved === "light" ? "light" : "dark");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();