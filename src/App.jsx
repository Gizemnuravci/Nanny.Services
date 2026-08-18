import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import NanniesPage from "./pages/NanniesPage/NanniesPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import AppointmentModal from "./components/Modals/AppointmentModal/AppointmentModal";
import AuthModal from "./components/Modals/AuthModal/AuthModal";
import babysitters from "./data/babysitters.json";
import { useMemo, useState, useEffect } from "react";

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [authModalMode, setAuthModalMode] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("nanny_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email, password) => {
    const userData = { email, displayName: email.split("@")[0] };
    setUser(userData);
    localStorage.setItem("nanny_user", JSON.stringify(userData));
    setAuthModalMode(null);
  };

  const handleRegister = (name, email, password) => {
    const userData = { email, displayName: name };
    setUser(userData);
    localStorage.setItem("nanny_user", JSON.stringify(userData));
    setAuthModalMode(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("nanny_user");
  };

  const toggleFavorite = (nanny) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.name === nanny.name);
      return exists ? prev.filter((item) => item.name !== nanny.name) : [...prev, nanny];
    });
  };

  const router = useMemo(
    () =>
      createBrowserRouter(
        [
          {
            path: "/",
            element: (
              <>
                <Header
                  user={user}
                  onOpenAuthModal={setAuthModalMode}
                  onLogout={handleLogout}
                />
                <HomePage onOpenAuth={setAuthModalMode} />
              </>
            ),
          },
          {
            path: "/nannies",
            element: (
              <>
                <Header
                  user={user}
                  onOpenAuthModal={setAuthModalMode}
                  onLogout={handleLogout}
                />
                <NanniesPage
                  nannies={babysitters}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              </>
            ),
          },
          {
            path: "/favorites",
            element: (
              <>
                <Header
                  user={user}
                  onOpenAuthModal={setAuthModalMode}
                  onLogout={handleLogout}
                />
                <FavoritePage
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              </>
            ),
          },
        ],
        { basename: import.meta.env.BASE_URL }
      ),
    [user, favorites]
  );

  return (
    <>
      <RouterProvider router={router} />
      {authModalMode && (
        <AuthModal
          mode={authModalMode}
          onClose={() => setAuthModalMode(null)}
          onSwitchMode={setAuthModalMode}
          onSubmit={authModalMode === "login" ? handleLogin : handleRegister}
        />
      )}
    </>
  );
}