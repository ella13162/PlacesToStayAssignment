import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiq6Zu6xUc_YRfpDWHTgZn3DbGuG2FZNc",
  authDomain: "placetostay-d1cc5.firebaseapp.com",
  projectId: "placetostay-d1cc5",
  storageBucket: "placetostay-d1cc5.appspot.com",
  messagingSenderId: "1011408352152",
  appId: "1:1011408352152:web:88139302571eaaf01471ed",
  measurementId: "G-1H7CZ6GYWR"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
