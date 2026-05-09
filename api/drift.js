import { driftText }
from "../src/core/drift.js";

const translationCache = {};

export default async function handler(
  req,
  res
) {

  const {
    text,
    cycles
  } = req.body;

  const languages = [

  "fr", // French
  "de", // German
  "es", // Spanish
  "ja", // Japanese
  "ko", // Korean
  "ru", // Russian
  "ar", // Arabic
  "fi", // Finnish
  "tr", // Turkish
  "it", // Italian
  "pl", // Polish
  "nl", // Dutch
  "zh-CN", // Chinese Simplified
  "zh-TW", // Chinese Traditional
  "hi", // Hindi
  "bn", // Bengali
  "ta", // Tamil
  "te", // Telugu
  "el", // Greek
  "he", // Hebrew
  "th", // Thai
  "vi", // Vietnamese
  "id", // Indonesian
  "ms", // Malay
  "uk", // Ukrainian
  "ro", // Romanian
  "hu", // Hungarian
  "cs", // Czech
  "da", // Danish
  "no", // Norwegian
  "sv", // Swedish
  "sk", // Slovak
  "sr", // Serbian
  "hr", // Croatian
  "bg", // Bulgarian
  "lt", // Lithuanian
  "lv", // Latvian
  "et", // Estonian
  "sl", // Slovenian
  "sw", // Swahili
  "fa", // Persian
  "ur", // Urdu
  "ca", // Catalan
  "eu", // Basque
  "gl", // Galician
  "is", // Icelandic
  "mt", // Maltese
  "sq", // Albanian
  "mk", // Macedonian

 ];

  const history = [];

  let currentText = text;

  function randomItem(arr) {

    return arr[
      Math.floor(
        Math.random() *
        arr.length
      )
    ];
  }

  // VERY LIGHT NATURAL MUTATION

  function mutateText(input) {

    let text = input;

    // ~1% typo chance

    if (Math.random() < 0.01) {

      text =
        text.replace(
          /a/g,
          "ah"
        );
    }

    // tiny punctuation instability

    if (Math.random() < 0.03) {

      text += ".";
    }

    return text;
  }

  async function doTranslate(
    input,
    fakeFrom,
    to
  ) {

    const mutated =
      mutateText(input);

    const cacheKey =
      `${mutated}_${fakeFrom}_${to}`;

    // CACHE MEMORY

    if (
      translationCache[cacheKey]
    ) {

      return translationCache[
        cacheKey
      ];
    }

    console.log(
      `FAKE ${fakeFrom} → ${to}`
    );

    const controller =
      new AbortController();

    const timeout =
      setTimeout(
        () =>
          controller.abort(),
        5000
      );

    try {

      const url =
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fakeFrom}&tl=${to}&dt=t&q=${encodeURIComponent(mutated)}`;

      const response =
        await fetch(
          url,
          {
            signal:
              controller.signal
          }
        );

      clearTimeout(timeout);

      const data =
        await response.json();

      const translated =
        data[0]
          .map(
            item => item[0]
          )
          .join("");

      translationCache[
        cacheKey
      ] = translated;

      return translated;

    } catch (error) {

      console.error(error);

      return mutated;
    }
  }

  try {

    // FIRST STEP
    // en → random

    let currentLanguage =
      randomItem(
        languages
      );

    currentText =
      await doTranslate(
        currentText,
        "en",
        currentLanguage
      );

    history.push({
      cycle: 1,
      fakeFrom: "en",
      to:
        currentLanguage,
      text:
        currentText
    });

    // CHAOS DRIFT

    for (
      let i = 0;
      i < cycles;
      i++
    ) {

      let fakeSource =
        randomItem(
          languages
        );

      let target =
        randomItem(
          languages
        );

      while (
        target === fakeSource
      ) {

        target =
          randomItem(
            languages
          );
      }

      currentText =
        await doTranslate(
          currentText,
          fakeSource,
          target
        );

      history.push({
        cycle: i + 2,

        fakeFrom:
          fakeSource,

        to:
          target,

        text:
          currentText
      });
    }

    // FINAL RECONSTRUCTION

    currentText =
      await doTranslate(
        currentText,
        randomItem(
          languages
        ),
        "en"
      );

    history.push({
      cycle:
        cycles + 2,
      fakeFrom:
        "???",
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
        "Drift reactor collapse ☠️"
    });
  }
}