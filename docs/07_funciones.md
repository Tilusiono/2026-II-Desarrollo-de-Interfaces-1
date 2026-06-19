# Funciones en JavaScript

Las funciones son bloques de código reutilizables que realizan una tarea específica.

Su principal objetivo es evitar repetir código y organizar mejor los programas.

---

# ¿Por qué usar funciones?

Sin funciones:

```js
let precio = 100;
let igv = precio * 0.18;

console.log(igv);

precio = 200;
igv = precio * 0.18;

console.log(igv);
```

Con funciones:

```js
function calcularIGV(precio) {
    return precio * 0.18;
}

console.log(calcularIGV(100));
console.log(calcularIGV(200));
```

---

# Declaración de una función

### Sintaxis

```js
function nombreFuncion() {

}
```

### Ejemplo

```js
function saludar() {
    console.log("Hola Mundo");
}

saludar();
```

Resultado:

```text
Hola Mundo
```

---

# Parámetros

Los parámetros son valores que la función recibe.

```js
function saludar(nombre) {
    console.log("Hola " + nombre);
}

saludar("Daniel");
```

Resultado:

```text
Hola Daniel
```

---

# Múltiples parámetros

```js
function sumar(a, b) {
    console.log(a + b);
}

sumar(10, 5);
```

Resultado:

```text
15
```

---

# Return

La palabra reservada `return` devuelve un valor.

```js
function sumar(a, b) {
    return a + b;
}

let resultado = sumar(10, 5);

console.log(resultado);
```

Resultado:

```text
15
```

---

# Función sin parámetros

```js
function mostrarFecha() {
    return "09/06/2026";
}

console.log(
    mostrarFecha()
);
```

Resultado:

```text
09/06/2026
```

---

# Función con varios parámetros

```js
function calcularArea(
    base,
    altura
) {

    return base * altura;

}

console.log(
    calcularArea(10, 5)
);
```

Resultado:

```text
50
```

---

# Parámetros por defecto

Permiten asignar un valor inicial.

```js
function saludar(
    nombre = "Invitado"
) {

    console.log(
        "Hola " + nombre
    );

}

saludar();
```

Resultado:

```text
Hola Invitado
```

---

# Function Expression

Una función puede almacenarse en una variable.

```js
const saludar = function() {

    console.log("Hola");

};

saludar();
```

Resultado:

```text
Hola
```

---

# Arrow Function

Forma moderna de escribir funciones.

### Sintaxis

```js
const nombreFuncion = () => {

};
```

---

## Ejemplo

```js
const saludar = () => {

    console.log("Hola");

};

saludar();
```

Resultado:

```text
Hola
```

---

## Arrow Function con parámetros

```js
const saludar = (nombre) => {

    console.log(
        "Hola " + nombre
    );

};

saludar("Daniel");
```

Resultado:

```text
Hola Daniel
```

---

## Arrow Function con return

```js
const sumar = (a, b) => {

    return a + b;

};

console.log(
    sumar(10, 5)
);
```

Resultado:

```text
15
```

---

## Arrow Function simplificada

Cuando existe una sola línea.

```js
const sumar = (a, b) => a + b;

console.log(
    sumar(10, 5)
);
```

Resultado:

```text
15
```

---

# Scope (Ámbito)

Las variables declaradas dentro de una función solo existen dentro de ella.

```js
function prueba() {

    let nombre = "Daniel";

    console.log(nombre);

}

prueba();

// console.log(nombre);
```

Resultado:

```text
Error
```

---

# Funciones que llaman otras funciones

```js
function calcularIGV(precio) {

    return precio * 0.18;

}

function calcularTotal(precio) {

    return precio +
           calcularIGV(precio);

}

console.log(
    calcularTotal(100)
);
```

Resultado:

```text
118
```

---

# Ejemplo práctico

```js
function calcularPromedio(
    nota1,
    nota2,
    nota3
) {

    return (
        nota1 +
        nota2 +
        nota3
    ) / 3;

}

let promedio =
    calcularPromedio(
        18,
        15,
        17
    );

console.log(promedio);
```

Resultado:

```text
16.666666666666668
```

---

# Funciones Integradas de JavaScript

JavaScript incluye funciones ya creadas.

```js
Number("25");
String(100);
Boolean(1);
parseInt("50");
parseFloat("19.99");
```

---

# Resumen

## Tipos de funciones

| Tipo | Ejemplo |
|--------|----------|
| Declarada | function saludar() {} |
| Expresión | const saludar = function() {} |
| Arrow Function | const saludar = () => {} |

---

## Conceptos importantes

| Concepto | Descripción |
|-----------|-----------|
| Parámetro | Valor recibido por la función |
| Argumento | Valor enviado a la función |
| Return | Devuelve un resultado |
| Scope | Ámbito de una variable |
| Arrow Function | Sintaxis moderna |

---

# Recomendación

Actualmente se utilizan principalmente:

```js
function nombre() {

}

const sumar = (a, b) => {

}
```

Debes dominar:

- Parámetros
- Argumentos
- Return
- Scope
- Arrow Functions

porque son la base para trabajar con eventos, objetos, APIs y frameworks modernos como :contentReference[oaicite:0]{index=0}.