# Palabras clave utilizadas en POO

Antes de analizar el ejemplo completo debemos comprender las palabras clave más utilizadas en Programación Orientada a Objetos.

---

# class

Permite crear una clase.

Una clase es una plantilla para construir objetos.

```js
class Producto {

}
```

La clase aún no crea objetos.

Solo define cómo serán.

---

# new

Permite crear un objeto a partir de una clase.

```js
class Producto {

}

let producto1 = new Producto();
```

Resultado:

```text
Se crea una nueva instancia de Producto
```

---

# Instancia

Es un objeto creado desde una clase.

```js
let producto1 = new Producto();
let producto2 = new Producto();
```

Ambos son instancias.

```text
Clase
 ↓
Producto

Instancias
 ↓
producto1
producto2
```

---

# constructor

Método especial que se ejecuta automáticamente cuando se crea un objeto.

```js
class Producto {

    constructor() {
        console.log("Producto creado");
    }

}

let producto1 = new Producto();
```

Resultado:

```text
Producto creado
```

---

# Parámetros

Son valores que recibe el constructor.

```js
class Producto {

    constructor(nombre) {
        console.log(nombre);
    }

}

new Producto("Polo");
```

Resultado:

```text
Polo
```

---

# this

Hace referencia al objeto actual.

```js
class Producto {

    constructor(nombre) {

        this.nombre = nombre;

    }

}

let producto1 =
    new Producto("Polo");

console.log(
    producto1.nombre
);
```

Resultado:

```text
Polo
```

Visualmente:

```text
this.nombre
     ↓
producto1.nombre
```

---

# Método

Es una función dentro de una clase.

```js
class Producto {

    mostrarInfo() {

        console.log(
            "Mostrando producto"
        );

    }

}
```

Uso:

```js
let producto =
    new Producto();

producto.mostrarInfo();
```

---

# Propiedad

Es una característica del objeto.

```js
class Producto {

    constructor(nombre, precio) {

        this.nombre = nombre;
        this.precio = precio;

    }

}
```

Propiedades:

```text
nombre
precio
```

---

# extends

Permite heredar de otra clase.

```js
class Producto {

}

class Polo extends Producto {

}
```

Visualmente:

```text
Producto
   ↑
   │
 Polo
```

Polo hereda todo lo que tiene Producto.

---

# super

Permite llamar al constructor de la clase padre.

```js
class Producto {

    constructor(nombre) {
        this.nombre = nombre;
    }

}

class Polo extends Producto {

    constructor(nombre) {

        super(nombre);

    }

}
```

Visualmente:

```text
Polo
 ↓
super(nombre)
 ↓
Producto
 ↓
this.nombre = nombre
```

Sin `super()` el programa genera error.

---

# Herencia

Permite reutilizar código.

```js
class Producto {

    mostrarInfo() {

        console.log(
            "Información"
        );

    }

}

class Polo extends Producto {

}
```

Uso:

```js
let polo =
    new Polo();

polo.mostrarInfo();
```

Resultado:

```text
Información
```

Aunque el método está en Producto.

---

# Sobrescritura (Override)

Consiste en reemplazar un método heredado.

```js
class Producto {

    mostrarInfo() {

        console.log(
            "Producto"
        );

    }

}

class Polo extends Producto {

    mostrarInfo() {

        console.log(
            "Polo"
        );

    }

}
```

Resultado:

```text
Polo
```

---

# Polimorfismo

Un mismo método produce resultados diferentes.

```js
class Perro {

    sonido() {

        console.log("Guau");

    }

}

class Gato {

    sonido() {

        console.log("Miau");

    }

}
```

Uso:

```js
let perro =
    new Perro();

let gato =
    new Gato();

perro.sonido();
gato.sonido();
```

Resultado:

```text
Guau
Miau
```

---

# # (Propiedad Privada)

Protege información.

```js
class Cuenta {

    #saldo = 1000;

}
```

No puede accederse desde fuera.

```js
let cuenta =
    new Cuenta();

// cuenta.#saldo
```

Resultado:

```text
Error
```

---

# Encapsulamiento

Consiste en ocultar datos y permitir acceso mediante métodos.

```js
class Cuenta {

    #saldo;

    constructor(saldo) {

        this.#saldo = saldo;

    }

    obtenerSaldo() {

        return this.#saldo;

    }

}
```

Uso:

```js
let cuenta =
    new Cuenta(500);

console.log(
    cuenta.obtenerSaldo()
);
```

Resultado:

```text
500
```

---

# Flujo completo

```text
class Producto
        ↓
constructor()
        ↓
new Producto()
        ↓
Objeto creado
        ↓
this.nombre
        ↓
Propiedad almacenada
        ↓
producto.mostrarInfo()
        ↓
Método ejecutado
```

---

# Resumen

| Palabra | Función |
|----------|----------|
| class | Crear una clase |
| new | Crear un objeto |
| constructor | Inicializar datos |
| this | Referencia al objeto actual |
| propiedad | Dato del objeto |
| método | Función del objeto |
| extends | Heredar de otra clase |
| super | Llamar al constructor padre |
| override | Reemplazar método heredado |
| # | Propiedad privada |
| encapsulamiento | Proteger datos |
| polimorfismo | Mismo método, diferente comportamiento |
| instancia | Objeto creado desde una clase |
