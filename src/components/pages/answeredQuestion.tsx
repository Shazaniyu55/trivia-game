import React, { useState } from 'react';
import { QuizQuestion } from '../../data/questions_basic';

interface props{
    question:QuizQuestion,
    i:number
}
const AnsweredQuestion: React.FC<props> = ({question,i}) => {
    const [show,setShow]=useState<boolean>(false)
  return (
      <>
            <div onClick={()=>{
                setShow(!show)
            }} key={i} className='question-container'>
<div className='num'>
{i+1}
</div>


<div>
  {question.question}
  <div className={` answer ${show ? 'show':'hide'}`}>
    <b>Feedback</b> : {question.feedback}
  </div>
</div>

</div>
                </>
                  );
                  };

                  export default AnsweredQuestion;