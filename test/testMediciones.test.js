/**
 * @file testMediciones.js
 * @brief Pruebas unitarias para los servicios de mediciones.
 *
 * Este archivo contiene pruebas unitarias para las funciones de medición,
 * incluyendo la obtención, inserción y eliminación de mediciones.
 */

import { expect } from 'chai';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde .env.test
dotenv.config({ path: '.env.test' });

import { obtenerUltimaMedicion, agregarMedicion, eliminarMedicion } from '../src/api/medicionesService.js';

/**
 * @brief Conjunto de pruebas para los servicios de medición.
 */
describe('Servicios de Medición', () => {

    /**
     * @brief Prueba para obtener la última medición correctamente.
     *
     * Esta prueba verifica que la función `obtenerUltimaMedicion` retorna un objeto
     * que contiene las propiedades `id`, `fecha_medicion`, `direccion` y `medicion`.
     */
    it('Debe obtener la última medición correctamente', async () => {
        const medicion = await obtenerUltimaMedicion();
        expect(medicion).to.have.property('id');
        expect(medicion).to.have.property('fecha_medicion');
        expect(medicion).to.have.property('direccion');
        expect(medicion).to.have.property('medicion');
    });

    /**
     * @brief Prueba para insertar una nueva medición correctamente.
     *
     * Esta prueba verifica que la función `agregarMedicion` inserta una nueva medición
     * y retorna un resultado que indica que se agregó correctamente.
     */
    it('Debe insertar una nueva medición correctamente', async () => {
        const result = await agregarMedicion({
            fecha_medicion: new Date().toISOString(),
            Lugar: 'Laboratorio',
            Valor: '25.5'
        });
        expect(result).to.have.property('success', true);
        expect(result).to.have.property('message', 'Medición agregada correctamente');
    });

    /**
     * @brief Prueba para borrar la última medición.
     *
     * Esta prueba inserta una nueva medición y luego verifica que la función `eliminarMedicion`
     * la elimina correctamente, afectando a una fila.
     */
    it('Debe borrar la última medición', async () => {
        // Insertar una medición para eliminarla después
        const agregarResult = await agregarMedicion({
            fecha_medicion: new Date().toISOString(),
            Lugar: 'Laboratorio',
            Valor: '30.0'
        });

        const medicionId = agregarResult.id; // Suponiendo que el ID se devuelve en el resultado de agregar

        const result = await eliminarMedicion(medicionId);
        expect(result).to.have.property('success', true);
        expect(result).to.have.property('message', 'Medición eliminada correctamente');

        // Verificar que la medición fue eliminada
        const medicionBorrada = await obtenerUltimaMedicion();
        expect(medicionBorrada.id).to.not.equal(medicionId);
    });
});
