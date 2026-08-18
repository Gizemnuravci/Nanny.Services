import { useState } from "react";
import { useSelector } from "react-redux";
import NannyCard from "../../components/NannyCard/NannyCard";
import AppointmentModal from "../../components/Modals/AppointmentModal/AppointmentModal";
import styles from "./FavoritePage.module.css";

const FavoritesPage = ({ favorites: favoritesProp, onToggleFavorite }) => {
  const reduxFavorites = useSelector((state) => state.nannies?.favorites || []);
  const favorites = favoritesProp ?? reduxFavorites;

  const [filter, setFilter] = useState("all");
  const [selectedNanny, setSelectedNanny] = useState(null);

  const getFilteredFavorites = () => {
    let result = [...favorites];

    // Filter by price (less or greater than 18)
    if (filter === "less-18") {
      result = result.filter((item) => item.price_per_hour <= 18);
    } else if (filter === "greater-18") {
      result = result.filter((item) => item.price_per_hour > 18);
    }

    // Sort accordingly
    switch (filter) {
      case "a-z":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return result.sort((a, b) => b.name.localeCompare(a.name));
      case "popular":
        return result.sort((a, b) => b.rating - a.rating);
      case "not-popular":
        return result.sort((a, b) => a.rating - b.rating);
      default:
        // Default sort for filtered results by price
        if (filter === "less-18" || filter === "greater-18") {
          return result.sort((a, b) => a.price_per_hour - b.price_per_hour);
        }
        return result;
    }
  };

  const filteredFavorites = getFilteredFavorites();

  return (
    <section className={styles.favoritesSection}>
      <div className={styles.container}>
        {favorites.length > 0 && (
          <div className={styles.filterSection}>
            <label htmlFor="fav-filter-select" className={styles.filterLabel}>
              Filters
            </label>
            <select
              id="fav-filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Show all</option>
              <option value="a-z">A to Z</option>
              <option value="z-a">Z to A</option>
              <option value="less-18">Less than 18$</option>
              <option value="greater-18">Greater than 18$</option>
              <option value="popular">Popular</option>
              <option value="not-popular">Not popular</option>
            </select>
          </div>
        )}

        {filteredFavorites.length > 0 ? (
          <div className={styles.cardList}>
            {filteredFavorites.map((nanny) => (
              <NannyCard
                key={nanny.name}
                nanny={nanny}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite?.(nanny)}
                onBookClick={() => setSelectedNanny(nanny)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>
              {favorites.length === 0
                ? "No favorite nannies added yet"
                : "No matching favorites found"}
            </h2>
            <p>
              {favorites.length === 0
                ? "You can add nannies to your favorites list by clicking the heart icon on their cards."
                : "Try changing your filter settings to view other saved nannies."}
            </p>
          </div>
        )}
      </div>

      {selectedNanny && (
        <AppointmentModal
          nanny={selectedNanny}
          onClose={() => setSelectedNanny(null)}
        />
      )}
    </section>
  );
};

export default FavoritesPage;