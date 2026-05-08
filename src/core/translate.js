import translate from "translate-google";

export async function translateText(
  text,
  from,
  to
) {

  try {

    const result =
      await translate(
        text,
        {
          from,
          to
        }
      );

    return result;

  } catch (error) {

    console.error(
      "Translation failed:",
      error
    );

    return text;
  }
}
