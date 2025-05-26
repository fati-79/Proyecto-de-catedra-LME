document.querySelector(".img1").addEventListener("mouseenter", function () {
  document.querySelector(".contenedorBeforeAfter").style.transform =
    "translateY(20px)";
});

document.querySelector(".img1").addEventListener("mouseleave", function () {
  document.querySelector(".contenedorBeforeAfter").style.transform =
    "translateY(0)";
});

document.getElementById("carbonForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const kmAuto = parseFloat(document.getElementById("auto").value) || 0;
  const gastoElectrico =
    parseFloat(document.getElementById("gastoElectrico").value) || 0;
  const carne = parseFloat(document.getElementById("carne").value) || 0;
  const agua = parseFloat(document.getElementById("agua").value) || 0;

  const costoPorKWh = 0.15;
  const kWh = gastoElectrico / costoPorKWh;

  const autoCO2 = kmAuto * 0.21 * 4;
  const luzCO2 = kWh * 0.4;
  const carneCO2 = carne * 2.5 * 4;
  const aguaCO2 = agua * 0.05 * 30;

  const total = (autoCO2 + luzCO2 + carneCO2 + aguaCO2).toFixed(2);

  let mensaje = "";
  let recomendacionesHTML = "";

  if (total < 200) {
    mensaje = `<p>¡Felicidades! Tu huella de carbono es baja.</p>`;
  } else if (total >= 200 && total <= 400) {
    mensaje = `<p>Tu huella de carbono está dentro del promedio.</p>`;
    recomendacionesHTML = `
      <ul>
        <li>Usa transporte público o comparte coche</li>
        <li>Reduce algo el consumo de carne</li>
        <li>Asegúrate de apagar luces innecesarias</li>
      </ul>
    `;
  } else {
    mensaje = `<p>Tu huella de carbono es alta.</p>`;
    recomendacionesHTML = `
      <ul>
        <li>Usa más bicicleta o transporte público</li>
        <li>Disminuye el consumo de carne</li>
        <li>Optimiza el uso de energía en casa</li>
        <li>Reduce el tiempo de ducha</li>
      </ul>
    `;
  }

  const resultadoDiv = document.querySelector(".recomendaciones");
  resultadoDiv.innerHTML = `
    <h2 class="resultado-calculadora">Resultado</h2>
    <div id="resultado" class="resultado-contenido">
      <h3>Tu huella de carbono mensual</h3>
      <p class="total-co2">${total} kg de CO₂</p>
      
      <div class="desglose">
        <h4>Desglose por categoría:</h4>
        <ul>
          <li>Transporte: ${autoCO2.toFixed(2)} kg</li>
          <li>Electricidad: ${luzCO2.toFixed(2)} kg</li>
          <li>Consumo de carne: ${carneCO2.toFixed(2)} kg</li>
          <li>Uso de agua: ${aguaCO2.toFixed(2)} kg</li>
        </ul>
      </div>

      <div class="recomendaciones-container">
        ${mensaje}
        ${recomendacionesHTML}
      </div>
    </div>
  `;

  // Resetear animación
  resultadoDiv.style.opacity = "0";
  resultadoDiv.style.transform = "translateY(20px)";

  // Activar animación y scroll
  setTimeout(() => {
    resultadoDiv.style.opacity = "1";
    resultadoDiv.style.transform = "translateY(0)";
    
    // Desplazamiento suave al contenedor
    resultadoDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 50);
});