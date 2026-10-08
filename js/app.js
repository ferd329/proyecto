// 1. Menú Hamburguesa
const hamburgerBtn = document.querySelector('#hamburger-btn');
const navMenu = document.querySelector('#nav-menu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// 2. Dark Mode Toggle
const toggle = document.querySelector('#dark-mode-toggle');

if (toggle) {
  toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
}

// 3. Validación básica del Formulario
const form = document.querySelector('#contact-form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! El formulario se ha validado correctamente.');
    form.reset();
  });
}
// Manejo de Feedback en cliente con localStorage
const feedbackForm = document.querySelector('#feedback-form');
const listaFeedback = document.querySelector('#lista-feedback');

// 1. Cargar comentarios guardados previamente
function cargarFeedback() {
  if (!listaFeedback) return;
  
  const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios_feedback')) || [];
  listaFeedback.innerHTML = '';

  comentariosGuardados.forEach(item => {
    insertarTarjetaFeedback(item.autor, item.mensaje);
  });
}

// 2. Función auxiliar para renderizar la tarjeta en el HTML
function insertarTarjetaFeedback(autor, mensaje) {
  const tarjeta = document.createElement('blockquote');
  tarjeta.classList.add('tarjeta-feedback');
  tarjeta.innerHTML = `
    <p>"${mensaje}"</p>
    <cite>— ${autor}</cite>
  `;
  listaFeedback.prepend(tarjeta);
}

// 3. Guardar nuevo comentario cuando el usuario envíe el formulario
if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const autorInput = document.querySelector('#autor-feedback');
    const mensajeInput = document.querySelector('#comentario-feedback');

    const autor = autorInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    if (!autor || !mensaje) return;

    // Guardar en el arreglo de localStorage
    const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios_feedback')) || [];
    comentariosGuardados.push({ autor, mensaje });
    localStorage.setItem('comentarios_feedback', JSON.stringify(comentariosGuardados));

    // Mostrar el comentario de inmediato en la pantalla
    insertarTarjetaFeedback(autor, mensaje);

    // Limpiar el formulario
    feedbackForm.reset();
  });
}

// Ejecutar la carga inicial al abrir la página
cargarFeedback();