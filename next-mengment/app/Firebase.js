import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA03ZZHbx1ZOPTqP6hQy2XDXh4WvA6hbYk",
    authDomain: "next-1-3dbdb.firebaseapp.com",
    projectId: "next-1-3dbdb",
    storageBucket: "next-1-3dbdb.appspot.com",
    messagingSenderId: "246981926639",
    appId: "1:246981926639:web:f5494a1e6a8fdec3ff851a"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { auth };
export {db};
