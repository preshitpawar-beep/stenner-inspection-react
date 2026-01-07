import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQjTD259C-f50tx7lKPOashG47st5DYgw",
  authDomain: "stenner-inspection-react.firebaseapp.com",
  projectId: "stenner-inspection-react",
  storageBucket: "stenner-inspection-react.appspot.com",
  messagingSenderId: "81117197620",
  appId: "1:81117197620:web:2d40396c912277a57fe161"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
