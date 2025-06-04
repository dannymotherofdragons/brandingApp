import PillButton from "./ui/BasePill";
export default function PaletteControls({
  numberofColors,
  onAdd,
  onRemove,
  onShuffle,
}) {
  return (
    <div className="flex gap-2 pt-2">
      <PillButton onClick={onRemove} disabled={numberofColors <= 5}>
        − Remove
      </PillButton>
      <PillButton onClick={onAdd} disabled={numberofColors >= 10}>
        + Add Color
      </PillButton>
      <PillButton onClick={onShuffle}>🔀 Shuffle</PillButton>
    </div>
  );
}
