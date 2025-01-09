import React, { useState } from 'react';
import {  Divider } from '@mui/material';
import './book.css';
import Book from './book';
export interface book{
    name:string,
    link:string,
    min:number
}
const Books: React.FC = () => {
 
const [books]=useState<book[]>([
//     {
//         name: "Booklet: Reducing Salt Intake",
//         link: "BOOKLET_Reducing_Salt_Intake.docx",
//       },
//       {
//         name: "Salt Booklet: Volume 1",
//         link: "SALT_BOOKLET_1.docx",
//       },
//       {
//         name: "Salt Booklet: Volume 2",
//         link: "SALT_BOOKLET_2.docx",
//       },
//       {
//         name: "Salt Booklet: Volume 3",
//         link: "SALT_BOOKLET_3.docx",
//       }
])

  return (
    <>
      <div className="Books">
        <b style={{ color: 'white' }}>Salt Trivia Books</b>
        <Divider />
        
    {books.map((book:book,index:number)=><Book book={book} key={index}/>)}
      </div>
    </>
  );
};

export default Books;
