import React from 'react';
import './bottomNav.css'
import { Badge, Button, IconButton } from '@mui/material';
import {   FaClipboardList, FaListOl, FaShoppingBasket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../store/Slice';
const BottomNav: React.FC = () => {
  const navigate=useNavigate()
  const {allAnswered,SecondChance,HealthSwap,ShakeTheSalt,statistic}=useSelector((root:{app:AppState})=>root.app)
let num=0;
if(!SecondChance)num+=1
if(!HealthSwap)num+=1
if(!ShakeTheSalt)num+=1


let statisticSum = 0;

Object.values(statistic).forEach((value) => {
  if (typeof value === "number" && value > 0) {
    statisticSum += 1; // Increment statisticSum if the prop is greater than 0
  }
});
  return (
      <>
        <div className='bottomNav'>


        <Button  onClick={()=>{
          navigate('/Feedback')
        }} className='footerButton'>Feedback</Button>



          <div className='d-flex align-items-center justify-content-center'>
          <IconButton onClick={()=>{
            navigate('/Statistic')
          }} style={{background:'var(--bg)'}}>
          <Badge badgeContent={statisticSum} color="error">
  {/* <FaFantasyFlightGames  /> */}
  <FaClipboardList color="white"/>
</Badge>
            </IconButton>



          <IconButton onClick={()=>{
            navigate('/Market')
          }} style={{background:'var(--bg)'}}>
          <Badge badgeContent={num} color="error">
  <FaShoppingBasket color="white" />
</Badge>
            </IconButton>


            <IconButton onClick={()=>{
              navigate('/Learn')
            }} style={{background:'var(--bg)'}} >
            <Badge max={100} badgeContent={allAnswered.length} color="warning">
  <FaListOl color="white" />
</Badge>
</IconButton>

</div>
<Button onClick={()=>{
              navigate('/Resources')
            }}   className='footerButton'>Resources</Button>

          </div>    
                </>
                  );
                  };

                  export default BottomNav;