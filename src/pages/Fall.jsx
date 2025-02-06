import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import "../App.css";

gsap.registerPlugin(Draggable);

const emojis = ["🍁", "🎃", "🍂", "👻", "🦇"];

const generateEmojis = (count = 40) =>
  Array.from({ length: count }).map((_, index) => ({
    id: index,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
    rotation: Math.random() * 360,
  }));

const Fall = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const fallingEmojis = useMemo(() => generateEmojis(), []);
  const emojiRefs = useRef([]);

  useEffect(() => {
    emojiRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          {
            y: "-100vh",
            opacity: 1,
            rotation: fallingEmojis[i]?.rotation,
            scale: 1,
          },
          {
            y: "100vh",
            rotation: "+=270",
            duration: fallingEmojis[i]?.duration,
            ease: "bounce.out",
            delay: fallingEmojis[i]?.delay,
            scale: 1,
            onComplete: () => {
              Draggable.create(el, {
                type: "x,y",
                bounds: "body",
                edgeResistance: 0.65,
                throwProps: true,
                onDragEnd: (drag) => {
                  const screenWidth = window.innerWidth;
                  const screenHeight = window.innerHeight;

                  const targetX =
                    drag.x > screenWidth / 2 ? screenWidth + 100 : -100;
                  const targetY =
                    drag.y > screenHeight / 2 ? screenHeight + 100 : -100;

                  gsap.to(el, {
                    duration: 1,
                    x: targetX,
                    y: targetY,
                    opacity: 0,
                    onComplete: () => {
                      el.remove();
                    },
                  });
                },
              });
            },
          }
        );
      }
    });
  }, [fallingEmojis]);

  useEffect(() => {
    const moveAnim = (e) => {
      const { clientX, clientY } = e;
      setMousePos({ x: clientX, y: clientY });
    };

    document.body.addEventListener("mousemove", moveAnim);
    return () => document.body.removeEventListener("mousemove", moveAnim);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-blue-100 flex justify-center items-center">
      <div
        className="absolute bg-blue-500 rounded-full pointer-events-none"
        style={{
          left: mousePos.x - 20,
          top: mousePos.y - 20,
          height: "40px",
          width: "40px",
        }}
      ></div>
      <h1 className="text-6xl font-bold z-10">WEB</h1>
      {fallingEmojis.map(({ id, emoji, left }, index) => (
        <div
          key={id}
          ref={(el) => (emojiRefs.current[index] = el)}
          className="absolute flex items-center justify-center text-6xl bg-white px-10 py-5 rounded-full shadow-lg border border-gray-300"
          style={{ left: `${left}%`, top: "-10%" }}
        >
          <span className="drop-shadow-md">{emoji}</span>
          <span className="ml-6 text-lg font-semibold text-gray-800">
            HELLOO
          </span>
        </div>
      ))}
    </div>
  );
};

export default Fall;
