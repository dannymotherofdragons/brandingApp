export function PaletteDisplay({ palette }) {
  return (
    <div className="flex gap-3">
      {palette.map((color, idx) => (
        <div
          key={idx}
          className="w-20 h-20 rounded shadow"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
