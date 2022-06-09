import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirebase, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDn8OZ_QBmXsyqPoplXn4pBZ9yae4URiBA',
  authDomain: 'hh-w05-project-re.firebaseapp.com',
  projectId: 'hh-w05-project-re',
  storageBucket: 'hh-w05-project-re.appspot.com',
  messagingSenderId: '919992738836',
  appId: '1:919992738836:web:efe3da3128e08d1b8d3301',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
