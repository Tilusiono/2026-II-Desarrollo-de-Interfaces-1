# Bucles en JavaScript

Los bucles permiten repetir un bloque de código múltiples veces sin necesidad de escribirlo repetidamente.

---

## for

Se utiliza cuando conocemos la cantidad de repeticiones.

### Sintaxis

```js
for (inicialización; condición; incremento) {

}
```

### Ejemplo

```js
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

Resultado:

```text
1
2
3
4
5
```

---

## while

Se ejecuta mientras una condición sea verdadera.

### Sintaxis

```js
while (condicion) {

}
```

### Ejemplo

```js
let contador = 1;

while (contador <= 5) {

    console.log(contador);

    contador++;
}
```

Resultado:

```text
1
2
3
4
5
```

---

## do while

Ejecuta el bloque al menos una vez.

### Sintaxis

```js
do {

} while (condicion);
```

### Ejemplo

```js
let contador = 1;

do {

    console.log(contador);

    contador++;

} while (contador <= 5);
```

Resultado:

```text
1
2
3
4
5
```

---

## Diferencia entre while y do while

### while

Primero evalúa la condición.

```js
let numero = 10;

while (numero < 5) {
    console.log(numero);
}
```

Resultado:

```text
No ejecuta nada
```

---

### do while

Primero ejecuta y luego evalúa la condición.

```js
let numero = 10;

do {
    console.log(numero);
} while (numero < 5);
```

Resultado:

```text
10
```

---

## for...of

Recorre directamente los valores de un arreglo.

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

for (let curso of cursos) {

    console.log(curso);

}
```

Resultado:

```text
HTML
CSS
JavaScript
```

---

## forEach()

Método moderno para recorrer arreglos.

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

cursos.forEach(function(curso) {

    console.log(curso);

});
```

Resultado:

```text
HTML
CSS
JavaScript
```

---

## break

Detiene la ejecución de un bucle.

```js
for (let i = 1; i <= 10; i++) {

    if (i === 5) {
        break;
    }

    console.log(i);
}
```

Resultado:

```text
1
2
3
4
```

---

## continue

Omite una iteración del bucle.

```js
for (let i = 1; i <= 5; i++) {

    if (i === 3) {
        continue;
    }

    console.log(i);
}
```

Resultado:

```text
1
2
4
5
```

---

## Ejemplo práctico

```js
let notas = [18, 15, 12, 20];

for (let nota of notas) {

    if (nota >= 13) {

        console.log(
            nota + " - Aprobado"
        );

    } else {

        console.log(
            nota + " - Desaprobado"
        );

    }

}
```

Resultado:

```text
18 - Aprobado
15 - Aprobado
12 - Desaprobado
20 - Aprobado
```

---

# Resumen

| Bucle | Uso |
|---------|---------|
| for | Número conocido de repeticiones |
| while | Mientras una condición sea verdadera |
| do while | Ejecuta al menos una vez |
| for...of | Recorrer arreglos |
| forEach() | Recorrer arreglos |
| break | Detener un bucle |
| continue | Saltar una iteración |

---

# Recomendación

Los bucles más utilizados en JavaScript son:

```js
for
while
for...of
forEach()
```

Se recomienda comenzar aprendiendo `for` y `while`, para luego utilizar `for...of` y `forEach()` al trabajar con arreglos.