import React from 'react';
import { book } from '../pages/Books';
import { Divider, IconButton } from '@mui/material';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
interface props{
book:book
}
const ListCard: React.FC<props>= ({book}) => {
const navigate=useNavigate()
  return (
      <>
            <div className='listCard' onClick={()=>navigate(book.link)}>
<div className='cardHeading d-flex align-items-center justify-content-between'>
  <span>{book?.min} mins read</span>
  <IconButton><FaExternalLinkAlt size={16} color='dimgrey'/></IconButton>
</div>
<Divider/>
<div className='text'>
<span >
  {book.name}
</span>
     </div>
            </div>
                </>
                  );
                  };

                  export default ListCard;