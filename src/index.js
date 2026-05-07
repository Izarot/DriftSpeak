import { generateDriftChain } from "./drift.js";
import { mutateText } from "./mutate.js";

const input = "Hello world";
const cycles = 20;

console.log("🌍 DriftSpeak initialized.");
console.log("⚡ Izaron Drift Engine online.\n");

console.log(`Input: ${input}`);
console.log(`Cycles: ${cycles}\n`);

const chain = generateDriftChain(cycles);

console.log("Generated Drift Chain:\n");

chain.forEach((step, index) => {
  console.log(
    `${index + 1}. ${step.from} → ${step.to}`
  );
});

const result = mutateText(input, chain);

console.log("\nMutation Result:\n");

console.log(result);