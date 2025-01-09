import React, { useState, useEffect } from "react";
import "./word.css";

const FirstText: React.FC = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => prevIndex + 1);
    }, 500); // Show each letter after 1 second

    return () => clearInterval(interval);
  }, []);

  const letters = ["I", "N", "D"];

  return (
    <div className="words">
      <div className={`word`}>
        <span>M</span>
      </div>

      {letters.map((letter, index) =>
        visibleIndex > index ? (
          <div key={index} className={`word`}>
            <span>{letter}</span>
          </div>
        ) : (
          <aside
            key={index}
            className="word"
            style={{ visibility: "hidden" }}
          ></aside>
        )
      )}
    </div>
  );
};

export default FirstText;
