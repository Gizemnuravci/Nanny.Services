import { useState } from "react";
import NannyCard from "../../components/NannyCard/NannyCard";
import AppointmentModal from "../../components/Modals/AppointmentModal/AppointmentModal";
import styles from "./NanniesPage.module.css";

export default function NanniesPage({
  nannies = [],
  favorites = [],
  onToggleFavorite = () => {},
}) {
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedNanny, setSelectedNanny] = useState(null);


  const getFilteredNannies = () => {
    let sorted = [...nannies];

    switch (filter) {
      case "price-asc":
        return sorted.sort((a, b) => a.price_per_hour - b.price_per_hour);
      case "price-desc":
        return sorted.sort((a, b) => b.price_per_hour - a.price_per_hour);
      case "popular":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "a-z":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };

  const filteredNannies = getFilteredNannies();
  const visibleNannies = filteredNannies.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        

        <section className={styles.filterSection}>
          <label htmlFor="filter-select" className={styles.filterLabel}>
            Filters
          </label>
          <select
            id="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Show all</option>
            <option value="popular">Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
          </select>
        </section>

        <section className={styles.nannyList}>
          {visibleNannies.length > 0 ? (
            visibleNannies.map((nanny) => (
              <NannyCard
                key={nanny.id || nanny.name}
                nanny={nanny}
                isFavorite={favorites.some((item) => item.name === nanny.name)}
                onToggleFavorite={() => onToggleFavorite(nanny)}
                onBookClick={() => setSelectedNanny(nanny)}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              No nannies found matching your criteria.
            </div>
          )}
        </section>


        {visibleCount < filteredNannies.length && (
          <div className={styles.loadMoreContainer}>
            <button
              onClick={handleLoadMore}
              type="button"
              className={styles.loadMoreBtn}
            >
              Load more
            </button>
          </div>
        )}

      </div>

   
      {selectedNanny && (
        <AppointmentModal
          nanny={selectedNanny}
          onClose={() => setSelectedNanny(null)}
        />
      )}
    </main>
  );
}