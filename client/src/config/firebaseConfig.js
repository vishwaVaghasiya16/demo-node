// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaTSdxppqsj9OmZ5f8FyNxdd_ojU3pl34",
  authDomain: "test-851ff.firebaseapp.com",
  projectId: "test-851ff",
  storageBucket: "test-851ff.appspot.com",
  messagingSenderId: "20954816373",
  appId: "1:20954816373:web:f7b99f022b715be852fd3c",
  measurementId: "G-L8NNL0DPPZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
export const facebookLogin = () => {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider);
};
