import { generateDriftChain } from "./drift.js";

console.log("🌍 DriftSpeak initialized.");
console.log("⚡ Izaron Drift Engine online.\n");

const chain = generateDriftChain(10);

console.log("Generated Drift Chain:\n");

chain.forEach((step, index) => {
  console.log(
    `${index + 1}. ${step.from} → ${step.to}`
  );
});