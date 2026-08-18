import { useState } from "react";
import styles from "./NannyCard.module.css";

export default function NannyCard({ nanny, onBookClick, isFavorite, onToggleFavorite }) {
  const [showMore, setShowMore] = useState(false);
  const base = import.meta.env.BASE_URL;

  const getAge = (birthday) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    if (isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const renderCharacters = (characters) => {
    if (!characters) return "";
    if (Array.isArray(characters)) return characters.join(", ");
    return characters;
  };

  const age = getAge(nanny?.birthday);

  return (
    <div className={styles.card}>
    
      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          <img
            src={nanny?.avatar_url || `${base}default-avatar.jpg`}
            alt={nanny?.name || "Nanny"}
            className={styles.avatarImg}
          />
          <span className={styles.onlineBadge}></span>
        </div>
      </div>


      <div className={styles.content}>
  
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.roleLabel}>Nanny</span>
            <h3 className={styles.name}>{nanny?.name}</h3>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.metaInfo}>
            
              <span className={styles.metaItem}>
                <svg className={styles.iconPin} aria-hidden="true">
                  <use href={`${base}symbol-defs.svg#icon-map-pin`} />
                </svg>
                {nanny?.location}
              </span>

              <span className={styles.divider}>|</span>

          
              <span className={styles.metaItem}>
                <svg className={styles.iconStar} aria-hidden="true">
                  <use href={`${base}symbol-defs.svg#icon-Rating`} />
                </svg>
                <span className={styles.ratingValue}>Rating: {nanny?.rating}</span>
              </span>

              <span className={styles.divider}>|</span>

        
              <span className={styles.metaItem}>
                Price / 1 hour:{" "}
                <strong className={styles.priceHighlight}>
                  {nanny?.price_per_hour}$
                </strong>
              </span>
            </div>

            <div className={styles.cardActions}>
              <button
                type="button"
                onClick={onToggleFavorite}
                className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ""}`}
                aria-label="Add to favorites"
              >
                <svg className={styles.iconHeart} aria-hidden="true">
                  <use href={`${base}symbol-defs.svg#icon-Vector-7`} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.detailsGrid}>
          {age !== null && (
            <div className={styles.badge}>
              <span className={styles.badgeLabel}>Age:</span>{" "}
              <span className={styles.badgeValue}>{age}</span>
            </div>
          )}
          <div className={styles.badge}>
            <span className={styles.badgeLabel}>Experience:</span>{" "}
            <span className={styles.badgeValue}>{nanny?.experience}</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeLabel}>Kids Age:</span>{" "}
            <span className={styles.badgeValue}>{nanny?.kids_age}</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeLabel}>Characters:</span>{" "}
            <span className={styles.badgeValue}>
              {renderCharacters(nanny?.characters)}
            </span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeLabel}>Education:</span>{" "}
            <span className={styles.badgeValue}>{nanny?.education}</span>
          </div>
        </div>

        <p className={styles.aboutText}>{nanny?.about}</p>

        {!showMore ? (
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className={styles.readMoreBtn}
          >
            Read more
          </button>
        ) : (
          <div className={styles.reviewsSection}>
            <div className={styles.reviewsList}>
              {nanny?.reviews && nanny.reviews.length > 0 ? (
                nanny.reviews.map((review, idx) => (
                  <div key={idx} className={styles.reviewCard}>
                    <div className={styles.reviewerHeader}>
                      <div className={styles.reviewerAvatar}>
                        {review.reviewer?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <h4 className={styles.reviewerName}>{review.reviewer}</h4>
                        <div className={styles.reviewerRating}>
                          <svg className={styles.iconStarSmall} viewBox="0 0 24 24" fill="#FFC107">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span>{review.rating ? Number(review.rating).toFixed(1) : "0.0"}</span>
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className={styles.noReviews}>No reviews yet.</p>
              )}
            </div>

            <button
              type="button"
              onClick={onBookClick}
              className={styles.appointmentBtn}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}