// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSAlsTdjr7x9IVx4aUh0yzzHpQIcs4ctU",
  authDomain: "inter-trans-connect.firebaseapp.com",
  projectId: "inter-trans-connect",
  storageBucket: "inter-trans-connect.firebasestorage.app",
  messagingSenderId: "859337140598",
  appId: "1:859337140598:web:38210d6407de94ed2fb257",
  measurementId: "G-ZFGWV3K39L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
