import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'data.json');

// Leer datos del archivo JSON
function readData() {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('❌ Error al leer data.json:', error.message);
        // Si el archivo no existe, crear estructura vacía
        const initialData = { 
            productos: [], 
            clientes: [], 
            sedes: [], 
            nextId: 1 
        };
        fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
        return initialData;
    }
}

// Escribir datos al archivo JSON
function writeData(data) {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        console.log('✅ Datos guardados correctamente');
    } catch (error) {
        console.error('❌ Error al guardar data.json:', error.message);
    }
}

// ============================================
// PRODUCTOS
// ============================================

function getProductos() {
    const data = readData();
    return data.productos || [];
}

function getProductoById(id) {
    const data = readData();
    return (data.productos || []).find(p => p.id === id) || null;
}

function createProducto(producto) {
    const data = readData();
    const newProducto = {
        id: data.nextId || 1,
        ...producto,
        activo: 1,
        fecha_registro: new Date().toISOString()
    };
    data.productos.push(newProducto);
    data.nextId = (data.nextId || 1) + 1;
    writeData(data);
    console.log(`✅ Producto creado: ${newProducto.nombre} (ID: ${newProducto.id})`);
    return newProducto;
}

function updateProducto(id, producto) {
    const data = readData();
    const index = (data.productos || []).findIndex(p => p.id === id);
    if (index === -1) {
        console.error(`❌ Producto con ID ${id} no encontrado`);
        return null;
    }
    data.productos[index] = { ...data.productos[index], ...producto };
    writeData(data);
    console.log(`✅ Producto actualizado: ID ${id}`);
    return data.productos[index];
}

function deleteProducto(id) {
    const data = readData();
    const index = (data.productos || []).findIndex(p => p.id === id);
    if (index === -1) {
        console.error(`❌ Producto con ID ${id} no encontrado`);
        return false;
    }
    data.productos.splice(index, 1);
    writeData(data);
    console.log(`✅ Producto eliminado: ID ${id}`);
    return true;
}

// ============================================
// CLIENTES
// ============================================

function getClientes() {
    const data = readData();
    return data.clientes || [];
}

function getClienteById(id) {
    const data = readData();
    return (data.clientes || []).find(c => c.id === id) || null;
}

function createCliente(cliente) {
    const data = readData();
    const newCliente = {
        id: data.nextId || 1,
        ...cliente,
        fecha_registro: new Date().toISOString()
    };
    data.clientes.push(newCliente);
    data.nextId = (data.nextId || 1) + 1;
    writeData(data);
    console.log(`✅ Cliente creado: ${newCliente.nombre} (ID: ${newCliente.id})`);
    return newCliente;
}

function updateCliente(id, cliente) {
    const data = readData();
    const index = (data.clientes || []).findIndex(c => c.id === id);
    if (index === -1) {
        console.error(`❌ Cliente con ID ${id} no encontrado`);
        return null;
    }
    data.clientes[index] = { ...data.clientes[index], ...cliente };
    writeData(data);
    console.log(`✅ Cliente actualizado: ID ${id}`);
    return data.clientes[index];
}

function deleteCliente(id) {
    const data = readData();
    const index = (data.clientes || []).findIndex(c => c.id === id);
    if (index === -1) {
        console.error(`❌ Cliente con ID ${id} no encontrado`);
        return false;
    }
    data.clientes.splice(index, 1);
    writeData(data);
    console.log(`✅ Cliente eliminado: ID ${id}`);
    return true;
}

// ============================================
// SEDES
// ============================================

function getSedes() {
    const data = readData();
    return data.sedes || [];
}

function getSedeById(id) {
    const data = readData();
    return (data.sedes || []).find(s => s.id === id) || null;
}

function getSedeByCodigo(codigo) {
    const data = readData();
    return (data.sedes || []).find(s => s.codigo === codigo) || null;
}

function createSede(sede) {
    const data = readData();
    const newSede = {
        id: data.nextId || 1,
        ...sede,
        activo: 1,
        fecha_registro: new Date().toISOString()
    };
    data.sedes.push(newSede);
    data.nextId = (data.nextId || 1) + 1;
    writeData(data);
    console.log(`✅ Sede creada: ${newSede.nombre} (ID: ${newSede.id})`);
    return newSede;
}

function updateSede(id, sede) {
    const data = readData();
    const index = (data.sedes || []).findIndex(s => s.id === id);
    if (index === -1) {
        console.error(`❌ Sede con ID ${id} no encontrada`);
        return null;
    }
    data.sedes[index] = { ...data.sedes[index], ...sede };
    writeData(data);
    console.log(`✅ Sede actualizada: ID ${id}`);
    return data.sedes[index];
}

function deleteSede(id) {
    const data = readData();
    const index = (data.sedes || []).findIndex(s => s.id === id);
    if (index === -1) {
        console.error(`❌ Sede con ID ${id} no encontrada`);
        return false;
    }
    data.sedes.splice(index, 1);
    writeData(data);
    console.log(`✅ Sede eliminada: ID ${id}`);
    return true;
}

// ============================================
// EXPORTAR
// ============================================

export const db = {
    // Productos
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    // Clientes
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    // Sedes
    getSedes,
    getSedeById,
    getSedeByCodigo,
    createSede,
    updateSede,
    deleteSede
};