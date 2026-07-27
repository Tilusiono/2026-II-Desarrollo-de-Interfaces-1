import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'schoolsupply.db');

// Crear conexión a la base de datos
const db = new Database(dbPath);

// Habilitar claves foráneas y modo WAL
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

// Leer y ejecutar schema.sql y seeds.sql (SOLO UNA VEZ)
try {
    // 1. Crear tablas si no existen
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    db.exec(schema);
    console.log('✅ Tablas creadas/verificadas');

    // 2. Verificar si ya hay productos
    const count = db.prepare('SELECT COUNT(*) as total FROM productos').get();
    
    if (count.total === 0) {
        // 3. Solo insertar datos si la tabla está vacía
        const seeds = fs.readFileSync(path.join(__dirname, 'seeds.sql'), 'utf8');
        db.exec(seeds);
        console.log('✅ Datos de prueba insertados');
    } else {
        console.log(`✅ Ya existen ${count.total} productos en la base de datos`);
    }
} catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error.message);
}

console.log('✅ Base de datos SchoolSupply inicializada');

export default db;