import React, { useEffect, useRef, useState } from 'react';
import FirstText from '../../animations/firstText';
import TraviaText from '../../animations/TraviaText';
import Levels from '../Levels/main';
import { useDispatch } from 'react-redux';
import { setCoins } from '../../store/Slice';
import BottomNav from '../bottomNav';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Index: React.FC = () => {

  const navigate = useNavigate();

  const dispatch=useDispatch();
  const [passedLevels] = useState<string[]>(JSON.parse(localStorage.getItem('passedLevels') || '[]'));
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
  clickAudioRef.current = document.querySelector('#clickSound');
}, []);

  useEffect(()=>{
if(localStorage.getItem('coins'))dispatch(setCoins(Number(localStorage.getItem('coins')||'0')))
  },[]);
const startGame=async ()=>{
  if(clickAudioRef.current) clickAudioRef.current.play();
  switch(passedLevels[passedLevels.length -1] || 'basic'){
    case 'basic' :
      navigate('/Quiz?level=basic');
    break;
    case 'intermediate' :
      navigate('/Quiz?level=intermediate');
    break;
    case 'advance' :
      navigate('/Quiz?level=advance');
    break;
    case 'final' :
      navigate('/Quiz?level=final');
    break;
  



  }

}
  return (
      <>
            <div className='body' style={{overflow:'auto'}}>

<br/>
<FirstText/>
<TraviaText/>
<Levels/>
<br/>
<br/>


<div className='d-flex justify-content-center'>
  <Button  onClick={
   ()=> startGame()
  } className='startButton pulsingButton'>Play</Button>
</div>

<br/>
<br/>
<br/>
<br/>

{/* <Books/>
<br/> */}
<BottomNav/>


</div>

                </>
                  );
                  };

                  export default Index;