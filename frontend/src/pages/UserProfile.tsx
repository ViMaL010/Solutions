import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../UserProfilePage.css';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Not logged in. Please try to login or signup.');
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setName(response.data.name);  // Set initial name and email
        setEmail(response.data.email);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Not logged in. Please try to login or signup.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/users/${id}`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      setEditing(false);  // Turn off editing mode
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while saving.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="profile-icon">
          <img src="https://via.placeholder.com/150" alt="Profile Icon" />
        </div>
        <div className="user-info">
          <h1>{user?.name}</h1>
          <p>Email: {user?.email}</p>
          <p>Admin: {user?.isAdmin ? 'Yes' : 'No'}</p>
        </div>
        {editing ? (
          <div className="edit-form">
            <div className="input-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button onClick={handleSave}>Save Changes</button>
          </div>
        ) : (
          <button onClick={handleEditToggle} className="edit-button">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
