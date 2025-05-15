import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

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
export const firebaseAuth = getAuth(firebaseApp);
firebaseAuth.useDeviceLanguage();
export const firebaseMessaging =
  typeof window !== "undefined" ? getMessaging(firebaseApp) : null;
export const githubProvider = new GithubAuthProvider();

// Google provider

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email");
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");
googleProvider.setCustomParameters({
  login_hint: "user@example.com",
  prompt: "select_account",
  app_name: "Chimr", // Try setting app name here
});

export const facebookProvider = new FacebookAuthProvider();
