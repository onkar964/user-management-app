// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const API_URL = "https://jsonplaceholder.typicode.com/users";

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || { name: '', email: '', department: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${API_URL}/${id}`, user);
      } else {
        await axios.post(API_URL, user);
      }
      navigate('/');
    } catch (err) {
      setError("Failed to save user");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Full Name:</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Department:</label>
        <input type="text" name="department" value={user.department} onChange={handleChange} required />
      </div>
      <button type="submit">{id ? 'Update' : 'Add'} User</button>
    </form>
  );
};

export default UserForm;
