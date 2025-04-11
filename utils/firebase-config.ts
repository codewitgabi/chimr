// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDyG0xcKRmpoakFYpUEef5xTso-V1dHudE",
  authDomain: "react-chat-28c51.firebaseapp.com",
  projectId: "react-chat-28c51",
  storageBucket: "react-chat-28c51.firebasestorage.app",
  messagingSenderId: "812810509362",
  appId: "1:812810509362:web:5df8e911677f7a159af02b",
  measurementId: "G-5LMDZMBQC2",
};


export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseMessaging = getMessaging(firebaseApp);
