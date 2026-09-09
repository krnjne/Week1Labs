import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAxBoGQEcunnUdU1ojataX4Vnz3zQmInqg',
  authDomain: 'week1labs-9ce65.firebaseapp.com',
  projectId: 'week1labs-9ce65',
  storageBucket: 'week1labs-9ce65.firebasestorage.app',
  messagingSenderId: '182978145590',
  appId: '1:182978145590:web:f3b455773bf625f32a9797',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Reuse the existing Auth instance during Expo Go fast refresh.
export let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}