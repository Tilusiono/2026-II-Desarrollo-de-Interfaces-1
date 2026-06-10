# Arreglos de Objetos en JavaScript

Un arreglo de objetos es una colección donde cada elemento es un objeto con propiedades y valores.

Son muy utilizados para representar:

- Usuarios
- Productos
- Alumnos
- Empleados
- Pedidos
- Clientes

---

# Crear un arreglo de objetos

```js
let alumnos = [

    {
        nombre: "Juan",
        edad: 20,
        nota: 18
    },

    {
        nombre: "Ana",
        edad: 22,
        nota: 15
    },

    {
        nombre: "Luis",
        edad: 19,
        nota: 12
    }

];
```

---

# Acceder a un objeto

```js
console.log(
    alumnos[0]
);
```

Resultado:

```text
{
    nombre: "Juan",
    edad: 20,
    nota: 18
}
```

---

# Acceder a una propiedad

```js
console.log(
    alumnos[0].nombre
);
```

Resultado:

```text
Juan
```

---

# Acceder a varias propiedades

```js
console.log(
    alumnos[1].nombre
);

console.log(
    alumnos[1].nota
);
```

Resultado:

```text
Ana
15
```

---

# Recorrer con for

```js
for (
    let i = 0;
    i < alumnos.length;
    i++
) {

    console.log(
        alumnos[i].nombre
    );

}
```

Resultado:

```text
Juan
Ana
Luis
```

---

# Recorrer con for...of

```js
for (
    let alumno of alumnos
) {

    console.log(
        alumno.nombre
    );

}
```

Resultado:

```text
Juan
Ana
Luis
```

---

# Recorrer con forEach()

```js
alumnos.forEach(
    function(alumno) {

        console.log(
            alumno.nombre
        );

    }
);
```

Resultado:

```text
Juan
Ana
Luis
```

---

# Agregar un objeto

```js
alumnos.push({

    nombre: "Pedro",
    edad: 21,
    nota: 17

});
```

---

# Eliminar un objeto

```js
alumnos.pop();
```

Elimina el último objeto.

---

# Buscar un objeto con find()

```js
let alumno =
    alumnos.find(
        alumno =>
        alumno.nombre === "Ana"
    );

console.log(alumno);
```

Resultado:

```text
{
    nombre: "Ana",
    edad: 22,
    nota: 15
}
```

---

# Filtrar objetos con filter()

```js
let aprobados =
    alumnos.filter(
        alumno =>
        alumno.nota >= 13
    );

console.log(aprobados);
```

Resultado:

```text
[
    { nombre: "Juan", nota: 18 },
    { nombre: "Ana", nota: 15 }
]
```

---

# Transformar datos con map()

```js
let nombres =
    alumnos.map(
        alumno =>
        alumno.nombre
    );

console.log(nombres);
```

Resultado:

```text
[
    "Juan",
    "Ana",
    "Luis"
]
```

---

# Ordenar objetos

```js
alumnos.sort(
    (a, b) =>
    a.nota - b.nota
);

console.table(alumnos);
```

Ordena por nota ascendente.

---

# Mostrar como tabla

```js
console.table(alumnos);
```

Resultado:

```text
┌─────┬────────┬──────┬──────┐
│     │ nombre │ edad │ nota │
├─────┼────────┼──────┼──────┤
│  0  │ Juan   │ 20   │ 18   │
│  1  │ Ana    │ 22   │ 15   │
│  2  │ Luis   │ 19   │ 12   │
└─────┴────────┴──────┴──────┘
```

---

# Ejemplo práctico

```js
let productos = [

    {
        nombre: "Polo",
        precio: 39.90,
        stock: 20
    },

    {
        nombre: "Casaca",
        precio: 89.90,
        stock: 10
    },

    {
        nombre: "Jean",
        precio: 79.90,
        stock: 15
    }

];

for (
    let producto of productos
) {

    console.log(
        producto.nombre +
        " - S/ " +
        producto.precio
    );

}
```

Resultado:

```text
Polo - S/ 39.90
Casaca - S/ 89.90
Jean - S/ 79.90
```

---

# Métodos más utilizados

| Método | Uso |
|----------|----------|
| push() | Agregar objeto |
| pop() | Eliminar objeto |
| find() | Buscar un objeto |
| filter() | Filtrar objetos |
| map() | Transformar datos |
| sort() | Ordenar objetos |
| forEach() | Recorrer |
| for...of | Recorrer |
| console.table() | Mostrar tabla |

---

# Recomendación

Si trabajas con arreglos de objetos, debes dominar principalmente:

```js
for...of
forEach()

find()
filter()
map()

console.table()
```

Porque son los métodos más utilizados para manejar listas de usuarios, productos, alumnos, clientes y registros en aplicaciones web.