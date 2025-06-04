import PillButton from "./ui/BasePill";
import { colorPool } from "../data/moods";
export default function MoodButtons({ primary, secondary, onPick }) {
  const click = (mood) => onPick(mood);
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {Object.keys(colorPool).map((color) => {
        //returns an array of those mood names then maps them and returns a button for each one
        const role =
          primary === color
            ? "primary"
            : secondary === color
            ? "secondary"
            : "none";
        return (
          <PillButton key={color} role={role} onClick={() => click(color)}>
            {color}
          </PillButton>
        );
      })}
    </div>
  );
}
