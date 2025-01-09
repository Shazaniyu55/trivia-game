import React, { useEffect, useRef, useState } from "react";
// import FloatingIcons from '../animations/Salt';
import { FiArrowLeft, FiSettings } from "react-icons/fi";

import { IconButton } from "@mui/material";
import HCCoin from "../animations/HC";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { AppState } from "../store/Slice";
import useTrackURLChange from "../hook/useTrackUrl";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface props {
  showHeartProgress: boolean;
  iconType?: "settings" | "nothing" | "back";
}

const Nav: React.FC<props> = ({ showHeartProgress, iconType }) => {
  const { coins, allAnswered,SecondChance,HealthSwap,ShakeTheSalt,statistic} = useSelector(
    (root: { app: AppState }) => root.app
  );
  const [currentCoin, setCurrentCoin] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (coins && coins != 100) localStorage.setItem("coins", coins.toString());
  }, [coins]);

  useEffect(() => {
    if (allAnswered.length)localStorage.setItem("allAnswered", JSON.stringify(allAnswered));
  }, [allAnswered]);

  useEffect(() => {
    if (SecondChance)localStorage.setItem("SecondChance", SecondChance.toString());
  }, [SecondChance]);

  useEffect(() => {
    if (HealthSwap)localStorage.setItem("HealthSwap", HealthSwap.toString());
  }, [HealthSwap]);

  useEffect(() => {
    if (ShakeTheSalt)localStorage.setItem("ShakeTheSalt",ShakeTheSalt.toString());
  }, [ShakeTheSalt]);
  useEffect(() => {
    if (statistic)localStorage.setItem("statistic",JSON.stringify(statistic));
  }, [statistic]);

  const handleUrlChange = (uri: string) => {
    setUri(uri);
  };

  const [uri, setUri] = useState<string>("/");
  useTrackURLChange(handleUrlChange);

  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    clickAudioRef.current = document.querySelector("#clickSound");
  }, []);

  return (
    <nav className="d-flex align-items-center justify-content-between">
      {showHeartProgress ? (
        <div
          style={{ width: "100%", gap: 5 }}
          className="d-flex align-items-center"
        >


          {(uri.includes("Quiz") ||
            uri == "/Settings" ||
            uri === "/Learn" ||
            uri === "/Statistic" ||
            uri.includes('Resources') ||
            uri === "/Feedback" ||
            uri === "/Market") && (
            <IconButton
              style={{
                background: "var(--bg)",
              }}
              onClick={() => {
                history.back();
                if (clickAudioRef.current) clickAudioRef.current.play();
              }}
            >
              <FiArrowLeft color="lightgrey" />
            </IconButton>
          )}
          {!uri.includes("Quiz") &&
            uri !== "/" &&
            uri !== "/Settings" &&
            uri !== "/Statistic" &&


            !uri.includes('Resources') &&
            uri !== "/Learn" &&
            uri !== "/Feedback" &&
            uri !== "/Market" && (
              <IconButton
                style={{
                  background: "var(--bg)",
                }}
                onClick={() => {
                  navigate("/");
                  if (clickAudioRef.current) clickAudioRef.current.play();
                }}
              >
                <FaHome color="lightgrey" />
              </IconButton>
            )}
          {uri === "/" && (
            <IconButton
              style={{
                background: "var(--bg)",
              }}
             
              onClick={() => {
                navigate("/Settings");
                if (clickAudioRef.current) clickAudioRef.current.play();
              }}
            >
              <FiSettings  className='rotate-icon' color="lightgrey" />
            </IconButton>
          )}

          {/* <div className='winnerCounter'>
<div className='progress'></div>
</div> */}
<img src='/icon.png' style={{width:30,height:30,borderRadius:15}}/>

        </div>
      ) : (
        <div>
          <Icon iconType={iconType || ""} />
        </div>
      )}

      <div className="topCoin d-flex align-items-center justify-content-between">
        <HCCoin animate={true} size={25} />

        {/* <img width={30} height={30} src='/coin.png'/> */}

        <CountUp
          start={currentCoin}
          end={coins}
          duration={2}
          separator=" "
          // decimals={4}
          // decimal=","
          // prefix="EUR "
          // suffix=" left"
          onEnd={() => setCurrentCoin(coins)}
          // onStart={() => console.log('Started! 💨')}
        />
      </div>
    </nav>
  );
};

export default Nav;

const Icon: React.FC<{ iconType: string }> = ({ iconType }) => {
  if (iconType == "settings") {
    return (
      <IconButton
        style={{
          background: "var(--bg)",
        }}
      >
        {" "}
        <FiSettings color="white" size={24} />
      </IconButton>
    );
  }
  return <></>;
};
