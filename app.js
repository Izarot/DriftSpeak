alert("DRIFTSPEAK JS LOADED 😭🔥");

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
    "<p>DRIFTING...</p>";

  const response =
    await fetch(
      "/api/drift",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          text: input.value,
          cycles:
            Number(
              cycles.value
            )
        })
      }
    );

  const result =
    await response.json();

  output.innerHTML = "";

  result.forEach(
    step => {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "driftCard";

      card.innerHTML =

        `
        <div class="lang">
          Cycle ${step.cycle}
          •
          ${step.fakeFrom}
          →
          ${step.to}
        </div>

        <div class="text">
          ${step.text}
        </div>
        `;

      output.appendChild(
        card
      );
    }
  );
};