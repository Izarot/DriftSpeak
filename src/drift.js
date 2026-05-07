import { languages } from "./languages.js";

function randomLanguage() {
  return languages[
    Math.floor(Math.random() * languages.length)
  ];
}

export function generateDriftChain(iterations = 10) {
  const chain = [];

  for (let i = 0; i < iterations; i++) {
    chain.push({
      from: randomLanguage(),
      to: randomLanguage()
    });
  }

  return chain;
}