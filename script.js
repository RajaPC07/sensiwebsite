// Populate brands
window.onload = () => {
  const brandSelect = document.getElementById("brand");
  const brands = Object.keys(data);
  brands.forEach(brand => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });
  loadModels();
};

document.getElementById("brand").onchange = loadModels;

function loadModels() {
  const brand = document.getElementById("brand").value;
  const modelSelect = document.getElementById("model");
  modelSelect.innerHTML = "";
  Object.keys(data[brand]).forEach(model => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
}

function enableButton() {
  document.getElementById("genBtn").disabled = false;
  alert("Thanks for subscribing! You can now generate your settings.");
}

function generateSensi() {
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const playstyle = document.getElementById("playstyle").value;
  const ram = document.getElementById("ram").value;
  const output = document.getElementById("output");

  const result = data?.[brand]?.[model]?.[ram]?.[playstyle];

  if (!result) {
    output.innerHTML = `<p>❌ Sensitivity settings not found. Please check your inputs.</p>`;
    return;
  }

  output.innerHTML = `
    <h3>🎮 Suggested Sensitivity Settings</h3>
    <p><i class='fa-solid fa-sliders'></i> <strong>General:</strong> ${result.general}</p>
    <p><i class='fa-solid fa-bullseye'></i> <strong>Red Dot:</strong> ${result.redDot}</p>
    <p><i class='fa-solid fa-magnifying-glass'></i> <strong>2x Scope:</strong> ${result.scope2x}</p>
    <p><i class='fa-solid fa-crosshairs'></i> <strong>4x Scope:</strong> ${result.scope4x}</p>
    <p><i class='fa-solid fa-expand'></i> <strong>DPI:</strong> ${result.dpi}</p>
    <p><i class='fa-solid fa-mouse-pointer'></i> <strong>Pointer Speed:</strong> ${result.pointerSpeed}</p>
  `;
}
