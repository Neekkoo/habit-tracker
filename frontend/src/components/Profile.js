import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = ({ username }) => {
    const [newUsername, setNewUsername] = useState(username);
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const backendUrl = 'http://localhost:5000';

        try {
            const token = localStorage.getItem('token');
            await axios.put(`${backendUrl}/api/user/update`, {
                username: newUsername,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Profile updated successfully!');
            localStorage.setItem('username', newUsername);
        } catch (error) {
            setMessage('Error updating profile. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Update Profile</h1>
            <form onSubmit={handleUpdate}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingUsername"
                        placeholder="Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingUsername">Username</label>
                </div>
                <button className="btn btn-primary" type="submit">Update</button>
                {message && <p className="mt-3">{message}</p>}
            </form>
        </div>
    );
};

export default Profile;
