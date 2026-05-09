import { driftText }
from "../src/core/drift.js";

export default async function handler(
  req,
  res
) {

  const {
    text,
    cycles
  } = req.body;

  const languages = [
    "fr",
    "de",
    "es",
    "ja",
    "ko",
    "ru",
    "ar",
    "fi",
    "tr"
  ];

  const history = [];

  let currentText = text;

  let currentLanguage = "en";

  function randomLanguage() {

    return languages[
      Math.floor(
        Math.random() *
        languages.length
      )
    ];
  }

  // FIRST STEP:
  // en → random

  let nextLanguage =
    randomLanguage();

  currentText =
    await translate(
      currentText,
      currentLanguage,
      nextLanguage
    );

  history.push({
    cycle: 1,
    fakeFrom:
      currentLanguage,
    to:
      nextLanguage,
    text:
      currentText
  });

  currentLanguage =
    nextLanguage;

  // MIDDLE CHAOS CYCLES

  for (
    let i = 0;
    i < cycles;
    i++
  ) {

    let targetLanguage =
      randomLanguage();

    currentText =
      await translate(
        currentText,
        currentLanguage,
        targetLanguage
      );

    history.push({
      cycle: i + 2,
      fakeFrom:
        currentLanguage,
      to:
        targetLanguage,
      text:
        currentText
    });

    currentLanguage =
      targetLanguage;
  }

  // FINAL STEP:
  // random → en

  currentText =
    await translate(
      currentText,
      currentLanguage,
      "en"
    );

  history.push({
    cycle:
      cycles + 2,
    fakeFrom:
      currentLanguage,
    to:
      "en",
    text:
      currentText
  });

  res.status(200).json(
    history
  );
}
