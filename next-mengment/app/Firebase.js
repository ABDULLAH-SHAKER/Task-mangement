// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA03ZZHbx1ZOPTqP6hQy2XDXh4WvA6hbYk",
    authDomain: "next-1-3dbdb.firebaseapp.com",
    projectId: "next-1-3dbdb",
    storageBucket: "next-1-3dbdb.appspot.com",
    messagingSenderId: "246981926639",
    appId: "1:246981926639:web:f5494a1e6a8fdec3ff851a"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };
