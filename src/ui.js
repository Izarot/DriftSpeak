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
  console.log("\nMutation Result:\n");

  console.log(result);
}