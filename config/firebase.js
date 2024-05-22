import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Adicionar configuração do Firebase
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.apiKey,
  authDomain: Constants.expoConfig?.extra?.authDomain,
  projectId: Constants.expoConfig?.extra?.projectId,
  storageBucket: Constants.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.appId,
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === 'web') {
  // Inicializar auth para web
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  // Inicializar auth para React Native
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };
