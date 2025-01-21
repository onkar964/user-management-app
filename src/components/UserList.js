// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = "https://jsonplaceholder.typicode.com/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]); // Add to state
    navigate("/");
  };

  const editUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    navigate("/");
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <Link to="/add">Add User</Link>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(' ')[0]}</td>
              <td>{user.name.split(' ')[1]}</td>
              <td>{user.email}</td>
              <td>{user.department || 'N/A'}</td>
              <td>
                <Link to={`/edit/${user.id}`} state={{ user }}>Edit</Link>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
