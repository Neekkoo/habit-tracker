import React, { useState, useEffect } from 'react';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [username, setUsername] = useState('');

    const handleAuthSuccess = (username) => {
        setUsername(username);
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
        setIsModalOpen(true);
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            setIsModalOpen(false);
        }
    }, []);

    return (
        <div className="App">
            {isModalOpen ? (
                <AuthModal isOpen={isModalOpen} onAuthSuccess={handleAuthSuccess} />
            ) : (
                <div>
                    <h1>Welcome to Habit Tracker</h1>
                    <h2>Welcome back, {username}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default App;
