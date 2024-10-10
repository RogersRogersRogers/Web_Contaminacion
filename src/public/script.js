// script.js

// Función para obtener las mediciones de la API
async function fetchMediciones() {
    try {
        const response = await fetch('/api/mediciones');
        if (!response.ok) {
            throw new Error('Error al obtener la última medición');
        }
        const medicion = await response.json(); // Obtener la medición

        // Llamar a la función para mostrar la medición en la tabla
        displayMediciones([medicion]); // Enviar un array con un solo elemento

    } catch (error) {
        console.error('Error al obtener la última medición:', error);
    }
}

// Función para mostrar las mediciones en la tabla
function displayMediciones(mediciones) {
    const tableBody = document.getElementById('mediciones-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos

    mediciones.forEach(medicion => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = medicion.id;
        row.insertCell(1).innerText = new Date(medicion.fecha_medicion).toLocaleString(); // Formato legible
        row.insertCell(2).innerText = medicion.direccion;
        row.insertCell(3).innerText = medicion.medicion;
    });
}

// Ejecutar fetchMediciones cada 10 segundos
setInterval(fetchMediciones, 10000);

// Llamar a la función para cargar las mediciones al cargar la página
fetchMediciones();
