import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
  
const firebaseConfig = {
  apiKey: "AIzaSyBMb2QgttdwaC-zwizPKblfa6OjqT_YoBo",
  authDomain: "schooldev-66db8.firebaseapp.com",
  projectId: "schooldev-66db8",
  storageBucket: "schooldev-66db8.appspot.com",
  messagingSenderId: "127427728758",
  appId: "1:127427728758:web:d049746de51a4e1bf9d657",
  measurementId: "G-K6GFT6P55B"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);