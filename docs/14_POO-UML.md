# UML Básico para Programación Orientada a Objetos

Antes de escribir código en POO es recomendable diseñar las clases utilizando UML.

UML significa:

```text
Unified Modeling Language
(Lenguaje Unificado de Modelado)
```

Su objetivo es representar visualmente las clases, atributos, métodos y relaciones que tendrá un sistema.

---

# ¿Por qué usar UML?

Permite responder preguntas antes de programar:

```text
¿Qué objetos existen?

¿Qué información almacenan?

¿Qué acciones realizan?

¿Cómo se relacionan?
```

---

# Ejemplo sin UML

Supongamos que debemos crear una tienda virtual.

Inmediatamente podríamos comenzar a programar:

```js
class Producto {

}

class Cliente {

}

class Pedido {

}
```

Pero todavía no sabemos:

```text
¿Qué propiedades tiene Producto?

¿Qué métodos tiene Cliente?

¿Qué relación existe entre Pedido y Producto?
```

---

# UML de una Clase

La representación más básica tiene tres partes.

```text
-----------------------
|      Producto       |
-----------------------
| nombre              |
| precio              |
| stock               |
-----------------------
| mostrarInfo()       |
| vender()            |
-----------------------
```

---

# Partes de una Clase UML

## Nombre

```text
Producto
```

Representa la clase.

---

## Atributos

```text
nombre
precio
stock
```

Representan los datos que almacenará el objeto.

En JavaScript:

```js
class Producto {

    constructor(
        nombre,
        precio,
        stock
    ) {

        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;

    }

}
```

---

## Métodos

```text
mostrarInfo()
vender()
```

Representan las acciones del objeto.

En JavaScript:

```js
mostrarInfo() {

}

vender() {

}
```

---

# Ejemplo Completo

## UML

```text
-------------------------
|        Alumno         |
-------------------------
| nombre               |
| edad                 |
| nota                 |
-------------------------
| mostrarInfo()        |
| aprobar()            |
-------------------------
```

---

## Código JavaScript

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
            this.nombre
        );

    }

    aprobar() {

        return this.nota >= 13;

    }

}
```

---

# Relación de Herencia

Cuando una clase hereda de otra.

## UML

```text
         Persona
             ▲
             │
          Alumno
```

---

## JavaScript

```js
class Persona {

}

class Alumno
    extends Persona {

}
```

---

# Relación "Tiene un"

También llamada composición.

## UML

```text
Cliente
   │
   │ tiene
   ▼
Carrito
```

---

## JavaScript

```js
class Cliente {

    constructor() {

        this.carrito = [];

    }

}
```

---

# Caso Tienda Virtual

Antes de programar podemos diseñar el sistema.

---

## Producto

```text
-------------------------
|       Producto        |
-------------------------
| nombre               |
| precio               |
| stock                |
-------------------------
| mostrarInfo()        |
| vender()             |
-------------------------
```

---

## Cliente

```text
-------------------------
|       Cliente         |
-------------------------
| nombre               |
| dni                  |
| carrito              |
-------------------------
| agregarProducto()    |
| verCarrito()         |
-------------------------
```

---

## Pedido

```text
-------------------------
|        Pedido         |
-------------------------
| fecha                |
| total                |
-------------------------
| calcularTotal()      |
-------------------------
```

---

# Relación entre Clases

```text
Cliente
   │
   │ realiza
   ▼
Pedido
   │
   │ contiene
   ▼
Producto
```

---

# Del UML al Código

## UML

```text
-------------------------
|       Producto        |
-------------------------
| nombre               |
| precio               |
-------------------------
| mostrarInfo()        |
-------------------------
```

---

## JavaScript

```js
class Producto {

    constructor(
        nombre,
        precio
    ) {

        this.nombre = nombre;
        this.precio = precio;

    }

    mostrarInfo() {

        console.log(
            this.nombre
        );

    }

}
```

---

# Proceso recomendado

Antes de programar cualquier sistema:

```text
1. Identificar objetos.

2. Crear UML.

3. Definir atributos.

4. Definir métodos.

5. Identificar relaciones.

6. Programar las clases.
```

---

# Ejemplo de análisis

Sistema de biblioteca.

## Objetos

```text
Libro
Usuario
Préstamo
```

---

## UML

```text
-------------------
|     Libro       |
-------------------
| titulo          |
| autor           |
-------------------
| prestar()       |
-------------------
```

```text
-------------------
|    Usuario      |
-------------------
| nombre          |
| dni             |
-------------------
| solicitar()     |
-------------------
```

```text
-------------------
|    Prestamo     |
-------------------
| fecha           |
-------------------
| registrar()     |
-------------------
```

---

# Resumen

Antes de programar POO debemos preguntarnos:

```text
¿Qué objetos existen?
```

```text
¿Qué información tienen?
```

```text
¿Qué acciones realizan?
```

```text
¿Cómo se relacionan?
```

El UML permite responder estas preguntas y diseñar el sistema antes de escribir código, evitando errores y mejorando la organización del proyecto.