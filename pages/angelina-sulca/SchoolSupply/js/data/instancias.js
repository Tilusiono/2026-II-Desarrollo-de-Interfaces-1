// ============================================
// data/instancias.js - TODAS LAS INSTANCIAS
// ============================================

import { Papeleria } from '../models/Papeleria.js';
import { Utiles } from '../models/Utiles.js';
import { Jugueteria } from '../models/Jugueteria.js';

// ============================================
// PRODUCTOS - 13 productos con variedad
// ============================================

export const productos = [
    // ==========================================
    // PAPELERIA (Cuadernos, Papeles)
    // ==========================================

    // Cuadernos - diferentes marcas y colores
    new Papeleria(
        1, "Cuaderno A4", "Norma", 9, 96, 100,
        3, "Comunicación", "Primaria",
        "Rayado", 80, "A4", "Azul", true
    ),
    new Papeleria(
        2, "Cuaderno A4", "Norma", 9, 96, 80,
        4, "Matemática", "Primaria",
        "Cuadriculado", 80, "A4", "Rojo", true
    ),
    new Papeleria(
        3, "Cuaderno A5", "Scribe", 6, 60, 120,
        2, "Escritura", "Inicial",
        "Rayado", 75, "A5", "Verde", true
    ),
    new Papeleria(
        4, "Cuaderno Espiral", "Norma", 12, 120, 60,
        5, "Arte", "Secundaria",
        "Blanco", 100, "A4", "Negro", true
    ),
    new Papeleria(
        5, "Cuaderno Universitario", "Kumon", 15, 150, 40,
        6, "Ciencia", "Secundaria",
        "Cuadriculado", 90, "A4", "Amarillo", false
    ),

    // Papeles
    new Papeleria(
        6, "Papel Bond", "Maped", 15, 150, 500,
        4, "Arte", "Primaria",
        "Blanco", 75, "A4", "Blanco", true
    ),
    new Papeleria(
        7, "Papel Bond", "Faber-Castell", 18, 180, 300,
        6, "Dibujo", "Secundaria",
        "Blanco", 80, "A3", "Blanco", true
    ),
    new Papeleria(
        8, "Papel de Colores", "Maped", 10, 100, 200,
        3, "Manualidades", "Primaria",
        "Colores surtidos", 70, "A4", "Multicolor", true
    ),

    // ==========================================
    // UTILES (Lapiceros, Lápices, Tijeras, etc.)
    // ==========================================

    new Utiles(
        9, "Lapicero Retráctil", "Bic", 3, 30, 200,
        2, "Escritura", "Inicial",
        "Azul", "Plástico", "Escribir", true
    ),
    new Utiles(
        10, "Lapicero Retráctil", "Bic", 3, 30, 150,
        2, "Escritura", "Inicial",
        "Rojo", "Plástico", "Escribir", true
    ),
    new Utiles(
        11, "Lapicero Retráctil", "Bic", 3, 30, 120,
        2, "Escritura", "Inicial",
        "Negro", "Plástico", "Escribir", true
    ),
    new Utiles(
        12, "Lápiz N°2", "Faber-Castell", 2.5, 25, 300,
        2, "Dibujo", "Inicial",
        "Amarillo", "Madera", "Escribir", true
    ),
    new Utiles(
        13, "Tijeras", "Maped", 5, 54, 80,
        6, "Manualidades", "Primaria",
        "Plateado", "Metal", "Cortar", true
    ),
    new Utiles(
        14, "Tijeras", "Faber-Castell", 6, 60, 50,
        6, "Manualidades", "Secundaria",
        "Azul", "Metal", "Cortar", true
    ),
    new Utiles(
        15, "Borrador Blanco", "Pelikan", 2, 20, 200,
        2, "Escritura", "Inicial",
        "Blanco", "Goma", "Borrar", true
    ),
    new Utiles(
        16, "Regla 30cm", "Maped", 4, 42, 100,
        4, "Geometría", "Primaria",
        "Transparente", "Plástico", "Medir", true
    ),
    new Utiles(
        17, "Colores x12", "Artez", 18, 190, 60,
        4, "Arte", "Primaria",
        "12 colores", "Madera", "Colorear", true
    ),
    new Utiles(
        18, "Cartuchera", "Lápiz Loco", 15, 160, 40,
        3, "Organización", "Primaria",
        "Multicolor", "Tela", "Guardar", false
    ),

    // ==========================================
    // JUGUETERIA
    // ==========================================

    new Jugueteria(
        19, "Pelota de Fútbol", "Adidas", 45, 480, 50,
        8, "Deportivo", "Cuero", true
    ),
    new Jugueteria(
        20, "Pelota de Vóley", "Mikasa", 55, 600, 30,
        10, "Deportivo", "Cuero", true
    ),
    new Jugueteria(
        21, "Juego de Lápices", "Faber-Castell", 25, 250, 40,
        6, "Arte", "Madera", true
    ),
];

// ============================================
// PRODUCTOS EN OFERTA (para la barra superior)
// ============================================

export const productosEnOferta = productos.filter(p => p.enOferta);