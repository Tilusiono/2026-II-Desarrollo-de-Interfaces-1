import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'schoolsupply.db');

// Abrir la base de datos con sqlite3 (modo async/await)
const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
});

console.log('✅ Base de datos SQLite conectada');

// Crear tablas y datos de prueba
try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.exec(schema);
    console.log('✅ Tablas creadas correctamente');

    // Verificar si ya hay productos
    const count = await db.get('SELECT COUNT(*) as total FROM productos');
    if (count.total === 0) {
        const seeds = fs.readFileSync(path.join(__dirname, 'seeds.sql'), 'utf8');
        await db.exec(seeds);
        console.log('✅ Datos de prueba insertados');
    } else {
        console.log(`✅ Ya existen ${count.total} productos en la base de datos`);
    }
} catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error.message);
}

export default db;