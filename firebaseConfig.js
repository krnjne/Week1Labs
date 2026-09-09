import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
const firebaseConfig = {
  apiKey: "AIzaSyAxBoGQEcunnUdU1ojataX4Vnz3zQmInqg",
  authDomain: "week1labs-9ce65.firebaseapp.com",
  projectId: "week1labs-9ce65",
  storageBucket: "week1labs-9ce65.firebasestorage.app",
  messagingSenderId: "182978145590",
  appId: "1:182978145590:web:f3b455773bf625f32a9797"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 