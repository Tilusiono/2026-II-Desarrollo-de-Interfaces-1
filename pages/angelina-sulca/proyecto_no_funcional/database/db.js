import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'schoolsupply.db');

<<<<<<< HEAD
// Abrir la base de datos (modo async/await)
=======
// Abrir la base de datos
>>>>>>> a065db753abe1e9e9488b20bb8bae06a06b456fb
const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
});

console.log('✅ Base de datos SQLite conectada');

try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.exec(schema);
    console.log('✅ Tablas creadas correctamente');

    const count = await db.get('SELECT COUNT(*) as total FROM productos');
    if (!count || count.total === 0) {
        const seeds = fs.readFileSync(path.join(__dirname, 'seeds.sql'), 'utf8');
        await db.exec(seeds);
        console.log('✅ Datos de prueba insertados');
    } else {
        console.log(`✅ Ya existen ${count.total} productos en la base de datos`);
    }
} catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error.message);
}

<<<<<<< HEAD
console.log('✅ Base de datos SchoolSupply inicializada');

=======
// ✅ EXPORTAR CORRECTAMENTE
>>>>>>> a065db753abe1e9e9488b20bb8bae06a06b456fb
export { db };