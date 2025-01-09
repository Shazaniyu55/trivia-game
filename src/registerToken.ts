import axios from 'axios';

const registerToken = async (token:string): Promise<void> => {
  try {
    // Check if token exists in localStorage
    const existingToken = localStorage.getItem('deviceToken');
    if (existingToken) {
      console.log('Token already exists in localStorage:', existingToken);
      return; // Skip registration if token exists
    }
    // Request a new token
    // Send the token to the server
    const response = await axios.post(
      'http://localhost:8080/register-token',
      { token },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Token registered successfully with server:', response.data);
    // Save the token in localStorage
    localStorage.setItem('deviceToken', token);
  } catch (error: unknown) {
    console.error('Error during token registration:', (error as {message:string})?.message ||"" );
  }
}

// Example usage
export default registerToken