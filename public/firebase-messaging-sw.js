importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDyG0xcKRmpoakFYpUEef5xTso-V1dHudE",
  authDomain: "react-chat-28c51.firebaseapp.com",
  projectId: "react-chat-28c51",
  storageBucket: "react-chat-28c51.firebasestorage.app",
  messagingSenderId: "812810509362",
  appId: "1:812810509362:web:5df8e911677f7a159af02b",
  measurementId: "G-5LMDZMBQC2",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
