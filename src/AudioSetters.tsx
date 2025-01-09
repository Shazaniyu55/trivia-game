import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from './store/Slice';
const AudioSettings: React.FC = () => {
    

const correctAudioRef = useRef<HTMLAudioElement | null>(null);
const wrongAudioRef = useRef<HTMLAudioElement | null>(null);
const gameOverAudioRef = useRef<HTMLAudioElement | null>(null); 
const winningAudioRef = useRef<HTMLAudioElement | null>(null);
const timeoutAudioRef = useRef<HTMLAudioElement | null>(null);
const clickAudioRef = useRef<HTMLAudioElement | null>(null);
const click2AudioRef = useRef<HTMLAudioElement | null>(null);
const backgroundAudioRef  = useRef<HTMLAudioElement | null>(null);
const {soundVolume,backgroundMusicVolume}=useSelector((root:{app:AppState})=>root.app)


useEffect(() => {
    // Update the volume for the sound effects
    if (correctAudioRef.current) correctAudioRef.current.volume = soundVolume;
    if (wrongAudioRef.current) wrongAudioRef.current.volume = soundVolume;
    if (gameOverAudioRef.current) gameOverAudioRef.current.volume = soundVolume;
    if (winningAudioRef.current) winningAudioRef.current.volume = soundVolume;
    if (timeoutAudioRef.current) timeoutAudioRef.current.volume = soundVolume;
    if (clickAudioRef.current) clickAudioRef.current.volume = soundVolume;
    if (click2AudioRef.current) click2AudioRef.current.volume = soundVolume;

localStorage.setItem('soundVolume',soundVolume.toString())  
  }, [soundVolume]);
useEffect(() => {
    const bgAudio=backgroundAudioRef.current;
    if (bgAudio){
        bgAudio.volume= backgroundMusicVolume;
       
    }
localStorage.setItem('backgroundMusicVolume',backgroundMusicVolume.toString())
},[backgroundMusicVolume]);

useEffect(() => {
  // Assigning audio elements to refs
  correctAudioRef.current = document.querySelector('#correctSound');
  wrongAudioRef.current = document.querySelector('#wrongSound');
  gameOverAudioRef.current = document.querySelector('#gameOverSound');
  winningAudioRef.current = document.querySelector('#winningSound');
  timeoutAudioRef.current = document.querySelector('#timeoutSound');
  clickAudioRef.current = document.querySelector('#clickSound');
  click2AudioRef.current = document.querySelector('#click2Sound');
  backgroundAudioRef.current = document.querySelector('#backgroundSound');
}, []);
  return (
      <>
            
                </>
                  );
                  };

                  export default AudioSettings;