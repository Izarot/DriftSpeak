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
    "tr",
    "it",
    "pl",
    "nl"
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

  async function doTranslate(
    input,
    from,
    to
  ) {

    console.log(
      `${from} → ${to}`
    );

    const response =
      await fetch(
        "https://translate.argosopentech.com/translate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            q: input,
            source: from,
            target: to,
            format: "text"
          })
        }
      );

    const data =
      await response.json();

    return data.translatedText;
  }

  try {

    // FIRST STEP
    // en → random

    let nextLanguage =
      randomLanguage();

    while (
      nextLanguage === currentLanguage
    ) {

      nextLanguage =
        randomLanguage();
    }

    currentText =
      await doTranslate(
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

    // RANDOM CHAOS CYCLES

    for (
      let i = 0;
      i < cycles;
      i++
    ) {

      let targetLanguage =
        randomLanguage();

      while (
        targetLanguage === currentLanguage
      ) {

        targetLanguage =
          randomLanguage();
      }

      currentText =
        await doTranslate(
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

    // FINAL STEP
    // random → en

    currentText =
      await doTranslate(
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

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Semantic reactor meltdown ☠️"
    });
  }
}