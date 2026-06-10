# Arreglos (Arrays) en JavaScript

Un arreglo es una estructura de datos que permite almacenar múltiples valores en una sola variable.

---

# ¿Por qué usar arreglos?

Sin arreglo:

```js
let curso1 = "HTML";
let curso2 = "CSS";
let curso3 = "JavaScript";
```

Con arreglo:

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];
```

---

# Crear un arreglo

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];
```

---

# Acceder a elementos

Cada elemento posee una posición llamada índice.

Los índices comienzan en 0.

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

console.log(cursos[0]);
console.log(cursos[1]);
console.log(cursos[2]);
```

Resultado:

```text
HTML
CSS
JavaScript
```

---

# Modificar elementos

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

cursos[1] = "Bootstrap";

console.log(cursos);
```

Resultado:

```text
["HTML", "Bootstrap", "JavaScript"]
```

---

# Obtener la cantidad de elementos

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

console.log(
    cursos.length
);
```

Resultado:

```text
3
```

---

# Agregar elementos

## push()

Agrega elementos al final.

```js
let cursos = [
    "HTML",
    "CSS"
];

cursos.push(
    "JavaScript"
);

console.log(cursos);
```

Resultado:

```text
["HTML", "CSS", "JavaScript"]
```

---

## unshift()

Agrega elementos al inicio.

```js
let cursos = [
    "CSS",
    "JavaScript"
];

cursos.unshift(
    "HTML"
);

console.log(cursos);
```

Resultado:

```text
["HTML", "CSS", "JavaScript"]
```

---

# Eliminar elementos

## pop()

Elimina el último elemento.

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

cursos.pop();

console.log(cursos);
```

Resultado:

```text
["HTML", "CSS"]
```

---

## shift()

Elimina el primer elemento.

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

cursos.shift();

console.log(cursos);
```

Resultado:

```text
["CSS", "JavaScript"]
```

---

# Buscar elementos

## includes()

Verifica si existe un elemento.

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

console.log(
    cursos.includes("CSS")
);
```

Resultado:

```text
true
```

---

## indexOf()

Obtiene la posición de un elemento.

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

console.log(
    cursos.indexOf("CSS")
);
```

Resultado:

```text
1
```

---

# Recorrer arreglos

## for

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

for (
    let i = 0;
    i < cursos.length;
    i++
) {

    console.log(
        cursos[i]
    );

}
```

---

## for...of

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

for (
    let curso of cursos
) {

    console.log(curso);

}
```

---

## forEach()

```js
let cursos = [
    "HTML",
    "CSS",
    "JavaScript"
];

cursos.forEach(
    function(curso) {

        console.log(curso);

    }
);
```

---

# Arreglos de números

```js
let notas = [
    18,
    15,
    20,
    12
];

console.log(
    notas[0]
);
```

Resultado:

```text
18
```

---

# Arreglos mixtos

Un arreglo puede almacenar diferentes tipos de datos.

```js
let datos = [
    "Daniel",
    25,
    true
];

console.log(datos);
```

Resultado:

```text
["Daniel", 25, true]
```

---

# Arreglos de objetos

Muy utilizados en aplicaciones web.

```js
let alumnos = [

    {
        nombre: "Juan",
        nota: 18
    },

    {
        nombre: "Ana",
        nota: 15
    }

];

console.log(
    alumnos[0].nombre
);
```

Resultado:

```text
Juan
```

---

# Método map()

Permite transformar elementos.

```js
let numeros = [
    1,
    2,
    3
];

let dobles =
    numeros.map(
        numero => numero * 2
    );

console.log(dobles);
```

Resultado:

```text
[2, 4, 6]
```

---

# Método filter()

Permite filtrar elementos.

```js
let notas = [
    18,
    10,
    15,
    8
];

let aprobados =
    notas.filter(
        nota => nota >= 13
    );

console.log(aprobados);
```

Resultado:

```text
[18, 15]
```

---

# Método find()

Devuelve el primer elemento encontrado.

```js
let notas = [
    18,
    10,
    15
];

let resultado =
    notas.find(
        nota => nota < 13
    );

console.log(resultado);
```

Resultado:

```text
10
```

---

# console.table()

Muy útil para visualizar arreglos.

```js
let alumnos = [

    {
        nombre: "Juan",
        nota: 18
    },

    {
        nombre: "Ana",
        nota: 15
    }

];

console.table(alumnos);
```

---

# Ejemplo práctico

```js
let productos = [
    "Polo",
    "Casaca",
    "Jean"
];

productos.push(
    "Zapatillas"
);

for (
    let producto of productos
) {

    console.log(producto);

}
```

Resultado:

```text
Polo
Casaca
Jean
Zapatillas
```

---

# Resumen

## Métodos principales

| Método | Descripción |
|----------|----------|
| push() | Agregar al final |
| pop() | Eliminar último |
| unshift() | Agregar al inicio |
| shift() | Eliminar primero |
| includes() | Buscar elemento |
| indexOf() | Obtener posición |
| forEach() | Recorrer arreglo |
| map() | Transformar datos |
| filter() | Filtrar datos |
| find() | Buscar un elemento |

---

# Recomendación

Para comenzar a trabajar con arreglos debes dominar:

```js
push()
pop()

for
for...of
forEach()

length
includes()
```

Estos métodos son los más utilizados en proyectos web y constituyen la base para trabajar con listas de datos, productos, usuarios y registros.