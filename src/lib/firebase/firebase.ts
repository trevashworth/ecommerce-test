// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzo5hrOjbZSIduLV_5O5eoCe9r5xQE0Og",
  authDomain: "ecommerce-app-d5e92.firebaseapp.com",
  projectId: "ecommerce-app-d5e92",
  storageBucket: "ecommerce-app-d5e92.firebasestorage.app",
  messagingSenderId: "165765633522",
  appId: "1:165765633522:web:b7d84b0f3d67b18304c76b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

