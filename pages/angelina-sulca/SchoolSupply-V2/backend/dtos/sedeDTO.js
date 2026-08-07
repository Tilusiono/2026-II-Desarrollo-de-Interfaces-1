// ============================================
// DTO: Sede
// ============================================

// ============================================
// REQUEST DTO (para crear/actualizar)
// ============================================
export class SedeRequestDTO {
    constructor(data) {
        this.codigo = data.codigo;
        this.nombre = data.nombre;
        this.direccion = data.direccion;
        this.distrito = data.distrito || null;
        this.telefono = data.telefono || null;
        this.encargado = data.encargado || null;
        this.capacidad = data.capacidad || 0;
        this.horario_apertura = data.horario_apertura || null;
        this.horario_cierre = data.horario_cierre || null;
    }

    validate() {
        const errors = [];
        if (!this.codigo || this.codigo.trim() === '') {
            errors.push('El código es obligatorio');
        }
        if (!this.nombre || this.nombre.trim() === '') {
            errors.push('El nombre es obligatorio');
        }
        if (!this.direccion || this.direccion.trim() === '') {
            errors.push('La dirección es obligatoria');
        }
        return errors;
    }
}

// ============================================
// RESPONSE DTO (para devolver datos)
// ============================================
export class SedeResponseDTO {
    constructor(sede) {
        this.id = sede.id;
        this.codigo = sede.codigo;
        this.nombre = sede.nombre;
        this.direccion = sede.direccion;
        this.distrito = sede.distrito;
        this.telefono = sede.telefono;
        this.encargado = sede.encargado;
        this.capacidad = sede.capacidad;
        this.horario_apertura = sede.horario_apertura;
        this.horario_cierre = sede.horario_cierre;
        this.activo = sede.activo;
        this.fecha_registro = sede.fecha_registro;
    }

    toJSON() {
        return {
            id: this.id,
            codigo: this.codigo,
            nombre: this.nombre,
            direccion: this.direccion,
            distrito: this.distrito,
            telefono: this.telefono,
            encargado: this.encargado,
            capacidad: this.capacidad,
            horario_apertura: this.horario_apertura,
            horario_cierre: this.horario_cierre,
            activo: this.activo,
            fecha_registro: this.fecha_registro
        };
    }
}

// ============================================
// QUERY DTO (para filtros)
// ============================================
export class SedeQueryDTO {
    constructor(query) {
        this.termino = query.q || '';
        this.distrito = query.distrito || '';
        this.activo = query.activo !== undefined ? parseInt(query.activo) : 1;
        this.limit = query.limit ? parseInt(query.limit) : 20;
        this.offset = query.offset ? parseInt(query.offset) : 0;
    }

    getFilters() {
        const filters = {};
        if (this.termino) filters.termino = this.termino;
        if (this.distrito) filters.distrito = this.distrito;
        if (this.activo !== undefined) filters.activo = this.activo;
        return filters;
    }
}