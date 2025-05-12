"use client";

import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

function FirebaseCloudMessagingProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initializeFirebase = async () => {
      try {
        console.log("Initializing Firebase messaging...");

        // Check if browser supports notifications
        if (!("Notification" in window)) {
          console.error("This browser does not support notifications");
          return;
        }

        // Import Firebase modules
        const { firebaseMessaging } = await import("@/utils/firebase-config");
        const { getToken, onMessage } = await import("firebase/messaging");

        const FIREBASE_VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

        if (!FIREBASE_VAPID_KEY) {
          console.error("Firebase VAPID key is missing");
          return;
        }

        console.log("Requesting notification permission...");
        const permission = await Notification.requestPermission();
        console.log(`Notification permission status: ${permission}`);

        if (permission !== "granted") {
          console.warn("Notification permission was not granted");
          return;
        }

        console.log("Getting FCM token...");
        try {
          const currentToken = await getToken(firebaseMessaging!, {
            vapidKey: FIREBASE_VAPID_KEY,
          });

          if (currentToken) {
            console.log(
              "FCM token obtained:",
              currentToken.substring(0, 10) + "..."
            );
            localStorage.setItem("fcmToken", currentToken);
            console.log("FCM token saved to localStorage");
          } else {
            console.warn("No FCM token received");
          }
        } catch (tokenError) {
          console.error("Error getting FCM token:", tokenError);
        }

        // Set up message listener
        console.log("Setting up message listener...");
        onMessage(firebaseMessaging!, (payload) => {
          console.log("Push notification received:", payload);
          if (payload.notification) {
            toast(
              `${payload.notification.title}: ${payload.notification.body}`
            );
          }
        });

        console.log("Firebase messaging initialized successfully");
      } catch (error) {
        console.error("Firebase messaging initialization error:", error);
      }
    };

    initializeFirebase();
  }, [isClient]);

  return <>{children}</>;
}

export default FirebaseCloudMessagingProvider;
