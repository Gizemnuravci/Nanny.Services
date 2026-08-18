import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NannyCard from "./components/NannyCard/NannyCard";

const MOCK_NANNIES = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    location: "Kyiv, Ukraine",
    rating: 4.8,
    price_per_hour: 15,
    birthday: "1992-05-14",
    experience: "5 years",
    kids_age: "1 to 6 years old",
    characters: ["kind", "patient", "creative", "active"],
    education: "Bachelor's Degree in Early Childhood Education",
    about:
      "I am an experienced and passionate nanny with over 5 years of working with young children. I focus on creating a safe, engaging, and educational environment for kids.",
    reviews: [
      {
        reviewer: "Sarah Smith",
        rating: 5.0,
        comment: "Alice is fantastic! My kids absolutely adore her.",
      },
      {
        reviewer: "Mark Miller",
        rating: 4.6,
        comment: "Very punctual and trustworthy. High recommendations.",
      },
    ],
  },
];

function NanniesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNanny, setSelectedNanny] = useState(null);

  const handleToggleFavorite = (nannyId) => {
    setFavorites((prev) =>
      prev.includes(nannyId)
        ? prev.filter((id) => id !== nannyId)
        : [...prev, nannyId]
    );
  };

  const handleBookClick = (nanny) => {
    setSelectedNanny(nanny);
    setIsModalOpen(true);
  };

  return (
    <main style={{ maxWidth: "1184px", margin: "40px auto", padding: "0 20px" }}>
      <h1 style={{ marginBottom: "24px", color: "#111827" }}>Nannies</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {MOCK_NANNIES.map((nanny) => (
          <NannyCard
            key={nanny.id}
            nanny={nanny}
            isFavorite={favorites.includes(nanny.id)}
            onToggleFavorite={() => handleToggleFavorite(nanny.id)}
            onBookClick={() => handleBookClick(nanny)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "32px",
              borderRadius: "24px",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <h2>Make an appointment</h2>
            <p>
              Booking for: <strong>{selectedNanny?.name}</strong>
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{ marginTop: "16px", padding: "8px 16px", cursor: "pointer" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <NanniesPage />,
  },
  {
    path: "/nannies",
    element: <NanniesPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}