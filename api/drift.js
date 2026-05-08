import { driftText }
from "../src/core/drift.js";

export default async function handler(
  req,
  res
) {

  if (
    req.method !== "POST"
  ) {

    return res
      .status(405)
      .json({
        error:
          "Method not allowed"
      });
  }

  const {
    text,
    cycles
  } = req.body;

  const result =
    await driftText(
      text,
      cycles
    );

  res.status(200).json(
    result
  );
}
