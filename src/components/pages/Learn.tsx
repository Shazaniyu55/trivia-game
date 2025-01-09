import React from 'react';
import {Divider } from '@mui/material';
import '../../styles/learn.css';
import ScrollBar from 'react-perfect-scrollbar';
// import {MoonLoader} from 'react-spinners'
import { AppState } from '../../store/Slice';
import { useSelector } from 'react-redux';
import { QuizQuestion } from '../../data/questions_basic';
import AnsweredQuestion from './answeredQuestion';
const Learn: React.FC = () => {
    // const [questions,setQuestions]=useState<QuizQuestion[]>(basic_questions)
const {allAnswered}=useSelector((root:{app:AppState})=>root.app)

    // const [loading,setLoading]=useState<boolean>(false)
    // const [activeButton,setActiveButton]=useState<"Basic" | "Intermediate" | "Advance" | "Final">("Basic")
  return (
      <>
      <div className="body">
<b className='header'>({allAnswered.length})  Answered Questions</b>
 
<Divider/>


      <ScrollBar style={{width:"100%",maxHeight:'87vh'}}>

{allAnswered.length === 0 && <div style={{textAlign:'center',padding:10}}>No Data Found Here</div>}

{allAnswered.map((question:QuizQuestion,i:number)=>{
  
  return <AnsweredQuestion {...{question,i}}/>
})};



</ScrollBar>

          </div>
                </>
                  );
                  }

                  export default Learn;