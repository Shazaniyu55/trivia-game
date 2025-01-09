import React, { useState } from 'react';
import { Button, Divider } from '@mui/material';
import { StatusAlertService }  from 'react-status-alert';
import './feedback.css';
import { Link } from 'react-router-dom';

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState({
    message: '',
    name: '',
    contact: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
if(!feedback.message){
    StatusAlertService
    .showError('Please enter your feedback message.');
    return
}
    try {
      const response = await fetch('https://personal-server-t87n.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      const data = await response.json();

      if (data.success) {
        StatusAlertService.showSuccess('Feedback sent successfully!');
        setFeedback({ message: '', name: '', contact: '' });
      } else {
       StatusAlertService
       .showError('Failed to send feedback. Please try again.');
      StatusAlertService.showError(data.data?.message || data?.message||data.data?.error || data?.error ||'An error occurred. Please try again.');

      }
    } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error:any) {
      console.error(error);
      StatusAlertService.showError(error?.data?.message || error?.message || error?.error||error?.data?.error || error?.error ||'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <b className="header">Give us Feedback</b>
      <Divider />
      <form className="feedback" onSubmit={handleSubmit}>
        <textarea
          name="message"
          value={feedback.message}
          onChange={handleChange}
          placeholder="Enter message"
        />
        <input
          name="name"
          value={feedback.name}
          onChange={handleChange}
          placeholder="Your name"
        />
        <br />
        <input
          name="contact"
          value={feedback.contact}
          onChange={handleChange}
          placeholder="Email or Phone"
        />
        <br />
        <br />
        <div className="d-flex justify-content-center">
          <Button
            color="info"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </form>

      <br/>
      <br/>
      <br/>
      <div className='contactForm' style={{padding:10}}>
<b style={{color:'var(--green)'}}>Contact Us</b>
<Divider/>

<div style={{ gap: 5 }} className="d-flex align-items-center">
  <b>Email: </b>
  <Link to={'mailto:info@mindthesalt.org'}>info@mindthesalt.org</Link>
</div>

<div style={{ gap: 5 }} className="d-flex align-items-center">
{/* <b>Website:</b> */}
  <div>
  <Link to={'https://www.mindthesalt.org'} target="_blank" rel="noopener noreferrer">Visit www.mindthesalt.org for more information</Link>
  </div>
</div>


      </div>
    </div>
  );
};

export default Feedback;
