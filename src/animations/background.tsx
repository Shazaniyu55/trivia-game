import React from 'react';

const Background: React.FC = () => {
  return (
    <div className='bodyBgParent' style={{ position: 'fixed',top:0,left:0,zIndex:-1, height: '100vh',width:'100vw',background:'black', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          // position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // zIndex: -1,
        }}
      >
        <source src="/bg1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='bodyBg' style={{  zIndex: 1,
         position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
       }}>
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default Background;
