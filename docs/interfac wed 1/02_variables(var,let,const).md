# Declaración de variables en JavaScript

JavaScript permite almacenar información utilizando variables y constantes.

---

## let

Se utiliza para declarar variables cuyo valor puede cambiar durante la ejecución del programa.

```js
let nombre = "Daniel";

nombre = "Bernabé";

console.log(nombre);
```

### Características

- Puede reasignarse.
- Tiene alcance de bloque (`{}`).
- Es la forma más utilizada actualmente.

```js
let edad = 25;

if (true) {
    let mensaje = "Hola";
}

console.log(edad);      // Correcto
// console.log(mensaje); // Error
```

---

## const

Se utiliza para declarar constantes.

```js
const PI = 3.1416;

console.log(PI);
```

### Características

- No puede reasignarse.
- Tiene alcance de bloque.
- Debe inicializarse al momento de declararse.

```js
const PAIS = "Perú";

// Error
// PAIS = "Chile";
```

---

## var

Forma antigua de declarar variables.

```js
var nombre = "Daniel";

nombre = "Bernabé";

console.log(nombre);
```

### Características

- Puede reasignarse.
- No respeta correctamente el alcance de bloque.
- Se recomienda evitar su uso en proyectos modernos.

```js
if (true) {
    var mensaje = "Hola";
}

console.log(mensaje); // Funciona
```

---

# Diferencia entre let, const y var

| Característica | var | let | const |
|------------|------|------|------|
| Puede cambiar valor | Sí | Sí | No |
| Alcance de bloque | No | Sí | Sí |
| Uso recomendado | No | Sí | Sí |
| Debe inicializarse | No | No | Sí |

---

# Tipos de datos más comunes

## String

Representa texto.

```js
let nombre = "Daniel";
let curso = 'JavaScript';
```

---

## Number

Representa números enteros o decimales.

```js
let edad = 25;
let precio = 19.99;
```

---

## Boolean

Representa verdadero o falso.

```js
let activo = true;
let aprobado = false;
```

---

## Undefined

Variable declarada pero sin valor asignado.

```js
let apellido;

console.log(apellido);
```

Resultado:

```text
undefined
```

---

## Null

Representa ausencia intencional de valor.

```js
let usuario = null;
```

---

## Array

Colección de elementos almacenados en una sola variable.

```js
let cursos = ["HTML", "CSS", "JavaScript"];
```

Acceso a elementos:

```js
console.log(cursos[0]); // HTML
console.log(cursos[1]); // CSS
```

---

## Object

Conjunto de propiedades y valores.

```js
let persona = {
    nombre: "Daniel",
    edad: 25,
    pais: "Perú"
};
```

Acceso a propiedades:

```js
console.log(persona.nombre);
console.log(persona.edad);
```

---

## Function

Las funciones también son objetos en JavaScript.

```js
function saludar() {
    console.log("Hola");
}
```

---

## BigInt

Permite trabajar con números enteros extremadamente grandes.

```js
let numeroGrande = 123456789012345678901234567890n;

console.log(typeof numeroGrande);
```

Resultado:

```text
bigint
```

---

## Symbol

Permite crear identificadores únicos.

```js
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2);
```

Resultado:

```text
false
```

---

# Valores especiales

## NaN (Not a Number)

Representa una operación matemática inválida.

```js
let resultado = "hola" * 5;

console.log(resultado);
```

Resultado:

```text
NaN
```

---

## Infinity

Representa infinito.

```js
let resultado = 10 / 0;

console.log(resultado);
```

Resultado:

```text
Infinity
```

---

# typeof

Permite conocer el tipo de dato de una variable.

```js
let nombre = "Daniel";
let edad = 25;
let activo = true;

console.log(typeof nombre);
console.log(typeof edad);
console.log(typeof activo);
```

Resultado:

```text
string
number
boolean
```

---

# Tipos primitivos

Son los tipos de datos básicos que almacenan directamente un valor.

- String
- Number
- Boolean
- Undefined
- Null
- BigInt
- Symbol

```js
let texto = "Hola";
let numero = 100;
let estado = true;
let dato;
let vacio = null;
let grande = 100n;
let identificador = Symbol("id");
```

---

# Tipos de referencia

Almacenan referencias a objetos en memoria.

- Object
- Array
- Function

```js
let persona = {
    nombre: "Daniel"
};

let cursos = ["HTML", "CSS"];

function saludar() {
    console.log("Hola");
}
```

---

# Resumen de tipos de datos

| Tipo | Ejemplo |
|--------|----------|
| String | `"Hola"` |
| Number | `25`, `19.99` |
| Boolean | `true`, `false` |
| Undefined | `let x;` |
| Null | `null` |
| Array | `[1,2,3]` |
| Object | `{nombre:"Juan"}` |
| Function | `function(){}` |
| BigInt | `123456789n` |
| Symbol | `Symbol("id")` |

---

# Recomendación actual

Utilizar:

```js
const PI = 3.1416;
const PAIS = "Perú";

let nombre = "Daniel";
let edad = 25;
```

Evitar en proyectos modernos:

```js
var nombre = "Daniel";
```

La práctica recomendada actualmente es:

- Usar **const** por defecto.
- Usar **let** cuando el valor necesite cambiar.
- Evitar **var**.