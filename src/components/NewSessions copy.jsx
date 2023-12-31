import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker'; // For date picking
import 'react-datepicker/dist/react-datepicker.css';
import styles from './NewSessions.module.scss';
import { FiUploadCloud } from 'react-icons/fi';
import { FaLessThan } from 'react-icons/fa6';

const NewSessions = () => {
  const formRef = useRef(null);

  const initialFormData = {
    sessionTitle: '',
    sessionSubtitle: '',
    thumbnail: null,
    date: null,
    from: '',
    till: '',
    description: '',
    speaker: '',
    moderator: '',
    venue: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [thumbnail, setThumbnail] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Check if e.target exists and has the necessary properties
    if (e.target && e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setThumbnail(fileName);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const [speakers, setSpeakers] = useState(['Speaker A', 'Speaker B']); // Sample list of speakers
  const [moderators, setModerators] = useState(['Moderator A', 'Moderator B']); // Sample list of moderators
  const [venues, setVenues] = useState(['Venue A', 'Venue B']); // Sample list of venues

  const handleAddSpeaker = (event) => {
    const newSpeaker = event.target.value;
    setSpeakers([...speakers, newSpeaker]);
  };

  const handleAddModerator = (event) => {
    const newModerator = event.target.value;
    setModerators([...moderators, newModerator]);
  };

  const handleAddVenue = (event) => {
    const newVenue = event.target.value;
    setVenues([...venues, newVenue]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to post form data to the API
    // Reset form after submission

    setFormData(initialFormData);
  };

  return (
    <>
      <div className={styles.pagebar}>
        <div className={styles.sectionName}>
          <span className={styles.return}>
            <FaLessThan /> New Sessions
          </span>
          <p>New Sessions</p>
        </div>
        <div className={styles.CTA}>
          <p className={styles.btnDark}>Cancel</p>
          <button
            type="submit"
            form={formRef}
            onClick={handleSubmit}
            className={styles.btn}
          >
            Next
          </button>{' '}
        </div>
      </div>
      <div className={styles.newSession}>
        <form onSubmit={handleSubmit} ref={formRef}>
          <label className={styles.field} htmlFor="title">
            <p>
              Session Title:<span>*</span>
            </p>
            <input
              type="text"
              name="title"
              value={formData.sessionTitle}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.field}>
            <p>
              Session Subtitle:<span>*</span>
            </p>
            <input
              type="text"
              name="sessionSubtitle"
              value={formData.sessionSubtitle}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.customFileUpload}>
            <input
              type="file"
              accept=".svg,.png,.jpg,.gif"
              name="thumbnail"
              onChange={handleChange}
            />
            <span>
              {thumbnail || (
                <div>
                  <span className={styles.uploadIcon}>
                    <FiUploadCloud />
                  </span>
                  <span>
                    <b>Click to upload</b> or drag and drop
                  </span>
                  <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
                </div>
              )}
            </span>
          </label>
          <div className={styles.flexRow}>
            <label className={styles.input50}>
              Date:
              <DatePicker selected={formData.date} onChange={handleChange} />
            </label>
            <label className={styles.input25}>
              Date:
              <DatePicker selected={formData.date} onChange={handleChange} />
            </label>
            <label className={styles.input25}>
              Date:
              <DatePicker selected={formData.date} onChange={handleChange} />
            </label>
          </div>
          <hr />
          <label className={styles.field}>
            <p>
              Speaker<span>*</span>
            </p>
            <select onChange={handleAddSpeaker}>
              <option
                className={styles.placeholder}
                value=""
                disabled
                selected
                hidden
              >
                Select
              </option>
              {speakers.map((speaker, index) => (
                <option key={`speaker-${index}`} value={'speaker'}>
                  {speaker}
                </option>
              ))}
            </select>
          </label>
          {/* <br /> */}
          <label className={styles.field}>
            <p>
              Moderator<span>*</span>
            </p>

            <select onChange={handleAddModerator}>
              <option
                className={styles.placeholder}
                value=""
                disabled
                selected
                hidden
              >
                Select
              </option>
              {moderators.map((moderator, index) => (
                <option key={`moderator-${index}`} value={moderator}>
                  {moderator}
                </option>
              ))}
            </select>
          </label>
          <hr />
          <label className={styles.field}>
            <p>
              Venue<span>*</span>
            </p>

            <select onChange={handleAddVenue} aria-placeholder="select">
              <option
                className={styles.placeholder}
                value=""
                disabled
                selected
                hidden
              >
                Select
              </option>
              {venues.map((venue, index) => (
                <option key={`venue-${index}`} value={venue}>
                  {venue}
                </option>
              ))}
            </select>
          </label>
          {/* Add dropdowns for speaker, moderator, venue */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default NewSessions;
