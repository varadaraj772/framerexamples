import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdNorth,
  MdNorthEast,
  MdNorthWest,
  MdSouth,
  MdSouthEast,
  MdSouthWest,
  MdEast,
  MdWest,
} from "react-icons/md";

function CursorTrack() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("north");

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate rotation
    const rotateX = ((y - centerY) / centerY) * -15; // Invert to match natural tilt
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotate({ x: rotateX, y: rotateY });

    // Calculate direction
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    const directions = [
      { name: "east", range: [-22.5, 22.5] },
      { name: "south-east", range: [22.5, 67.5] },
      { name: "south", range: [67.5, 112.5] },
      { name: "south-west", range: [112.5, 157.5] },
      { name: "west", range: [157.5, -157.5] },
      { name: "north-west", range: [-157.5, -112.5] },
      { name: "north", range: [-112.5, -67.5] },
      { name: "north-east", range: [-67.5, -22.5] },
    ];

    const matchedDirection = directions.find(
      ({ range }) => angle > range[0] && angle <= range[1]
    )?.name;

    setDirection(matchedDirection || "north");
  }

  return (
    <motion.div
      className="bg-red-300"
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
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        style={{
          width: 500,
          height: 500,
          backgroundColor: "#fff",
          borderRadius: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {direction === "north" && <MdNorth size={100} />}
        {direction === "north-east" && <MdNorthEast size={100} />}
        {direction === "east" && <MdEast size={100} />}
        {direction === "south-east" && <MdSouthEast size={100} />}
        {direction === "south" && <MdSouth size={100} />}
        {direction === "south-west" && <MdSouthWest size={100} />}
        {direction === "west" && <MdWest size={100} />}
        {direction === "north-west" && <MdNorthWest size={100} />}
      </motion.div>
    </motion.div>
  );
}

export default CursorTrack;
