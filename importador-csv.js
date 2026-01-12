// IMPORTANTE: Solo importamos lo que necesitamos de cada librería
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, writeBatch } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Procesa un archivo CSV y lo sube a Firebase vinculándolo al Admin logeado
 */
export async function importarCSV(file, db, coleccionDestino) {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return reject("Sesión no válida para importar.");

        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                const contenido = event.target.result;
                const lineas = contenido.split('\n').filter(linea => linea.trim() !== "");

                let batch = writeBatch(db);
                let contadorGlobal = 0;
                let contadorBatch = 0;

                // Empezamos en i = 1 para saltar la cabecera
                for (let i = 1; i < lineas.length; i++) {
                    const col = lineas[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));

                    // Validamos que la línea tenga datos (mínimo nombre y serial)
                    if (col.length >= 2) {
                        const ref = doc(collection(db, coleccionDestino));
                        let datos = { adminId: user.uid };

                        if (coleccionDestino === "equipos") {
                            datos = {
                                ...datos,
                                nombre: col[0] || "Sin nombre",
                                modelo: col[1] || "N/A",
                                serial: col[2] || "S/N",
                                fabricante: col[3] || "Desconocido",
                                tipo: col[4] || "Otros",
                                laboratorio: col[5] || "General",
                                stock: Number(col[6]) || 1,
                                estado: col[7] || "Operativo",
                                fechaAlta: new Date().toISOString(),
                                ultimaActualizacion: new Date().toISOString()
                            };
                        }

                        // ESTO DEBE ESTAR DENTRO DEL IF DE VALIDACIÓN
                        batch.set(ref, datos);
                        contadorGlobal++;
                        contadorBatch++;

                        // Firebase limita los batches a 500 operaciones
                        if (contadorBatch === 499) {
                            await batch.commit();
                            batch = writeBatch(db);
                            contadorBatch = 0;
                        }
                    }
                }

                // Al terminar el bucle, si hay algo pendiente, se sube
                if (contadorGlobal > 0) {
                    await batch.commit();
                    resolve(contadorGlobal);
                } else {
                    reject("El archivo está vacío o no tiene el formato correcto.");
                }

            } catch (error) {
                reject("Error de procesamiento: " + error.message);
            }
        };

        reader.onerror = () => reject("Error al leer el archivo físico.");
        reader.readAsText(file);
    });
}

/**
 * Genera una alerta visual (Feedback)
 */
export function mostrarFeedback(mensaje, tipo, contenedorId = "status-container") {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="alert alert-${tipo === 'success' ? 'success' : 'danger'} alert-dismissible fade show shadow-sm rounded-3">
            <div class="d-flex align-items-center">
                <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2"></i>
                <div>${mensaje}</div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    if (tipo === 'success') {
        setTimeout(() => {
            const el = contenedor.querySelector('.alert');
            if (el) {
                const alert = bootstrap.Alert.getOrCreateInstance(el);
                alert.close();
            }
        }, 5000);
    }
}