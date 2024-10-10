// index.js

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import medicionesRoutes from './api/medicionesRoutes.js'; // Importar el archivo de rutas


// Inicializar la aplicación de Express
const app = express();

// Habilitar CORS
app.use(cors());

const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'public')))

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas definidas en medicionesRoutes
app.use('/api', medicionesRoutes);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
