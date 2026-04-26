import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC341dRkNdZATv8an6Btsuig69wsNVGz5M",
  authDomain: "appproject-92d14.firebaseapp.com",
  projectId: "appproject-92d14",
  storageBucket: "appproject-92d14.firebasestorage.app",
  messagingSenderId: "453188129568",
  appId: "1:453188129568:web:a77b7f2ba3d0bbf0c93d45",
  measurementId: "G-G2TWCZ901P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signOut, onAuthStateChanged, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs };
