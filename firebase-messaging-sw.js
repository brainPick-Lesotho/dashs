// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdDyCiJ7flRZh2jbaYo5q4Hpjpou-rHAc",
  authDomain: "brainpicklesotho-ef66c.firebaseapp.com",
  projectId: "brainpicklesotho-ef66c",
  storageBucket: "brainpicklesotho-ef66c.appspot.com",
  messagingSenderId: "273452901797",
  appId: "1:273452901797:web:edfbc18ee4043c3931f44c",
  measurementId: "G-CXYY42FTEF"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

