// ============================================
// CLASE: compra (NO hereda)
// ============================================

import { clientepordocena } from './clientepordocena.js';

export class compra {
    #numeroCompra;
    #totalFinal;
    #detalles;

    cliente;
    carrito;
    descuento;
    fecha;
    estado;

    constructor(cli, car, desc, fec, est) {
        this.cliente = cli;
        this.carrito = car;
        this.descuento = desc;
        this.fecha = fec;
        this.estado = est;
        this.#numeroCompra = this.#generarNumero();
        this.#totalFinal = 0;
        this.#detalles = null;
    }

    // Getters
    get numeroCompra() {
        return this.#numeroCompra;
    }

    get totalFinal() {
        return this.#totalFinal;
    }

    get detalles() {
        return this.#detalles;
    }

    setestado(nuevoEstado) {
        let estadosValidos = ["Pendiente", "Confirmada", "Anulada", "Entregada"];
        for (let i = 0; i < estadosValidos.length; i++) {
            if (estadosValidos[i] === nuevoEstado) {
                this.estado = nuevoEstado;
                break;
            }
        }
    }

    calcularTotal() {
        let subtotal = this.carrito.obtenerSubtotal();
        let cantidad = this.carrito.getcantidadItems();

        if (this.cliente instanceof clientepordocena) {
            let total = this.cliente.calcularPrecioConDescuento(subtotal);
            this.#totalFinal = total;
            this.#detalles = {
                subtotal: subtotal,
                total: total,
                descuento: subtotal - total,
                tipoCliente: this.cliente.obtenerTipo()
            };
            return total;
        } else {
            this.descuento.calcularPorCantidad(cantidad);
            this.descuento.calcularPorPago(this.carrito.obtenerPago());
            let total = this.descuento.calcularTotal(subtotal);
            this.#totalFinal = total;
            this.#detalles = this.descuento.obtenerDetalles(subtotal);
            return total;
        }
    }

    confirmar() {
        let total = this.calcularTotal();
        if (this.carrito.estaVacio()) {
            return {
                exitoso: false,
                mensaje: "No hay productos en el carrito",
                total: 0
            };
        } else {
            this.estado = "Confirmada";
            this.cliente.agregarCompra(this);
            return {
                exitoso: true,
                mensaje: "Compra confirmada",
                total: total,
                numero: this.#numeroCompra,
                fecha: this.fecha.toLocaleDateString(),
                cliente: this.cliente.nombre,
                tipoCliente: this.cliente.obtenerTipo()
            };
        }
    }

    obtenerResumen() {
        let subtotal = this.carrito.obtenerSubtotal();
        this.calcularTotal();
        let tipo = this.cliente.obtenerTipo();
        let resumen = "=== RESUMEN DE COMPRA ===\n";
        resumen = resumen + "N°: " + this.#numeroCompra + "\n";
        resumen = resumen + "Fecha: " + this.fecha.toLocaleDateString() + "\n";
        resumen = resumen + "Cliente: " + this.cliente.nombre + "\n";
        resumen = resumen + "Tipo: " + tipo + "\n";
        resumen = resumen + "------------------------\n";
        resumen = resumen + "Subtotal: S/ " + subtotal.toFixed(2) + "\n";
        resumen = resumen + "Descuento: -S/ " + (subtotal - this.#totalFinal).toFixed(2) + "\n";
        resumen = resumen + "------------------------\n";
        resumen = resumen + "TOTAL: S/ " + this.#totalFinal.toFixed(2) + "\n";
        resumen = resumen + "Estado: " + this.estado + "\n";
        resumen = resumen + "========================";
        return resumen;
    }

    obtenerNumero() {
        return this.#numeroCompra;
    }

    obtenerEstado() {
        return this.estado;
    }

    anular() {
        this.estado = "Anulada";
        return this.estado;
    }

    estaPendiente() {
        return this.estado === "Pendiente";
    }

    // ==========================================
    // 🔥 MÉTODO PÚBLICO CON SWITCH
    // ==========================================
    obtenerEstadoTexto() {
        let texto = "";
        switch (this.estado) {
            case "Pendiente":
                texto = "⏳ Pendiente de confirmación";
                break;
            case "Confirmada":
                texto = "✅ Confirmada";
                break;
            case "Anulada":
                texto = "❌ Anulada";
                break;
            case "Entregada":
                texto = "📦 Entregada";
                break;
            default:
                texto = "⚠️ Estado desconocido";
                break;
        }
        return texto;
    }

    // ==========================================
    // MÉTODO PRIVADO
    // ==========================================
    #generarNumero() {
        let fecha = new Date();
        let año = fecha.getFullYear();
        let mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let dia = String(fecha.getDate()).padStart(2, '0');
        let aleatorio = Math.floor(Math.random() * 10000);
        return "COMP-" + año + mes + dia + "-" + aleatorio;
    }
}