// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLZ5z2g5EIVTLggTi1THEKjC7gut4CXIg",
  authDomain: "ecommerceclone-21f49.firebaseapp.com",
  projectId: "ecommerceclone-21f49",
  storageBucket: "ecommerceclone-21f49.firebasestorage.app",
  messagingSenderId: "308526077107",
  appId: "1:308526077107:web:067bcaeb666a16fc930cc6",
  measurementId: "G-NDGD1DLZ35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };