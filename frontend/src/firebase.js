// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfEuXhMiWpuVmJ9Fag7XWtByLqvT-9pKY",
  authDomain: "nwhacks2026-90ee4.firebaseapp.com",
  projectId: "nwhacks2026-90ee4",
  storageBucket: "nwhacks2026-90ee4.firebasestorage.app",
  messagingSenderId: "1097640465617",
  appId: "1:1097640465617:web:0e1e9722d9f119d1c4a1f0",
  measurementId: "G-F7RXH5KX7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
