import React, { useEffect, useRef, useState } from 'react';
import LevelCard, { level } from './card';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Levels: React.FC = () => {
  const navigate = useNavigate();
  const [passedLevels] = useState<string[]>(JSON.parse(localStorage.getItem('passedLevels') || '[]'));
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
  clickAudioRef.current = document.querySelector('#clickSound');
}, []);

  const levels: level[] = [
    {
      name: 'Level 1',
      sub: 'Basic Knowledge',
      levelKey: 'basic',
      onClick: () => {
        if(clickAudioRef.current)clickAudioRef.current.play();
        navigate('/Quiz?level=basic');
      },
    },
    {
      name: 'Level 2',
      sub: 'Intermediate Knowledge',
      levelKey: 'intermediate',
      onClick: () => {
        if(clickAudioRef.current)clickAudioRef.current.play();
        navigate('/Quiz?level=intermediate');
      },
    },
    {
      name: 'Level 3',
      sub: 'Advanced Knowledge',
      levelKey: 'advance',
      onClick: () => {
        if(clickAudioRef.current)clickAudioRef.current.play();
        navigate('/Quiz?level=advance');
      },
    },
    {
      name: 'Level 4',
      sub: 'Behavioural Challenges',
      levelKey: 'final',
      onClick: () => {
        if(clickAudioRef.current)clickAudioRef.current.play();
        navigate('/Quiz?level=final');
      },
    },
  ];

  return (
    <>
      {levels.map((item: level, i: number) => {
       const isDisabled =
       passedLevels.length === 0
         ? i !== 0 // Enable the first level if no levels are passed
         : !passedLevels.includes(item.levelKey) && // Disable levels not passed
           (i === 0 || !passedLevels.includes(levels[i - 1].levelKey)); // Disable if the previous level isn't passed
        return <LevelCard disabled={isDisabled} item={item} key={i} />;
      })}
    </>
  );
};

export default Levels;
