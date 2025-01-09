import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import 'react-status-alert/dist/status-alert.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/pages";
import Quiz from "./components/pages/Quiz";
import Background from "./animations/background";
import SuccessResult from "./components/pages/SuccessResult";
import Learn from "./components/pages/Learn";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Nav from "./components/nav";
import LevelWinResult from "./components/pages/levelResult";
import LevelFailedResult from "./components/pages/levelFail";
import { useEffect, useRef, useState } from "react";
import { requestNotificationPermission } from "./firebase";
import LoadingScreen from "./components/pages/loadingScreen";
import Settings from "./components/pages/Settings";
import AudioSettings from "./AudioSetters";
import Feedback from "./components/pages/feedback";
import Market from "./components/pages/market";

import StatusAlert from 'react-status-alert';
import Blog from "./components/Blog/main";
import The_Basics_of_Sodium_and_Health from "./components/Blog/pages/The_Basics_of_Sodium_and_Health";
import HealthySaltIntakeForGrowingChildren from "./components/Blog/pages/HealthySaltIntakeForGrowingChildren";
import Beginner_Guide_to_Salt from "./components/Blog/pages/Beginner_Guide_to_Salt";
import Guide_for_People_of_African_Descent from "./components/Blog/pages/Guide_for_People_of_African_Descent";
import Statistic from "./components/Blog/pages/Statistic";
function App() {
  const [loading, setLoading] = useState(true); // Loading state
  const [loadedAudioCount, setLoadedAudioCount] = useState(0); // Track how many audios are loaded

  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);
  const gameOverAudioRef = useRef<HTMLAudioElement | null>(null);
  const winningAudioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const click2AudioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioLoaded = () => {
    if(!loading)return
    setLoadedAudioCount((prev) => {
      return prev + 1;
    });
  };
  useEffect(() => {
    if (loadedAudioCount >= 7) {
      // setLoading(false);
    }

    // console.log({loadedAudioCount});
  }, [loadedAudioCount]);

  useEffect(() => {
    if(backgroundAudioRef.current){
      backgroundAudioRef.current.volume=0.3
    }
    if(backgroundAudioRef.current){
      if(backgroundAudioRef.current?.paused)backgroundAudioRef.current.play()
    backgroundAudioRef.current?.addEventListener('playing',()=>{
 setLoading(false)
    })
  }

  },[])


  useEffect(() => {
    if (!localStorage.deviceToken) {
      // serviceWorkerRegistration.ts
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
            requestNotificationPermission();
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      }
    }
  }, []);










  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User left the tab or browser window
        // Run your function here
        onLeave();
        if(backgroundAudioRef.current)return backgroundAudioRef.current.pause()
      } else {
        // User returned to the tab or window
        onBack();
        if(backgroundAudioRef.current)return backgroundAudioRef.current.play()
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
  
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  
  const onLeave = () => {
        console.log("User left the website or browser tab");
  };
  const onBack = () => {
    console.log("User returned to the website");
  };
  //end operation

if(window.innerWidth >700){
 return <div style={{background: "black"}} className="root framerCover d-flex justify-content-center">  <iframe width={700} src={window.location.href||""} height={window.innerHeight}/></div>
      {/* <DeviceEmulator type="tab" withoutChrome url="www.worksfair.com"> */}
}

  return (
    <>
      <StatusAlert />

      <Provider store={store}>
        <audio
          ref={backgroundAudioRef}
          src="/sounds/background.wav"
          onCanPlayThrough={handleAudioLoaded}
          loop
          autoPlay
          
id="backgroundSound"
        />
        <audio
          ref={correctAudioRef}
          src="/sounds/correct.wav"
          onCanPlayThrough={handleAudioLoaded}
          id='correctSound'
        />
        <audio
          ref={wrongAudioRef}
          src="/sounds/wrong.wav"
          onCanPlayThrough={handleAudioLoaded}
          id='wrongSound'
        />
        <audio
          ref={gameOverAudioRef}
          src="/sounds/gameOver1.wav"
          onCanPlayThrough={handleAudioLoaded}
          id='gameOverSound'
        />
        <audio
          ref={winningAudioRef}
          src="/sounds/winning2.wav"
          onCanPlayThrough={handleAudioLoaded}
          id='winningSound'
        />
        <audio
          ref={timeoutAudioRef}
          src="/sounds/timeout.wav"
          onCanPlayThrough={handleAudioLoaded}
          id='timeoutSound'
        />
         <audio
          ref={clickAudioRef}
          src="/sounds/click2.wav"
          onCanPlayThrough={handleAudioLoaded}
          id='clickSound'
        />
       <audio
          ref={click2AudioRef}
          src="/sounds/click.mp3"
          onCanPlayThrough={handleAudioLoaded}
          id='click2Sound'
        />

      

        {loading ? (
          <LoadingScreen loading={loadedAudioCount !=8} onButtonClick={()=>{
            if(backgroundAudioRef.current)backgroundAudioRef.current.play();
            // setLoading(false)
          }} /> 
        ) : (
          <Router>
              <Nav showHeartProgress />

<br />
<br />
<AudioSettings/>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/Quiz" element={<Quiz />} />
              <Route path="/SuccessResult" element={<SuccessResult />} />
              <Route path="/LevelWinResult" element={<LevelWinResult />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/Feedback" element={<Feedback />} />
              <Route path="/Market" element={<Market />} />
              <Route path="/Statistic" element={<Statistic />} />
{/* blog pages */}
<Route path="/Resources" element={<Blog/>} />
<Route path="/Resources/The_Basics_of_Sodium_and_Health" element={<The_Basics_of_Sodium_and_Health/>} />
<Route path="/Resources/HealthySaltIntakeForGrowingChildren" element={<HealthySaltIntakeForGrowingChildren/>} />
<Route path="/Resources/Beginner_Guide_to_Salt" element={<Beginner_Guide_to_Salt/>} />
<Route path="/Resources/Guide_for_People_of_African_Descent" element={<Guide_for_People_of_African_Descent/>} />



{/* Guide_for_People_of_African_Descent */}
{/* Beginner_Guide_to_Salt */}
{/* HealthySaltIntakeForGrowingChildren */}

{/* blog pages end here */}
              <Route
                path="/LevelFailedResult"
                element={<LevelFailedResult />}
              />

              <Route path="/FailedResult" element={<Quiz />} />
              <Route path="/Learn" element={<Learn />} />
            </Routes>
          </Router>
        )}
        <Background />
      </Provider>
    </>
  );
}

export default App;
