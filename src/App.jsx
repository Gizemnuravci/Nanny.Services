import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import NanniesPage from "./pages/NanniesPage/NanniesPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import babysitters from "./data/babysitters.json";
import { useMemo, useState } from "react";

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (nanny) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.name === nanny.name);
      return exists ? prev.filter((item) => item.name !== nanny.name) : [...prev, nanny];
    });
  };

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <HomePage onOpenAuth={() => {}} />,
        },
        {
          path: "/nannies",
          element: (
            <NanniesPage
              nannies={babysitters}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          ),
        },
        {
          path: "/favorites",
          element: (
            <FavoritePage
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          ),
        },
      ]),
    [favorites]
  );

  return (
    <>
      <Header user={null} onOpenAuthModal={() => {}} onLogout={() => {}} />
      <RouterProvider router={router} />
    </>
  );
}