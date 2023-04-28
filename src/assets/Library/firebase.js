// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFg2Ca897mdf1oDqxCwgDZvIFyQUPN6BI",
  authDomain: "front-end-48c6f.firebaseapp.com",
  projectId: "front-end-48c6f",
  storageBucket: "front-end-48c6f.appspot.com",
  messagingSenderId: "723619766584",
  appId: "1:723619766584:web:e13be056b51438a9dc21cd",
  measurementId: "G-0HX4HHN226"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);