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

    const cacheKey =
      `${input}_${from}_${to}`;

    // MEMORY CACHE

    if (
      translationCache[cacheKey]
    ) {

      console.log(
        "CACHE HIT:",
        cacheKey
      );

      return translationCache[
        cacheKey
      ];
    }

    console.log(
      `API: ${from} → ${to}`
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
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(input)}`;

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

      const translatedText =
        data[0]
          .map(
            item => item[0]
          )
          .join("");

      // SAVE TO MEMORY

      translationCache[
        cacheKey
      ] = translatedText;

      return translatedText;

    } catch (error) {

      console.error(
        "Translation failed:",
        error
      );

      return input;
    }
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