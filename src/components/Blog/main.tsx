import React, { useState } from 'react';
import './blog.css'
import ListCard from './listCard';
import { Divider } from '@mui/material';
import { book } from '../pages/Books';
// import   mammoth from "mammoth";


const Blog: React.FC = () => {


    
  const [books]=useState<book[]>([
    {
        name: "The Basics of Sodium and Health",
        min:30,
        link: "The_Basics_of_Sodium_and_Health",
      },
      {
        name: "Sodium and Kids: A Comprehensive Guide to Healthy Salt Intake for Growing Children",
        min:40,

        link: "HealthySaltIntakeForGrowingChildren",
      },
      {
        min:55,
        name: "A Beginner's Guide to Salt Types and Uses",
        link: "Beginner_Guide_to_Salt",
      },
      {
        name: " A Simple Guide for People of African Descent",
        min:10,
        link: "Guide_for_People_of_African_Descent",
      }
])

  return (
      <>
            <div className='body' style={{overflow:"auto"}}>
            <b className='header'>Learning Resources
                </b>
 
                
                <Divider/>

<div style={{gap:10,flexFlow:'row wrap'}}>
{books.map((card:book,i:number)=><ListCard book={card} key={i}/>)}

</div>
<br/><br/>

            </div>
                </>
                  );
                  };

                  export default Blog;