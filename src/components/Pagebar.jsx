import React from 'react';
import styles from './Pagebar.module.scss';
import { FaLessThan } from 'react-icons/fa6';
import { RiAddLine } from 'react-icons/ri';

function Pagebar({ sectionName }) {
  if (sectionName === 'All Sessions') {
    return (
      <div className={styles.pagebar}>
        <div className={styles.sectionName}>
          <p>{sectionName}</p>
        </div>
        <div className={styles.singleBtn}>
          <p>+</p>
          <p>New Session</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.pagebar}>
        <div className={styles.sectionName}>
          <span className={styles.return}>
            <FaLessThan /> {sectionName}
          </span>
          <p>{sectionName}</p>
        </div>
        <div className={styles.CTA}>
          <p className={styles.btnDark}>Cancel</p>
          <p className={styles.btn}>Next</p>
        </div>
      </div>
    );
  }
}

export default Pagebar;
