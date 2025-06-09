// ColorCard.jsx  (one card in the palette grid)
export default function ColorCard({ hex, canCopy }) {
  const handleClick = () => {
    if (!canCopy) {
      alert("Provide your email to unlock copy-on-click.");
      return;
    }
    navigator.clipboard.writeText(hex).then(() => console.log(`Copied ${hex}`));
  };

  return (
    <div
      onClick={handleClick}
      className={`w-20 h-32 rounded-xl shadow-inner border border-black/10
                  ${
                    canCopy
                      ? "cursor-pointer hover:opacity-80"
                      : "cursor-not-allowed opacity-90"
                  }`}
      style={{ backgroundColor: hex }}
      title={hex}
    />
  );
}
