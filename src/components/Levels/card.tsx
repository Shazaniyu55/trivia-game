import React, { useState } from 'react';
import { IconButton } from '@mui/material'; // Material-UI IconButton
import {FaAngleRight, FaCheckDouble} from 'react-icons/fa'; // React Icon for the CaretRight
import { FiLock } from 'react-icons/fi';

export interface level{
name:string,
sub:string,
onClick:()=>void,
levelKey: string,
}
interface props{
  item:level
  disabled?:boolean
  key:number
}
const LevelCard: React.FC<props> = ({item,disabled,key}) => {
  const [passedLevels]=useState<string[]>(JSON.parse(localStorage.getItem('passedLevels')||'[]'));

  return (
    <div className={`levelCard ${disabled ? 'disabled':''}`} style={{border:disabled ? 'none':'',animationDuration:(key*0.5).toString()}} onClick={disabled ? undefined:item.onClick}>
      <div className="levelText">
        <b style={{color:'white'}}>{item.name}</b>
        <small>{item.sub}</small>
      </div>

      <IconButton aria-label="next level" style={{padding:2}} className="levelButton">
        {passedLevels.includes(item.levelKey) ? <FaCheckDouble size={18} style={{color:'white'}} />: disabled ? <FiLock style={{color:'white'}} />: <FaAngleRight style={{color:'white'}} color='white' size={25} />}
      </IconButton>
    </div>
  );
};

export default LevelCard;
