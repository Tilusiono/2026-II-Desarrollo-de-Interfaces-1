// ============================================
// MIDDLEWARE: Validación de datos
// ============================================

// ============================================
// VALIDAR PRODUCTO
// ============================================

export const validarProducto = (req, res, next) => {
    const { nombre, marca, precio_unitario, stock, categoria } = req.body;
    const errors = [];

    // Validar nombre
    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es obligatorio');
    } else if (nombre.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
    }

    // Validar marca
    if (!marca || marca.trim() === '') {
        errors.push('La marca es obligatoria');
    }

    // Validar precio unitario
    if (precio_unitario === undefined || precio_unitario === null) {
        errors.push('El precio unitario es obligatorio');
    } else if (isNaN(precio_unitario) || precio_unitario <= 0) {
        errors.push('El precio unitario debe ser un número mayor a 0');
    }

    // Validar stock (opcional, pero si viene, debe ser número positivo)
    if (stock !== undefined && stock !== null) {
        if (isNaN(stock) || stock < 0) {
            errors.push('El stock debe ser un número mayor o igual a 0');
        }
    }

    // Validar categoría (opcional)
    if (categoria && categoria.trim() === '') {
        errors.push('La categoría no puede estar vacía');
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
    }

    // Validar nombre
    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es obligatorio');
    }

    // Validar dirección
    if (!direccion || direccion.trim() === '') {
        errors.push('La dirección es obligatoria');
    }

    // Validar capacidad (opcional, pero si viene, debe ser número positivo)
    if (capacidad !== undefined && capacidad !== null) {
        if (isNaN(capacidad) || capacidad < 0) {
            errors.push('La capacidad debe ser un número mayor o igual a 0');
        }
    }

    // Validar teléfono (opcional, formato básico)
    if (telefono && telefono.trim() !== '') {
        const telefonoLimpio = telefono.replace(/\s/g, '');
        if (!/^[0-9\-+()]+$/.test(telefonoLimpio)) {
            errors.push('El teléfono contiene caracteres inválidos');
        }
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
// VALIDAR CLIENTE
// ============================================

export const validarCliente = (req, res, next) => {
    const { nombre, correo, telefono, direccion, tipo_cliente } = req.body;
    const errors = [];

    // Validar nombre
    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es obligatorio');
    }

    // Validar correo (opcional, pero si viene, validar formato)
    if (correo && correo.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            errors.push('El correo electrónico no tiene un formato válido');
        }
    }

    // Validar teléfono (opcional)
    if (telefono && telefono.trim() !== '') {
        const telefonoLimpio = telefono.replace(/\s/g, '');
        if (!/^[0-9\-+()]+$/.test(telefonoLimpio)) {
            errors.push('El teléfono contiene caracteres inválidos');
        }
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