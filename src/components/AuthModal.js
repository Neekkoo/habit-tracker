// src/components/AuthModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './AuthModal.css';

Modal.setAppElement('#root');

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" required />
                </div>
                {isLogin ? (
                    <button type="submit">Login</button>
                ) : (
                    <>
                        <div>
                            <label>Confirm Password</label>
                            <input type="password" required />
                        </div>
                        <button type="submit">Sign Up</button>
                    </>
                )}
            </form>
            <button onClick={handleSwitch}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
        </Modal>
    );
};

export default AuthModal;
