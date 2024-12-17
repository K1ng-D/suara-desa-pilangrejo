// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCerHOTsebobqm7VJ8Ebp7RIv2UnaDOb78",
  authDomain: "kritik-saran-6475d.firebaseapp.com",
  projectId: "kritik-saran-6475d",
  storageBucket: "kritik-saran-6475d.firebasestorage.app",
  messagingSenderId: "1058258415649",
  appId: "1:1058258415649:web:a5369e762a5e47194d3360",
  measurementId: "G-2JFJDMTY9J",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
