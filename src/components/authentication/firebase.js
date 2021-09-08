// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { doc, setDoc ,getFirestore, getDoc } from "firebase/firestore"; 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCQpBqVijBnhT8fXlaAeP6lIHkaiFaWDQ",
  authDomain: "test-48da0.firebaseapp.com",
  projectId: "test-48da0",
  storageBucket: "test-48da0.appspot.com",
  messagingSenderId: "210396814867",
  appId: "1:210396814867:web:b04adca6399f8ce70669e6"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, "cartUsers", name), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};