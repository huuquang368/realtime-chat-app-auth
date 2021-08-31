// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXHzXupC1_jcyZ3jkER72jQEuNW4jOzs0",
  authDomain: "realtime-chat-app-9420c.firebaseapp.com",
  projectId: "realtime-chat-app-9420c",
  storageBucket: "realtime-chat-app-9420c.appspot.com",
  messagingSenderId: "447704257641",
  appId: "1:447704257641:web:910bf49ff980d2b0c63ef8",
  measurementId: "G-3XBVNLX0VY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, analytics };
