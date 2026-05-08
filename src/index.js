import readline from "readline";

import { driftText }
from "./core/drift.js";

const rl =
  readline.createInterface({

    input: process.stdin,

    output: process.stdout
  });

rl.question(
  "Enter text: ",

  (text) => {

    rl.question(
      "Enter cycles: ",

      async (cycles) => {

        const result =
          await driftText(
            text,
            Number(cycles)
          );

        console.log("\n");

        result.forEach(
          step => {

            console.log(
              `Cycle ${step.cycle}`
            );

            console.log(
              `${step.fakeFrom} → ${step.to}`
            );

            console.log(
              step.text
            );

            console.log(
              "----------------"
            );
          }
        );

        rl.close();
      }
    );
  }
);