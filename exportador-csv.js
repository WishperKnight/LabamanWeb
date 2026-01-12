/**
 * Exporta un array de objetos a un archivo CSV optimizado para Excel
 * @param {Array} datos - Lista de objetos (inventario)
 * @param {string} nombreArchivo - Nombre base del archivo
 */
export function descargarCSV(datos, nombreArchivo) {
    if (!datos || datos.length === 0) {
        console.warn("No hay datos para exportar");
        return;
    }

    // 1. Obtener todos los encabezados posibles (de todos los objetos)
    // Esto evita que se pierdan columnas si el primer objeto no tiene todos los campos
    const titulos = [...new Set(datos.flatMap(obj => Object.keys(obj)))];

    // 2. Crear las filas asegurando que cada valor caiga en su columna correspondiente
    const filas = datos.map(obj => 
        titulos.map(tit => {
            const valor = obj[tit] === String(obj[tit]) ? obj[tit] : (obj[tit] ?? '');
            // Escapar comillas dobles y envolver en comillas para manejar comas internas
            return `"${valor.toString().replace(/"/g, '""')}"`;
        }).join(',')
    );

    // 3. Unir encabezados y filas
    const contenido = [titulos.join(','), ...filas].join('\n');

    // 4. Crear el Blob con BOM (\ufeff) para que Excel reconozca tildes y caracteres especiales (UTF-8)
    const blob = new Blob(["\ufeff" + contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // 5. Crear link temporal y disparar descarga
    const link = document.createElement("a");
    const fecha = new Date().toISOString().slice(0, 10);
    
    link.href = url;
    link.download = `${nombreArchivo}_${fecha}.csv`;
    
    document.body.appendChild(link);
    link.click();
    
    // Limpieza
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}