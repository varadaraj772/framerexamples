import { useEffect, useState } from "react";
import { gsap } from "gsap";

const InteractiveCircle = () => {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let blob = createBlob({
      element: document.querySelector("#path"),
      numPoints: 5,
      centerX: 500,
      centerY: 500,
      minRadius: 200,
      maxRadius: 225,
      minDuration: 1,
      maxDuration: 2,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const createBlob = (options) => {
    let points = [];
    let path = options.element;
    let slice = (Math.PI * 2) / options.numPoints;

    let tl = gsap.timeline({ onUpdate: update });

    for (let i = 0; i < options.numPoints; i++) {
      let angle = i * slice;
      let duration = gsap.utils.random(
        options.minDuration,
        options.maxDuration
      );

      let point = {
        x: options.centerX + Math.cos(angle) * options.minRadius,
        y: options.centerY + Math.sin(angle) * options.minRadius,
        baseX: options.centerX + Math.cos(angle) * options.minRadius,
        baseY: options.centerY + Math.sin(angle) * options.minRadius,
      };

      let tween = gsap.to(point, {
        duration,
        x: options.centerX + Math.cos(angle) * options.maxRadius,
        y: options.centerY + Math.sin(angle) * options.maxRadius,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      tl.add(tween, -gsap.utils.random(0, duration));
      points.push(point);
    }

    options.points = points;

    function update() {
      let attraction = hovering ? 5.5 : 1.0; // Increase attraction when hovering
      points.forEach((point) => {
        let distX = mouseX - point.baseX;
        let distY = mouseY - point.baseY;
        let distance = Math.sqrt(distX * distX + distY * distY);

        let maxMovement = hovering ? 50 : 50; // More distortion when hovering
        let movementScale = Math.min(maxMovement / distance, attraction);

        point.x = point.baseX + distX * movementScale;
        point.y = point.baseY + distY * movementScale;
      });

      path.setAttribute("d", cardinal(points, true, 1));
    }

    return options;
  };

  const cardinal = (data, closed, tension = 1) => {
    if (data.length < 1) return "M0 0";
    let size = data.length - (closed ? 0 : 1);
    let path = `M${data[0].x} ${data[0].y} C`;

    for (let i = 0; i < size; i++) {
      let p0, p1, p2, p3;

      if (closed) {
        p0 = data[(i - 1 + size) % size];
        p1 = data[i];
        p2 = data[(i + 1) % size];
        p3 = data[(i + 2) % size];
      } else {
        p0 = i === 0 ? data[0] : data[i - 1];
        p1 = data[i];
        p2 = data[i + 1];
        p3 = i === size - 1 ? p2 : data[i + 2];
      }

      let x1 = p1.x + ((p2.x - p0.x) / 6) * tension;
      let y1 = p1.y + ((p2.y - p0.y) / 6) * tension;
      let x2 = p2.x - ((p3.x - p1.x) / 6) * tension;
      let y2 = p2.y - ((p3.y - p1.y) / 6) * tension;

      path += ` ${x1} ${y1} ${x2} ${y2} ${p2.x} ${p2.y}`;
    }

    return closed ? path + "z" : path;
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <svg
        id="svg"
        viewBox="0 0 1000 1000"
        className="cursor-pointer"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <defs>
          <clipPath id="blob-clip">
            <path id="path"></path>
          </clipPath>
        </defs>
        <rect
          x="0"
          y="0"
          width="1000"
          height="1000"
          fill="#ff5f6d"
          clipPath="url(#blob-clip)"
        />
      </svg>
    </div>
  );
};

export default InteractiveCircle;
