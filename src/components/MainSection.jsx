import React from 'react';
import styles from './MainSection.module.scss';
import SessionsTable from './SessionsTable';

function MainSection({ toggleSessions }) {
  return (
    <div className={styles.MainSection}>
      <div className={styles.pagebar}>
        <div className={styles.sectionName}>
          <p>All Sessions</p>
        </div>
        <div className={styles.singleBtn} onClick={toggleSessions}>
          <p>+</p>
          <p>New Session</p>
        </div>
      </div>
      <SessionsTable />
    </div>
  );
}

export default MainSection;
