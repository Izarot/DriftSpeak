export function printBanner() {
  console.log(`
==================================
🌍 DriftSpeak
⚡ Izaron Drift Engine
==================================
`);
}

export function printChain(chain) {
  console.log("Generated Drift Chain:\n");

  chain.forEach((step, index) => {
    console.log(
      `${index + 1}. ${step.from} → ${step.to}`
    );
  });
}

export function printResult(result) {
  console.log("\nMutation History:\n");

  result.history.forEach((step) => {
    console.log(
      `[${step.cycle}] ${step.from} → ${step.to}`
    );

    console.log(
      `${step.input}`
    );

    console.log("↓");

    console.log(
      `${step.output}\n`
    );
  });

  console.log("==================================");
  console.log("FINAL OUTPUT:\n");
  console.log(result.final);
}