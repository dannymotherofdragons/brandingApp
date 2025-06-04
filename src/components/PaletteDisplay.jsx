import { motion } from "framer-motion";
import ColorCard from "./ui/ColorCard";
export default function PaletteDisplay({ palette, shuffleKey }) {
  //loops through every hex string in the palette array
  return (
    <div className="flex gap-2 pt-4">
      {palette.map((hex, index) => (
        <motion.div
          key={hex + index + shuffleKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.04 }}
        >
          <ColorCard hex={hex} />
        </motion.div>
      ))}
    </div>
  );
}
