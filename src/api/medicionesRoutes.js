// ./api/medicionesRoutes.js

import express from 'express';
import { agregarMedicion, obtenerUltimaMedicion, actualizarMedicion, eliminarMedicion } from './medicionesService.js';

const router = express.Router();

// Endpoint para agregar una nueva medición
router.post('/add_data', async (req, res) => {
    const { fecha_medicion, Lugar, Valor } = req.body;

    try {
        const result = await agregarMedicion({ fecha_medicion, Lugar, Valor });
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al agregar la medición:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener la última medición
router.get('/mediciones', async (req, res) => {
    try {
        const medicion = await obtenerUltimaMedicion();
        if (!medicion) {
            return res.status(404).json({ message: 'No se encontraron mediciones' });
        }
        res.json(medicion);
    } catch (error) {
        console.error('Error al obtener la medición:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar una medición por ID
router.put('/mediciones/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha_medicion, direccion, medicion } = req.body;

    try {
        const result = await actualizarMedicion(id, { fecha_medicion, direccion, medicion });
        res.json(result);
    } catch (error) {
        console.error('Error al actualizar la medición:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para eliminar una medición por ID
router.delete('/mediciones/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await eliminarMedicion(id);
        res.json(result);
    } catch (error) {
        console.error('Error al eliminar la medición:', error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
