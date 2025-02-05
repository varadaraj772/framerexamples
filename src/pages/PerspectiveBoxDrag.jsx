import { useMotionValue, useTransform, motion } from "framer-motion";

function PerspectiveBoxDrag(props) {
  const { style, ...rest } = props;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  return (
    <div
      className="bg-red-500"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 800,
        ...style,
      }}
      {...rest}
    >
      <motion.div
        style={{
          width: '50vh',
          height: '50vh',
          borderRadius: 30,
          backgroundColor: "#fff",
          position: "relative",
          x,
          y,
          rotateX,
          rotateY,
          cursor: "grab",
          backgroundImage: "url('/prtf-1.jpg')",
          backgroundSize: "cover", 
          backgroundPosition: "center",
        }}
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.6}
        whileTap={{ cursor: "grabbing" }}
      />
    </div>
  );
}

export default PerspectiveBoxDrag;