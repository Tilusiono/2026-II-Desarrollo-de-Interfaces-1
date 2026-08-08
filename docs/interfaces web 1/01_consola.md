# La Consola de JavaScript

La consola es una herramienta incluida en los navegadores web que permite ejecutar código JavaScript, visualizar resultados, identificar errores y depurar aplicaciones.

Es una de las herramientas más importantes para cualquier desarrollador web.

---

# ¿Para qué sirve la consola?

La consola permite:

- Mostrar información durante la ejecución del programa.
- Detectar errores.
- Ver el contenido de variables.
- Probar código rápidamente.
- Analizar objetos y arreglos.
- Medir tiempos de ejecución.
- Depurar aplicaciones.

---

# Cómo abrir la consola

## Google Chrome

### Opción 1

```text
F12
```

### Opción 2

```text
Ctrl + Shift + I
```

### Opción 3

```text
Click derecho → Inspeccionar → Console
```

---

# Ejecutar código directamente

La consola puede utilizarse como un entorno interactivo.

```js
2 + 2
```

Resultado:

```text
4
```

```js
let nombre = "Daniel";

nombre
```

Resultado:

```text
Daniel
```

---

# console.log()

Muestra información en la consola.

```js
let nombre = "Daniel";

console.log(nombre);
```

Resultado:

```text
Daniel
```

También puede mostrar varios valores.

```js
let nombre = "Daniel";
let edad = 25;

console.log(nombre, edad);
```

Resultado:

```text
Daniel 25
```

---

# console.error()

Muestra mensajes de error.

```js
console.error("No se encontró el usuario");
```

Resultado:

```text
❌ No se encontró el usuario
```

---

# console.warn()

Muestra advertencias.

```js
console.warn("La contraseña es muy corta");
```

Resultado:

```text
⚠️ La contraseña es muy corta
```

---

# console.info()

Muestra información informativa.

```js
console.info("Proceso completado");
```

Resultado:

```text
ℹ️ Proceso completado
```

---

# console.table()

Permite visualizar arreglos y objetos en formato de tabla.

```js
let alumnos = [
    { nombre: "Juan", edad: 20 },
    { nombre: "Ana", edad: 22 },
    { nombre: "Luis", edad: 19 }
];

console.table(alumnos);
```

Resultado:

```text
┌─────┬────────┬──────┐
│     │ nombre │ edad │
├─────┼────────┼──────┤
│  0  │ Juan   │ 20   │
│  1  │ Ana    │ 22   │
│  2  │ Luis   │ 19   │
└─────┴────────┴──────┘
```

---

# console.dir()

Muestra todas las propiedades de un objeto.

```js
let persona = {
    nombre: "Daniel",
    edad: 25
};

console.dir(persona);
```

---

# console.clear()

Limpia la consola.

```js
console.clear();
```

---

# console.count()

Cuenta cuántas veces se ejecuta una instrucción.

```js
for (let i = 1; i <= 3; i++) {
    console.count("Iteración");
}
```

Resultado:

```text
Iteración: 1
Iteración: 2
Iteración: 3
```

---

# console.time() y console.timeEnd()

Permiten medir el tiempo de ejecución de un bloque de código.

```js
console.time("Proceso");

for (let i = 0; i < 1000000; i++) {
    // proceso
}

console.timeEnd("Proceso");
```

Resultado:

```text
Proceso: 12 ms
```

---

# console.group()

Agrupa mensajes relacionados.

```js
console.group("Datos del usuario");

console.log("Nombre: Daniel");
console.log("Edad: 25");

console.groupEnd();
```

Resultado:

```text
Datos del usuario
 ├ Nombre: Daniel
 └ Edad: 25
```

---

# console.assert()

Muestra un error únicamente cuando una condición es falsa.

```js
let edad = 15;

console.assert(
    edad >= 18,
    "Debe ser mayor de edad"
);
```

Resultado:

```text
Assertion failed: Debe ser mayor de edad
```

---


# Buenas prácticas

✅ Utilizar mensajes descriptivos.

```js
console.log("Nombre:", nombre);
```

✅ Utilizar `console.table()` para arreglos y objetos.

```js
console.table(usuarios);
```

✅ Utilizar `console.error()` para errores.

```js
console.error("Error de conexión");
```

❌ Evitar dejar demasiados `console.log()` en producción.

```js
// Eliminar antes de publicar
console.log("Depuración");
```

---

# Resumen

| Método | Uso |
|----------|----------|
| console.log() | Mostrar información |
| console.error() | Mostrar errores |
| console.warn() | Mostrar advertencias |
| console.info() | Mostrar información |
| console.table() | Mostrar tablas |
| console.dir() | Mostrar propiedades de objetos |
| console.clear() | Limpiar consola |
| console.count() | Contar ejecuciones |
| console.time() | Iniciar medición de tiempo |
| console.timeEnd() | Finalizar medición |
| console.group() | Agrupar mensajes |
| console.assert() | Validar condiciones |

La consola es la principal herramienta para observar y comprender el comportamiento de un programa JavaScript durante su ejecución.