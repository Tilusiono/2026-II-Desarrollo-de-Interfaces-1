# Conversión de Variables en JavaScript

La conversión de variables consiste en transformar un dato de un tipo a otro.

Por ejemplo:

- Convertir texto a número.
- Convertir número a texto.
- Convertir valores a booleanos.

---

# ¿Por qué es importante?

Muchas veces los datos ingresados por el usuario se reciben como texto.

```js
let edad = "25";

console.log(typeof edad);
```

Resultado:

```text
string
```

Si queremos realizar operaciones matemáticas debemos convertir el dato.

---

# Convertir a Number

Se utiliza la función `Number()`.

```js
let edad = "25";

let edadNumero = Number(edad);

console.log(edadNumero);
console.log(typeof edadNumero);
```

Resultado:

```text
25
number
```


---

# Convertir a String

Se utiliza la función `String()`.

```js
let edad = 25;

let edadTexto = String(edad);
//let edadTexto = numero.toString();

console.log(edadTexto);
console.log(typeof edadTexto);
```

Resultado:

```text
25
string
```

---

# Convertir a Boolean

Se utiliza la función `Boolean()`.

```js
let valor = 1;

let estado = Boolean(valor);

console.log(estado);
```

Resultado:

```text
true
```

---

## Valores que producen false

```js
Boolean(0);
Boolean("");
Boolean(null);
Boolean(undefined);
Boolean(NaN);
```

Resultado:

```text
false
```

---

## Valores que producen true

```js
Boolean(1);
Boolean("Hola");
Boolean(100);
Boolean([]);
Boolean({});
```

Resultado:

```text
true
```

---

# parseInt()

Convierte texto a número entero.

```js
let numero = "25";

let resultado = parseInt(numero);

console.log(resultado);
```

Resultado:

```text
25
```

---

# parseFloat()

Convierte texto a número decimal.

```js
let precio = "99.90";

let resultado = parseFloat(precio);

console.log(resultado);
```

Resultado:

```text
99.90
```

---

# Conversión implícita

JavaScript a veces convierte automáticamente los tipos de datos.

```js
let resultado = "10" * 2;
//let resultado = "10" + 2;
console.log(resultado);
```

Resultado:

```text
20
```

JavaScript convierte automáticamente `"10"` a número.

---


# Number vs parseInt vs parseFloat

```js
let valor = "25.75";

console.log(Number(valor));
console.log(parseInt(valor));
console.log(parseFloat(valor));
```

Resultado:

```text
25.75
25
25.75
```

| Método | Resultado |
|----------|----------|
| Number("25.75") | 25.75 |
| parseInt("25.75") | 25 |
| parseFloat("25.75") | 25.75 |

---

# typeof para verificar conversiones

```js
let numero = "100";

console.log(typeof numero);

numero = Number(numero);

console.log(typeof numero);
```

Resultado:

```text
string
number
```

---

# Resumen

| Conversión | Método |
|------------|----------|
| Texto → Número | Number() |
| Texto → Entero | parseInt() |
| Texto → Decimal | parseFloat() |
| Número → Texto | String() |
| Número → Texto | toString() |
| Cualquier valor → Boolean | Boolean() |

---

# Buenas prácticas

✅ Verificar siempre el tipo de dato.

```js
console.log(typeof valor);
```
