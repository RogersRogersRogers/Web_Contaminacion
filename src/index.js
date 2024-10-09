// Importa las librerías necesarias
import path from 'path';
import express from 'express';
import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';  // Para obtener __dirname en módulos ES6

// Configuración de __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Cargar las variables de entorno
config();

// Inicializar la aplicación de Express
const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON
app.use(express.json());

// Inicializar conexión a la base de datos
const pool = createPool({
    host: 'localhost',  // Cambiado a 'mysqlddb' (nombre del servicio en docker-compose)
    user: 'root',
    password: 'admin',
    port: 3306, // Puedes establecerlo directamente, ya que es el puerto por defecto para MySQL
    database: 'faztdb'
});

// Endpoint de prueba
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Comprobar conexión con la base de datos
app.get('/ping', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT NOW()');
        res.json(result[0]);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        res.status(500).send('Error al conectar con la base de datos');
    }
});

////////////////////////////// CRUD ///////////////////////////////

// Agregar una medición
app.post('/add_data', async (req, res) => {
    const { fecha_medicion, direccion, medicion } = req.body;  // Desestructurar los datos recibidos

    try {
        // Inserta los datos en la tabla pcv00
        await pool.query('INSERT INTO pcv00 (fecha_medicion, direccion, medicion) VALUES (?, ?, ?)', 
            [fecha_medicion, direccion, medicion]);

        res.status(201).send('Medición agregada correctamente');
    } catch (error) {
        console.error('Error al agregar datos:', error);
        res.status(500).send('Error al agregar la medición');
    }
});

// Obtener todas las mediciones
// Obtener la última medición (actualizado)
app.get('/mediciones', async (req, res) => {
    try {
        // Consulta para obtener la última medición basada en el ID
        const [result] = await pool.query('SELECT * FROM pcv00 ORDER BY id DESC LIMIT 1');
        
        // Verifica si se encontraron resultados
        if (result.length === 0) {
            return res.status(404).json({ error: 'No se encontraron mediciones' });
        }
        
        // Retorna el primer resultado (la última medición)
        res.json(result[0]); 
    } catch (error) {
        // Mostrar el error completo tanto en el cliente como en la consola
        console.error('Error al obtener la última medición:', error.message);
        
        // Enviar la respuesta con el error exacto
        res.status(500).json({
            message: 'Error al obtener la última medición',
            error: error.message, // Mensaje del error
            stack: error.stack // Detalles del error (útil para depurar)
        });
    }
});




// Actualizar una medición por ID
app.put('/mediciones/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha_medicion, direccion, medicion } = req.body;

    try {
        await pool.query('UPDATE pcv00 SET fecha_medicion = ?, direccion = ?, medicion = ? WHERE id = ?', 
                         [fecha_medicion, direccion, medicion, id]);
        res.send('Medición actualizada correctamente');
    } catch (error) {
        console.error('Error al actualizar medición:', error);
        res.status(500).send('Error al actualizar la medición');
    }
});

// Eliminar una medición por ID
app.delete('/mediciones/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM pcv00 WHERE id = ?', [id]);
        res.send('Medición eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar medición:', error);
        res.status(500).send('Error al eliminar la medición');
    }
});

////////////////////////////// FIN CRUD ///////////////////////////////

// Iniciar el servidor
const PORT = 3000; // Agregar un puerto por defecto
app.listen(PORT, () => {
    console.log("Servidor en el puerto", PORT);
});
