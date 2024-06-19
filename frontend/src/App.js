import React, { useState, useEffect } from 'react';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [username, setUsername] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAuthSuccess = (username) => {
        setUsername(username);
        setIsModalOpen(false);
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
            <AuthModal isOpen={isModalOpen} onClose={closeModal} onAuthSuccess={handleAuthSuccess} />
            {!isModalOpen && (
                <div>
                    <h1>Welcome to Habit Tracker</h1>
                    <h2>Welcome back, {username}!</h2>
                </div>
            )}
        </div>
    );
}

export default App;
