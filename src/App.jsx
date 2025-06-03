import React, { useState, useMemo } from "react";
import chroma from "chroma-js";
import { motion } from "framer-motion";

/* --------------------------------------------------------------------------
   ULTRA‑LIGHT UI PRIMITIVES                                                  
   ----------------------------------------------------------------------- */
const PillButton = ({ active, children, className = "", ...rest }) => (
  <button
    className={`px-3 py-1 rounded-md text-sm font-medium border transition \
      ${
        active
          ? "bg-blue-600 text-white"
          : "bg-white text-neutral-800 hover:bg-neutral-100"
      } ${className}`}
    {...rest}
  >
    {children}
  </button>
);

const ColorCard = ({ hex }) => (
  <div
    className="w-20 h-32 rounded-xl shadow-inner border border-black/10 overflow-hidden"
    style={{ backgroundColor: hex }}
    title={hex}
  />
);

/* --------------------------------------------------------------------------
   COLOUR‑THEORY‑DRIVEN BASE‑HUE POOLS                                         
   Each mood maps to a *palette* of 3‑5 representative hues so we can pick a
   fresh anchor every shuffle while keeping the emotion intact.
   ----------------------------------------------------------------------- */
const POOLS = {
  adventurous: [
    "#FF6B00", // vivid orange
    "#FF4500", // blazing red‑orange
    "#FF9B00", // saffron
    "#FFD000", // sunflower yellow
    "#E63946", // adventurous crimson
  ],
  affective: [
    "#FF5C8A", // rose pink
    "#FF4040", // love‑red
    "#FF9AA2", // blush
    "#FFA07A", // light salmon
    "#FFD300", // warm honey yellow
  ],
  affordable: [
    "#4CAF50", // main friendly green
    "#63D471", // mint
    "#20C997", // teal
    "#79C467", // spring green
    "#3CB371", // medium sea green
  ],
  ageless: [
    "#2E4057", // timeless navy
    "#4A4E69", // desaturated indigo
    "#1B1D2A", // charcoal blue
    "#8E8D8A", // greige
    "#5D737E", // steel teal
  ],
  bold: [
    "#C21807", // crimson
    "#D7263D", // scarlet
    "#3F0071", // royal purple
    "#FF6B00", // electric orange
    "#FFC300", // vivid yellow
  ],
  calm: [
    "#6EC5E9", // sky blue
    "#8DD7F8", // baby blue
    "#4CA1E0", // cornflower
    "#A8DADC", // soft aqua
    "#5FA8D3", // cool teal
  ],
  cozy: [
    "#B58863", // chai latte
    "#A46B46", // cinnamon
    "#CC9A78", // pecan
    "#D98236", // pumpkin
    "#804000", // warm cocoa
  ],
  earthy: [
    "#8B4513", // saddle brown
    "#A0522D", // sienna
    "#556B2F", // olive drab
    "#4B5320", // moss green
    "#7F5217", // soil umber
  ],
  neon: [
    "#39FF14", // neon lime
    "#FF14E9", // neon magenta
    "#0AFFEF", // neon cyan
    "#FFEC00", // neon yellow
    "#FF073A", // neon red‑pink
  ],
};

const TWO_PI = 360;
const rand = (min, max) => Math.random() * (max - min) + min;
const rotate = (h, deg) => (h + deg + TWO_PI) % TWO_PI;

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/* --------------------------------------------------------------------------
   HARMONY HELPERS (same as before)                                           
   ----------------------------------------------------------------------- */
function harmonyHues(harmony, anchorHue) {
  switch (harmony) {
    case "monochromatic":
      return [anchorHue];
    case "analogous":
      return [anchorHue, rotate(anchorHue, 30), rotate(anchorHue, -30)];
    case "complementary":
      return [anchorHue, rotate(anchorHue, 180)];
    case "triadic":
      return [anchorHue, rotate(anchorHue, 120), rotate(anchorHue, -120)];
    default:
      return [];
  }
}

/* --------------------------------------------------------------------------
   PALETTE GENERATOR                                                          
   ----------------------------------------------------------------------- */
function generatePalette({ moods, count, harmony, seed }) {
  // 1️⃣   PICK BASE HUES PER MOOD ------------------------------------------
  const chosenHueForMood = {};
  moods.forEach((m) => {
    const hex = sample(POOLS[m] ?? ["#888"]);
    chosenHueForMood[m] = chroma(hex).get("hsl.h");
  });

  // 2️⃣   BUILD HUE POOL BASED ON HARMONY -----------------------------------
  const anchorHue = moods.length ? chosenHueForMood[moods[0]] : rand(0, 360);
  let huePool = harmonyHues(harmony, anchorHue);

  if (huePool.length === 0) {
    huePool = moods.map((m) => rotate(chosenHueForMood[m], rand(-15, 15)));
  }

  // 3️⃣   CONSTRUCT FINAL COLOURS ------------------------------------------
  const palette = [];
  for (let i = 0; i < count; i++) {
    const baseHue = huePool[i % huePool.length];
    const hue = rotate(baseHue, rand(-10, 10));
    const sat = rand(0.55, 0.9);
    const light = rand(0.35, 0.8);
    palette.push(chroma.hsl(hue, sat, light).hex());
  }

  return palette;
}

/* --------------------------------------------------------------------------
   MAIN COMPONENT                                                             
   ----------------------------------------------------------------------- */
export default function ColorMood() {
  const [selectedMoods, setSelectedMoods] = useState(["adventurous"]);
  const [requestedCount, setRequestedCount] = useState(5);
  const [harmony, setHarmony] = useState("none");
  const [shuffleKey, setShuffleKey] = useState(0);

  const palette = useMemo(
    () =>
      generatePalette({
        moods: selectedMoods,
        count: requestedCount,
        harmony,
        seed: shuffleKey,
      }),
    [selectedMoods, requestedCount, harmony, shuffleKey]
  );

  const toggleMood = (m) =>
    setSelectedMoods((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );

  const addColor = () => setRequestedCount((c) => Math.min(c + 1, 10));
  const removeColor = () => setRequestedCount((c) => Math.max(c - 1, 5));
  const shuffle = () => setShuffleKey((k) => k + 1);

  const HARMONY_OPTIONS = [
    "none",
    "monochromatic",
    "analogous",
    "complementary",
    "triadic",
  ];

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <h1 className="text-4xl font-bold">ColorMood</h1>

      {/* Mood selector */}
      <p className="text-lg">1. Pick one or more moods</p>
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
        {Object.keys(POOLS).map((mood) => (
          <PillButton
            key={mood}
            active={selectedMoods.includes(mood)}
            onClick={() => toggleMood(mood)}
          >
            {mood}
          </PillButton>
        ))}
      </div>

      {/* Harmony selector */}
      <p className="text-lg pt-4">2. Choose a colour harmony</p>
      <div className="flex flex-wrap justify-center gap-2">
        {HARMONY_OPTIONS.map((opt) => (
          <PillButton
            key={opt}
            active={harmony === opt}
            onClick={() => setHarmony(opt)}
          >
            {opt}
          </PillButton>
        ))}
      </div>

      {/* Palette preview */}
      <p className="text-lg pt-4">3. Your palette</p>
      <div className="flex gap-2">
        {palette.map((hex, idx) => (
          <motion.div
            key={hex + idx + shuffleKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.04 }}
          >
            <ColorCard hex={hex} />
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2 pt-2">
        <PillButton onClick={removeColor} disabled={requestedCount <= 5}>
          − Remove
        </PillButton>
        <PillButton onClick={addColor} disabled={requestedCount >= 10}>
          + Add Color
        </PillButton>
        <PillButton onClick={shuffle}>🔀 Shuffle</PillButton>
      </div>
    </div>
  );
}
