/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAU9x_Fg-Vi3xfOUPtIK0nxp4Hd9oPiO2c",
    authDomain: "lims-push-notification.firebaseapp.com",
    projectId: "lims-push-notification",
    storageBucket: "lims-push-notification.appspot.com",
    messagingSenderId: "25541887638",
    appId: "1:25541887638:web:1e35f636ffcc7e7ecca4b7"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationOptions = {
        body: payload.notification?.body || 'No Body',
        icon: payload.notification?.image || '/default-icon.png'
      };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
