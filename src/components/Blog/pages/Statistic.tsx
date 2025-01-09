import "./statistic.css";
import { AppState } from "../../../store/Slice";
import { useSelector } from "react-redux";
import { FaClock, FaGamepad, FaTrophy, FaPercentage, FaRedo, FaHeartbeat, FaExchangeAlt, FaQuestion, FaCheck, FaTimes } from "react-icons/fa"; // Import icons

const Statistic = () => {
  const {statistic}  = useSelector((root: { app: AppState }) => root.app);
console.log(statistic);
  // Statistics data with labels and icons
  const stats = [
    { label: "Playing Time", value: statistic.playingTime, icon: <img src="/time.svg" width="40px" height="40px"/> },
    { label: "Games Started", value: statistic.gamesStarted, icon: <img src="/game.svg" width="30px" height="30px"/>},
    { label: "Games Won", value: statistic.gamesWon, icon: <img src="/trophy.svg" width="30px" height="30px"/> },
    { label: "Winning Percentage", value: `${Math.floor((statistic.correctAnswers / (statistic.questionAnswered||1)) * 100)|| 0}%`, icon: <img src="/percent.svg" width="30px" height="30px"/> },
    { label: "Second Chance Used", value: statistic.useSecondChance, icon: <img src="/reload.svg" width="20px" height="20px"/> },
    { label: "Health Swap Used", value: statistic.useHealthSwap, icon: <img src="/health.svg" width="30px" height="30px"/> },
    { label: "Shake The Salt Used", value: statistic.useShakeTheSalt, icon: <img src="/exchange.svg" width="30px" height="30px"/> },
    { label: "Questions Answered", value: statistic.questionAnswered, icon: <img src="/question.svg" width="30px" height="30px"/> },
    { label: "Correct Answers", value: statistic.correctAnswers, icon: <img src="/check.svg" width="30px" height="30px"/>},
    { label: "Wrong Answers", value: statistic.wrongAnswers, icon: <img src="/cross.svg" width="20px" height="20px"/> },
  ];

  return (
    <div className="body d-flex align-items-center justify-content-center">
      <div className="statisticContent">
        {/* <div className="headingImage d-flex align-items-center justify-content-center">
          <img src="/salt.png" alt="Salt" />
        </div> */}
        <div className="d-flex align-items-center justify-content-center">
          <h4>Statistics</h4>
        </div>
        <br />

        {/* Map through stats array to display each statistic */}
        <div className="statsList">
          {stats.map((stat, index) => (
            <div key={index} className="statItem d-flex align-items-center mb-2"style={{gap:5}}>
              <div className="icon mr-2 d-flex align-items-center justify-content-center" style={{width:30,height:30,borderRadius:'15px',background:"var(--bg)"}}>{stat.icon}</div>


              <b className="statLabel"  style={{}}>{stat.label}:</b>
              <span className="statValue ml-2" style={{color: "white", fontSize:"15px"}}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
