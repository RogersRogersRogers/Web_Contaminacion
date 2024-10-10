// services/medicionesService.js

import { pool } from './db.js'; // Conexión a la base de datos

// Función para agregar una medición
export async function agregarMedicion({ fecha_medicion, Lugar, Valor }) {
    try {
        await pool.query('INSERT INTO pcv00 (fecha_medicion, direccion, medicion) VALUES (?, ?, ?)', 
                         [fecha_medicion, Lugar, Valor]);
        return { success: true, message: 'Medición agregada correctamente' };
    } catch (error) {
        throw new Error('Error al agregar la medición: ' + error.message);
    }
}

// Función para obtener la última medición
export async function obtenerUltimaMedicion() {
    try {
        const [result] = await pool.query('SELECT * FROM pcv00 ORDER BY id DESC LIMIT 1');
        if (result.length === 0) {
            return null; // No hay mediciones
        }
        return result[0];
    } catch (error) {
        throw new Error('Error al obtener la última medición: ' + error.message);
    }
}

// Función para actualizar una medición
export async function actualizarMedicion(id, { fecha_medicion, direccion, medicion }) {
    try {
        await pool.query('UPDATE pcv00 SET fecha_medicion = ?, direccion = ?, medicion = ? WHERE id = ?', 
                         [fecha_medicion, direccion, medicion, id]);
        return { success: true, message: 'Medición actualizada correctamente' };
    } catch (error) {
        throw new Error('Error al actualizar la medición: ' + error.message);
    }
}

// Función para eliminar una medición
export async function eliminarMedicion(id) {
    try {
        await pool.query('DELETE FROM pcv00 WHERE id = ?', [id]);
        return { success: true, message: 'Medición eliminada correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar la medición: ' + error.message);
    }
}
