import { useState } from "react";
import { motion } from "framer-motion";

function CursorTrack() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    setRotateX(((event.clientY - rect.top) / rect.height) * 30 - 15);
    setRotateY(((event.clientX - rect.left) / rect.width) * 30 - 15);
  }

  return (
    <motion.div
      className="bg-red-500"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 400,
      }}
      onMouseMove={handleMouse}
    >
      <motion.div
        style={{
          width: 150,
          height: 150,
          backgroundColor: "#fff",
          borderRadius: "30%",
          rotateX: rotateX,
          rotateY: rotateY,
        }}
      />
    </motion.div>
  );
}

export default CursorTrack;
