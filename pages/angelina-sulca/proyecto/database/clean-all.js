import db from './db.js';

try {
    console.log('🗑️ Eliminando todos los productos duplicados...');
    
    // Ver cuántos hay antes
    const before = db.prepare('SELECT COUNT(*) as total FROM productos').get();
    console.log(`📦 Antes: ${before.total} productos`);
    
    // Eliminar duplicados (mantener el de menor ID por grupo)
    db.exec(`
        DELETE FROM productos 
        WHERE id NOT IN (
            SELECT MIN(id) 
            FROM productos 
            GROUP BY nombre, marca, color, precio_unitario
        )
    `);
    
    // Ver cuántos quedan después
    const after = db.prepare('SELECT COUNT(*) as total FROM productos').get();
    console.log(`📦 Después: ${after.total} productos`);
    
    // Mostrar los productos restantes
    const productos = db.prepare('SELECT id, nombre, marca, color, precio_unitario FROM productos ORDER BY id').all();
    console.log('📋 Productos restantes:');
    productos.forEach(p => {
        console.log(`  ID: ${p.id} | ${p.nombre} | ${p.marca} | ${p.color} | S/ ${p.precio_unitario}`);
    });
    
    console.log('✅ Limpieza completada');
} catch (error) {
    console.error('❌ Error:', error.message);
}