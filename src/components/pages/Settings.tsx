import React, { useState } from 'react';
import './settings.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setBackgroundMusicVolume, setSoundVolume } from '../../store/Slice';
import { Button } from '@mui/material';



const Settings: React.FC = () => {
const {soundVolume,backgroundMusicVolume}=useSelector((root:{app:AppState})=>root.app)
const dispatch=useDispatch();
const [resettingApp,setResettingApp]=useState<boolean>(false)

  const handleBackgroundMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    dispatch(setBackgroundMusicVolume(Number(e.target.value) / 100));
  };

  const handleSoundVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSoundVolume(Number(e.target.value) / 100));
  };

  return (
    <div style={{padding:16,background:'var(--bg2)',height:"90vh",borderBottomRightRadius:16,borderBottomLeftRadius:16}}>


    <div className="settings-container">
      <h2>Settings</h2>

      <div className="slider-container">
        <label htmlFor="background-music-slider">Background Music Volume</label>
        <input
          id="background-music-slider"
          type="range"
          min="0"
          max="100"
          value={backgroundMusicVolume * 100}
          onChange={handleBackgroundMusicChange}
        />
        <span>{Math.round(backgroundMusicVolume * 100)}%</span>
      </div>

      <div className="slider-container">
        <label htmlFor="sound-slider">Sound Effects Volume</label>
        <input
          id="sound-slider"
          type="range"
          min="0"
          max="100"
          value={soundVolume * 100}
          onChange={handleSoundVolumeChange}
        />
        <span>{Math.round(soundVolume * 100)}%</span>
      </div>
    </div>
    <br/>
    <div className='d-flex justify-content-center'>
        <Button onClick={()=>{
            setResettingApp(true)
            localStorage.clear();
            sessionStorage.clear();
            window.location.href='/'
        }} style={{borderRadius:30,background:'var(--yellowDark)',width:'100%',color:'white'}}>{resettingApp ? "Clearing app data" :"Clear app data"}</Button>
    </div>
    </div>
  );
};

export default Settings;
