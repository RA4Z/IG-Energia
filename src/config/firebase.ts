// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBeSQMvww6TA0R-FdWQJJM4Lo7RjTBnblM",
    authDomain: "ig-energia.firebaseapp.com",
    projectId: "ig-energia",
    storageBucket: "ig-energia.firebasestorage.app",
    messagingSenderId: "822428285638",
    appId: "1:822428285638:web:62aced003baa6c34df35c7",
    measurementId: "G-SYDQ1M14F0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa o Firestore
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)
const database = getDatabase(app);

export { db, storage, auth, database, analytics };