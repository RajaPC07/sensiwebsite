// Populate brands and set up dropdown behavior
window.onload = function () {
  const brandSelect = document.getElementById("brand");
  const modelSelect = document.getElementById("model");

  // Add default placeholder option for brand
  const defaultBrandOption = document.createElement("option");
  defaultBrandOption.textContent = "Select a Brand";
  defaultBrandOption.disabled = true;
  defaultBrandOption.selected = true;
  brandSelect.appendChild(defaultBrandOption);

  // Add default placeholder option for model
  const defaultModelOption = document.createElement("option");
  defaultModelOption.textContent = "Select a Model";
  defaultModelOption.disabled = true;
  defaultModelOption.selected = true;
  modelSelect.appendChild(defaultModelOption);

  // Populate brand dropdown
  Object.keys(data).forEach(brand => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandSelect.appendChild(opt);
  });

  // On brand change, populate model dropdown
  brandSelect.addEventListener("change", () => {
    modelSelect.innerHTML = ""; // Clear previous models

    const defaultModel = document.createElement("option");
    defaultModel.textContent = "Select a Model";
    defaultModel.disabled = true;
    defaultModel.selected = true;
    modelSelect.appendChild(defaultModel);

    const models = Object.keys(data[brandSelect.value] || {});
    models.forEach(model => {
      const opt = document.createElement("option");
      opt.value = model;
      opt.textContent = model;
      modelSelect.appendChild(opt);
    });

    // Trigger model change event
    modelSelect.dispatchEvent(new Event("change"));

    // Clear output
    document.getElementById("output").innerHTML = "";
  });

  // Also clear output when model, ram, or playstyle changes
  ["model", "ram", "playstyle"].forEach(id => {
    document.getElementById(id).addEventListener("change", () => {
      document.getElementById("output").innerHTML = "";
    });
  });

  // Trigger brand change to initialize models
  brandSelect.dispatchEvent(new Event("change"));
};

// Enable the generate button (called on checkbox or subscribe click)
function enableButton() {
  document.getElementById("genBtn").disabled = false;
}


// Generate and display sensitivity settings
function generateSensi() {
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const sensitivity = document.getElementById("playstyle").value;
  const ram = document.getElementById("ram").value;
  const output = document.getElementById("output");

  // Clear previous result
  output.innerHTML = "";

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
