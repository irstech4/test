// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAix8Yinv7q24O7jyRu5rGb4dCORKbv4ss",
  authDomain: "test-2f52b.firebaseapp.com",
  projectId: "test-2f52b",
  storageBucket: "test-2f52b.appspot.com",
  messagingSenderId: "818657222476",
  appId: "1:818657222476:web:753fed440d087040fc79e9",
  measurementId: "G-LQNMSJ4HE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);