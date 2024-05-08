importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAix8Yinv7q24O7jyRu5rGb4dCORKbv4ss",
  authDomain: "test-2f52b.firebaseapp.com",
  projectId: "test-2f52b",
  storageBucket: "test-2f52b.appspot.com",
  messagingSenderId: "818657222476",
  appId: "1:818657222476:web:753fed440d087040fc79e9",
  measurementId: "G-LQNMSJ4HE4",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
