/* eslint-disable react/no-unknown-property */
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei"; 

function BoxWithDrag() {
  const [dragging, setDragging] = useState(false);
  const boxRef = useRef();
  const texture = useTexture("/prtf-1.jpg"); 

  const handlePointerDown = () => setDragging(true);
  const handlePointerUp = () => setDragging(false);

  useFrame(() => {
    if (dragging && boxRef.current) {
      const { x, y } = boxRef.current.rotation;
      boxRef.current.rotation.set(x + 0.01, y + 0.01, 0);
    }
  });

  return (
    <mesh
      ref={boxRef}
      onPointerEnter={handlePointerDown}
      onPointerLeave={handlePointerUp}
      onPointerMove={(e) => {
        if (dragging) {
          const { movementX, movementY } = e;
          boxRef.current.rotation.y += movementX * 0.01;
          boxRef.current.rotation.x -= movementY * 0.01;
        }
      }}
      scale={[1, 1, 1]}
      rotation={[0, 0, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function PerspectiveBoxDrag() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 25 }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <BoxWithDrag />
    </Canvas>
  );
}

export default PerspectiveBoxDrag;
