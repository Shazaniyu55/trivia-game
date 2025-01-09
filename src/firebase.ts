import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import registerToken from './registerToken';

const firebaseConfig = {
  apiKey: "AIzaSyC-J7y9NxpvhWI8ENtqiVfFIiZxOUzYMYo",
  authDomain: "salt-travia.firebaseapp.com",
  projectId: "salt-travia",
  storageBucket: "salt-travia.firebasestorage.app",
  messagingSenderId: "421105687655",
  appId: "1:421105687655:web:e2642cf902b15fd503c8c2",
  measurementId: "G-F2BFLHM23V"
}

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'BCyMmpYzFOA479G8bBjzePiK3aEE0jIyV_NOnTIqC_-oG1ER9uHNQa7KREkGkCOYd8z3mCTESCIrvvfs5AyvpJs' });
      console.log('FCM Token:', token);
      localStorage.setItem('deviceToken',token);
      // registerToken('sfklgngsd')

      await registerToken(token);
      return token;
    }
    console.warn('Notification permission denied');
  } catch (error) {
    console.error('Error getting token', error);
  }
};

export const onNotificationReceived = () => {
  onMessage(messaging, (payload) => {
    console.log('Notification received: ', payload);
  });
};
