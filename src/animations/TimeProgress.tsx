import React from "react";
import "./TimeProgress.css";

interface TimerProgressProps {
  duration: number; // Duration in seconds
  isRunning: boolean;
  secs: number;
}

const TimerProgress: React.FC<TimerProgressProps> = ({ duration, isRunning, secs }) => {
  // Calculate the RBA color based on remaining time
  const getColor = (secs: number, duration: number) => {
    const percentage = secs / duration;

    // Transition from Green (0, 255, 0) to Red (255, 0, 0)
    const red = Math.min(255, Math.floor(255 * (1 - percentage))); // Increases as time decreases
    const green = Math.min(255, Math.floor(255 * percentage)); // Decreases as time decreases
    const blue = 0; // No blue component in this case
    const alpha = 1; // Fully opaque

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  };

  const currentColor = getColor(secs, duration);
  return (
    <div>
      <div className="timeProgress">
        <div
          className={"width " + (isRunning ? "running" : "")}
          style={{
            animationDuration: `${duration}s`,
            // animationPlayState:(isRunning ? "running" : "paused"),
            transition: "background-color 0.3s ease", // Smooth color transition
          }}
        >
          <div style={{
            background: currentColor,
          }} className="secs d-flex align-items-center justify-content-center">{secs}</div>
        </div>
      </div>
    </div>
  );
};

export default TimerProgress;


export const TimerProgressLoad: React.FC = () => {
 
  return (
    <div>
      <div className="timeProgress">
        <div
          className={""}
          style={{
            animation:``,
            width:'100%'
          }}
        >
        </div>
      </div>
    </div>
  );
};


