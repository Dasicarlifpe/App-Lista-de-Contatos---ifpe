import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCTM-6AfYal6yP3Hb-DW0OVDskfMH4O9s",
  authDomain: "projetomb-8dad3.firebaseapp.com",
  projectId: "projetomb-8dad3",
  storageBucket: "projetomb-8dad3.appspot.com",
  messagingSenderId: "802243487305",
  appId: "1:802243487305:web:832fdb4c4576c532ad0198",
  measurementId: "G-KF3MQTB64E"
};

// Initialize Fire
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 
const auth = getAuth(app);

export { auth, db , app };
