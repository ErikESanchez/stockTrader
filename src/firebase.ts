import fb from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOR6Tbv6KkHGejJVPGYiGbWM8Av4m42nk",
  authDomain: "stock-trader-fa865.firebaseapp.com",
  databaseURL: "https://stock-trader-fa865.firebaseio.com",
  projectId: "stock-trader-fa865",
  storageBucket: "stock-trader-fa865.appspot.com",
  messagingSenderId: "502197568222",
  appId: "1:502197568222:web:fdce89b9bb9cf526d8b84f",
  measurementId: "G-CGXD9V37XZ",
};

const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);
// const auth = getAuth();
export default {};
// Initialize Firebase
