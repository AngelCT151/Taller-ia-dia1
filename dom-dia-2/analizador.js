// Analizador de Texto en Tiempo Real
// Aplicación web que analiza estadísticas de texto (caracteres, palabras, oraciones, tiempo de lectura)
// Sintaxis ES5 con comentarios explicativos y manejo de errores básico.

document.addEventListener('DOMContentLoaded', function() {
  // ==================== Seleccionar elementos del DOM ====================
  var textoInput = document.getElementById('texto-input');
  var statCaracteres = document.getElementById('stat-caracteres');
  var statCaracteresSinEspacios = document.getElementById('stat-caracteres-sin-espacios');
  var statPalabras = document.getElementById('stat-palabras');
  var statOraciones = document.getElementById('stat-oraciones');
  var statLectura = document.getElementById('stat-lectura');
  var btnLimpiar = document.getElementById('btn-limpiar');
  var btnCopiarStats = document.getElementById('btn-copiar-stats');
  var mensajeConfirmacion = document.getElementById('mensaje-confirmacion');

  // ==================== Funciones de análisis ====================

  // Función: contar caracteres incluyendo espacios
  // Devuelve: número de caracteres (int)
  function contarCaracteres(texto) {
    // isNaN o typeof: validación básica de entrada
    if (typeof texto !== 'string') {
      return 0;
    }
    // Devolver la longitud de la cadena
    return texto.length;
  }

  // Función: contar caracteres sin espacios en blanco
  // Devuelve: número de caracteres sin espacios (int)
  function contarCaracteresSinEspacios(texto) {
    // Validar entrada
    if (typeof texto !== 'string') {
      return 0;
    }
    // Reemplazar todos los espacios, tabulaciones y saltos de línea por cadena vacía
    var sinEspacios = texto.replace(/\s/g, '');
    return sinEspacios.length;
  }

  // Función: contar palabras (considera espacios múltiples)
  // Devuelve: número de palabras (int)
  function contarPalabras(texto) {
    // Validar entrada
    if (typeof texto !== 'string') {
      return 0;
    }
    // Trim(): elimina espacios al inicio y final
    var trimmed = texto.trim();
    // Si el texto está vacío después de trim, hay 0 palabras
    if (trimmed === '') {
      return 0;
    }
    // Usar split(/\s+/) para dividir por uno o más espacios en blanco
    // Esto considera espacios, tabulaciones, saltos de línea como separadores
    var palabras = trimmed.split(/\s+/);
    return palabras.length;
  }

  // Función: contar oraciones (basado en . ! ?)
  // Devuelve: número de oraciones (int)
  function contarOraciones(texto) {
    // Validar entrada
    if (typeof texto !== 'string') {
      return 0;
    }
    // Trim para eliminar espacios en blanco innecesarios
    var trimmed = texto.trim();
    // Si está vacío, no hay oraciones
    if (trimmed === '') {
      return 0;
    }
    // Buscar todos los caracteres que terminan oraciones: punto, signo de interrogación, signo de exclamación
    // \. = punto (con escape porque . es carácter especial en regex)
    // [.!?] = cualquiera de estos tres caracteres
    var oracionesEncontradas = trimmed.match(/[.!?]/g);
    // Si no encuentra ninguna, match() devuelve null; usar || 0 para devolver 0
    return oracionesEncontradas ? oracionesEncontradas.length : 0;
  }

  // Función: calcular tiempo estimado de lectura (en minutos)
  // Basado en 200 palabras por minuto (velocidad de lectura promedio)
  // Devuelve: tiempo de lectura formateado (string, ej. "2 min", "< 1 min")
  function calcularTiempoLectura(texto) {
    // Validar entrada
    if (typeof texto !== 'string') {
      return '< 1 min';
    }
    // Obtener número de palabras
    var numPalabras = contarPalabras(texto);
    // Velocidad de lectura promedio: 200 palabras por minuto
    var velocidadLectura = 200;
    // Calcular tiempo: palabras / velocidad
    var tiempoMinutos = numPalabras / velocidadLectura;
    // Si es menor a 1 minuto, mostrar "< 1 min"
    if (tiempoMinutos < 1) {
      return '< 1 min';
    }
    // Redondear a número entero
    var tiempoRedondeado = Math.round(tiempoMinutos);
    // Devolver formato: "X min"
    return tiempoRedondeado + ' min';
  }

  // ==================== Función principal: actualizar estadísticas ====================
  // Se llama cada vez que el usuario escribe en el textarea
  function actualizarEstadisticas() {
    // Obtener el texto del textarea
    var texto = textoInput.value;

    // Calcular todas las estadísticas
    var numCaracteres = contarCaracteres(texto);
    var numCaracteresSinEspacios = contarCaracteresSinEspacios(texto);
    var numPalabras = contarPalabras(texto);
    var numOraciones = contarOraciones(texto);
    var tiempoLectura = calcularTiempoLectura(texto);

    // Actualizar elementos del DOM con los valores calculados
    statCaracteres.textContent = numCaracteres;
    statCaracteresSinEspacios.textContent = numCaracteresSinEspacios;
    statPalabras.textContent = numPalabras;
    statOraciones.textContent = numOraciones;
    statLectura.textContent = tiempoLectura;

    // Añadir clase de animación para feedback visual (opcional)
    // Nota: requiere CSS con animación definida
    agregarAnimacionActualizacion(statCaracteres);
    agregarAnimacionActualizacion(statPalabras);
  }

  // Función auxiliar: agregar animación visual al actualizar un valor
  // Esto da feedback visual de que el número cambió
  function agregarAnimacionActualizacion(elemento) {
    // Agregar clase para activar animación
    elemento.classList.add('animacion-actualizar');
    // Después de 300ms, remover la clase (duración debe coincidir con CSS)
    setTimeout(function() {
      elemento.classList.remove('animacion-actualizar');
    }, 300);
  }

  // Función: obtener estadísticas formateadas para copiar
  // Devuelve: string con todas las estadísticas separadas por saltos de línea
  function obtenerEstadisticasFormato() {
    var texto = textoInput.value;
    var stats = 'ANÁLISIS DE TEXTO\n';
    stats += '=================\n';
    stats += 'Caracteres (con espacios): ' + contarCaracteres(texto) + '\n';
    stats += 'Caracteres (sin espacios): ' + contarCaracteresSinEspacios(texto) + '\n';
    stats += 'Palabras: ' + contarPalabras(texto) + '\n';
    stats += 'Oraciones: ' + contarOraciones(texto) + '\n';
    stats += 'Tiempo de lectura: ' + calcularTiempoLectura(texto) + '\n';
    return stats;
  }

  // ==================== Event Listeners ====================

  // Listener: actualizar estadísticas en tiempo real mientras se escribe
  textoInput.addEventListener('input', function() {
    actualizarEstadisticas();
  });

  // Listener: botón "Limpiar" (resetea todo)
  btnLimpiar.addEventListener('click', function() {
    // Limpiar textarea
    textoInput.value = '';
    // Actualizar estadísticas (todo a 0)
    actualizarEstadisticas();
    // Ocultar mensaje de confirmación si estaba visible
    mensajeConfirmacion.style.display = 'none';
  });

  // Listener: botón "Copiar Estadísticas"
  btnCopiarStats.addEventListener('click', function() {
    try {
      // Obtener estadísticas formateadas
      var estadisticas = obtenerEstadisticasFormato();

      // Usar Web API Clipboard para copiar al portapapeles
      if (navigator.clipboard && window.isSecureContext) {
        // Método moderno (disponible en HTTPS o localhost)
        navigator.clipboard.writeText(estadisticas).then(function() {
          // Mostrar mensaje de confirmación
          mensajeConfirmacion.style.display = 'block';
          // Ocultar después de 2 segundos
          setTimeout(function() {
            mensajeConfirmacion.style.display = 'none';
          }, 2000);
        }).catch(function(err) {
          // En caso de error, usar alternativa
          console.error('Error al copiar:', err);
          copiarAlternativo(estadisticas);
        });
      } else {
        // Método alternativo para navegadores antiguos
        copiarAlternativo(estadisticas);
      }
    } catch (err) {
      // Manejo básico de errores
      console.error('Error inesperado:', err);
      alert('Error al copiar estadísticas. Intenta de nuevo.');
    }
  });

  // Función auxiliar: método alternativo para copiar (navegadores antiguos)
  // Crea un textarea temporal, copia el contenido y lo elimina
  function copiarAlternativo(texto) {
    try {
      // Crear elemento textarea temporal
      var temp = document.createElement('textarea');
      temp.value = texto;
      // Estilos para hacerlo invisible
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      // Añadir al DOM
      document.body.appendChild(temp);
      // Seleccionar texto
      temp.select();
      // Ejecutar comando de copia
      document.execCommand('copy');
      // Eliminar elemento temporal
      document.body.removeChild(temp);
      // Mostrar mensaje de confirmación
      mensajeConfirmacion.style.display = 'block';
      setTimeout(function() {
        mensajeConfirmacion.style.display = 'none';
      }, 2000);
    } catch (err) {
      console.error('Error en método alternativo:', err);
      alert('No se pudo copiar. Intenta de nuevo.');
    }
  }

  // Inicializar: calcular estadísticas del texto vacío al cargar la página
  actualizarEstadisticas();
});
