# Programación Orientada a Objetos en JavaScript

La Programación Orientada a Objetos (POO) es un paradigma de programación que organiza el código mediante objetos.

Un objeto representa una entidad del mundo real que posee:

- Propiedades (datos)
- Métodos (acciones)

La POO busca que el código sea:

- Más organizado
- Más reutilizable
- Más fácil de mantener
- Más fácil de escalar

---

# Los 4 pilares de la POO

La Programación Orientada a Objetos se basa en cuatro características fundamentales.

## 1. Abstracción

Consiste en mostrar únicamente la información importante y ocultar los detalles innecesarios.

Ejemplo:

```js
auto.encender();
```

El usuario utiliza el método sin conocer cómo funciona internamente el motor.

---

## 2. Encapsulamiento

Consiste en proteger los datos de un objeto para evitar modificaciones indebidas.

Ejemplo:

```js
class Cuenta {

    #saldo;

    constructor(saldo) {
        this.#saldo = saldo;
    }

}
```

La propiedad `#saldo` queda protegida.

---

## 3. Herencia

Permite que una clase reutilice propiedades y métodos de otra clase.

Ejemplo:

```js
class Persona {

}

class Alumno extends Persona {

}
```

La clase `Alumno` hereda características de `Persona`.

---

## 4. Polimorfismo

Permite que un mismo método tenga comportamientos diferentes según el objeto que lo utilice.

Ejemplo:

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

Aunque ambos utilizan el método `sonido()`, el resultado es diferente.

---

# Conceptos básicos de la POO

Antes de aprender clases y herencia debemos conocer:

- Objeto
- Propiedad
- Método
- Clase
- Constructor
- Instancia

Estos conceptos forman la base de la Programación Orientada a Objetos.