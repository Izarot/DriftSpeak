const translationCache = {};

export default async function handler(
  req,
  res
) {

  try {

    const {
      text,
      cycles
    } = req.body;

    // SAFETY LIMIT

    const safeCycles =
      Math.min(
        Number(cycles),
        50
      );

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
      "nl",
      "zh-CN",
      "zh-TW",
      "hi",
      "bn",
      "ta",
      "te",
      "el",
      "he",
      "th",
      "vi",
      "id",
      "ms",
      "uk",
      "ro",
      "hu",
      "cs",
      "da",
      "no",
      "sv",
      "sk",
      "sr",
      "hr",
      "bg",
      "lt",
      "lv",
      "et",
      "sl",
      "sw",
      "fa",
      "ur",
      "ca",
      "eu",
      "gl",
      "is",
      "mt",
      "sq",
      "mk"

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

    // LIGHT NATURAL MUTATION

    function mutateText(input) {

      let text = input;

      // VERY RARE typo drift

      if (
        Math.random() < 0.01
      ) {

        text =
          text.replace(
            /a/g,
            "ah"
          );
      }

      // Tiny punctuation instability

      if (
        Math.random() < 0.03
      ) {

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

      // CACHE HIT

      if (
        translationCache[
          cacheKey
        ]
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
          4000
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

          console.log(
           JSON.stringify(data)
          );

        if (
          !data[0]
        ) {

          return mutated;
        }

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

        console.error(
          "Translation failed:",
          error
        );

        return mutated;
      }
    }

    // FIRST STEP

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
      i < safeCycles;
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

        cycle:
          i + 2,

        fakeFrom:
          fakeSource,

        to:
          target,

        text:
          currentText
      });
    }

    // FINAL ENGLISH RECONSTRUCTION

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
        safeCycles + 2,

      fakeFrom:
        "???",

      to:
        "en",

      text:
        currentText
    });

    // ENGLISHISH STABILIZATION

    for (
      let i = 0;
      i < 3;
      i++
    ) {

      try {

        const controller =
          new AbortController();

        const timeout =
          setTimeout(
            () =>
              controller.abort(),
            4000
          );

        const response =
          await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(currentText)}`,
            {
              signal:
                controller.signal
            }
          );

        clearTimeout(timeout);

        const data =
          await response.json();

        if (
          !data[0]
        ) {

          break;
        }

        currentText =
          data[0]
            .map(
              item => item[0]
            )
            .join("");

        history.push({

          cycle:
            safeCycles + 3 + i,

          fakeFrom:
            "auto",

          to:
            "en-ish",

          text:
            currentText
        });

      } catch (error) {

        console.error(
          "Stabilization failed:",
          error
        );

        break;
      }
    }

    res.status(200).json({

      finalText:
        currentText,

      history
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error:
        "Drift reactor collapse ☠️"
    });
  }
}