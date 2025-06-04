//card de cada cor individual

const ColorCard = ({ hex }) => (
  <div
    className="w-20 h-32 rounded-xl shadow-inner border border-black/10 overflow-hidden"
    style={{ backgroundColor: hex }}
    //title={hex} (tooltip)
  />
);

export default ColorCard;
