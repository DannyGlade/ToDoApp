// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKXhcDXohiS1yedE7CzVMEBEyuQrSl_II",
  authDomain: "todolist-rn-40404.firebaseapp.com",
  databaseURL: "https://todolist-rn-40404-default-rtdb.firebaseio.com",
  projectId: "todolist-rn-40404",
  storageBucket: "todolist-rn-40404.appspot.com",
  messagingSenderId: "658609069230",
  appId: "1:658609069230:web:042edb8eef2aad9170213f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;