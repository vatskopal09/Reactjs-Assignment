import React, { useState, useEffect } from 'react';
import './index.css';

const Form = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [isAttendingWithGuest, setIsAttendingWithGuest] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    if (isAttendingWithGuest && !guestName) {
      setErrors((prevErrors) => ({ ...prevErrors, guestName: 'Required' }));
    }
  }, [isAttendingWithGuest, guestName]);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleIsAttendingWithGuestChange = (e) => {
    setIsAttendingWithGuest(e.target.value === 'Yes');
  };

  const handleGuestNameChange = (e) => {
    setGuestName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!fullName) {
      errors.fullName = 'Required';
    }

    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Invalid email';
    }

    if (!age || isNaN(age) || parseInt(age, 10) <= 0) {
      errors.age = 'Invalid age';
    }

    if (isAttendingWithGuest && !guestName) {
      errors.guestName = 'Required';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      setSummary({
        fullName,
        email,
        age,
        isAttendingWithGuest,
        guestName: isAttendingWithGuest ? guestName : '',
      });
    }
  };

  return (
    <div className="container">
      {submitted ? (
        <div className="summary">
          <h2>Summary</h2>
          <ul>
            <li>Full Name: {summary.fullName}</li>
            <li>Email: {summary.email}</li>
            <li>Age: {summary.age}</li>
            {summary.isAttendingWithGuest && (
              <li>Guest Name: {summary.guestName}</li>
            )}
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <h2>Registration Form</h2>
          <label>
            Full Name:
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              placeholder="Enter your full name"
              className="form-input"
            />
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="form-input"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </label>

          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={handleAgeChange}
              placeholder="Enter your age"
              className="form-input"
            />
            {errors.age && <div className="error">{errors.age}</div>}
          </label>

          <label>
            Are you attending with a guest?
            <select
              value={isAttendingWithGuest ? 'Yes' : 'No'}
              onChange={handleIsAttendingWithGuestChange}
              className="form-input"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </label>

          {isAttendingWithGuest && (
            <label>
              Guest Name:
              <input
                type="text"
                value={guestName}
                onChange={handleGuestNameChange}
                placeholder="Enter your guest's name"
                className="form-input"
              />
              {errors.guestName && <div className="error">{errors.guestName}</div>}
            </label>
          )}

          <button type="submit" className="submit-btn">
            Submit
         </button>
        </form>
      )}
    </div>
  );
};

export default Form;