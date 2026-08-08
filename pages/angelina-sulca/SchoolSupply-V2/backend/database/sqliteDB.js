// ============================================
// SQLITE DATABASE (CommonJS - mejor-sqlite3@13.0.2)
// ============================================

const Database = require('better-sqlite3');
const path = require('path');

let db = null;

function getDB() {
    if (!db) {
        db = new Database(path.join(__dirname, 'schoolSupply.db'));
        db.pragma('journal_mode = WAL');
        
        initializeTables();
        seedData();
    }
    return db;
}

function initializeTables() {
    const db = getDB();
    
    db.exec(`
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            marca TEXT NOT NULL,
            color TEXT,
            calidad TEXT,
            precio_unitario REAL NOT NULL,
            precio_docena REAL,
            stock INTEGER DEFAULT 0,
            activo INTEGER DEFAULT 1,
            categoria TEXT,
            descripcion TEXT,
            en_oferta INTEGER DEFAULT 0,
            fecha_registro TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT UNIQUE,
            telefono TEXT,
            direccion TEXT,
            tipo_cliente TEXT DEFAULT 'Unitario',
            fecha_registro TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS sedes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT UNIQUE NOT NULL,
            nombre TEXT NOT NULL,
            direccion TEXT NOT NULL,
            distrito TEXT,
            telefono TEXT,
            encargado TEXT,
            capacidad INTEGER DEFAULT 0,
            horario_apertura TEXT,
            horario_cierre TEXT,
            activo INTEGER DEFAULT 1,
            fecha_registro TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('✅ Tablas creadas en SQLite');
}

function seedData() {
    const db = getDB();
    
    const count = db.prepare('SELECT COUNT(*) as total FROM productos').get();
    if (count.total > 0) {
        console.log('📦 Datos ya existen, saltando seed');
        
        // ✅ FORZAR CHECKPOINT PARA QUE LA EXTENSIÓN VEA LOS DATOS
        try {
            db.exec('PRAGMA wal_checkpoint(TRUNCATE);');
            console.log('✅ Checkpoint completado - datos sincronizados');
        } catch (err) {
            console.log('⚠️ Checkpoint no necesario');
        }
        return;
    }

    console.log('🌱 Insertando datos iniciales...');

    const insertProducto = db.prepare(`
        INSERT INTO productos (nombre, marca, color, calidad, precio_unitario, precio_docena, stock, categoria, en_oferta)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const productos = [
        ['Cuaderno A4', 'Norma', 'Azul', 'Premium', 9, 96, 100, 'Papelería', 1],
        ['Cuaderno A4', 'Norma', 'Rojo', 'Premium', 10, 96, 80, 'Papelería', 1],
        ['Cuaderno A5', 'Scribe', 'Verde', 'Estándar', 6, 60, 120, 'Papelería', 1],
        ['Cuaderno Espiral', 'Norma', 'Negro', 'Premium', 12, 120, 60, 'Papelería', 1],
        ['Lapicero Retráctil', 'Bic', 'Azul', 'Estándar', 3, 30, 200, 'Útiles', 1],
        ['Lapicero Retráctil', 'Bic', 'Rojo', 'Estándar', 3, 30, 150, 'Útiles', 0],
        ['Lapicero Retráctil', 'Bic', 'Negro', 'Estándar', 3, 30, 120, 'Útiles', 0],
        ['Lápiz N°2', 'Faber-Castell', 'Amarillo', 'Premium', 2.5, 25, 300, 'Útiles', 1],
        ['Tijeras', 'Maped', 'Plateado', 'Estándar', 5, 54, 80, 'Útiles', 1],
        ['Tijeras', 'Faber-Castell', 'Azul', 'Estándar', 6, 60, 50, 'Útiles', 0],
        ['Borrador Blanco', 'Pelikan', 'Blanco', 'Estándar', 2, 20, 200, 'Útiles', 1],
        ['Regla 30cm', 'Maped', 'Transparente', 'Estándar', 4, 42, 100, 'Útiles', 0],
        ['Colores x12', 'Artez', '12 colores', 'Premium', 18, 190, 60, 'Útiles', 1],
        ['Cartuchera', 'Lápiz Loco', 'Multicolor', 'Estándar', 15, 160, 40, 'Útiles', 0],
        ['Mochila Escolar', 'Everlast', 'Negro', 'Premium', 55, 600, 50, 'Útiles', 1],
        ['Pelota de Fútbol', 'Adidas', 'Blanco', 'Premium', 45, 480, 30, 'Juguetería', 1],
        ['Pelota de Vóley', 'Mikasa', 'Amarillo', 'Premium', 55, 600, 20, 'Juguetería', 0],
        ['Juego de Lápices', 'Faber-Castell', 'Multicolor', 'Premium', 25, 250, 40, 'Arte', 1]
    ];

    for (const p of productos) {
        insertProducto.run(p);
    }

    const insertCliente = db.prepare(`
        INSERT INTO clientes (nombre, correo, telefono, direccion, tipo_cliente)
        VALUES (?, ?, ?, ?, ?)
    `);

    const clientes = [
        ['Ana Pérez', 'ana.perez@email.com', '987654321', 'Av. Siempre Viva 123', 'Unitario'],
        ['Colegio San José', 'colegio@email.com', '987654322', 'Av. Principal 456', 'Por Docena']
    ];

    for (const c of clientes) {
        insertCliente.run(c);
    }

    const insertSede = db.prepare(`
        INSERT INTO sedes (codigo, nombre, direccion, distrito, telefono, encargado, capacidad, horario_apertura, horario_cierre)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const sedes = [
        ['S001', 'Sede Central - San Isidro', 'Av. Javier Prado Este 1234, San Isidro', 'San Isidro', '01-555-1001', 'Carlos Gómez', 50, '08:00', '20:00'],
        ['S002', 'Sede Miraflores', 'Calle Los Rosales 456, Miraflores', 'Miraflores', '01-555-1002', 'María Rodríguez', 40, '08:30', '19:30'],
        ['S003', 'Sede Pueblo Libre', 'Av. Universitaria 789, Pueblo Libre', 'Pueblo Libre', '01-555-1003', 'Pedro Sánchez', 35, '09:00', '19:00'],
        ['S004', 'Sede Cercado de Lima', 'Jr. Huancavelica 321, Cercado de Lima', 'Cercado de Lima', '01-555-1004', 'Lucía Fernández', 30, '08:00', '18:00'],
        ['S005', 'Sede San Juan de Lurigancho', 'Av. El Sol 654, San Juan de Lurigancho', 'San Juan de Lurigancho', '01-555-1005', 'Jorge Ramírez', 45, '08:00', '20:00']
    ];

    for (const s of sedes) {
        insertSede.run(s);
    }

    // ✅ FORZAR CHECKPOINT DESPUÉS DE INSERTAR DATOS
    try {
        db.exec('PRAGMA wal_checkpoint(TRUNCATE);');
        console.log('✅ Checkpoint completado - datos guardados permanentemente');
    } catch (err) {
        console.log('⚠️ Checkpoint no necesario');
    }

    console.log('✅ Datos iniciales insertados correctamente');
}

module.exports = { getDB };