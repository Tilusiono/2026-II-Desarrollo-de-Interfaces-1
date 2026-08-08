# Operadores Matemáticos y Lógicos en JavaScript

Los operadores permiten realizar operaciones sobre variables y valores.

Se dividen principalmente en:

- Operadores matemáticos (aritméticos)
- Operadores de comparación
- Operadores lógicos

---

# Operadores Matemáticos

Se utilizan para realizar cálculos numéricos.

## Suma (+)

```js
let a = 10;
let b = 5;

console.log(a + b);
```

Resultado:

```text
15
```

---

## Resta (-)

```js
let a = 10;
let b = 5;

console.log(a - b);
```

Resultado:

```text
5
```

---

## Multiplicación (*)

```js
let a = 10;
let b = 5;

console.log(a * b);
```

Resultado:

```text
50
```

---

## División (/)

```js
let a = 10;
let b = 5;

console.log(a / b);
```

Resultado:

```text
2
```

---

## Módulo (%)

Obtiene el residuo de una división.

```js
let a = 10;
let b = 3;

console.log(a % b);
```

Resultado:

```text
1
```

---

## Potencia (**)

```js
let numero = 2;

console.log(numero ** 3);
```

Resultado:

```text
8
```

---

# Operadores de Incremento y Decremento

## Incremento (++)

Aumenta una unidad.

```js
let contador = 1;

contador++;

console.log(contador);
```

Resultado:

```text
2
```

---

## Decremento (--)

Disminuye una unidad.

```js
let contador = 5;

contador--;

console.log(contador);
```

Resultado:

```text
4
```

---

# Operadores de Asignación

## Asignación simple (=)

```js
let edad = 25;
```

---

## Suma y asignación (+=)

```js
let puntos = 10;

puntos += 5;

console.log(puntos);
```

Resultado:

```text
15
```

---

## Resta y asignación (-=)

```js
let saldo = 100;

saldo -= 20;

console.log(saldo);
```

Resultado:

```text
80
```

---

## Multiplicación y asignación (*=)

```js
let cantidad = 5;

cantidad *= 2;

console.log(cantidad);
```

Resultado:

```text
10
```

---

## División y asignación (/=)

```js
let total = 100;

total /= 2;

console.log(total);
```

Resultado:

```text
50
```

---

# Operadores de Comparación

Comparan valores y devuelven:

```text
true
```

o

```text
false
```

---

## Igual que (==)

Compara únicamente el valor.

```js
console.log(5 == "5");
```

Resultado:

```text
true
```

---

## Estrictamente igual (===)

Compara valor y tipo de dato.

```js
console.log(5 === "5");
```

Resultado:

```text
false
```

---

## Diferente (!=)

```js
console.log(10 != 5);
```

Resultado:

```text
true
```

---

## Estrictamente diferente (!==)

```js
console.log(10 !== "10");
```

Resultado:

```text
true
```

---

## Mayor que (>)

```js
console.log(20 > 10);
```

Resultado:

```text
true
```

---

## Menor que (<)

```js
console.log(10 < 20);
```

Resultado:

```text
true
```

---

## Mayor o igual (>=)

```js
console.log(18 >= 18);
```

Resultado:

```text
true
```

---

## Menor o igual (<=)

```js
console.log(15 <= 20);
```

Resultado:

```text
true
```

---

# Operadores Lógicos

Permiten combinar condiciones.

---

## AND (&&)

Todas las condiciones deben ser verdaderas.

```js
let edad = 20;
let tieneDNI = true;

console.log(
    edad >= 18 && tieneDNI
);
```

Resultado:

```text
true
```

---

### Tabla de verdad AND

| A | B | Resultado |
|---|---|---|
| true | true | true |
| true | false | false |
| false | true | false |
| false | false | false |

---

## OR (||)

Al menos una condición debe ser verdadera.

```js
let esAdministrador = false;
let esProfesor = true;

console.log(
    esAdministrador || esProfesor
);
```

Resultado:

```text
true
```

---

### Tabla de verdad OR

| A | B | Resultado |
|---|---|---|
| true | true | true |
| true | false | true |
| false | true | true |
| false | false | false |

---

## NOT (!)

Invierte el valor lógico.

```js
let activo = true;

console.log(!activo);
```

Resultado:

```text
false
```

---

### Tabla de verdad NOT

| Valor | Resultado |
|---------|---------|
| true | false |
| false | true |

---

# Resumen

## Matemáticos

| Operador | Descripción |
|----------|------------|
| + | Suma |
| - | Resta |
| * | Multiplicación |
| / | División |
| % | Módulo |
| ** | Potencia |
| ++ | Incremento |
| -- | Decremento |

---

## Comparación

| Operador | Descripción |
|----------|------------|
| == | Igual |
| === | Estrictamente igual |
| != | Diferente |
| !== | Estrictamente diferente |
| > | Mayor que |
| < | Menor que |
| >= | Mayor o igual |
| <= | Menor o igual |

---

## Lógicos

| Operador | Descripción |
|----------|------------|
| && | AND |
| \|\| | OR |
| ! | NOT |

---

# Recomendación

En proyectos modernos se recomienda utilizar:

```js
===
!==
```

en lugar de:

```js
==
!=
```

porque comparan tanto el valor como el tipo de dato y evitan errores inesperados.