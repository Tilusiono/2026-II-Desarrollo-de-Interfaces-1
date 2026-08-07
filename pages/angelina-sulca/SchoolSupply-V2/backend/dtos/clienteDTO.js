// ============================================
// DTO: Cliente
// ============================================

// ============================================
// REQUEST DTO (para crear/actualizar)
// ============================================
export class ClienteRequestDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.correo = data.correo || null;
        this.telefono = data.telefono || null;
        this.direccion = data.direccion || null;
        this.tipo_cliente = data.tipo_cliente || 'Unitario';
    }

    validate() {
        const errors = [];
        if (!this.nombre || this.nombre.trim() === '') {
            errors.push('El nombre es obligatorio');
        }
        if (this.correo && !this.correo.includes('@')) {
            errors.push('El correo no es válido');
        }
        const tiposValidos = ['Unitario', 'Por Docena'];
        if (this.tipo_cliente && !tiposValidos.includes(this.tipo_cliente)) {
            errors.push(`El tipo de cliente debe ser: ${tiposValidos.join(', ')}`);
        }
        return errors;
    }
}

// ============================================
// RESPONSE DTO (para devolver datos)
// ============================================
export class ClienteResponseDTO {
    constructor(cliente) {
        this.id = cliente.id;
        this.nombre = cliente.nombre;
        this.correo = cliente.correo;
        this.telefono = cliente.telefono;
        this.direccion = cliente.direccion;
        this.tipo_cliente = cliente.tipo_cliente;
        this.fecha_registro = cliente.fecha_registro;
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            correo: this.correo,
            telefono: this.telefono,
            direccion: this.direccion,
            tipo_cliente: this.tipo_cliente,
            fecha_registro: this.fecha_registro
        };
    }
}

// ============================================
// QUERY DTO (para filtros)
// ============================================
export class ClienteQueryDTO {
    constructor(query) {
        this.termino = query.q || '';
        this.tipo_cliente = query.tipo_cliente || '';
        this.limit = query.limit ? parseInt(query.limit) : 20;
        this.offset = query.offset ? parseInt(query.offset) : 0;
    }

    getFilters() {
        const filters = {};
        if (this.termino) filters.termino = this.termino;
        if (this.tipo_cliente) filters.tipo_cliente = this.tipo_cliente;
        return filters;
    }
}