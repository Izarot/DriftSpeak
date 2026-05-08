import express from "express";

import cors from "cors";

import { driftText }
from "./src/core/drift.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.static("web")
);

app.get("/", (req, res) => {

  res.sendFile(
    process.cwd() +
    "/web/index.html"
  );
});

app.post(
  "/drift",
  async (req, res) => {

    const {
      text,
      cycles
    } = req.body;

    const result =
      await driftText(
        text,
        cycles
      );

    res.json(result);
  }
);

app.listen(
  3000,
  () => {

    console.log(
      "DriftSpeak running on http://localhost:3000"
    );
  }
);