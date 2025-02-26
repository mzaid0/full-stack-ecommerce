import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//firebase keys

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
