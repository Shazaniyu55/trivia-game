import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './loadingScreen.css';
import { DotLoader } from 'react-spinners';
import FirstText from '../../animations/firstText';
import TraviaText from '../../animations/TraviaText';

interface Props {
  onButtonClick: () => void;
  loading: boolean;
}

const LoadingScreen: React.FC<Props> = ({ onButtonClick, loading }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Any additional side effects can be handled here
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
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

        <FirstText/>
        <TraviaText/>
        <br />

        <div className="loadingText" style={{ padding: 10 }}>
          {loading ? (
            'Loading game data'
          ) : (
            <div>
              <input
                type="checkbox"
                id="agreeCheckbox"
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="agreeCheckbox"
                style={{ fontSize: '15px', marginLeft: '8px' }}
              >
                To Play Game Agree to Legal Document
              </label>
            </div>
          )}
        </div>
      </div>
      {!loading && (
        <Button
          onClick={onButtonClick}
          variant="contained"
          sx={{
            borderRadius: 30,
            padding: '10px 20px',
            fontSize: '1rem',
            textTransform: 'none',
          }}
          disabled={!isChecked} // Disable the button unless the checkbox is checked
        >
          Let Me In
        </Button>
      )}
    </div>
  );
};

export default LoadingScreen;
