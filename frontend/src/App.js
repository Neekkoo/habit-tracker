import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthModal from './components/AuthModal';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
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
        <Router>
            <div className="App">
                <Header username={username} onLogout={handleLogout} />
                <AuthModal isOpen={isModalOpen} onClose={closeModal} onAuthSuccess={handleAuthSuccess} />
                {!isModalOpen && (
                    <Routes>
                        <Route path="/" element={<LandingPage username={username} />} />
                        <Route path="/profile" element={<Profile username={username} />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
