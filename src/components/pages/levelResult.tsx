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
const LevelWinResult: React.FC = () => {
    const coinsEarned=sessionStorage.getItem('coinsEarned');
    const level = sessionStorage.getItem('level');
    const [passedLevels]=useState<string[]>(JSON.parse(localStorage.getItem('passedLevels')||'[]'));
    const clickAudioRef = useRef<HTMLAudioElement | null>(null);

const {liveCorrectAnswers}=useSelector((root:{app:AppState})=>root.app)
    
   


const [result]=useState<resultProps>(
  {
    img:'/win.png',
    title:'Congratulations',
    score:12,
    text:''
  }
)

const { width, height } = useWindowSize()
useEffect(()=>{
if(result.title.includes("Congratulation")){
  setShowCongrat(true)
}
clickAudioRef.current = document.querySelector('#clickSound');
}, []);
const [showCongrat,setShowCongrat]=useState<boolean>(false);


const winningAudioRef = useRef<HTMLAudioElement | null>(null);
useEffect(() => {
  // Assigning audio elements to refs
  winningAudioRef.current = document.querySelector('#winningSound');
  if(winningAudioRef.current)winningAudioRef.current.play()
}, []);

const navigate = useNavigate();
useEffect(()=>{
    if(!coinsEarned){
    navigate('/')
    }
    else{
        if(!passedLevels.includes(level||''))localStorage.setItem('passedLevels',JSON.stringify([...passedLevels,level]))
    }
    },[])
    

    const buttonTexts = [
        "Proceed to the next level",
        "Advance to the next stage",
        "Go to the next stage",
        "Level up to the next challenge",
        "Move forward to the next level",
        "Step up to the next stage",
        "Continue to the next level",
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
<LevelQuotes level={level||""} coinsEarned={coinsEarned||""} />
</div>
<br/>
<div  className='d-flex align-items-center justify-content-center'>
<Button onClick={()=>{
    clickAudioRef.current = document.querySelector('#clickSound');
    navigate('/');
}} color='primary' style={{borderRadius: 30,background:'var(--bg)',border:'2px solid white',color:'white'}}>{randomText}</Button>
</div>
<br/>

</div>

<div>

</div>
            </div>
            </div>
                </>
                  )
                  }

                  export default LevelWinResult;


interface props{
    level:string,
    coinsEarned:string
}
                  const LevelQuotes:React.FC<props> = ({level,coinsEarned}) => {
                    console.log(level)
                    switch (level) {
                        case "basic":
                            return (
                                <>
                                    You’ve earned <span>{coinsEarned}</span> coins! 
                                    The intermediate level is unlocked. Keep going to maintain your streak of happy health!
                                </>
                            );
                        case "intermediate":
                            return (
                                <>
                                    Great job! You’ve advanced to the advanced level. 
                                    Push forward and unlock even greater rewards!
                                </>
                            );
                        case "advance":
                            return (
                                <>
                                    Amazing! You’ve reached the Behavioral Challenges. 
                                    The Behavioral Challenges awaits—give it your all!
                                </>
                            );
                        case "final":
                            return (
                                <>
                                    Congratulations! You’ve conquered the Behavioral Challenges. 
                                    Celebrate your victory and enjoy your hard-earned success!
                                </>
                            );
                        default:
                            return "Keep playing to reach new milestones!";
                    }
                };