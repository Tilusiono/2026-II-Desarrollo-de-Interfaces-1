// ============================================
// MIDDLEWARE: Validación de datos
// ============================================

// ============================================
// VALIDAR PRODUCTO
// ============================================

export const validarProducto = (req, res, next) => {
    const { nombre, marca, precio_unitario, stock, categoria, descripcion } = req.body;
    const errors = [];

    // Validar nombre
    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es obligatorio');
    } else if (nombre.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
    } else if (nombre.length > 100) {
        errors.push('El nombre no puede tener más de 100 caracteres');
    }

    // Validar marca
    if (!marca || marca.trim() === '') {
        errors.push('La marca es obligatoria');
    } else if (marca.length < 2) {
        errors.push('La marca debe tener al menos 2 caracteres');
    }

    // Validar precio unitario
    if (precio_unitario === undefined || precio_unitario === null) {
        errors.push('El precio unitario es obligatorio');
    } else if (isNaN(precio_unitario) || precio_unitario <= 0) {
        errors.push('El precio unitario debe ser un número mayor a 0');
    } else if (precio_unitario > 999999) {
        errors.push('El precio unitario no puede ser mayor a 999,999');
    }

    // Validar precio por docena (opcional)
    if (req.body.precio_docena !== undefined && req.body.precio_docena !== null) {
        if (isNaN(req.body.precio_docena) || req.body.precio_docena < 0) {
            errors.push('El precio por docena debe ser un número mayor o igual a 0');
        }
    }

    // Validar stock (opcional, pero si viene, debe ser número positivo)
    if (stock !== undefined && stock !== null) {
        if (isNaN(stock) || stock < 0) {
            errors.push('El stock debe ser un número mayor o igual a 0');
        } else if (stock > 999999) {
            errors.push('El stock no puede ser mayor a 999,999');
        }
    }

    // Validar categoría (opcional)
    if (categoria && categoria.trim() === '') {
        errors.push('La categoría no puede estar vacía');
    } else if (categoria && categoria.length > 50) {
        errors.push('La categoría no puede tener más de 50 caracteres');
    }

    // Validar descripción (opcional)
    if (descripcion && descripcion.length > 500) {
        errors.push('La descripción no puede tener más de 500 caracteres');
    }

    // Si hay errores, responder con 400
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    // Si todo está bien, pasar al siguiente middleware/controlador
    next();
};

// ============================================
// VALIDAR SEDE
// ============================================

export const validarSede = (req, res, next) => {
    const { codigo, nombre, direccion, distrito, telefono, encargado, capacidad } = req.body;
    const errors = [];

    // Validar código
    if (!codigo || codigo.trim() === '') {
        errors.push('El código es obligatorio');
    } else if (codigo.length < 3) {
        errors.push('El código debe tener al menos 3 caracteres (ej: S001)');
    } else if (codigo.length > 10) {
        errors.push('El código no puede tener más de 10 caracteres');
    } else if (!/^[A-Za-z0-9\-]+$/.test(codigo)) {
        errors.push('El código solo puede contener letras, números y guiones');
    }

    // Validar nombre
    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es obligatorio');
    } else if (nombre.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
    } else if (nombre.length > 100) {
        errors.push('El nombre no puede tener más de 100 caracteres');
    }

    // Validar dirección
    if (!direccion || direccion.trim() === '') {
        errors.push('La dirección es obligatoria');
    } else if (direccion.length < 5) {
        errors.push('La dirección debe tener al menos 5 caracteres');
    } else if (direccion.length > 200) {
        errors.push('La dirección no puede tener más de 200 caracteres');
    }

    // Validar distrito (opcional)
    if (distrito && distrito.length > 50) {
        errors.push('El distrito no puede tener más de 50 caracteres');
    }

    // Validar capacidad (opcional, pero si viene, debe ser número positivo)
    if (capacidad !== undefined && capacidad !== null) {
        if (isNaN(capacidad) || capacidad < 0) {
            errors.push('La capacidad debe ser un número mayor o igual a 0');
        } else if (capacidad > 99999) {
            errors.push('La capacidad no puede ser mayor a 99,999');
        }
    }

    // Validar teléfono (opcional, formato básico)
    if (telefono && telefono.trim() !== '') {
        const telefonoLimpio = telefono.replace(/\s/g, '');
        if (!/^[0-9\-+()]+$/.test(telefonoLimpio)) {
            errors.push('El teléfono contiene caracteres inválidos');
        } else if (telefonoLimpio.length < 6 || telefonoLimpio.length > 15) {
            errors.push('El teléfono debe tener entre 6 y 15 dígitos');
        }
    }

    // Validar encargado (opcional)
    if (encargado && encargado.length > 100) {
        errors.push('El nombre del encargado no puede tener más de 100 caracteres');
    }

    // Si hay errores, responder con 400
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    next();
};

// ============================================
// VALIDAR CLIENTE
// ============================================

export const validarCliente = (req, res, next) => {
    const { nombre, correo, telefono, direccion, tipo_cliente } = req.body;
    const errors = [];

    // Validar nombre
    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es obligatorio');
    } else if (nombre.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
    } else if (nombre.length > 100) {
        errors.push('El nombre no puede tener más de 100 caracteres');
    }

    // Validar correo (opcional, pero si viene, validar formato)
    if (correo && correo.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            errors.push('El correo electrónico no tiene un formato válido');
        } else if (correo.length > 100) {
            errors.push('El correo no puede tener más de 100 caracteres');
        }
    }

    // Validar teléfono (opcional)
    if (telefono && telefono.trim() !== '') {
        const telefonoLimpio = telefono.replace(/\s/g, '');
        if (!/^[0-9\-+()]+$/.test(telefonoLimpio)) {
            errors.push('El teléfono contiene caracteres inválidos');
        } else if (telefonoLimpio.length < 6 || telefonoLimpio.length > 15) {
            errors.push('El teléfono debe tener entre 6 y 15 dígitos');
        }
    }

    // Validar dirección (opcional)
    if (direccion && direccion.length > 200) {
        errors.push('La dirección no puede tener más de 200 caracteres');
    }

    // Validar tipo de cliente
    if (tipo_cliente) {
        const tiposValidos = ['Unitario', 'Por Docena'];
        if (!tiposValidos.includes(tipo_cliente)) {
            errors.push(`El tipo de cliente debe ser: ${tiposValidos.join(', ')}`);
        }
    }

    // Si hay errores, responder con 400
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    next();
};

// ============================================
// VALIDAR ID (para parámetros de ruta)
// ============================================

export const validarId = (req, res, next) => {
    const { id } = req.params;
    const idNum = parseInt(id);

    if (isNaN(idNum) || idNum <= 0) {
        return res.status(400).json({
            success: false,
            error: 'El ID debe ser un número entero positivo'
        });
    }

    // Guardar el ID validado en la request
    req.validatedId = idNum;
    next();
};