// src/App.js
import React, { useState } from 'react';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="App">
            <AuthModal isOpen={isModalOpen} onClose={closeModal} />
            {!isModalOpen && (
                <div>
                    <h1>Welcome to Habit Tracker</h1>
                </div>
            )}
        </div>
    );
}

export default App;
