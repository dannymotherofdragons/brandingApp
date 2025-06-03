import { useState, useEffect } from "react";
import moods from "./data/moods"; // Adjust path as needed
import "./index.css";

// Helpers
function range([min, max]) {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePalette(selectedMoods, paletteSize = 5) {
  if (!selectedMoods.length) return [];

  const merged = { baseHue: [], saturation: [], lightness: [] };

  for (const mood of selectedMoods) {
    const moodData = moods[mood];
    if (!moodData?.zones) continue;

    for (const zone of moodData.zones) {
      merged.baseHue.push(...range(zone.baseHue));
      merged.saturation.push(...range(zone.saturation));
      merged.lightness.push(...range(zone.lightness));
    }
  }

  return Array.from({ length: paletteSize }, () => {
    const h = pick(merged.baseHue);
    const s = pick(merged.saturation);
    const l = pick(merged.lightness);
    return `hsl(${h}, ${s}%, ${l}%)`;
  });
}

export default function App() {
  const [selectedMoods, setSelectedMoods] = useState(["assertive"]);
  const [palette, setPalette] = useState([]);
  const [paletteSize, setPaletteSize] = useState(5);

  useEffect(() => {
    const newPalette = generatePalette(selectedMoods, paletteSize);
    setPalette(newPalette);
  }, [selectedMoods, paletteSize]);

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">
        🎨 <span className="text-black">ColorMood</span>
      </h1>
      <p className="text-gray-600 mb-4">Select one or more moods</p>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {Object.keys(moods).map((mood) => (
          <button
            key={mood}
            onClick={() => toggleMood(mood)}
            className={`px-4 py-1 rounded border text-sm ${
              selectedMoods.includes(mood)
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">
          Number of colors: {paletteSize}
        </label>
        <input
          type="range"
          min="3"
          max="10"
          value={paletteSize}
          onChange={(e) => setPaletteSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {palette.length > 0 ? (
        <div className="flex gap-3 justify-center flex-wrap">
          {palette.map((color, idx) => (
            <div
              key={idx}
              className="w-20 h-20 rounded shadow border"
              style={{ backgroundColor: color }}
              title={color}
            ></div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Select moods to generate a palette</p>
      )}
    </div>
  );
}
