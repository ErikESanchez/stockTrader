import * as firebase from 'firebase'
// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCOR6Tbv6KkHGejJVPGYiGbWM8Av4m42nk",
    authDomain: "stock-trader-fa865.firebaseapp.com",
    databaseURL: "https://stock-trader-fa865.firebaseio.com",
    projectId: "stock-trader-fa865",
    storageBucket: "stock-trader-fa865.appspot.com",
    messagingSenderId: "502197568222",
    appId: "1:502197568222:web:fdce89b9bb9cf526d8b84f",
    measurementId: "G-CGXD9V37XZ"
}
// Initialize Firebase
let firebaseData = firebase.initializeApp(firebaseConfig)
let db = firebase.firestore();

export { firebaseData, db }