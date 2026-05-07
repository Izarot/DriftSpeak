import {
  fakeWords
} from "./languages.js";

function randomItem(array) {

  return array[
    Math.floor(Math.random() * array.length)
  ];
}

export function mutateWord(word) {

  if (word.length < 3) {
    return word;
  }

  const mutations = [
    word + randomItem(["a", "o", "ix", "um"]),
    word.slice(1),
    word.slice(0, -1),
    randomItem(fakeWords),
    word + "-" + randomItem(fakeWords)
  ];

  return randomItem(mutations);
}

export function mutateSentence(text) {

  return text
    .split(" ")
    .map(mutateWord)
    .join(" ");
}