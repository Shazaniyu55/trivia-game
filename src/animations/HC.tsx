import PropTypes from "prop-types";
import "../styles/HCCoin.css"; // Import the CSS for styling and optional animation
const HCCoin = ({ size = 200, animate=false}) => {
    return (
      <div
        className={`coin-container ${animate ? "animate" : ""}`}
        style={{ width: size, height: size,
          maxWidth:size,maxHeight:size,
     }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="hc-coin"
          style={{ width: size, height: size,
           // Box shadow for the SVG
            borderRadius: "50%", // Ensures shadow follows a circular shape
        
     }}
        >
          <defs>
            <radialGradient id="coinGradient" cx="50%" cy="50%" r="50%">
              <stop offset="20%" stopColor="var(--yellow1)" /> {/* Gold center */}
              <stop offset="80%" stopColor="var(--yellowDark) " /> {/* Darker gold edge */}
            </radialGradient>
          </defs>
          {/* Outer Coin Circle */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="url(#coinGradient)"
            stroke="#DAA520"
            strokeWidth="4"
         
          />
          {/* Decorative Edge */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="black"//"#8B4513"
            strokeDasharray="8,5"
            strokeWidth="10"
          />
          {/* HC Text */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fontSize="50"
            fill="#000000"
            style={{ textShadow: "2px 2px 5px #000" }} /* Add text shadow */
          >
            HC
          </text>
        </svg>
      </div>
    );
  };
  
  // Prop types for size and animation
  HCCoin.propTypes = {
    size: PropTypes.number, // Size of the coin in pixels
    animate: PropTypes.bool, // Whether the coin rotates or not
  };
  
  export default HCCoin;