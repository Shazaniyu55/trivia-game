import React, { useEffect, useRef, useState } from 'react';
import './market.css';
import { Button } from '@mui/material';
import Dialog, { dialogProps } from '../../animations/dialog';
import { AppState, setCoins, setHealthSwap, setSecondChance, setShakeTheSalt } from '../../store/Slice';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';


interface marketProps{
    name:string,
    img:string,
    description:string,
    price:number,
    click?:()=>void,
    available:number
}
const Market: React.FC = () => {
    const {coins,ShakeTheSalt,SecondChance,HealthSwap}=useSelector((root:{app:AppState})=>root.app)
const dispatch=useDispatch()




const getItems=(ShakeTheSalt_:number,SecondChance_:number,HealthSwap_:number)=>{



    return [
        {
    name:'Health Swap',
    img:'/reload2.png',
    description:'Replace the current question with a new one (Cost: 50 HC)',
    price:50,
    available:HealthSwap_,
    click:()=>{
        if(coins <= 50)return
        setDialogProps({
            title: "Buy Health Swap",
            cancelText: "Cancel",
            continueText: "buy ",
            text: <div>
             Replace the current question with a new one (Cost: 50 HC)
            </div>,
            onContinue:()=>{
    if(coins >= 50){
    dispatch(setCoins(coins - 50))
    dispatch(setHealthSwap(HealthSwap_+1))
    }
        }
    })
    setOpen(true)
    
    }
    },{
    
            name:'Shake the Salt ',
            img:'/salt2.png',
            description:'Eliminate two incorrect answers (Cost: 20 HC)',
            price:20,
    available:ShakeTheSalt_,
           click:()=>{
            if(coins <= 20)return
            setDialogProps({
                title: "Buy Health Swap",
                cancelText: "Cancel",
                continueText: "buy ",
                text: <div>
                 Eliminate two incorrect answers (Cost: 20 HC)
                </div>,
           onContinue:()=>{
            if(coins >= 20){
                dispatch(setCoins(coins - 20))
                dispatch(setShakeTheSalt(ShakeTheSalt_+1))
                }
            }
        })
        setOpen(true)
    
        }
        },
        {
            name:'Second Chance',
            img:'/opportunity.png',
            description:'Retry a missed question (Cost: 30 HC)',
            price:30,
    available:SecondChance_,
            click:()=>{
                if(coins <= 50)return
                setDialogProps({
                    title: "Buy Health Swap",
                    cancelText: "Cancel",
                    continueText: "buy ",
                    text: <div>
                     Retry a missed question (Cost: 30 HC)
                    </div>,
               onContinue:()=>{
                if(coins >= 20){
                    dispatch(setCoins(coins - 30))
                    dispatch(setSecondChance(SecondChance_+1))
                    }
                }
            })
            setOpen(true)
            }
    
    
    
        },
    ]
}


const marketItems=getItems(ShakeTheSalt,SecondChance,HealthSwap)


const clickAudioRef = useRef<HTMLAudioElement | null>(null);
useEffect(() => {
    // Assigning audio elements to refs
    clickAudioRef.current = document.querySelector('#clickSound');
  }, []);
  
const [open,setOpen]=useState<boolean>(false);
const [dialogProps, setDialogProps] = useState<dialogProps>({
    title: "",
    cancelText: "",
    continueText: "",
    text: "",
  });

  return (
      <>
           {open && (
        <Dialog
          dialogProps={dialogProps}
          onContinue={() => {
            setTimeout(() => {
              setOpen(false);
            }, 400);
          }}
          onCancel={() => {
      if(clickAudioRef.current)clickAudioRef.current.play();

            setTimeout(() => {
              setOpen(false);
            }, 400);
          }}
        />
      )}
           
           
           
            <div className='body'>



<div className='market'>
    <b className='header'>Market</b>
    <br/>

{marketItems.map((item:marketProps,i:number)=><div key={i} className='marketItem d-flex align-items-center'>
<img className='rotate-zoom-icon-animation' src={`${item.img}`} alt={``} style={{
objectFit:"cover",
animationDelay:(i*200)+'ms'
}} />

<div style={{width:'100%'}}>
<b style={{paddingRight:5}}>{item.name} : </b>
<span>
   {item.description}
</span>
<br/>
<div>

<div style={{width:'100%'}} className='d-flex justify-content-between'>
<div className='own'> <CountUp style={{padding:2}} start={0} end={item.available}/> available</div>


<Button onClick={()=>{
if(item.click)item.click()
}}>
Buy {item.price}HC
    </Button>
</div>



</div>
    
</div>

</div>)}
</div>

            </div>
                </>
                  );
                  };

                  export default Market;