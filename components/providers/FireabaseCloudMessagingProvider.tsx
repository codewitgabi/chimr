"use client";

import { firebaseMessaging } from "@/utils/firebase-config";
import { getToken, onMessage } from "firebase/messaging";
import { ReactNode } from "react";
import { toast } from "sonner";

const FIREBASE_VAPID_KEY = process.env.VITE_FIREBASE_VAPID_KEY;

function FirebaseCloudMessagingProvider({ children }: { children: ReactNode }) {
  function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.debug("Notification permission granted.");
      } else {
        console.debug("Notification permission denied.");
      }
    });
  }

  getToken(firebaseMessaging, { vapidKey: FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        localStorage.setItem("fcmToken", currentToken);
      } else {
        requestPermission();
      }
    })
    .catch(() => {
      console.debug("An error occurred while retrieving token. ");
    });

  onMessage(firebaseMessaging, (payload) => {
    toast(`${payload.notification?.title}: ${payload.notification?.body}`);
  });

  return <>{children}</>;
}

export default FirebaseCloudMessagingProvider;
