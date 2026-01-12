import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = { 
    apiKey: "AIzaSyA_aXLKh1HXcXGD1_s7mA7VuCPsSm1IBPA", 
    authDomain: "labmanager-b85b1.firebaseapp.com", 
    projectId: "labmanager-b85b1", 
    appId: "1:651630503448:web:9a327cbf30b84fd763c56d" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Función para proteger rutas y obtener el ID del administrador
export function verificarSesion(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // El usuario está logueado, devolvemos su UID como adminId
            callback(user.uid);
        } else {
            // Si no hay sesión, redirigir al login
            window.location.href = 'index.html';
        }
    });
}

export { auth, db };