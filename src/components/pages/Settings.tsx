import React, { useState } from 'react';
import './settings.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setBackgroundMusicVolume, setSoundVolume } from '../../store/Slice';
import { Button } from '@mui/material';

const Settings: React.FC = () => {
  const { soundVolume, backgroundMusicVolume } = useSelector((root: { app: AppState }) => root.app);
  const dispatch = useDispatch();
  const [resettingApp, setResettingApp] = useState<boolean>(false);

  const handleBackgroundMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBackgroundMusicVolume(Number(e.target.value) / 100));
  };

  const handleSoundVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSoundVolume(Number(e.target.value) / 100));
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Game Settings</h2>
      </div>

      <div className="volume-settings">
        <div className="slider-container">
          <label htmlFor="background-music-slider">Background Music</label>
          <input
            id="background-music-slider"
            type="range"
            min="0"
            max="100"
            value={backgroundMusicVolume * 100}
            onChange={handleBackgroundMusicChange}
            className="slider"
          />
          <span>{Math.round(backgroundMusicVolume * 100)}%</span>
        </div>

        <div className="slider-container">
          <label htmlFor="sound-slider">Sound Effects</label>
          <input
            id="sound-slider"
            type="range"
            min="0"
            max="100"
            value={soundVolume * 100}
            onChange={handleSoundVolumeChange}
            className="slider"
          />
          <span>{Math.round(soundVolume * 100)}%</span>
        </div>
      </div>

      <div className="reset-container">
        <Button
          onClick={() => {
            setResettingApp(true);
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/';
          }}
          style={{
            borderRadius: '30px',
            background: '#ff6f61',
            width: '100%',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            textTransform: 'uppercase',
            boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.3)',
          }}
          className="reset-button"
        >
          {resettingApp ? 'Clearing Data...' : 'Clear App Data'}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
