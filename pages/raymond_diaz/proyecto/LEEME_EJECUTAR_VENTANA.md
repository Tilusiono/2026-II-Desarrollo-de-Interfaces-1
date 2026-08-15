# Ejecutar la ventana del proyecto

La carpeta actual del servidor es:

```text
pages/raymond_diaz/proyecto
```

## Desde Visual Studio Code

1. Abre la carpeta principal `2026-II-Desarrollo-de-Interfaces-1`.
2. Selecciona **Terminal > New Terminal**.
3. Entra al proyecto:

   ```text
   cd pages/raymond_diaz/proyecto
   ```

4. Instala las dependencias la primera vez:

   ```text
   npm install
   ```

5. Inicia la aplicación:

   ```text
   npm start
   ```

6. Abre `http://localhost:4214` en el navegador.
7. Detén el servidor con **Ctrl+C**.

No abras `public/index.html` con doble clic: Express debe servir el HTML,
Bootstrap, los iconos y la API desde la misma dirección.

## Prueba automática

Desde la misma carpeta ejecuta:

```text
npm test
```

La prueba comprueba la ventana, Bootstrap, Bootstrap Icons, `GET
/api/productos`, `POST /api/productos` y la escritura en una base SQLite
temporal. La base real del proyecto no se modifica durante el test.
