import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:"AIzaSyB8dSe5YywJsKGv40x5C8ps5kk7sof2E_c",
  authDomain:"mern-ecommerce-ts-6fa98.firebaseapp.com",
  projectId: "mern-ecommerce-ts-6fa98",
  storageBucket: "mern-ecommerce-ts-6fa98.appspot.com",
  messagingSenderId: "447286438532",
  appId: "1:447286438532:web:dd9f636729718897fdb0d1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
