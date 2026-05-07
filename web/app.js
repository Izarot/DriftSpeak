import {
  generateDrift
} from "./scripts/drift.js";

import {
  renderOutput
} from "./scripts/ui.js";

const button =
  document.getElementById("driftButton");

const output =
  document.getElementById("output");

button.addEventListener("click", () => {

  const text =
    document.getElementById("inputText").value;

  const cycles =
    parseInt(
      document.getElementById("cycles").value
    );

  if (!text.trim()) {

    renderOutput(
      output,
      "Enter some text first."
    );

    return;
  }

  const history =
    generateDrift(text, cycles);

  renderOutput(output, history);

});