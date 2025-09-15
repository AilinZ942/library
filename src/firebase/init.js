// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYLZ5ePbQjoCZ5iDUxIqPFclbpAc0VPAk",
  authDomain: "week7-ailin.firebaseapp.com",
  projectId: "week7-ailin",
  storageBucket: "week7-ailin.firebasestorage.app",
  messagingSenderId: "205941027115",
  appId: "1:205941027115:web:9bdee83782b5585acb156e"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db