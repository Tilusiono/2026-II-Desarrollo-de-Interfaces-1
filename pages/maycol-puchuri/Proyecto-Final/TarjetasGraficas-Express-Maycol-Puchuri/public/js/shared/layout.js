const COMPONENTES = {
  nav: "/components/nav.html",
  header: "/components/header.html",
  footer: "/components/footer.html",
};

document.addEventListener("DOMContentLoaded", cargarComponentes);

async function cargarComponentes() {
  const contenedores = document.querySelectorAll("[data-component]");

  await Promise.all(
    [...contenedores].map(async (contenedor) => {
      const nombre = contenedor.dataset.component;
      const ruta = COMPONENTES[nombre];
      if (!ruta) return;

      const respuestaHttp = await fetch(ruta);
      contenedor.innerHTML = await respuestaHttp.text();
      if (nombre === "header") completarHeader(contenedor);
    }),
  );

  activarEnlaceActual();
}

function completarHeader(header) {
  const configuracionHeader = header.dataset;
  header.querySelector("[data-header-title]").textContent =
    configuracionHeader.title ?? "";
  header.querySelector("[data-header-eyebrow]").textContent =
    configuracionHeader.eyebrow ?? "Administración de inventario";
  header.querySelector("[data-header-description]").textContent =
    configuracionHeader.description ?? "";
  header.querySelector("[data-header-icon]").className =
    `bi ${configuracionHeader.icon ?? "bi-cpu"}`;
}

function activarEnlaceActual() {
  const ruta = window.location.pathname;
  document
    .querySelectorAll("[data-component='nav'] .nav-link")
    .forEach((enlace) => {
      const activa = enlace.getAttribute("href") === ruta;
      enlace.classList.toggle("active", activa);
      if (activa) enlace.setAttribute("aria-current", "page");
    });
}
