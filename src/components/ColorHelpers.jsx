import chroma from "chroma-js";
import { colorPool } from "../data/moods";

//helpers
export const rand = (min, max) => Math.random() * (max - min) + min; //helper function para dar randomize ao hsl
export const clamp = (x, minBound = 0, maxBound = 1) =>
  Math.min(Math.max(x, minBound), maxBound); //faz com que o numero escolhido esteja entre 0 e 1
export const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

// choose n distinct random elements from an array, when there's only one mood selected
export default function pickDistinct(arr, n) {
  const remaining = [...arr]; // pool of items we haven’t chosen yet

  const selected = []; // items we have already chosen

  while (selected.length < n && remaining.length) {
    //keep going until the remaining pool equals the numberofColors
    const index = Math.floor(Math.random() * remaining.length);
    selected.push(remaining.splice(index, 1)[0]);
  }
  return selected;
}
export function buildScaleFromHex(hex, n) {
  // Convert hex → LCH once
  const [L, C, H] = chroma(hex).lch();
  // Create a light–mid–dark scale in LCH for perceptual uniformity
  return chroma
    .scale([
      //creates a gradient function from the array of “stops” you supply next.
      chroma.lch(clamp(L + 20, 0, 100), C * 0.8, H), //1st stop: ligher
      chroma.lch(L, C, H), //original
      chroma.lch(clamp(L - 20, 0, 100), C * 0.6, H), //darker
    ])
    .mode("lch")
    .colors(n); //split in the number of colors needed
}

//converts hsl into hex and returns the array of random colors
//When primary mood is null, a random palette is generated
export function randomPalette(numberofColors) {
  const arr = [];
  for (let i = 0; i < numberofColors; i++) {
    const h = rand(0, 360); //hue angle
    const s = rand(0.55, 0.9); //saturation
    const l = rand(0.35, 0.75); //lightness
    arr.push(chroma.hsl(h, s, l).hex());
  }
  return arr;
}

export function generatePalette({ primary, secondary, numberofColors }) {
  // if the user has chosen no mood, stop here and give a fully random palette
  if (!primary) return randomPalette(numberofColors);
  //anchor hex's
  let anchors = [];

  if (secondary) {
    // 2 moods: one anchor each (as before)
    anchors = [sample(colorPool[primary]), sample(colorPool[secondary])];
  } else {
    // 1 mood: pick multiple distinct colours from its pool
    const pool = colorPool[primary] ?? ["#777"]; // #777 is a fallback
    const howMany = Math.min(
      Math.max(Math.round(numberofColors / 3), 2), // 2–3 anchors
      pool.length
    ); // 2–3 anchors
    anchors = pickDistinct(pool, howMany);
  }

  const perScale = Math.ceil(numberofColors / anchors.length); //divides the total desired count by the number of anchors, then rounds up
  const scales = anchors.map((hex) => buildScaleFromHex(hex, perScale));

  // Interleave scales so every anchor shows up: a1, b1, c1, a2, b2 …
  const palette = [];
  for (let i = 0; palette.length < numberofColors; i++) {
    anchors.forEach((_, index) => {
      const col = scales[index][i];
      if (col && palette.length < numberofColors) palette.push(col);
    });
  }

  return palette;
}
