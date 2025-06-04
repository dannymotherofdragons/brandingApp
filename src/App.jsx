import React, { useState, useMemo } from "react";
import MoodPicker from "./components/MoodPicker";
import PaletteDisplay from "./components/PaletteDisplay";
import PaletteControls from "./components/PaletteControls";
import { generatePalette } from "./components/ColorHelpers";

//default export
export default function ColorMood() {
  const [primary, setPrimary] = useState(null);
  const [secondary, setSecondary] = useState(null);
  const [numberofColors, setNumberOfColors] = useState(5);
  const [shuffleKey, setShuffleKey] = useState(0);

  const palette = useMemo(
    () => generatePalette({ primary, secondary, numberofColors }),
    [primary, secondary, numberofColors, shuffleKey]
  );

  const handleMoodPick = (mood) => {
    if (primary === mood) {
      setPrimary(secondary);
      setSecondary(null);
    } else if (secondary === mood) {
      setSecondary(null);
    } else if (!primary) {
      setPrimary(mood);
    } else if (!secondary) {
      setSecondary(mood);
    } else {
      setSecondary(mood);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <h1 className="text-4xl font-bold">ColorMood</h1>

      <p className="text-lg">Primary & Secondary mood</p>
      <MoodPicker
        primary={primary}
        secondary={secondary}
        onPick={handleMoodPick}
      />

      <PaletteDisplay palette={palette} shuffleKey={shuffleKey} />

      <PaletteControls
        numberofColors={numberofColors}
        onAdd={() => setNumberOfColors((c) => Math.min(c + 1, 10))}
        onRemove={() => setNumberOfColors((c) => Math.max(c - 1, 5))}
        onShuffle={() => setShuffleKey((k) => k + 1)}
      />
    </div>
  );
}
