import React from 'react';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerBrand}>
        <p className={styles.logo}>Evently</p>
        <img className={styles.ToggleIcon} src="/img/mask-group.svg" />
      </div>
      <div className={styles.headerEventName}>
        <div className={styles.box}>
          <div className={styles.nameSection}>
            <img
              src="/img/champ-league-shirts-jpeg.png"
              alt="champ-league-shirts"
            />
            <p>Champions’ League 2023</p>
          </div>
          <img
            className={styles.ToggleIcon}
            src="/img/icon-dashboard-chevron-down-26.svg"
            alt=""
          />
        </div>
      </div>
      <div className={styles.headerProfile}>
        <div className={styles.notification}>
          <img src="/img/notifications.svg" />
        </div>
        <div className={styles.profile}>
          <img src="/img/ellipse-1.png" alt="profile" />
          <p>Jane Doe</p>
          <img
            className={styles.ToggleIcon}
            src="/img/icon-dashboard-chevron-down-26.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
