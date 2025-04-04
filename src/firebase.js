import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAcn2Kw1BUFRmd0E98zHYGnSe-BMHR_wEsY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "733989043363",
  appId: "1:733989043363:web:59a8bd63a3293cf43d5316"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
