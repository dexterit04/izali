/* ============================================
   IZALI - Florería | JavaScript principal
   Versión con FormSubmit integrado
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. Menú móvil (hamburguesa) ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('abierto');
        });

        // Cerrar el menú al hacer clic en un enlace (en móvil)
        nav.querySelectorAll('a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                nav.classList.remove('abierto');
            });
        });
    }

    /* ---------- 2. Lightbox para la galería ---------- */
    const galeria = document.getElementById('galeria');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const cerrarLightbox = document.querySelector('.cerrar-lightbox');

    if (galeria && lightbox && lightboxImg) {
        // Al hacer clic en una imagen de la galería
        galeria.querySelectorAll('img').forEach(imagen => {
            imagen.addEventListener('click', () => {
                lightbox.classList.add('activo');
                lightboxImg.src = imagen.src;
                lightboxImg.alt = imagen.alt;
            });
        });

        // Cerrar con la X
        if (cerrarLightbox) {
            cerrarLightbox.addEventListener('click', () => {
                lightbox.classList.remove('activo');
            });
        }

        // Cerrar al hacer clic fuera de la imagen
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('activo');
            }
        });

        // Cerrar con la tecla ESC (accesibilidad)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('activo')) {
                lightbox.classList.remove('activo');
            }
        });
    }

    /* ---------- 3. Validación del formulario de reserva ----------
       IMPORTANTE: Solo bloquea el envío SI hay errores.
       Si todo está correcto, el formulario se envía a FormSubmit.
    ------------------------------------------------------------- */
    const formReserva = document.getElementById('formReserva');

    if (formReserva) {
        // Impedir fechas en el pasado
        const fechaInput = document.getElementById('fecha');
        if (fechaInput) {
            const hoy = new Date().toISOString().split('T')[0];
            fechaInput.setAttribute('min', hoy);
        }

        formReserva.addEventListener('submit', (e) => {
            // Capturamos los valores
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const tipo = document.getElementById('tipo').value;
            const fecha = document.getElementById('fecha').value;
            const direccion = document.getElementById('direccion').value.trim();

            let errores = [];

            // --- Validaciones ---
            if (nombre.length < 3) {
                errores.push('El nombre debe tener al menos 3 caracteres.');
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                errores.push('Por favor, ingresa un correo válido.');
            }

            const regexTel = /^[0-9+\s-]{8,15}$/;
            if (!regexTel.test(telefono)) {
                errores.push('El teléfono debe tener entre 8 y 15 dígitos.');
            }

            if (!tipo) {
                errores.push('Selecciona un tipo de arreglo.');
            }

            if (!fecha) {
                errores.push('Selecciona una fecha de entrega.');
            }

            if (direccion.length < 5) {
                errores.push('Ingresa una dirección de entrega válida.');
            }

            // --- Si hay errores, bloqueamos el envío ---
            if (errores.length > 0) {
                e.preventDefault();
                alert('⚠️ Por favor corrige lo siguiente:\n\n- ' + errores.join('\n- '));
                return;
            }

            // --- Si todo está bien, mostramos un mensaje y dejamos que FormSubmit envíe ---
            // El formulario se enviará de forma natural a FormSubmit ✅
            const boton = formReserva.querySelector('button[type="submit"]');
            if (boton) {
                boton.textContent = '⏳ Enviando...';
                boton.disabled = true;
            }
        });
    }

    /* ---------- 4. Animación de entrada en scroll ---------- */
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.tarjeta, .flor-card, .bouquet-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observador.observe(el);
    });

    /* ---------- 5. Año dinámico en el footer ---------- */
    document.querySelectorAll('.copyright').forEach(el => {
        el.innerHTML = el.innerHTML.replace('2025', new Date().getFullYear());
    });

});