/* eslint-disable react/prop-types */

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

function Card(props) {
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false,
  });

  const variantsFrontCard = {
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: (custom) => ({
      x: custom,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 },
    }),
  };
  const variantsBackCard = {
    initial: { scale: 0, y: 105, opacity: 0 },
    animate: { scale: 0.75, y: 30, opacity: 0.5 },
  };

  function handleDragEnd(_, info) {
    if (info.offset.x < -100) {
      setExitX(-250);
      props.setIndex(props.index + 1);
    } else if (info.offset.x > 100) {
      setExitX(250);
      props.setIndex(props.index + 1);
    }
  }

  return (
    <motion.div
      style={{
        width: "50vw",
        height: "50vh",
        position: "absolute",
        top: 0,
        x,
        rotate,
        cursor: "grab",
      }}
      whileTap={{ cursor: "grabbing" }}
      drag={props.drag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      variants={props.frontCard ? variantsFrontCard : variantsBackCard}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={exitX}
      transition={
        props.frontCard
          ? { type: "spring", stiffness: 300, damping: 20 }
          : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
      }
    >
      <motion.div
        style={{
          width: "50vw",
          height: "50vh",
          backgroundColor: "#fff",
          borderRadius: 30,
          scale,
        }}
      />
    </motion.div>
  );
}

function Stack () {
  const [index, setIndex] = useState(0);

  return (
    <motion.div
      style={{ width: "100vw", height: "100vh", position: "relative" }}
      className="bg-red-500 flex justify-center items-center"
    >
      <AnimatePresence initial={false}>
        {/* Always render the back card */}
        {index > 0 && <Card key={index - 1} frontCard={false} />}

        {/* Render the front card */}
        <Card
          key={index}
          frontCard={true}
          index={index}
          setIndex={setIndex}
          drag="x"
        />
      </AnimatePresence>
    </motion.div>
  );
}

export default Stack ;
