import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, db } from "./firebase.config";

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
    throw error;
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
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const fetchNanniesFromDB = async () => {
  try {
    const nanniesRef = ref(db, "nannies");
    const snapshot = await get(nanniesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : Object.values(data);
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

export const fetchFavoritesFromDB = async (userId) => {
  try {
    const favoritesRef = ref(db, `users/${userId}/favorites`);
    const snapshot = await get(favoritesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : Object.values(data);
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    throw error;
  }
};

export const addFavoriteToDB = async (userId, nanny) => {
  try {
    const key = nanny.name.replace(/[.#$[\]]/g, "_");
    const favoriteRef = ref(db, `users/${userId}/favorites/${key}`);
    await set(favoriteRef, nanny);
  } catch (error) {
    console.error("Failed to add favorite:", error);
    throw error;
  }
};

export const removeFavoriteFromDB = async (userId, nannyName) => {
  try {
    const key = nannyName.replace(/[.#$[\]]/g, "_");
    const favoriteRef = ref(db, `users/${userId}/favorites/${key}`);
    await set(favoriteRef, null);
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    throw error;
  }
};

export const checkAndSeedDatabase = async (defaultNannies) => {
  try {
    const nanniesRef = ref(db, "nannies");
    const snapshot = await get(nanniesRef);
    if (!snapshot.exists() || snapshot.val() === null || (Array.isArray(snapshot.val()) && snapshot.val().length === 0)) {
      console.log("Database is empty. Seeding with babysitters.json data...");
      await seedNanniesToDB(defaultNannies);
      console.log("Seeding complete!");
    }
  } catch (error) {
    console.error("Error during check and seed database:", error);
  }
};
