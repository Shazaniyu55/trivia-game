import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface Dot {
  id: number;
  x: number; // X position
  y: number; // Y position
}

const SaltAnimation: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    // Initialize random dots
    const initialDots = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50, // Random position within a range
      y: Math.random() * 100 - 50,
    }));
    setDots(initialDots);

    // Update dots' positions randomly at intervals
    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
        }))
      );
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "50px",
        height: "50px",
        overflow:"hidden",
        borderRadius:'50%'
      }}
    >
      {/* Heart Icon */}
      <FaHeart
        size={32}
        color="red"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />

      {/* Randomly moving dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            backgroundColor: "white",
            borderRadius: "50%",
            top: `calc(50% + ${dot.y}px)`,
            left: `calc(50% + ${dot.x}px)`,
            transition: "all 1s ease-in-out", // Smooth movement
          }}
        ></div>
      ))}
    </div>
  );
};

export default SaltAnimation;
