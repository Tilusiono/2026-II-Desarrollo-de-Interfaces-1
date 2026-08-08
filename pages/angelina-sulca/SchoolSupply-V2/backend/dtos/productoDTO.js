// ============================================
// DTO: Producto (CommonJS)
// ============================================

class ProductoRequestDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.marca = data.marca;
        this.color = data.color || null;
        this.calidad = data.calidad || null;
        this.precio_unitario = data.precio_unitario;
        this.precio_docena = data.precio_docena || null;
        this.stock = data.stock || 0;
        this.categoria = data.categoria || null;
        this.descripcion = data.descripcion || null;
        this.en_oferta = data.en_oferta ? 1 : 0;
    }

    validate() {
        const errors = [];
        if (!this.nombre || this.nombre.trim() === '') {
            errors.push('El nombre es obligatorio');
        }
        if (!this.marca || this.marca.trim() === '') {
            errors.push('La marca es obligatoria');
        }
        if (this.precio_unitario === undefined || this.precio_unitario <= 0) {
            errors.push('El precio unitario debe ser mayor a 0');
        }
        return errors;
    }
}

class ProductoResponseDTO {
    constructor(producto) {
        this.id = producto.id;
        this.nombre = producto.nombre;
        this.marca = producto.marca;
        this.color = producto.color;
        this.calidad = producto.calidad;
        this.precio_unitario = producto.precio_unitario;
        this.precio_docena = producto.precio_docena;
        this.stock = producto.stock;
        this.categoria = producto.categoria;
        this.descripcion = producto.descripcion;
        this.en_oferta = producto.en_oferta;
        this.activo = producto.activo;
        this.fecha_registro = producto.fecha_registro;
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            marca: this.marca,
            color: this.color,
            calidad: this.calidad,
            precio_unitario: this.precio_unitario,
            precio_docena: this.precio_docena,
            stock: this.stock,
            categoria: this.categoria,
            descripcion: this.descripcion,
            en_oferta: this.en_oferta,
            activo: this.activo,
            fecha_registro: this.fecha_registro
        };
    }
}

class ProductoQueryDTO {
    constructor(query) {
        this.termino = query.q || '';
        this.en_oferta = query.en_oferta !== undefined ? parseInt(query.en_oferta) : undefined;
        this.categoria = query.categoria || '';
        this.precio_min = query.precio_min ? parseFloat(query.precio_min) : undefined;
        this.precio_max = query.precio_max ? parseFloat(query.precio_max) : undefined;
        this.activo = query.activo !== undefined ? parseInt(query.activo) : 1;
        this.limit = query.limit ? parseInt(query.limit) : 20;
        this.offset = query.offset ? parseInt(query.offset) : 0;
    }

    getFilters() {
        const filters = {};
        if (this.termino) filters.termino = this.termino;
        if (this.en_oferta !== undefined) filters.en_oferta = this.en_oferta;
        if (this.categoria) filters.categoria = this.categoria;
        if (this.precio_min !== undefined) filters.precio_min = this.precio_min;
        if (this.precio_max !== undefined) filters.precio_max = this.precio_max;
        if (this.activo !== undefined) filters.activo = this.activo;
        return filters;
    }
}

module.exports = {
    ProductoRequestDTO,
    ProductoResponseDTO,
    ProductoQueryDTO
};