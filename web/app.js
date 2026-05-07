const button =
  document.getElementById("driftButton");

const output =
  document.getElementById("output");

function fakeDrift(text, cycles) {
  let current = text;

  let history = "";

  for (let i = 1; i <= cycles; i++) {

    current =
      `[DRIFT ${i}] ` + current;

    history +=
`${i}. ${current}

`;
  }

  return history;
}

button.addEventListener("click", () => {

  const text =
    document.getElementById("inputText").value;

  const cycles =
    parseInt(
      document.getElementById("cycles").value
    );

  if (!text.trim()) {
    output.textContent =
      "Enter some text first.";
    return;
  }

  output.textContent =
    fakeDrift(text, cycles);

});