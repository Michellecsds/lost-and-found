import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

require('dotenv').config();

const apiKey = process.env.firebaseCreds;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
