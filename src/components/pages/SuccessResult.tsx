import React, { useEffect, useRef, useState } from 'react';
import "../../styles/result.css"
import CountUp from 'react-countup';
import LoaderBoard from './loaderBoard';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setStatistic } from '../../store/Slice';
export interface resultProps{
  img:string,
  title:string,
  score:number,
  text:string
}
const SuccessResult: React.FC = () => {


  // const coinsEarned=sessionStorage.getItem('coinsEarned');
   const level = sessionStorage.getItem('level');
   const [passedLevels]=useState<string[]>(JSON.parse(localStorage.getItem('passedLevels')||'[]'));

const {liveCorrectAnswers,coins,statistic}=useSelector((root:{app:AppState})=>root.app)
const dispatch=useDispatch();
 

const [result]=useState<resultProps>(
  {
    img:'/win.png',
    title:'Congratulations',
    score:12,
    text:'You’ve earned X HC and achieved the Gold Health Champion title!'
  }
)


const winningAudioRef = useRef<HTMLAudioElement | null>(null);
useEffect(() => {
  // Assigning audio elements to refs
  winningAudioRef.current = document.querySelector('#winningSound');
  if(winningAudioRef.current)winningAudioRef.current.play()
      //for debug purposes
      dispatch(setStatistic({...statistic,playingTime:(statistic.gamesWon||0)+1}))
}, []);

const { width, height } = useWindowSize()
useEffect(()=>{
if(result.title.includes("Congratulation")){
  setShowCongrat(true);
  
}

if(!passedLevels.includes(level||''))localStorage.setItem('passedLevels',JSON.stringify([...passedLevels,level]))

},[])
const [showCongrat,setShowCongrat]=useState<boolean>(false);




const players = [
  { rank: 1, name: 'Player1', coins: 55000, level: 'Level 3', isYou: false },
  { rank: 1, name: 'Player1', coins: 6000, level: 'Level 3', isYou: false },
  { rank: 1, name: 'Player1', coins: 9000, level: 'Level 3', isYou: false },
  { rank: 1, name: 'Player1', coins: 55000, level: 'Level 3', isYou: false },
  { rank: 2, name: 'You', coins: Number(coins ||"0"), level: 'Level 2', isYou: true },
  { rank: 3, name: 'Player3', coins: 420, level: 'Level 2', isYou: false },
  { rank: 4, name: 'Player4', coins: 30, level: 'Level 1', isYou: false },
  { rank: 5, name: 'Player5', coins: 600, level: 'Level 1', isYou: false },
  { rank: 6, name: 'Player6', coins: 800, level: 'Level 1', isYou: false },
];
for (let i = 43; i <= 62; i++) {
  players.push({
    rank: i,
    name: `Player${i}`,
    coins: Math.floor(Math.random() * 5000) + 5000, // Coins between 5000 and 10000
    level: 'Level 3',
    isYou: false,
  });
}

for (let i = 63; i <= 82; i++) {
  players.push({
    rank: i,
    name: `Player${i}`,
    coins: Math.floor(Math.random() * 10000) + 10000, // Coins above 10000
    level: 'Level 4',
    isYou: false,
  });
}

for (let i = 83; i <= 200; i++) {
  players.push({
    rank: i,
    name: `Player${i}`,
    coins: Math.floor(Math.random() * 5000) + 100, // Random coins below 5000
    level: `Level ${Math.floor(Math.random() * 3) + 1}`, // Random level between 1 and 3
    isYou: false,
  });
}

// console.log(players);

let title = "Bronze Health Champion"; // Default to Bronze

if (coins > 10000) {
  title = "Gold Health Champion";
} else if (coins > 5000) {
  title = "Silver Health Champion";
}

const message = `You’ve earned ${coins} HC and achieved the ${title} title!`;


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
            <h2 style={{padding:10}} className='text-center'>{result.title}</h2>
<div className='result_info'>
<div className='Num d-flex align-items-center'>
<CountUp className='_12' duration={1} delay={0.5} start={0} end={liveCorrectAnswers.length} /> / <div>3</div> 
</div>

<div style={{textAlign:'center'}}>
{message}
</div>

</div>

<br/>
<LoaderBoard players={players}/>

            </div>
            </div>
                </>
                  )
                  }

                  export default SuccessResult;