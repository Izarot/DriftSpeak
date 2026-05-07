const button =
  document.getElementById("driftButton");

const output =
  document.getElementById("output");

button.addEventListener("click", () => {
  const text =
    document.getElementById("inputText").value;

  const cycles =
    document.getElementById("cycles").value;

  output.textContent =
`INPUT:
${text}

CYCLES:
${cycles}

Drift engine not connected yet.
`;
});