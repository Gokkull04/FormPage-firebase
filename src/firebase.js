// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCeWwdOBO2F7h8bIx3ePxrz0GLsRA4VLiY",
    authDomain: "fir-connect-559e4.firebaseapp.com",
    projectId: "fir-connect-559e4",
    storageBucket: "fir-connect-559e4.appspot.com",
    messagingSenderId: "392306317428",
    appId: "1:392306317428:web:b55a9386bbf562ae8d5921"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
