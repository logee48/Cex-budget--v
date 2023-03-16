import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCL8pUOlAL8i-gyWFW6jhjd2wYqyiQUKZA",
  authDomain: "twoo-77302.firebaseapp.com",
  databaseURL: "https://twoo-77302-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "twoo-77302",
  storageBucket: "twoo-77302.appspot.com",
  messagingSenderId: "135447477359",
  appId: "1:135447477359:web:8acc4c56ab1e7714c4e19a",
  measurementId: "G-WKRKWCHRWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);