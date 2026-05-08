import { translateText }
from "./translate.js";

import { languages }
from "./languages.js";

import { randomItem }
from "../utils/random.js";

export async function driftText(
  text,
  cycles
) {

  let current = text;

  const history = [];

  let currentLanguage = "en";

  for (
    let i = 1;
    i <= cycles;
    i++
  ) {

    const fakeFrom =
      randomItem(languages);

    let to =
      randomItem(languages);

    while (to === fakeFrom) {

      to =
        randomItem(languages);
    }

    current =
      await translateText(
        current,
        fakeFrom,
        to
      );

    history.push({
      cycle: i,
      fakeFrom,
      to,
      text: current
    });

    currentLanguage = to;
  }

  return history;
}