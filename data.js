// data.js - Base de Datos Centralizada para LAB TRACK

const materiales = [
    { id: 11, nombre: "Etanol PTL-200", stock: "1 L", ubicacion: "Lab Bio-A", stockMinimo: 5, ficha: true, historial: [{ fecha: "2026-01-05", cantidad: 2, usuario: 2 }, { fecha: "2026-01-08", cantidad: 3, usuario: 13 }] },
    { id: 2, nombre: "Microscopio Slides", stock: "45 Cajas", ubicacion: "Lab Bio-A", stockMinimo: 20, ficha: false, historial: [{ fecha: "2026-01-02", cantidad: 5, usuario: 3 }] },
    { id: 15, nombre: "Solución Reactiva R-15", stock: "1 Galón", ubicacion: "Almacén Principal", stockMinimo: 2, ficha: true, historial: [] },
    { id: 45, nombre: "Ácido Sulfúrico 98%", stock: "500 ml", ubicacion: "Armario Corrosivos", stockMinimo: 2, ficha: true, historial: [{ fecha: "2026-01-08", cantidad: 1, usuario: 4 }] },
    { id: 88, nombre: "Guantes de Nitrilo (M)", stock: "12 Cajas", ubicacion: "Almacén B", stockMinimo: 15, ficha: false, historial: [{ fecha: "2026-01-09", cantidad: 2, usuario: 2 }] }, // Alerta Stock
    { id: 92, nombre: "Puntas de Pipeta 100ul", stock: "2000 Unidades", ubicacion: "Lab Bio-A", stockMinimo: 500, ficha: true, historial: [] },
    { id: 104, nombre: "Cloruro de Sodio (NaCl)", stock: "4.5 kg", ubicacion: "Almacén Seco", stockMinimo: 1, ficha: true, historial: [{ fecha: "2025-12-20", cantidad: 0.5, usuario: 3 }] },
    { id: 210, nombre: "Medio de Cultivo DMEM", stock: "3 Botellas", ubicacion: "Refrigerador 04", stockMinimo: 10, ficha: true, historial: [{ fecha: "2026-01-07", cantidad: 2, usuario: 2 }] }, // Alerta Stock
    { id: 305, nombre: "Agar-Agar", stock: "800 g", ubicacion: "Lab Bio-B", stockMinimo: 200, ficha: false, historial: [] }
];

const equipos = [
    { id: 101, nombre: "Centrífuga Industrial X5", estado: "Operativo", ultimaCalibracion: "2025-12-01", responsable: "Dr. García" },
    { id: 102, nombre: "Espectrofotómetro UV", estado: "Mantenimiento", ultimaCalibracion: "2026-01-05", responsable: "Ing. Torres" },
    { id: 103, nombre: "Incubadora CO2", estado: "Operativo", ultimaCalibracion: "2025-11-20", responsable: "Dra. Smith" },
    { id: 104, nombre: "PCR Thermocycler", estado: "Fuera de Servicio", ultimaCalibracion: "2025-05-15", responsable: "Dr. García" },
    { id: 105, nombre: "Microscopio Confocal v4", estado: "Operativo", ultimaCalibracion: "2026-01-02", responsable: "Dra. Smith" },
    { id: 106, nombre: "Autoclave Digital", estado: "Operativo", ultimaCalibracion: "2025-10-10", responsable: "Ing. Torres" },
    { id: 107, nombre: "Nevera Criogénica -80C", estado: "Alerta Temp", ultimaCalibracion: "2025-09-20", responsable: "Dr. García" }
];

const ejecuciones = [
    { id: "EJ-001", prueba: "Análisis de Pureza Lote-A", fecha: "2026-01-08", resultado: "Exitoso", tecnico: "Juan Pérez" },
    { id: "EJ-002", prueba: "Cosecha Celular HeLA", fecha: "2026-01-09", resultado: "En Proceso", tecnico: "Ana López" },
    { id: "EJ-003", prueba: "Titulación Ácido-Base", fecha: "2026-01-09", resultado: "Fallido", tecnico: "Carlos Ruiz" },
    { id: "EJ-004", prueba: "Secuenciación Genómica", fecha: "2026-01-07", resultado: "Exitoso", tecnico: "Ana López" },
    { id: "EJ-005", prueba: "Prueba de Esterilidad", fecha: "2026-01-06", resultado: "Exitoso", tecnico: "Juan Pérez" }
];

const usuarios = [
    { id: 1, nombre: "Admin Principal", rol: "Administrador", correo: "admin@labtrack.com", ultimoAcceso: "Hoy" },
    { id: 2, nombre: "Juan Pérez", rol: "Técnico Senior", correo: "jperez@labtrack.com", ultimoAcceso: "Hace 2 horas" },
    { id: 3, nombre: "Ana López", rol: "Investigadora", correo: "alopez@labtrack.com", ultimoAcceso: "Ayer" },
    { id: 4, nombre: "Carlos Ruiz", rol: "Técnico", correo: "cruiz@labtrack.com", ultimoAcceso: "Hace 5 días" },
    { id: 5, nombre: "Dra. Smith", rol: "Jefa de Laboratorio", correo: "msmith@labtrack.com", ultimoAcceso: "Hoy" }
];

// Datos para gráficas del Dashboard (Consumo mensual simulado)
const reporteMensual = {
    meses: ["Ago", "Sep", "Oct", "Nov", "Dic", "Ene"],
    consumoReactivos: [45, 52, 38, 65, 48, 70],
    ejecucionesExitosas: [20, 25, 22, 30, 18, 28]
};