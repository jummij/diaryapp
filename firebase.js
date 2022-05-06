// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsYLKEd5ZykMnE1SzVnN9A0iS4xjjzvzA",
  authDomain: "diaryapp-a3ba4.firebaseapp.com",
  databaseURL:
    "https://diaryapp-a3ba4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diaryapp-a3ba4",
  storageBucket: "diaryapp-a3ba4.appspot.com",
  messagingSenderId: "482272426712",
  appId: "1:482272426712:web:023e1e45cc17892b6b75ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
