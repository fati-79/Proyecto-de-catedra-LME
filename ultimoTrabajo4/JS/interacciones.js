document.addEventListener("DOMContentLoaded", () => {
  const map = L.map('map').setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  fetch('JSON/emisiones.json')
    .then(response => {
      if (!response.ok) throw new Error('Error al cargar el archivo JSON');
      return response.json();
    })
    .then(datos => {
      datos.forEach(({ pais, lat, lon, emisiones }) => {
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(`<strong>${pais}</strong><br>Emisiones: ${emisiones}`);
      });
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error);
      alert('No se pudo cargar la información de emisiones.');
    });
});

  // Aquí se cargan los datos desde el JSON
  fetch('JSON/emisiones.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(pais => {
        const radio = pais.emisiones / 50;
        const color = pais.emisiones > 5000 ? "#c62828" : "#66bb6a";

        L.circle(pais.coordenadas, {
          color: color,
          fillColor: color,
          fillOpacity: 0.6,
          radius: radio * 1000
        })
          .addTo(map)
          .bindPopup(`<strong>${pais.pais}</strong><br>Emisiones: ${pais.emisiones.toLocaleString()} MtCO₂`);
      });
    })
    .catch(err => console.error('Error al cargar emisiones.json:', err));

  // Creamos el boton Ir al inicio
  const btn = document.createElement('button');
  btn.id = 'toTop';
  btn.innerHTML = '🔝 Ir al inicio';

  // Y por ultimo creamos el Tooltip
  const tooltip = document.createElement('span');
  tooltip.className = 'tooltip-text';
  tooltip.textContent = 'Ir al inicio de la página';
  btn.appendChild(tooltip);

  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });