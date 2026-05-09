const input =
  document.getElementById("inputText");

const cycles =
  document.getElementById("cycleCount");

const button =
  document.getElementById("runButton");

const resultArea =
  document.getElementById("resultArea");

const historyToggle =
  document.getElementById("historyToggle");

const historyPanel =
  document.getElementById("historyPanel");

let latestHistory = [];

button.onclick = async () => {

  resultArea.innerHTML = `
    <div class="finalCard">
      <div class="originalText">
        INITIATING DRIFT...
      </div>
    </div>
  `;

  historyToggle.classList.add("hidden");
  historyPanel.classList.add("hidden");

  const response = await fetch(
    "/api/drift",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        text: input.value,
        cycles: Number(cycles.value)
      })
    }
  );

  const result =
  await response.json();

latestHistory =
  result.history;

const finalStep =
  result.history[
    result.history.length - 1
  ];

  resultArea.innerHTML = `
    <div class="finalCard">

      <div class="originalText">
        ${input.value}
      </div>

      <div class="arrow">
        ↓
      </div>

      <div class="finalText">
        ${finalStep.text}
      </div>

    </div>
  `;

  historyToggle.classList.remove("hidden");
};

historyToggle.onclick = () => {

  if (
    !historyPanel.classList.contains(
      "hidden"
    )
  ) {

    historyPanel.classList.add(
      "hidden"
    );

    return;
  }

  historyPanel.innerHTML = "";

  latestHistory.forEach(step => {

    const card =
      document.createElement("div");

    card.className =
      "historyCard";

    card.innerHTML = `
      <div class="historyLang">
        Cycle ${step.cycle}
        •
        ${step.fakeFrom}
        →
        ${step.to}
      </div>

      <div class="historyText">
        ${step.text}
      </div>
    `;

    historyPanel.appendChild(card);
  });

  historyPanel.classList.remove(
    "hidden"
  );
};