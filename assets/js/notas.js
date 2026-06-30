document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector(".table");

    if (!tabla) return;

    // Agregar columna Promedio Final
    const theadRow = tabla.querySelector("thead tr");
    const th = document.createElement("th");
    th.textContent = "Promedio Final";
    theadRow.appendChild(th);

    const filas = tabla.querySelectorAll("tbody tr");

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");

        const parcial = obtenerNota(celdas[3]);
        const final = obtenerNota(celdas[4]);

        const promedio = (parcial * 0.4) + (final * 0.6);

        const td = document.createElement("td");
        td.textContent = promedio.toFixed(2);

        td.style.fontWeight = "bold";

        if (promedio >= 13) {
            td.style.color = "green";
        } else {
            td.style.color = "red";
        }

        fila.appendChild(td);
    });

    function obtenerNota(celda) {
        if (!celda) return 0;

        const texto = celda.textContent.trim().toUpperCase();

        if (
            texto === "" ||
            texto === "NA" ||
            texto === "NR" ||
            texto === "00"
        ) {
            return 0;
        }

        return parseFloat(texto) || 0;
    }
});