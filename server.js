import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import driftHandler from "./api/drift.js";

const app = express();

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

app.use(express.json());

app.use(
  express.static(__dirname)
);

app.post(
  "/api/drift",
  (req, res) =>
    driftHandler(req, res)
);

app.listen(3000, () => {

  console.log(
    "DriftSpeak reactor online ☢️"
  );
});