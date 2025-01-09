import React, { useEffect, useRef, useState } from 'react';
import "../../styles/result.css"
import CountUp from 'react-countup';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/Slice';
import { Button } from '@mui/material';
export interface resultProps{
  img:string,
  title:string,
  score:number,
  text:string
}
const LevelFailedResult: React.FC = () => {
    const coinsEarned=sessionStorage.getItem('coinsEarned');
    const level = sessionStorage.getItem('level');
    
const {liveCorrectAnswers}=useSelector((root:{app:AppState})=>root.app)
const gameOverAudioRef = useRef<HTMLAudioElement | null>(null); 
const clickAudioRef = useRef<HTMLAudioElement | null>(null);


useEffect(() => {
  // Assigning audio elements to refs
  gameOverAudioRef.current = document.querySelector('#gameOverSound');
  if(gameOverAudioRef.current)gameOverAudioRef.current?.play()
    clickAudioRef.current = document.querySelector('#clickSound');
}, []);


const [result]=useState<resultProps>(
  {
    img:'/challenge.png',
    title:'Good Effort',
    score:12,
    text:''
  }
)

const { width, height } = useWindowSize()
useEffect(()=>{
if(result.title.includes("Congratulation")){
  setShowCongrat(true)
}
},[])
const [showCongrat,setShowCongrat]=useState<boolean>(false);

const navigate = useNavigate();
useEffect(()=>{
    if(!coinsEarned){
    navigate('/')
    }
    },[])
    

    const buttonTexts = [
        "Take Quiz Again",
        "Try the Quiz Once More",
        "Retry the Quiz",
        "Give the Quiz Another Shot",
        "Attempt the Quiz Again",
      ];
    
      const randomText = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
    
  return (
      <>
      {showCongrat && <Confetti
      width={width}
      height={height}
    />}
      <div className='body'>

<br/>
            <div className='SuccessResult'>

<div className='d-flex justify-content-center'>
                <img width={100} src={result.img} height={100}/>
     </div>           
                <br/>
            <h2 style={{padding:10}} className='text-center'>{result.title}</h2>
<div className='result_info'>

<div className='Num d-flex align-items-center'>
<CountUp className='_12' duration={1} delay={0.5} start={0} end={liveCorrectAnswers.length} /> / <div>3</div> 
</div>


<div style={{
    padding:5
}}>
<LevelFailQuotes level={level||""} coinsEarned={coinsEarned||""} />
</div>

<div  className='d-flex align-items-center justify-content-center'>
<Button onClick={()=>{
    clickAudioRef.current = document.querySelector('#clickSound');
    navigate('/Quiz?level='+level)
}} color='primary' style={{borderRadius: 30,background:'var(--bg)',border:'2px solid white',color:'white'}}>{randomText}</Button>
</div>

</div>

<div>

</div>
            </div>
            </div>
                </>
                  )
                  }

                  export default LevelFailedResult;

                  const LevelFailQuotes: React.FC<{ level: string; coinsEarned: string }> = ({ level, coinsEarned }) => {
                    switch (level) {
                        case "basic":
                            return (
                                <>
                                    You’ve earned <span>{coinsEarned}</span> coins! Retry and answer all questions correctly to unlock the intermediate level!
                                </>
                            );
                        case "intermediate":
                            return (
                                <>
                                    Good effort! <span>{coinsEarned}</span> coins collected. Retry and answer everything to reach the advanced level!
                                </>
                            );
                        case "advance":
                            return (
                                <>
                                    Nice try! <span>{coinsEarned}</span> coins earned. Answer all questions correctly to unlock the final level!
                                </>
                            );
                        case "final":
                            return (
                                <>
                                    Almost there! <span>{coinsEarned}</span> coins gained. Retry and perfect your answers to claim victory!
                                </>
                            );
                        default:
                            return <>Keep going! Retry and answer everything to reach new milestones!</>;
                    }
                };
                