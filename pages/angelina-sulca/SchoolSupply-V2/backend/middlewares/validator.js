// ============================================
// MIDDLEWARE: Validator (CommonJS)
// ============================================

const validarProducto = (req, res, next) => {
    const { nombre, marca, precio_unitario, stock, categoria, descripcion } = req.body;
    const errors = [];

    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es obligatorio');
    } else if (nombre.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
    } else if (nombre.length > 100) {
        errors.push('El nombre no puede tener más de 100 caracteres');
    }

    if (!marca || marca.trim() === '') {
        errors.push('La marca es obligatoria');
    } else if (marca.length < 2) {
        errors.push('La marca debe tener al menos 2 caracteres');
    }

    if (precio_unitario === undefined || precio_unitario === null) {
        errors.push('El precio unitario es obligatorio');
    } else if (isNaN(precio_unitario) || precio_unitario <= 0) {
        errors.push('El precio unitario debe ser un número mayor a 0');
    }

    if (stock !== undefined && stock !== null) {
        if (isNaN(stock) || stock < 0) {
            errors.push('El stock debe ser un número mayor o igual a 0');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    next();
};

const validarSede = (req, res, next) => {
    const { codigo, nombre, direccion, distrito, telefono, encargado, capacidad } = req.body;
    const errors = [];

    if (!codigo || codigo.trim() === '') {
        errors.push('El código es obligatorio');
    } else if (codigo.length < 3) {
        errors.push('El código debe tener al menos 3 caracteres');
    }

    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es obligatorio');
    } else if (nombre.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
    }

    if (!direccion || direccion.trim() === '') {
        errors.push('La dirección es obligatoria');
    } else if (direccion.length < 5) {
        errors.push('La dirección debe tener al menos 5 caracteres');
    }

    if (capacidad !== undefined && capacidad !== null) {
        if (isNaN(capacidad) || capacidad < 0) {
            errors.push('La capacidad debe ser un número mayor o igual a 0');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    next();
};

const validarCliente = (req, res, next) => {
    const { nombre, correo, telefono, direccion, tipo_cliente } = req.body;
    const errors = [];

    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre es obligatorio');
    } else if (nombre.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
    } else if (nombre.length > 100) {
        errors.push('El nombre no puede tener más de 100 caracteres');
    }

    if (correo && correo.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            errors.push('El correo electrónico no tiene un formato válido');
        }
    }

    if (tipo_cliente) {
        const tiposValidos = ['Unitario', 'Por Docena'];
        if (!tiposValidos.includes(tipo_cliente)) {
            errors.push(`El tipo de cliente debe ser: ${tiposValidos.join(', ')}`);
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    next();
};

const validarId = (req, res, next) => {
    const { id } = req.params;
    const idNum = parseInt(id);

    if (isNaN(idNum) || idNum <= 0) {
        return res.status(400).json({
            success: false,
            error: 'El ID debe ser un número entero positivo'
        });
    }

    req.validatedId = idNum;
    next();
};

module.exports = {
    validarProducto,
    validarSede,
    validarCliente,
    validarId
};