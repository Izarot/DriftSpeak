import {
  fakeLanguages
} from "./languages.js";

import {
  mutateSentence
} from "./mutate.js";

function randomItem(array) {

  return array[
    Math.floor(Math.random() * array.length)
  ];
}

export function generateDrift(text, cycles) {

  let current = text;

  let history = "";

  for (let i = 1; i <= cycles; i++) {

    const from =
      randomItem(fakeLanguages);

    const to =
      randomItem(fakeLanguages);

    current =
      mutateSentence(current);

    history +=
`[${i}] ${from} → ${to}

${current}

`;
  }

  return history;
}