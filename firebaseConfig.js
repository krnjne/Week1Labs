import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
initializeAuth,
getReactNativePersistence,
getAuth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyAxBoGQEcunnUdU1ojataX4Vnz3zQmInqg",
  authDomain: "week1labs-9ce65.firebaseapp.com",
  projectId: "week1labs-9ce65",
  storageBucket: "week1labs-9ce65.firebasestorage.app",
  messagingSenderId: "182978145590",
  appId: "1:182978145590:web:f3b455773bf625f32a9797"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
// Guard initializeAuth against duplicate calls during hot reload
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}
export { auth };