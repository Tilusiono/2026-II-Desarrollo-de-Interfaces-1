# Sentencias en JavaScript

Las sentencias permiten controlar el flujo de ejecución de un programa tomando decisiones según una o varias condiciones.

---

## if

Ejecuta un bloque de código si la condición es verdadera.

```js
let edad = 20;

if (edad >= 18) {
    console.log("Es mayor de edad");
}
```

Resultado:

```text
Es mayor de edad
```

---

## if - else

Permite ejecutar una alternativa cuando la condición es falsa.

```js
let edad = 16;

if (edad >= 18) {
    console.log("Mayor de edad");
} else {
    console.log("Menor de edad");
}
```

Resultado:

```text
Menor de edad
```

---

## if - else if - else

Permite evaluar múltiples condiciones.

```js
let nota = 15;

if (nota >= 18) {
    console.log("Excelente");
} else if (nota >= 13) {
    console.log("Aprobado");
} else {
    console.log("Desaprobado");
}
```

Resultado:

```text
Aprobado
```

---

## Operador Ternario

Versión simplificada de un if-else.

### Sintaxis

```js
condicion ? valorSiVerdadero : valorSiFalso
```

### Ejemplo

```js
let edad = 20;

let mensaje =
    edad >= 18
        ? "Mayor de edad"
        : "Menor de edad";

console.log(mensaje);
```

Resultado:

```text
Mayor de edad
```

---

## switch

Permite evaluar varios casos posibles.

```js
let dia = "lunes";

switch (dia) {

    case "lunes":
        console.log("Inicio de semana");
        break;

    case "viernes":
        console.log("Fin de semana cerca");
        break;

    default:
        console.log("Día normal");
}
```

Resultado:

```text
Inicio de semana
```

---

# Resumen

| Sentencia | Uso |
|------------|------------|
| if | Una condición |
| if - else | Dos alternativas |
| if - else if | Varias condiciones |
| switch | Múltiples casos |
| ternario | If simplificado |

---

# Recomendación

Las sentencias más utilizadas en JavaScript son:

```js
if
if - else
if - else if
switch
```

El operador ternario se recomienda para condiciones simples y cortas.