import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const types = ["❤️", "🌸", "✨", "🌹"];
    const newElements = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-opacity-40"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
          }}
          initial={{ y: "110%", opacity: 0 }}
          animate={{
            y: "-110%",
            opacity: [0, 0.4, 0.4, 0],
            x: [`${el.x}%`, `${el.x + (Math.random() * 20 - 10)}%`],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear",
          }}
        >
          {el.type}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
