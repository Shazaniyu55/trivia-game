import React, { useRef, useEffect } from 'react';
import HCCoin from '../../animations/HC';

import './loaderBoard.css'; // Import the CSS file for animations
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
interface Player {
  rank: number;
  name: string;
  coins: number;
  level: string;
  isYou: boolean;
}

interface LoaderBoardProps {
  players: Player[];
}

const LoaderBoard: React.FC<LoaderBoardProps> = ({ players }) => {
  const youRef = useRef<HTMLDivElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const navigate=useNavigate()
  useEffect(()=>{
   
    clickAudioRef.current = document.querySelector('#clickSound');
    }, []);
  // Sort players by coins in descending order
  const sortedPlayers = [...players].sort((a, b) => b.coins - a.coins);

  // Scroll to "You" when the component mounts
  useEffect(() => {
    if (youRef.current) {
      // Scroll into view
      youRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
      // Add a slight delay and adjust the scroll position for an offset
      setTimeout(() => {
        const offset = -5; // Adjust this value for more or less offset
        const currentPosition = window.scrollY;
        window.scrollTo({
          top: currentPosition + offset,
          behavior: 'smooth', // Smooth adjustment
        });
      }, 100); // Delay ensures `scrollIntoView` finishes first
    }
  }, []);



  return (
    <>
    <div style={{ height: '40vh' ,overflow:'auto'}}>
      {sortedPlayers.map((player, index) => {
  let color='var(--green)'
  let title = "Bronze"; // Default to Bronze
  const coins=player.coins;
  if (coins > 10000) {
    title = "Gold";
   color='var(--yellowDark)'

  } else if (coins > 5000) {
    title = "Silver";
   color='var(--bg3)'

  }
  
        return (
        <div
          key={player.rank}
          ref={player.isYou ? youRef : null} // Attach the ref to "You"
          className={`loaderBoard animate-scroll-up`}
          style={{ animationDelay: `${index * 0.001}s` }}
        >
          <div className={`loaderBoardUser ${player.isYou ? 'you' : ''} d-flex align-items-center`}>
            <div>{index + 1}</div>
            <div>
              {player.name}
              <span style={{ padding: 5 }}></span>
              <HCCoin size={20} />{' '}
              <span style={{ padding: 5, fontSize: 'small' }}>{player.coins}</span>
            </div>
            <div style={{ flexGrow: '1', textAlign: 'right', padding: 10,
color


             }}>{title}</div>
          </div>
        </div>
      )})}
    </div>
<br/>
<div  className='d-flex align-items-center justify-content-center' style={{gap:10}}>
<Button onClick={()=>{
    clickAudioRef.current = document.querySelector('#clickSound');
    // setResettingApp(true)
            localStorage.clear();
            sessionStorage.clear();
            window.location.href='/'
}} color='primary' style={{borderRadius: 30,background:'var(--bg)',border:'2px solid white',color:'white'}}>{`Clear app data`}</Button>
<br/>
<Button onClick={()=>{
    clickAudioRef.current = document.querySelector('#clickSound');
    localStorage.setItem('passedLevels','[]');
    navigate('/');
}} color='primary' style={{borderRadius: 30,background:'var(--bg)',border:'2px solid white',color:'white'}}>{`Start over again`}</Button>

</div>
</>
  );
};

export default LoaderBoard;
