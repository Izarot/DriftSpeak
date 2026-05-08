import { driftText }
from "../src/core/drift.js";

const input =
  document.getElementById(
    "inputText"
  );

const cycles =
  document.getElementById(
    "cycleCount"
  );

const button =
  document.getElementById(
    "runButton"
  );

const output =
  document.getElementById(
    "output"
  );

button.onclick =
async () => {

  output.innerHTML =
    "DRIFTING...";

  const result =
    await driftText(
      input.value,
      Number(cycles.value)
    );

  output.innerHTML =
    result.map(step =>

      `
Cycle ${step.cycle}

${step.fakeFrom}
→
${step.to}

${step.text}

------------------
      `

    ).join("");
};