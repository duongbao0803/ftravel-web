// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdzJTOazGcj1g4eBLZK3Rjj1jlg0naacU",
  authDomain: "swd392-d2c4e.firebaseapp.com",
  projectId: "swd392-d2c4e",
  storageBucket: "swd392-d2c4e.appspot.com",
  messagingSenderId: "47109893633",
  appId: "1:47109893633:web:e4f1860d2f7bb01fe81a00",
  measurementId: "G-8ZJBXCKP8M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { app, auth, provider, analytics, storage };
