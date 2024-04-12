const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const DB_FILE = "datos.json";

app.use(bodyParser.json());

app.post('/guardarDatos', (req, res) => {
    const newData = req.body; // Datos enviados en la solicitud POST

    let jsonData = {};

    try {
        // Intenta leer el archivo JSON existente
        const data = fs.readFileSync(DB_FILE, "utf-8");
        jsonData = JSON.parse(data);
    } catch (error) {
        console.error('Error al analizar el archivo JSON:', error);
        return res.status(500).send('Error al analizar el archivo JSON');
    }

    // Agrega los nuevos datos recibidos al objeto JSON existente
    // Aquí newData debería ser un objeto que quieres agregar al JSON existente
    if (newData && typeof newData === 'object') {
        // Aquí agregamos los datos nuevos al objeto jsonData
        Object.assign(jsonData, newData);

        try {
            // Escribe el JSON actualizado de vuelta al archivo
            fs.writeFileSync(DB_FILE, JSON.stringify(jsonData, null, 2));
            res.status(200).send('Datos guardados correctamente');
        } catch (error) {
            console.error('Error al escribir en el archivo JSON:', error);
            res.status(500).send('Error al guardar los datos');
        }
    } else {
        res.status(400).send('Datos no válidos');
    }
});

const PORT = 200; // Puerto corregido

app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto:', PORT);
});
