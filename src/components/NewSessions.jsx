import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker'; // For date picking
import 'react-datepicker/dist/react-datepicker.css';
import styles from './NewSessions.module.scss';
import { FiUploadCloud } from 'react-icons/fi';
import { FaLessThan } from 'react-icons/fa6';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const NewSessions = ({ toggleSessions }) => {
  const formRef = useRef(null);

  // ==================== DAte ====================

  const [selectedUser, setSelectedUser] = useState();
  const [selectedModerator, setSelectedModerator] = useState();

  // const inputRef = useRef(null);
  // ==================== Init Form Data ====================
  const initialFormData = useState({
    speaker_ids: [],
    moderator_ids: [],
    title: '',
    subtitle: '',
    description: '',
    cover_image: '',
    date: '',
    from: '',
    till: '',
    event_id: '',
  });
  const [formData, setFormData] = useState({
    speaker_ids: [],
    moderator_ids: [],
    title: '',
    subtitle: '',
    description: '',
    cover_image: '',
    date: '',
    from: '',
    till: '',
    event_id: '',
  });

  // ==================== Handel Change ====================

  const handleChange = (e, time) => {
    const { name, value, type, files } = e.target;

    setSelectedUser(usersData.find((user) => user.id == formData.speaker_ids));
    setSelectedModerator(
      usersData.find((user) => user.id == formData.moderator_ids)
    );

    // Array
    if (name === 'speaker_ids' || name === 'moderator_ids') {
      // If handling speaker_ids or moderator_ids
      const idsArray = Array.isArray(value) ? value : [value]; // Ensure it's an array
      setFormData((prevData) => ({
        ...prevData,
        [name]: idsArray,
      }));
      // Handle file uploads (thumbnail)
    } else if (type === 'file' && files && files.length > 0) {
      const file = files[0]; // Assuming you are dealing with the first file selected
      setFormData((prevData) => ({
        ...prevData,
        [name]: file instanceof Blob ? file : null, // Ensure it's a Blob or File object
      }));
    } else if (time) {
      // Handle time changes
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedTime,
      }));
    } else {
      // Handle other inputs
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'file' ? files[0] : value, // Update state with file or value
      }));
    }
    console.log(formData);
  };

  // ==================== API Users Data ====================
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token =
        'eyJhbGciOiJSUzI1NiJ9.eyJpZCI6MzAzLCJ0eXBlIjoidXNlciIsInJhbiI6IkJORU5WSVBOTlFUWVBMS0tVQ0JWIiwic3RhdHVzIjoxfQ.YGV-jGKZj1Lp4SqlM3aiF6Aov6YVF6lZRMpKvx_Zdrpjj4C1zE-JSTKtjVboQ9de58TUViyVOc4JwiktjF_4yxnYzIrw449s584j2GiqUpxfp6OPmfAj8BAbfN_M4RoU5PXEjhcNVh5uNRtxtvxZtpECrl72_22T4he3LbqISMNHzVh5eprIKIFLt_pM7cyRKt3Njf8I89CLnq5nUpiDHnMMForamKq9jubmiYPOHpFvijEE3-jusRk0F1T32zMY_0AELXnpqhbbx6HtmMdxBahnrUNyznacdVwaSrNus8vX01N8zEcfRvkRzYuqjnZXr9jrm2iriHq80iicUG99GQ';
      const apiUrl =
        'https://qa-testing-backend-293b1363694d.herokuapp.com/api/v3/get-users?event_id=19';

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsersData(response.data.users); // Assuming users are in a nested array
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);
  const venues = ['Venue A', 'Venue B'];
  // const [venues, setVenues] = useState(['Venue A', 'Venue B']); // Sample list of venues

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://qa-testing-backend-293b1363694d.herokuapp.com/api/v3/create-sessions',
        formData,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpZCI6MzAzLCJ0eXBlIjoidXNlciIsInJhbiI6IkJORU5WSVBOTlFUWVBMS0tVQ0JWIiwic3RhdHVzIjoxfQ.YGV-jGKZj1Lp4SqlM3aiF6Aov6YVF6lZRMpKvx_Zdrpjj4C1zE-JSTKtjVboQ9de58TUViyVOc4JwiktjF_4yxnYzIrw449s584j2GiqUpxfp6OPmfAj8BAbfN_M4RoU5PXEjhcNVh5uNRtxtvxZtpECrl72_22T4he3LbqISMNHzVh5eprIKIFLt_pM7cyRKt3Njf8I89CLnq5nUpiDHnMMForamKq9jubmiYPOHpFvijEE3-jusRk0F1T32zMY_0AELXnpqhbbx6HtmMdxBahnrUNyznacdVwaSrNus8vX01N8zEcfRvkRzYuqjnZXr9jrm2iriHq80iicUG99GQ',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Form data sent:', response.data); // Log the response data if needed

      setFormData(initialFormData);
    } catch (error) {
      console.error('Error posting form data:', error);
      // Handle error if the POST request fails
    }
  };

  return (
    <>
      {/* ================ Start Page Navbar ================ */}
      {/* Left Side */}
      <div className={styles.pagebar}>
        <div className={styles.sectionName}>
          <span className={styles.return} onClick={toggleSessions}>
            <FaLessThan /> All Sessions
          </span>
          <p>New Sessions</p>
        </div>
        {/* Right Side */}
        <div className={styles.CTA}>
          <p className={styles.btnDark} onClick={toggleSessions}>
            Cancel
          </p>
          <button
            type="submit"
            form={formRef} // Submit Btn
            onClick={handleSubmit}
            className={styles.btn}
          >
            Next
          </button>
        </div>
      </div>
      {/* ================ End Page Navbar ================ */}
      {/* ================ Start Form Content =============== */}
      <div className={styles.newSession}>
        <form onSubmit={handleSubmit} ref={formRef}>
          <label className={styles.field} htmlFor="title">
            <p htmlFor="title">
              Session Title:<span>*</span>
            </p>
            <input
              type="text"
              name="title"
              value={formData.sessionTitle}
              onChange={handleChange}
              placeholder="Start Typing..."
            />
          </label>
          <label className={styles.field}>
            <p>
              Session Subtitle:<span>*</span>
            </p>
            <input
              type="text"
              name="subtitle"
              value={formData.sessionSubtitle}
              onChange={handleChange}
              placeholder="Start Typing..."
            />
          </label>
          <label className={styles.customFileUpload}>
            <input
              type="file"
              name="cover_image"
              accept=".svg,.png,.jpg,.gif"
              onChange={handleChange}
            />
            <span>
              {formData.cover_image ? (
                <div>
                  <img src={URL.createObjectURL(formData.cover_image)} alt="" />
                </div>
              ) : (
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
              <DatePicker
                // showTimeSelectOnly
                selected={formData.date}
                onChange={(time) =>
                  setFormData((prevData) => ({ ...prevData, date: time }))
                }
                name="date"
                className={styles.timePicker}
                // dateFormat="HH:mm" // Display format in the DatePicker component
              />
            </label>
            <label className={styles.input25}>
              from:
              <DatePicker
                showTimeSelect
                showTimeSelectOnly
                selected={formData.from}
                onChange={(time) =>
                  setFormData((prevData) => ({ ...prevData, from: time }))
                }
                name="from"
                className={styles.timePicker}
                dateFormat="HH:mm" // Display format in the DatePicker component
              />
            </label>
            <label className={styles.input25}>
              Till:
              <DatePicker
                showTimeSelect
                showTimeSelectOnly
                selected={formData.till}
                onChange={(time) =>
                  setFormData((prevData) => ({ ...prevData, till: time }))
                }
                name="till"
                className={styles.timePicker}
                dateFormat="HH:mm" // Display format in the DatePicker component
              />
            </label>
          </div>
          <hr />
          <label className={styles.field} htmlFor="description">
            <p>
              Description:<span>*</span>
            </p>
            <textarea
              type="text"
              name="description"
              value={formData.sessionTitle}
              onChange={handleChange}
              placeholder="Type details"
              rows="4"
              colu="true"
            ></textarea>
          </label>
          <label className={styles.field}>
            <p>
              Speaker<span>*</span>
            </p>
            <select
              name="speaker_ids"
              value={formData.speaker_ids}
              onChange={handleChange}
            >
              <option
                className={styles.placeholder}
                value="" // Ensure the default value matches an existing option value
                disabled
                hidden
              >
                Select
              </option>
              {usersData.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name}
                </option>
              ))}
            </select>
          </label>
          {selectedUser ? (
            <div className={styles.field}>
              <div>
                <div className={styles.userSelected}>
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt="user" />
                  ) : (
                    <img src="/img/ellipse-7.png" alt="user" />
                  )}

                  <p>{selectedUser.first_name}</p>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          {/* <br /> */}
          <label className={styles.field}>
            <p>
              Moderator<span>*</span>
            </p>

            <select
              name="moderator_ids"
              value={formData.moderator_ids}
              onChange={handleChange}
            >
              <option
                className={styles.placeholder}
                value=""
                disabled
                selected
                hidden
              >
                Select
              </option>
              {usersData.map((user, index) => (
                <option key={index} value={user.id}>
                  {user.first_name}
                </option>
              ))}
            </select>
          </label>
          {selectedModerator ? (
            <div className={styles.field}>
              <div>
                <div className={styles.userSelected}>
                  {selectedModerator.avatar ? (
                    <img src={selectedModerator.avatar} alt="user" />
                  ) : (
                    <img src="/img/ellipse-7.png" alt="user" />
                  )}

                  <p>{selectedModerator.first_name}</p>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <hr />
          <label className={styles.field}>
            <p>
              Venue<span>*</span>
            </p>

            <select placeholder="select" name="" onChange={handleChange}>
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
          <label className={styles.field} htmlFor="event_id">
            <p htmlFor="event_id">
              Event Id:<span>*</span>
            </p>
            <input
              type="text"
              name="event_id"
              value={formData.event_id}
              onChange={handleChange}
              placeholder="Enter event_id..."
            />
          </label>
        </form>
      </div>
    </>
  );
};

export default NewSessions;
