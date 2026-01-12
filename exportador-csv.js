/**
 * Genera un CSV con las cabeceras exactas según el tipo de material.
 * @param {Array} data - Array con los nombres de las columnas o datos.
 * @param {String} nombreArchivo - Nombre del archivo .csv
 */
export function descargarCSV(data, nombreArchivo) {
    if (!data || data.length === 0) return;

    // Convertir el array de objetos a texto CSV
    const cabeceras = Object.keys(data[0]);
    const filas = data.map(obj => 
        cabeceras.map(header => {
            let valor = obj[header] === undefined || obj[header] === null ? "" : obj[header];
            return `"${valor.toString().replace(/"/g, '""')}"`;
        }).join(",")
    );

    const contenidoCSV = [cabeceras.join(","), ...filas].join("\n");
    
    // Crear el archivo y descargar
    const blob = new Blob(["\ufeff" + contenidoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${nombreArchivo}.csv`);
    link.click();
    URL.revokeObjectURL(url);
}