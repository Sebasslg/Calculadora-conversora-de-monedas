// Script principal para el conversor de monedas nacionales

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Elementos del formulario
  const inputMonto = document.getElementById('montoPesoChileno');   // Input para ingresar monto en CLP
  const selectMoneda = document.getElementById('monedaConvertir');  // Select para elegir moneda destino
  const botonBuscar = document.getElementById('btnBuscar');         // Botón para ejecutar la conversión

  // Evento click en el botón de conversión
  botonBuscar.addEventListener('click', async () => {
    const montoCLP = parseFloat(inputMonto.value);                  // Monto ingresado por el usuario
    const monedaSeleccionada = selectMoneda.value;                  // Moneda seleccionada

    // Validación de datos ingresados
    if (isNaN(montoCLP) || montoCLP <= 0 || monedaSeleccionada === '') {
      alert('SELECCIONAR CANTIDAD VALIDA.');
      return;
    }

    // Consulta a la API de mindicador.cl para obtener valores de monedas
    try {
      const respuesta = await fetch('https://mindicador.cl/api');
      const datos = await respuesta.json();

      const indicador = datos[monedaSeleccionada];
      if (!indicador) {
        alert('ERROR, MONEDA NO ENCONTRADA.');
        return;
      }

      // Cálculo de conversión
      const valorMoneda = indicador.valor;
      const convertido = (montoCLP / valorMoneda).toFixed(2);

      // Mostrar resultado en la página
      mostrarResultado(montoCLP, valorMoneda, monedaSeleccionada, convertido);
    } catch (error) {
      // Manejo de errores en la consulta a la API
      alert('Error al obtener los datos. Intente nuevamente más tarde.');
      console.error(error);
    }
  });

  // Función para mostrar el resultado de la conversión
  function mostrarResultado(monto, valorMoneda, moneda, convertido) {
    const resultadoDiv = document.getElementById('resultado');
    const nombreMoneda = moneda.toUpperCase();

    resultadoDiv.innerHTML = `
      <h3>RESULTADO DE LA CONVERSION: </h3>
      <p><strong>Monto ingresado:</strong> $${monto.toLocaleString()}</p>
      <p><strong>Valor de ${nombreMoneda}:</strong> $${valorMoneda.toLocaleString()}</p>
      <p><strong>Monto Convertido:</strong> ${convertido} ${nombreMoneda}</p>
    `;
  }
});
