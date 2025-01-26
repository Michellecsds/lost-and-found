import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqqeVnSrttDtoJ0UKI-EMcGfzTAxu3JBY",
  authDomain: "lost-and-found-dc831.firebaseapp.com",
  projectId: "lost-and-found-dc831",
  storageBucket: "lost-and-found-dc831.firebasestorage.app",
  messagingSenderId: "330469284613",
  appId: "1:330469284613:web:8c49e4f234aff6742d756c",
  measurementId: "G-H5E519XD73",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
