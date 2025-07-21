// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// Request notification permission and get token
const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const currentToken = await getToken(messaging, {
        vapidKey: "BOwFx5A07hZi_lEJcx2EkUkuOWR8J7p5Qd-LiemxCmgT6pXg00vz8072g7UPdstqP_URpPwSlc3hj4SMIUP6G5s"
      });
      if (currentToken) {
        console.log("FCM Token:", currentToken);
        // Save token to Firestore or send to your server
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
  }
};

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
  // You can show a notification using custom UI or browser API
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon
  });
});

// Call the function on page load
requestPermissionAndGetToken();

// Export services
export { auth, db, analytics, messaging };
import { getMessaging, getToken } from "firebase/messaging";

// Add this inside firebase.js
const messaging = getMessaging(app);

const requestPermissionAndGetToken = async () => {
  console.log("Requesting permission...");

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");

      const token = await getToken(messaging, {
        vapidKey: "BOwFx5A07hZi_lEJcx2EkUkuOWR8J7p5Qd-LiemxCmgT6pXg00vz8072g7UPdstqP_URpPwSlc3hj4SMIUP6G5s"
      });

      if (token) {
        console.log("FCM Token:", token);
        // Optional: Save this token to Firestore or display it
      } else {
        console.log("No registration token available.");
      }
    } else {
      console.log("Permission not granted.");
    }
  } catch (err) {
    console.error("An error occurred while retrieving token. ", err);
  }
};

export { auth, db, analytics, requestPermissionAndGetToken };
