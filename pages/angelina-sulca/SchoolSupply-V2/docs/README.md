# 📄 **README.md COMPLETO PARA SCHOOLSUPPLY-V2**

---

```markdown
# 🏫 SchoolSupply - Sistema de Gestión de Útiles Escolares

## 📖 Descripción

SchoolSupply es una aplicación web de gestión de venta de útiles escolares desarrollada con **Node.js**, **Express** y **JavaScript** (ES Modules). Permite a los clientes buscar productos, agregarlos al carrito y realizar compras, mientras que el personal puede administrar el catálogo de productos y las sedes.

---

## 🎯 Características

### 🛒 Para Clientes
- Ver catálogo de productos con precios y disponibilidad
- Buscar productos en tiempo real
- Filtrar productos en oferta
- Agregar productos al carrito (por unidades o docenas)
- Seleccionar tipo de cliente (Unitario o Por Docena)
- Elegir método de pago (Efectivo, Tarjeta, Yape, Plin, Transferencia)
- Confirmar compra con recibo detallado en consola
- Ver tiendas (sedes) disponibles

### 👑 Para Personal (Administración)
- **Todos los permisos de Cliente**
- Agregar nuevos productos
- Editar productos existentes
- Eliminar productos
- Agregar nuevas sedes
- Editar sedes existentes
- Eliminar sedes
- Activar/desactivar sedes

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | ¿Para qué? |
| :--- | :--- | :--- |
| Node.js | v24.18.0 | Entorno de ejecución |
| Express | 4.18.2 | Framework web |
| Bootstrap | 5.3.3 | Diseño responsive |
| JavaScript | ES Modules | Lógica de negocio |
| JSON | - | Persistencia de datos |
| Nodemon | 3.0.1 | Recarga automática |

---

## 📁 Estructura del Proyecto

```
SchoolSupply-V2/
│
├── backend/
│   ├── app.js                    # Servidor Express
│   ├── package.json
│   ├── .env                      # Variables de entorno
│   ├── database/
│   │   ├── jsonDB.js             # Conexión a JSON
│   │   └── data.json             # Datos persistentes
│   ├── dtos/
│   │   ├── productoDTO.js        # DTOs de Producto
│   │   ├── sedeDTO.js            # DTOs de Sede
│   │   └── clienteDTO.js         # DTOs de Cliente
│   ├── services/
│   │   ├── productoService.js
│   │   ├── sedeService.js
│   │   └── clienteService.js
│   ├── controllers/
│   │   ├── productoController.js
│   │   ├── sedeController.js
│   │   └── clienteController.js
│   ├── repositories/
│   │   ├── productoRepository.js
│   │   ├── sedeRepository.js
│   │   └── clienteRepository.js
│   ├── routes/
│   │   ├── productoRoutes.js
│   │   ├── sedeRoutes.js
│   │   └── clienteRoutes.js
│   └── middlewares/
│       ├── errorHandler.js       # Manejo global de errores
│       ├── auth.js               # Autenticación simulada
│       └── validator.js          # Validación de datos
│
├── frontend/
│   ├── index.html                # Página de selección de rol
│   ├── cliente.html              # Vista para Clientes
│   ├── personal.html             # Vista para Personal
│   ├── css/
│   │   └── styles.css            # Estilos personalizados
│   └── js/
│       ├── main.js               # Punto de entrada común
│       ├── ui-cliente.js         # Lógica de Cliente
│       ├── ui-personal.js        # Lógica de Personal
│       └── models/               # Modelos POO
│           ├── carrito.js
│           ├── cliente.js
│           ├── clienteunitario.js
│           ├── clientepordocena.js
│           ├── compra.js
│           ├── descuento.js
│           └── ...
│
├── docs/
│   └── README.md                 # Este archivo
│
└── api-requests.http             # Peticiones con REST Client
```

---

## 🚀 Instalación y Ejecución

### 🔹 Requisitos previos
- Node.js v14 o superior
- NPM v6 o superior

### 🔹 Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Tilusiono/2026-II-Desarrollo-de-Interfaces-1.git

# 2. Ir a la carpeta del proyecto
cd 2026-II-Desarrollo-de-Interfaces-1/pages/angelina-sulca/SchoolSupply-V2

# 3. Ir al backend
cd backend

# 4. Instalar dependencias
npm install

# 5. Ejecutar el servidor
npm run dev
```

### 🔹 Acceso a la aplicación

| Página | URL |
| :--- | :--- |
| Selección de rol | `http://localhost:7878` |
| Cliente | `http://localhost:7878/cliente.html` |
| Personal | `http://localhost:7878/personal.html` |
| API | `http://localhost:7878/api/productos` |

---

## 🔑 Credenciales de Prueba

### 👑 Personal
| Campo | Valor |
| :--- | :--- |
| **Email** | `admin@schoolsupply.com` |
| **Contraseña** | `admin123` |

### 👤 Cliente
| Campo | Valor |
| :--- | :--- |
| **Email** | `cliente@schoolsupply.com` |
| **Contraseña** | `cliente123` |

---

## 📋 Rutas de la API

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/productos` | Obtener todos los productos |
| **GET** | `/api/productos/:id` | Obtener producto por ID |
| **GET** | `/api/productos/ofertas` | Obtener productos en oferta |
| **GET** | `/api/productos/buscar?q=` | Buscar productos |
| **POST** | `/api/productos` | Crear producto |
| **PUT** | `/api/productos/:id` | Actualizar producto |
| **DELETE** | `/api/productos/:id` | Eliminar producto |
| **GET** | `/api/sedes` | Obtener todas las sedes |
| **GET** | `/api/sedes/:id` | Obtener sede por ID |
| **GET** | `/api/sedes/codigo/:codigo` | Obtener sede por código |
| **POST** | `/api/sedes` | Crear sede |
| **PUT** | `/api/sedes/:id` | Actualizar sede |
| **DELETE** | `/api/sedes/:id` | Eliminar sede |
| **GET** | `/api/clientes` | Obtener todos los clientes |
| **GET** | `/api/clientes/:id` | Obtener cliente por ID |
| **POST** | `/api/clientes` | Crear cliente |
| **PUT** | `/api/clientes/:id` | Actualizar cliente |
| **DELETE** | `/api/clientes/:id` | Eliminar cliente |
| **POST** | `/api/auth/login` | Iniciar sesión |

---

## 🗄️ Base de Datos

El proyecto utiliza **JSON** como sistema de persistencia en lugar de SQLite debido a problemas de compilación en el entorno de desarrollo. La estructura de datos replica un modelo relacional con las siguientes entidades:

- **productos**: ID, nombre, marca, color, calidad, precio_unitario, precio_docena, stock, activo, categoria, en_oferta, fecha_registro
- **clientes**: ID, nombre, correo, telefono, direccion, tipo_cliente, fecha_registro
- **sedes**: ID, codigo, nombre, direccion, distrito, telefono, encargado, capacidad, horario_apertura, horario_cierre, activo, fecha_registro

---

## 🧪 Pruebas

### Con REST Client

1. Instala la extensión **REST Client** en VS Code
2. Abre el archivo `api-requests.http`
3. Haz clic en `[Send Request]` para ejecutar cada petición

### Con Postman/Insomnia

Importa el archivo de colección desde la carpeta `docs/` (si está disponible).

---

## 📊 Diagrama Entidad-Relación

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    productos    │     │    clientes     │     │     sedes       │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ nombre          │     │ nombre          │     │ codigo          │
│ marca           │     │ correo (UNIQUE) │     │ nombre          │
│ color           │     │ telefono        │     │ direccion       │
│ calidad         │     │ direccion       │     │ distrito        │
│ precio_unitario │     │ tipo_cliente    │     │ telefono        │
│ precio_docena   │     │ fecha_registro  │     │ encargado       │
│ stock           │     └─────────────────┘     │ capacidad       │
│ activo          │           │                 │ horario_apertura │
│ categoria       │           │                 │ horario_cierre   │
│ en_oferta       │           │                 │ activo          │
│ fecha_registro  │           │                 │ fecha_registro  │
└─────────────────┘           │                 └─────────────────┘
         │                     │
         │                     │
         ▼                     ▼
┌─────────────────┐     ┌─────────────────┐
│  ventas         │     │ detalle_ventas  │
├─────────────────┤     ├─────────────────┤
│ id (PK)         │◄─── │ id (PK)         │
│ cliente_id (FK) │     │ venta_id (FK)   │
│ fecha           │     │ producto_id (FK)│
│ subtotal        │     │ cantidad        │
│ descuento       │     │ precio_unitario │
│ total           │     │ subtotal        │
│ metodo_pago     │     └─────────────────┘
│ estado          │
└─────────────────┘
```

---

## 👨‍💻 Autor

**Nombre:** Angelina Amy Sulca Cuba  
**Curso:** Desarrollo de Interfaces I  
**Institución:** IDAT  
**Año:** 2026

---

## 📝 Notas

- Este proyecto fue desarrollado con fines educativos
- Los precios y productos son simulados
- La base de datos JSON es una alternativa a SQLite debido a limitaciones del entorno

---

## 📄 Licencia

Este proyecto es de uso educativo y no tiene fines comerciales.

---

**¡Gracias por visitar mi proyecto!** 🚀