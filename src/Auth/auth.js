// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt5UkFfqzQmN6AzDk8CxJmeaAG_D3p5zc",
  authDomain: "englishproject-68114.firebaseapp.com",
  projectId: "englishproject-68114",
  storageBucket: "englishproject-68114.firebasestorage.app",
  messagingSenderId: "74968935864",
  appId: "1:74968935864:web:1bbc5e86445071b800334d",
  measurementId: "G-L6Y66FLRVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // Analytics may not be available in some environments
  // (e.g., tests or non-browser environments)
  // Swallowing the error keeps initialization robust.
  // eslint-disable-next-line no-console
  console.warn('Analytics not available', e);
}

// Initialize and export auth and Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// Example function to get user data from Firestore

export { auth, googleProvider, db };