importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
console.log("'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js' loaded")
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');
console.log("'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js' loaded")

firebase.initializeApp({
  apiKey: "AIzaSyC-J7y9NxpvhWI8ENtqiVfFIiZxOUzYMYo",
  authDomain: "salt-travia.firebaseapp.com",
  projectId: "salt-travia",
  storageBucket: "salt-travia.firebasestorage.app",
  messagingSenderId: "421105687655",
  appId: "1:421105687655:web:e2642cf902b15fd503c8c2",
  measurementId: "G-F2BFLHM23V"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/?claimReward=true') // Navigate to the rewards page
    );
    
  });
