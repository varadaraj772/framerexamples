import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable"; // Import the Draggable plugin

// Register the Draggable plugin with GSAP
gsap.registerPlugin(Draggable);

const emojis = ["🍁", "🎃", "🍂", "👻", "🦇"];

// Generate emojis only once using useMemo
const generateEmojis = (count = 40) =>
  Array.from({ length: count }).map((_, index) => ({
    id: index,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
    rotation: Math.random() * 360,
  }));

function Fall() {
  // Use useMemo to memoize the generated emojis
  const fallingEmojis = useMemo(() => generateEmojis(), []);
  const emojiRefs = useRef([]);

  useEffect(() => {
    // Animate all emojis with GSAP
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
              // Make the emoji draggable once the animation is complete
              Draggable.create(el, {
                type: "x,y",
                bounds: "body", // Restrict dragging within the body
                edgeResistance: 0.65, // Resistance when dragging near the edges
                throwProps: true, // Enable physics-based throwing
                onDragEnd: (drag) => {
                  // Check if the emoji is thrown out of the screen
                  const rect = el.getBoundingClientRect();
                  const screenWidth = window.innerWidth;
                  const screenHeight = window.innerHeight;

                  if (
                    rect.right < 0 ||
                    rect.left > screenWidth ||
                    rect.bottom < 0 ||
                    rect.top > screenHeight
                  ) {
                    // Remove the emoji from the DOM after it goes out of the screen
                    gsap.to(el, {
                      duration: 1,
                      opacity: 0,
                      onComplete: () => {
                        el.remove();
                      },
                    });
                  }
                },
              });
            },
          }
        );
      }
    });
  }, [fallingEmojis]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-blue-100 flex justify-center items-center">
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
}

export default Fall;
