# Clase vs Objeto en JavaScript

Antes de aprender Programación Orientada a Objetos (POO), es importante comprender la diferencia entre una clase y un objeto.

---

# ¿Qué es una Clase?

Una clase es una plantilla o modelo que define cómo serán los objetos.

La clase describe:

- Qué características tendrá el objeto.
- Qué acciones podrá realizar.

Una clase por sí sola no almacena información real.

```js
class Producto {

}
```

En este momento solo existe la definición de la clase.

Todavía no existe ningún producto.

---

# Analogía

Piensa en los planos de una casa.

```text
Clase
↓
Plano de la casa
```

El plano describe:

- Cantidad de habitaciones.
- Cantidad de pisos.
- Distribución.

Pero todavía no existe ninguna casa construida.

---

# ¿Qué es un Objeto?

Un objeto es una instancia creada a partir de una clase.

Un objeto sí contiene información real.

```js
class Producto {

}

let producto1 = new Producto();
```

Ahora sí existe un objeto.

---

# Analogía

```text
Clase
↓
Plano

Objeto
↓
Casa construida
```

La clase define.

El objeto existe.

---

# Clase con propiedades

```js
class Producto {

    constructor(nombre, precio) {

        this.nombre = nombre;
        this.precio = precio;

    }

}
```

La clase indica que todos los productos tendrán:

```text
nombre
precio
```

---

# Crear objetos

```js
class Producto {

    constructor(nombre, precio) {

        this.nombre = nombre;
        this.precio = precio;

    }

}

let producto1 =
    new Producto(
        "Polo",
        59.90
    );

let producto2 =
    new Producto(
        "Casaca",
        129.90
    );
```

---

# Visualización

```text
Clase Producto
------------------
nombre
precio
------------------

       ↓

Objeto 1
------------------
nombre = Polo
precio = 59.90
------------------

Objeto 2
------------------
nombre = Casaca
precio = 129.90
------------------
```

---

# Cada objeto tiene valores diferentes

```js
console.log(
    producto1.nombre
);

console.log(
    producto2.nombre
);
```

Resultado:

```text
Polo
Casaca
```

Ambos pertenecen a la misma clase.

Pero contienen información diferente.

---

# Una clase puede crear muchos objetos

```js
let producto1 =
    new Producto(
        "Polo",
        59.90
    );

let producto2 =
    new Producto(
        "Casaca",
        129.90
    );

let producto3 =
    new Producto(
        "Jean",
        89.90
    );
```

Resultado:

```text
Producto
   ↓
producto1
producto2
producto3
```

---

# Clase con métodos

Las clases también pueden definir acciones.

```js
class Producto {

    constructor(nombre, precio) {

        this.nombre = nombre;
        this.precio = precio;

    }

    mostrarInfo() {

        console.log(
            this.nombre +
            " - S/ " +
            this.precio
        );

    }

}
```

---

# Uso del método

```js
let producto1 =
    new Producto(
        "Polo",
        59.90
    );

producto1.mostrarInfo();
```

Resultado:

```text
Polo - S/ 59.90
```

---

# Diferencia principal

| Clase | Objeto |
|---------|---------|
| Es una plantilla | Es una instancia |
| Define características | Contiene datos reales |
| Se crea con class | Se crea con new |
| No representa un elemento específico | Representa una entidad específica |

---

# Ejemplo del mundo real

## Clase

```text
Alumno
```

Características:

```text
nombre
edad
nota
```

---

## Objetos

```text
Alumno 1
nombre = Juan
edad = 20
nota = 18
```

```text
Alumno 2
nombre = Ana
edad = 22
nota = 15
```

---

# Ejemplo completo

```js
class Alumno {

    constructor(
        nombre,
        edad,
        nota
    ) {

        this.nombre = nombre;
        this.edad = edad;
        this.nota = nota;

    }

    mostrarInfo() {

        console.log(
            this.nombre +
            " tiene " +
            this.edad +
            " años"
        );

    }

}

let alumno1 =
    new Alumno(
        "Juan",
        20,
        18
    );

let alumno2 =
    new Alumno(
        "Ana",
        22,
        15
    );

alumno1.mostrarInfo();
alumno2.mostrarInfo();
```

Resultado:

```text
Juan tiene 20 años
Ana tiene 22 años
```

---

# Resumen

```text
Clase
↓
Plantilla

Objeto
↓
Instancia creada desde la plantilla
```

```js
class Producto {

}

let producto =
    new Producto();
```

En POO:

- La clase define cómo será un objeto.
- El objeto representa una entidad real creada a partir de la clase.
- Una misma clase puede generar muchos objetos diferentes.