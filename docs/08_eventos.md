# Eventos en JavaScript

Los eventos permiten ejecutar código cuando ocurre una acción en la página web.

Por ejemplo:

- Un clic en un botón.
- Escribir en un campo de texto.
- Mover el mouse.
- Enviar un formulario.
- Cargar una página.

---

# ¿Qué es un evento?

Un evento es una acción que ocurre sobre un elemento HTML.

```text
Usuario hace clic
↓
Se dispara un evento
↓
JavaScript ejecuta una función
```

---

# Estructura básica

```js
elemento.addEventListener(
    "evento",
    funcion
);
```

### Ejemplo

```js
const boton =
    document.querySelector("#btnGuardar");

boton.addEventListener(
    "click",
    function() {
        console.log("Botón presionado");
    }
);
```

---

# Evento click

Se ejecuta cuando el usuario hace clic.

```js
const boton =
    document.querySelector("#btnEnviar");

boton.addEventListener(
    "click",
    function() {

        console.log(
            "Se hizo clic"
        );

    }
);
```

---

# Evento dblclick

Se ejecuta cuando el usuario hace doble clic.

```js
const boton =
    document.querySelector("#btnGuardar");

boton.addEventListener(
    "dblclick",
    function() {

        console.log(
            "Doble clic"
        );

    }
);
```

---

# Evento mouseover

Se ejecuta cuando el mouse entra sobre un elemento.

```js
const caja =
    document.querySelector(".caja");

caja.addEventListener(
    "mouseover",
    function() {

        console.log(
            "Mouse dentro"
        );

    }
);
```

---

# Evento mouseout

Se ejecuta cuando el mouse sale del elemento.

```js
const caja =
    document.querySelector(".caja");

caja.addEventListener(
    "mouseout",
    function() {

        console.log(
            "Mouse fuera"
        );

    }
);
```

---

# Evento keydown

Se ejecuta cuando se presiona una tecla.

```js
document.addEventListener(
    "keydown",
    function() {

        console.log(
            "Tecla presionada"
        );

    }
);
```

---

# Evento keyup

Se ejecuta cuando se libera una tecla.

```js
document.addEventListener(
    "keyup",
    function() {

        console.log(
            "Tecla liberada"
        );

    }
);
```

---

# Evento input

Se ejecuta cada vez que cambia el valor de un campo.

```js
const nombre =
    document.querySelector("#nombre");

nombre.addEventListener(
    "input",
    function() {

        console.log(
            "Texto cambiado"
        );

    }
);
```

---

# Evento change

Se ejecuta cuando el usuario termina de modificar un valor.

```js
const pais =
    document.querySelector("#pais");

pais.addEventListener(
    "change",
    function() {

        console.log(
            "País seleccionado"
        );

    }
);
```

---

# Evento submit

Se ejecuta cuando se envía un formulario.

```js
const formulario =
    document.querySelector("#formulario");

formulario.addEventListener(
    "submit",
    function() {

        console.log(
            "Formulario enviado"
        );

    }
);
```

---

# Objeto Event

Cada evento genera un objeto especial llamado `event`.

```js
const boton =
    document.querySelector("#btn");

boton.addEventListener(
    "click",
    function(event) {

        console.log(event);

    }
);
```

---

# event.target

Permite saber qué elemento generó el evento.

```js
const boton =
    document.querySelector("#btn");

boton.addEventListener(
    "click",
    function(event) {

        console.log(
            event.target
        );

    }
);
```

---

# preventDefault()

Evita el comportamiento predeterminado del navegador.

Ejemplo:

```js
const formulario =
    document.querySelector("#formulario");

formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        console.log(
            "Formulario controlado por JS"
        );

    }
);
```

---

# Función tradicional

```js
const boton =
    document.querySelector("#btn");

boton.addEventListener(
    "click",
    function() {

        console.log(
            "Hola"
        );

    }
);
```

---

# Arrow Function

```js
const boton =
    document.querySelector("#btn");

boton.addEventListener(
    "click",
    () => {

        console.log(
            "Hola"
        );

    }
);
```

---

# Ejemplo práctico

```js
const boton =
    document.querySelector("#btnCalcular");

boton.addEventListener(
    "click",
    () => {

        let precio = 100;
        let igv = precio * 0.18;

        console.log(
            "IGV:",
            igv
        );

    }
);
```

Resultado:

```text
IGV: 18
```

---

# Eventos más utilizados

| Evento | Descripción |
|----------|----------|
| click | Clic sobre un elemento |
| dblclick | Doble clic |
| mouseover | Mouse entra |
| mouseout | Mouse sale |
| keydown | Presionar tecla |
| keyup | Soltar tecla |
| input | Cambiar contenido |
| change | Cambio confirmado |
| submit | Enviar formulario |

---

# Sintaxis recomendada

Actualmente la forma más utilizada es:

```js
elemento.addEventListener(
    "click",
    () => {

        console.log(
            "Evento ejecutado"
        );

    }
);
```

Porque permite separar HTML y JavaScript, facilitando el mantenimiento y la organización del código.