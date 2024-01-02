import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri'; // Import icons
import { RiHomeLine, RiUser3Line, RiSettings3Line } from 'react-icons/ri';
import { MdEditCalendar } from 'react-icons/md';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({
    planning: true,
    attendees: false,
    settings: false,
  }); // State for open sections

  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.sidebarLink}>
          <span className={styles.icon}>
            <RiHomeLine />
          </span>
          <span className={styles.text}>Home</span>
        </div>
        <hr />
        <div
          className={styles.sidebarLink}
          onClick={() => toggleSection('planning')}
        >
          <span className={styles.icon}>
            <MdEditCalendar />
          </span>
          <span className={styles.text}>Planning</span>
          {openSections.planning ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
        </div>
        {openSections.planning && (
          <ul className={styles.nestedItems}>
            <li>Sessions</li>
            <li>Venues</li>
          </ul>
        )}
        <hr />
        <div
          className={styles.sidebarLink}
          onClick={() => toggleSection('attendees')}
        >
          <span className={styles.icon}>
            <RiUser3Line />
          </span>
          <span className={styles.text}>Attendees</span>
          {openSections.attendees ? (
            <RiArrowDownSLine />
          ) : (
            <RiArrowRightSLine />
          )}
        </div>
        <hr />
        <div
          className={styles.sidebarLink}
          onClick={() => toggleSection('settings')}
        >
          <span className={styles.icon}>
            <RiSettings3Line />
          </span>
          <span className={styles.text}>Settings</span>
          {openSections.settings ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
        </div>
        <hr />
      </div>
      <div className={styles.bottom}>
        <p>Powered By Evently</p>
        <p>V 3.0.1</p>
      </div>
    </div>
  );
};

export default Sidebar;
