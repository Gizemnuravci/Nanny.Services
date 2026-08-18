import { useSelector } from "react-redux";
import NannyCard from '../../components/NannyCard/NannyCard';
import styles from './FavoritePage.module.css';

const FavoritesPage = ({ favorites: favoritesProp, onToggleFavorite }) => {
  const reduxFavorites = useSelector((state) => state.nannies?.favorites || []);
  const favorites = favoritesProp ?? reduxFavorites;

  return (
    <section className={styles.favoritesSection}>
      <div className={styles.container}>
        {favorites.length > 0 ? (
          <div className={styles.cardList}>
            {favorites.map((nanny) => (
              <NannyCard
                key={nanny.name}
                nanny={nanny}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite?.(nanny)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>No favorite nannies added yet</h2>
            <p>You can add nannies to your favorites list by clicking the heart icon on their cards.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;