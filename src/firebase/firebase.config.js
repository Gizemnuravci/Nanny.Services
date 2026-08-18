import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apikey: import.meta.env.VITE_FİREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FİREBASE_API_DOMAIN,
  databaseUrl: import.meta.env.VITE_FİREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FİREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FİREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FİREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FİREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
