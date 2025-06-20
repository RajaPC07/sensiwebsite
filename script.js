// Populate brands
window.onload = function () {
  const brandSelect = document.getElementById("brand");
  const modelSelect = document.getElementById("model");

  Object.keys(data).forEach(brand => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandSelect.appendChild(opt);
  });

  brandSelect.addEventListener("change", () => {
    modelSelect.innerHTML = "";
    const models = Object.keys(data[brandSelect.value] || {});
    models.forEach(model => {
      const opt = document.createElement("option");
      opt.value = model;
      opt.textContent = model;
      modelSelect.appendChild(opt);
    });
    modelSelect.dispatchEvent(new Event("change"));
  });

  brandSelect.dispatchEvent(new Event("change"));
};

function enableButton() {
  document.getElementById("genBtn").disabled = false;
}

function generateSensi() {
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const sensitivity = document.getElementById("playstyle").value;
  const ram = document.getElementById("ram").value;
  const output = document.getElementById("output");

  const result = data?.[brand]?.[model]?.[ram]?.[sensitivity];

  if (result) {
    output.innerHTML = `
      <div class="result">
        <p><strong>General:</strong> ${result.general}</p>
        <p><strong>Red Dot:</strong> ${result.redDot}</p>
        <p><strong>2x Scope:</strong> ${result.scope2x}</p>
        <p><strong>4x Scope:</strong> ${result.scope4x}</p>
        <p><strong>DPI:</strong> ${result.dpi}</p>
        <p><strong>Pointer Speed:</strong> ${result.pointerSpeed}</p>
      </div>
    `;
  } else {
    output.innerHTML = `<p style="color: red;"><i class="fa-solid fa-xmark"></i> Sensitivity settings not found. Please check your inputs.</p>`;
  }
}
