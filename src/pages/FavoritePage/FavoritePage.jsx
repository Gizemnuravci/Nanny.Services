import { useSelector } from "react-redux";
import NannyCard from '../../components/NannyCard/NannyCard';
import styles from './FavoritePage.module.css';

const FavoritesPage = () => {
 
  const favorites = useSelector((state) => state.nannies.favorites);

  return (
    <section className={styles.favoritesSection}>
      <div className={styles.container}>
        {favorites.length > 0 ? (
          <div className={styles.cardList}>
            {favorites.map((nanny) => (
              <NannyCard key={nanny.name} nanny={nanny} />
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