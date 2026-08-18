import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, db } from "./firebase.config";
import { object } from "yup";

export const registerUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential.user;
  } catch (error) {
    throw new error(error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new error(error.message);
  }
};

export const fetchNanniesFromDB = async () => {
  try {
    const nanniesRef = ref(db, "nannies");
    const snapshot = await get(nanniesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : object.values(data);
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch caregiver data:", error);
    throw error;
  }
};

export const seedNanniesToDB = async (nanniesData) => {
  try {
    await set(ref(db, "nannies"), nanniesData);
  } catch (error) {
    console.error("Failed to load data:", error);
    throw error;
  }
};
