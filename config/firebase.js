import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbro17iKYnW9BJPzSZ2NWepx6SpBPBoM0",
  authDomain: "fir-auth-b2786.firebaseapp.com",
  projectId: "fir-auth-b2786",
  storageBucket: "fir-auth-b2786.appspot.com",
  messagingSenderId: "774772857574",
  appId: "1:774772857574:web:7203d4d16c25b9e3fcb927",
  measurementId: "G-3JVM8Z7Z5Q"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Inicializar auth para web ou React Native
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth, firestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, updateDoc, doc }; // Exporte todas as funções necessárias
