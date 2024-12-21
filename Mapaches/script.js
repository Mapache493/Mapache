// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Cargar galería de imágenes
    loadGallery();
    
    // Validación del formulario
    setupFormValidation();
    
    // Smooth scroll para los enlaces de navegación
    setupSmoothScroll();
});

// Función para cargar la galería
function loadGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    const numberOfImages = 6;
    
    for (let i = 1; i <= numberOfImages; i++) {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        
        const galleryItem = `
            <div class="gallery-item" onclick="openImageModal(this)">
                <img src="https://www.hola.com/horizon/landscape/aa89e0e412be-mapaches-curiosidades-mascota-t.jpg" class="img-fluid w-100" 
                     alt="Mapache ${i}" loading="lazy">
            </div>
        `;
        
        col.innerHTML = galleryItem;
        galleryContainer.appendChild(col);
    }
}

// Función para abrir imagen en modal
function openImageModal(element) {
    const imgSrc = element.querySelector('img').src;
    const imgAlt = element.querySelector('img').alt;
    
    // Crear modal dinámicamente
    const modalHTML = `
        <div class="modal fade" id="imageModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${imgAlt}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center p-0">
                        <img src="${imgSrc}" class="img-fluid modal-fullscreen-image" alt="${imgAlt}">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
    
    // Limpiar el DOM cuando se cierre el modal
    document.getElementById('imageModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Configurar validación del formulario
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            // Aquí iría la lógica para enviar el formulario
            alert('¡Mensaje enviado con éxito!');
            form.reset();
        }
        
        form.classList.add('was-validated');
    });
}

// Configurar smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Cambiar estado activo en la navegación al hacer scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});