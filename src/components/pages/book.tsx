import { Button } from '@mui/material';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { book } from './Books';


interface props{
    book:book
}
const Book: React.FC<props> = ({book}) => {
    const { ref: bookRef1, inView: bookInView1 } = useInView({
        triggerOnce: true,
        threshold: 0.1, // Trigger when 10% of the element is in view
      });
      const downloadBlob = (url: string, fileName: string) => {
        try {
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = fileName;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        } catch (error) {
          console.error("Error downloading the blob:", error);
          alert("Unable to download the file. Please try again.");
        }
      };
      
  return (
      <>
             <div
          className={`book ${bookInView1 ? 'in-view' : ''}`}
          ref={bookRef1}
        >
          <span >{book.name}</span>
          <Button onClick={()=>{
            // window.open(book.link,"_blank");
            downloadBlob(book.link,book.link)
          }}>download</Button>
        </div>

                </>
                  );
                  };

                  export default Book;