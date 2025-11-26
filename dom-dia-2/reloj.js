// Reloj Digital Interactivo con Alarma
// Este archivo implementa un reloj que se actualiza cada segundo,
// muestra la fecha en español, permite configurar alarmas y cambiar formato 24h/12h.
// Sintaxis ES5 con comentarios explicativos línea por línea.

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar elementos del DOM
  var horaDisplay = document.getElementById('reloj-hora');
  var fechaDisplay = document.getElementById('reloj-fecha');
  var saludoDisplay = document.getElementById('saludo');
  var inputAlarma = document.getElementById('alarma-hora');
  var btnEstablecerAlarma = document.getElementById('btn-establecer-alarma');
  var btnCancelarAlarma = document.getElementById('btn-cancelar-alarma');
  var estadoAlarmaDisplay = document.getElementById('alarma-estado');
  var notificacionAlarma = document.getElementById('alarma-notificacion');
  var btnFormato = document.getElementById('btn-formato');

  // Nombres de meses en español (índice 0 = enero, 11 = diciembre)
  var meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Nombres de días en español
  var dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Estado del reloj: qué formato de hora usar (true = 24h, false = 12h)
  var formato24h = true;

  // Estado de la alarma: hora configurada (HH:MM) o null si no hay alarma
  var alarmaConfigurda = null;

  // Flag: indica si la alarma está sonando ahora
  var alarmaActiva = false;

  // Función para formatear número con ceros a la izquierda
  // Por ejemplo: formatearNumero(5, 2) devuelve '05'
  function formatearNumero(num, digitos) {
    var str = String(num);
    // Repetir '0' tantas veces como sea necesario
    while (str.length < digitos) {
      str = '0' + str;
    }
    return str;
  }

  // Función para obtener el saludo según la hora actual
  // Devuelve "Buenos días", "Buenas tardes" o "Buenas noches"
  function obtenerSaludo(hora) {
    // Entre 5:00 y 12:00 -> Buenos días
    if (hora >= 5 && hora < 12) {
      return 'Buenos días';
    }
    // Entre 12:00 y 18:00 -> Buenas tardes
    if (hora >= 12 && hora < 18) {
      return 'Buenas tardes';
    }
    // De 18:00 a 5:00 -> Buenas noches
    return 'Buenas noches';
  }

  // Función para actualizar el reloj cada segundo
  function actualizarReloj() {
    // Obtener fecha y hora actual
    var ahora = new Date();
    var hora = ahora.getHours();
    var minutos = ahora.getMinutes();
    var segundos = ahora.getSeconds();

    // Formatear hora con ceros a izquierda
    var horaFormato = formatearNumero(hora, 2);
    var minutosFormato = formatearNumero(minutos, 2);
    var segundosFormato = formatearNumero(segundos, 2);

    // Si formato es 12h, convertir y añadir AM/PM
    var mostrarHora;
    if (!formato24h) {
      var hora12 = hora % 12 || 12; // Convertir 0->12, 13->1, etc.
      var ampm = hora >= 12 ? 'PM' : 'AM';
      mostrarHora = formatearNumero(hora12, 2) + ':' + minutosFormato + ':' + segundosFormato + ' ' + ampm;
    } else {
      // Formato 24h
      mostrarHora = horaFormato + ':' + minutosFormato + ':' + segundosFormato;
    }

    // Actualizar display de hora
    horaDisplay.textContent = mostrarHora;

    // Actualizar saludo según hora
    saludoDisplay.textContent = obtenerSaludo(hora);

    // Formatear y mostrar fecha
    var dia = ahora.getDate();
    var mes = ahora.getMonth();
    var año = ahora.getFullYear();
    var nombreDia = dias[ahora.getDay()];
    var fechaTexto = nombreDia + ', ' + formatearNumero(dia, 2) + ' de ' + meses[mes] + ' de ' + año;
    fechaDisplay.textContent = fechaTexto;

    // Verificar si debe sonar la alarma
    if (alarmaConfigurda !== null && !alarmaActiva) {
      // alarmaConfigurda tiene formato "HH:MM" del input type="time"
      var partes = alarmaConfigurda.split(':');
      var alarmaHora = parseInt(partes[0], 10);
      var alarmaMinutos = parseInt(partes[1], 10);

      // Comparar: si la hora actual coincide con la alarma
      if (hora === alarmaHora && minutos === alarmaMinutos) {
        // Sonar la alarma
        sonarAlarma();
      }
    }
  }

  // Función que suena cuando llega la hora de la alarma
  function sonarAlarma() {
    // Marcar que la alarma está activa
    alarmaActiva = true;

    // Mostrar notificación de alarma
    notificacionAlarma.style.display = 'block';

    // Reproducir sonido usando alert (simulación)
    // En un proyecto real, usar Web Audio API o elemento <audio>
    alert('¡ALARMA SONANDO A LAS ' + alarmaConfigurda + '!');

    // Después de 10 segundos, detener automáticamente
    setTimeout(function() {
      detenerAlarma();
    }, 10000);
  }

  // Función para detener la alarma manualmente
  function detenerAlarma() {
    alarmaActiva = false;
    notificacionAlarma.style.display = 'none';
  }

  // Manejador: botón "Establecer Alarma"
  btnEstablecerAlarma.addEventListener('click', function() {
    var horaSeleccionada = inputAlarma.value; // Devuelve "HH:MM" o cadena vacía

    if (horaSeleccionada === '') {
      alert('Por favor, selecciona una hora en el input.');
      return;
    }

    // Obtener hora actual para validación
    var ahora = new Date();
    var horaActual = formatearNumero(ahora.getHours(), 2);
    var minutosActuales = formatearNumero(ahora.getMinutes(), 2);
    var horaActualFormato = horaActual + ':' + minutosActuales;

    // Validar que la alarma sea en el futuro (comparación simple como cadena)
    // Nota: esto funciona porque HH:MM en formato 24h se ordena alfabéticamente igual que numéricamente
    if (horaSeleccionada <= horaActualFormato) {
      alert('La hora de alarma debe ser posterior a la hora actual.');
      inputAlarma.value = '';
      return;
    }

    // Configurar la alarma
    alarmaConfigurda = horaSeleccionada;
    alarmaActiva = false;

    // Actualizar display del estado
    estadoAlarmaDisplay.textContent = '🔔 Alarma configurada para las ' + horaSeleccionada;
    estadoAlarmaDisplay.style.color = '#ff6';
  });

  // Manejador: botón "Cancelar Alarma"
  btnCancelarAlarma.addEventListener('click', function() {
    alarmaConfigurda = null;
    alarmaActiva = false;
    inputAlarma.value = '';
    estadoAlarmaDisplay.textContent = 'Sin alarma configurada';
    estadoAlarmaDisplay.style.color = '#0a0';
    notificacionAlarma.style.display = 'none';
  });

  // Manejador: botón "Cambiar a 12h/24h"
  btnFormato.addEventListener('click', function() {
    formato24h = !formato24h;
    btnFormato.textContent = formato24h ? 'Cambiar a 12h' : 'Cambiar a 24h';
    // La próxima actualización del reloj mostrará el nuevo formato
  });

  // Inicializar el reloj inmediatamente
  actualizarReloj();

  // Actualizar el reloj cada segundo (1000 ms)
  setInterval(actualizarReloj, 1000);
});
