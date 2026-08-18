import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import NanniesPage from "./pages/NanniesPage/NanniesPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import AuthModal from "./components/Modals/AuthModal/AuthModal";
import Unauthorized from "./components/Modals/Unauthorized/Unauthorized";

import { auth } from "./firebase/firebase.config";
import {
  checkAndSeedDatabase,
  fetchNanniesFromDB,
  fetchFavoritesFromDB,
  addFavoriteToDB,
  removeFavoriteFromDB,
  logoutUser,
} from "./firebase/services";
import babysitters from "./data/babysitters.json";

import { setUser, clearUser } from "./redux/auth/authSlice";
import { setNannies, setFavorites, toggleFavorite } from "./redux/nannies/nanniesSlice";

// BASE_URL örn: "/Nanny.Services/" → sondaki "/" kaldırılır → "/Nanny.Services"
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.nannies.favorites);
  const nannies = useSelector((state) => state.nannies.items);

  const [authModalMode, setAuthModalMode] = useState(null);

  // 1. Seed database and fetch initial nannies
  useEffect(() => {
    const initializeData = async () => {
      try {
        await checkAndSeedDatabase(babysitters);
        const data = await fetchNanniesFromDB();
        dispatch(setNannies(data));
      } catch (error) {
        console.error("Failed to initialize database or fetch nannies:", error);
      }
    };
    initializeData();
  }, [dispatch]);

  // 2. Listen to Auth State changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
          })
        );
        try {
          const userFavs = await fetchFavoritesFromDB(currentUser.uid);
          dispatch(setFavorites(userFavs));
        } catch (error) {
          console.error("Failed to fetch favorites:", error);
        }
      } else {
        dispatch(clearUser());
        dispatch(setFavorites([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };

  const handleToggleFavorite = async (nanny) => {
    if (!user) {
      setAuthModalMode("unauthorized");
      return;
    }

    const isFav = favorites.some((item) => item.name === nanny.name);
    dispatch(toggleFavorite(nanny));

    try {
      if (isFav) {
        await removeFavoriteFromDB(user.uid, nanny.name);
      } else {
        await addFavoriteToDB(user.uid, nanny);
      }
    } catch (error) {
      console.error("Failed to sync favorite with database:", error);
      dispatch(toggleFavorite(nanny));
    }
  };

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route
          path="/"
          element={<HomePage onOpenAuth={setAuthModalMode} />}
        />
        <Route
          path="/nannies"
          element={
            <>
              <Header
                user={user}
                onOpenAuthModal={setAuthModalMode}
                onLogout={handleLogout}
              />
              <NanniesPage
                nannies={nannies}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            user ? (
              <>
                <Header
                  user={user}
                  onOpenAuthModal={setAuthModalMode}
                  onLogout={handleLogout}
                />
                <FavoritePage
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      {authModalMode && authModalMode !== "unauthorized" && (
        <AuthModal
          mode={authModalMode}
          onClose={() => setAuthModalMode(null)}
          onSwitchMode={setAuthModalMode}
        />
      )}
      {authModalMode === "unauthorized" && (
        <Unauthorized
          onClose={() => setAuthModalMode(null)}
          onOpenLogin={() => setAuthModalMode("login")}
        />
      )}
    </BrowserRouter>
  );
}