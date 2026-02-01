// common.js - Funciones compartidas para GameHub

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave para enlaces internos
    configurarScrollSuave();
    
    // Efecto de aparición para tarjetas de juego
    animarTarjetasJuego();
    
    // Marcar enlace activo en navegación
    marcarEnlaceActivo();
});

// Función para scroll suave
function configurarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();
            
            const idDestino = this.getAttribute('href');
            if(idDestino === '#') return;
            
            const elementoDestino = document.querySelector(idDestino);
            if(elementoDestino) {
                window.scrollTo({
                    top: elementoDestino.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para animar tarjetas de juego
function animarTarjetasJuego() {
    const tarjetas = document.querySelectorAll('.tarjeta-juego');
    
    tarjetas.forEach((tarjeta, indice) => {
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tarjeta.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            tarjeta.style.opacity = '1';
            tarjeta.style.transform = 'translateY(0)';
        }, indice * 100);
    });
}

// Función para marcar enlace activo
function marcarEnlaceActivo() {
    const paginaActual = window.location.pathname.split('/').pop();
    const enlaces = document.querySelectorAll('.enlace-nav');
    
    enlaces.forEach(enlace => {
        const href = enlace.getAttribute('href');
        if (href === paginaActual || 
            (paginaActual === '' && href === 'index.html') ||
            (paginaActual.includes('index') && href === 'index.html')) {
            enlace.classList.add('activo');
        }
    });
}

// Función para crear HTML de tarjeta de juego
function crearTarjetaJuego(juego) {
    return `
        <div class="tarjeta-juego">
            <a href="${juego.enlace}" target="_blank">
                <img src="${juego.imagen}" alt="${juego.titulo}">
                <div class="contenido-juego">
                    <h3 class="titulo-juego">${juego.titulo}</h3>
                    <span class="etiqueta-plataforma">${juego.plataforma}</span>
                    ${juego.descripcion ? `<p class="text-muted mb-0">${juego.descripcion}</p>` : ''}
                </div>
            </a>
        </div>
    `;
}