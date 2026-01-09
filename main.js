// main.js
document.addEventListener("DOMContentLoaded", function() {
    const sidebarHTML = `
    <div class="sidebar d-flex flex-column flex-shrink-0 p-0" style="width: 250px; position: fixed; height: 100%;">
        <div class="sidebar-brand">LAB TRACK</div>
        <ul class="nav nav-pills flex-column mb-auto mt-3">
            <li class="nav-item"><a href="dashboard.html" class="nav-link"><i class="fas fa-home me-2"></i> Dashboard</a></li>
            <li><a href="inventario.html" class="nav-link"><i class="fas fa-box me-2"></i> Inventario</a></li>
            <li><a href="equipos.html" class="nav-link"><i class="fas fa-flask me-2"></i> Equipos</a></li>
            <li><a href="ejecuciones.html" class="nav-link"><i class="fas fa-dna me-2"></i> Ejecuciones</a></li>
            <li><a href="reportes.html" class="nav-link"><i class="fas fa-chart-bar me-2"></i> Reportes</a></li>
            <li><a href="admin.html" class="nav-link"><i class="fas fa-users-cog me-2"></i> Admin</a></li>
        </ul>
        <div class="p-3 border-top border-secondary">
            <a href="index.html" class="text-white text-decoration-none small"><i class="fas fa-sign-out-alt me-2"></i> Cerrar Sesión</a>
        </div>
    </div>`;

    const container = document.getElementById('sidebar-container');
    if (container) {
        container.innerHTML = sidebarHTML;
        
        // Marcar link activo según la URL
        const currentPage = window.location.pathname.split("/").pop();
        const links = container.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
});