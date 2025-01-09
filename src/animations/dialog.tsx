import React, { useState } from 'react';
import "./dialog.css"
import { Button } from '@mui/material';

export interface dialogProps{
    continueText:string,
    cancelText:string,
    title:string,
    text:string | React.ReactNode,
onContinue?:()=>void;
onCancel?:()=>void,

}
interface props{
    onCancel:()=>void,
    onContinue:()=>void,
    dialogProps?:dialogProps
    
}
const Dialog: React.FC<props> = ({dialogProps,onCancel,onContinue}) => {
const [open,setOpen]=useState<boolean>(true);

  return (
      <>
            <div  className={`dialog ${open ? "open" : ""}`}>

<div className='content'>

    <div className='d-flex align-items-center justify-content-center'>
<div className='title'>
{dialogProps?.title}
</div>
</div>


<br/>

<div className='textContent'>
    {dialogProps?.text}
</div>


<div style={{padding:"5px 2px",gap:10}} className='d-flex align-items-center justify-content-between'>
<Button 
style={{visibility:!dialogProps?.cancelText ? 'hidden':undefined,

width:(dialogProps?.cancelText || "")?.length > 10? 'max-content':'',
flexGrow:(dialogProps?.cancelText || "")?.length > 10? '1':undefined
}}
onClick={()=>{
    onCancel()
    if(dialogProps?.onCancel)dialogProps?.onCancel()
    setOpen(false)
}}
>{dialogProps?.cancelText || "Give up"}</Button>
<Button style={{width:(dialogProps?.cancelText || "")?.length > 10? 'max-content':'',

 }} onClick={()=>{
    onContinue()
    setOpen(false)
    if(dialogProps?.onContinue)dialogProps?.onContinue()

}}>{dialogProps?.continueText || "Continue"}</Button>
</div>



</div>
            </div>
                </>
                  );
                  };

                  export default Dialog;