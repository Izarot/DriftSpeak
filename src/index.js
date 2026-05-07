import { generateDriftChain } from "./drift.js";
import { mutateText } from "./mutate.js";

import {
  printBanner,
  printChain,
  printResult
} from "./ui.js";

import { getConfig } from "./config.js";

const { input, cycles } = getConfig();

printBanner();

console.log(`Input: ${input}`);
console.log(`Cycles: ${cycles}\n`);

const chain = generateDriftChain(cycles);

printChain(chain);

const result = mutateText(input, chain);

printResult(result);