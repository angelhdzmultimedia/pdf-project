// Import stylesheets
import './style.css';

const $ = (sel) => document.querySelector(sel);

const inputCargarPdf = $('#input-cargar-pdf');
inputCargarPdf.addEventListener('input', (evento) => {
  // Archivo seleccionado.
  // Obtener archivo
  const archivo = evento.target.files[0];
  // Crear instancia de Lector de Archivos
  const lectorDeArchivos = new FileReader();
  function alCargar(evento) {
    // Evento de "load" despachado.
    // Leer datos
    const datos = evento.target.result;

    // Ahora puedes enviar los datos al controlador de Spring
    // haciendo una peticion HTTP post aqui con fetch()
    fetch('https://node-wnu1a6--5001.local.webcontainer.io/api/pdf', {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      mode: 'cors',
      method: 'POST',
      body: datos,
    });
  }
  // Escuchar evento de "load"
  lectorDeArchivos.addEventListener('load', alCargar);
  // Leer archivo
  // lectorDeArchivos.readAsDataURL(archivo);
  // para obtener un DataURL del archivo
  lectorDeArchivos.readAsBinaryString(archivo);
  // para obtener los datos binarios
});
