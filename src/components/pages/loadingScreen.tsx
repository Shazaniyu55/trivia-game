import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import './loadingScreen.css';
import { DotLoader } from 'react-spinners';
import FirstText from '../../animations/firstText';
import TraviaText from '../../animations/TraviaText';







interface Props {
  onButtonClick: () => void;
  loading: boolean;
}

const LoadingScreen: React.FC<Props> = ({ onButtonClick, loading }) => {
  const [showDialog, setShowDialog] = useState(false); // State to control the popup visibility


  const handleOpenDialog = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setShowDialog(false); // Close the dialog
  };

  const handleAcceptTerms = () => {
    setShowDialog(false); // Close the dialog
    onButtonClick(); // Trigger the main action
    //alert("welcome")
   

  };

  return (
    <div
      className="loadingScreen"
      style={{
        height: '100vh',
      }}
    >
      <div
        className="text-center"
        style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '500' }}
      >
        <div className="d-flex align-items-center justify-content-center">
          {loading && (
            <div
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                border: '1px solid white',
                backgroundColor: 'linear-gradient(30deg, var(--bg-dark), var(--yellow))',
                backgroundSize: '100% 100%',
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <DotLoader color="white" size={22} />
            </div>
          )}
        </div>

        <FirstText />
        <TraviaText />
        <br />

        <div className="loadingText" style={{ padding: 10 }}>
          {loading ? 'Loading game data' : <></>}
        </div>
      </div>

      <Button
        onClick={handleOpenDialog}
        variant="contained"
        sx={{
          borderRadius: 30,
          padding: '10px 20px',
          fontSize: '1rem',
          textTransform: 'none',
        }}
      >
        Let Me In
      </Button>

      {/* Dialog Component */}
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Accept Terms and Conditions</DialogTitle>
        <DialogContent>
          By clicking "Accept", you agree to our terms and conditions. Please read them carefully before proceeding.
          <a href=''> Terms and condition</a>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAcceptTerms} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoadingScreen;


// import { Button } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import './loadingScreen.css';
// import { DotLoader } from 'react-spinners';
// import FirstText from '../../animations/firstText';
// import TraviaText from '../../animations/TraviaText';

// interface Props {
//   onButtonClick: () => void;
//   loading: boolean;
// }

// const LoadingScreen: React.FC<Props> = ({ onButtonClick, loading }) => {

//   useEffect(() => {
//     // Any additional side effects can be handled here
//   }, []);


//   return (
//     <div
//       className="loadingScreen"
//       style={{
//         height: '100vh',
//       }}
//     >
//       <div
//         className="text-center"
//         style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '500' }}
//       >
//         <div className="d-flex align-items-center justify-content-center">
//           {loading && (
//             <div
//               style={{
//                 height: 60,
//                 width: 60,
//                 borderRadius: 30,
//                 border: '1px solid white',
//                 backgroundColor: 'linear-gradient(30deg, var(--bg-dark), var(--yellow))',
//                 backgroundSize: '100% 100%',
//               }}
//               className="d-flex align-items-center justify-content-center"
//             >
//               <DotLoader color="white" size={22} />
//             </div>
//           )}
//         </div>

//         <FirstText/>
//         <TraviaText/>
//         <br />

//         <div className="loadingText" style={{ padding: 10 }}>
//           {loading ? (
//             'Loading game data'
//           ) : (
//            <></>
//           )}
//         </div>
//       </div>
     
//         <Button
//           onClick={onButtonClick}
//           variant="contained"
//           sx={{
//             borderRadius: 30,
//             padding: '10px 20px',
//             fontSize: '1rem',
//             textTransform: 'none',
//           }}
//         >
//           Let Me In
//         </Button>
      
//     </div>
//   );
// };

// export default LoadingScreen;
