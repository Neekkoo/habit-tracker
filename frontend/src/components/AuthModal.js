import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AuthModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement('#root');

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSwitch = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendUrl = 'http://localhost:5000';
    
        try {
            if (isLogin) {
                const response = await axios.post(`${backendUrl}/api/user/login`, {
                    username, // Use username instead of email
                    password
                });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.user.username);
                onAuthSuccess(response.data.user.username);
                setError('');
                onClose();
            } else {
                if (password !== passwordConfirm) {
                    setError('Passwords do not match');
                    return;
                }
                const response = await axios.post(`${backendUrl}/api/user/signup`, {
                    username,
                    email,
                    password
                });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.user.username);
                onAuthSuccess(response.data.user.username);
                setSuccess('Account created successfully!');
                setError('');
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
            setSuccess('');
            console.error(error);
        }
    };
    

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={`ReactModal__Content ${isLogin ? 'login-modal' : 'signup-modal'}`}
            overlayClassName="ReactModal__Overlay"
            shouldCloseOnOverlayClick={false}
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h5 className="modal-title">{isLogin ? 'Login' : 'Sign Up'}</h5>
                </div>
                <div className="modal-body">
                    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingUsername"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingUsername">Username</label>
                            <div className="invalid-feedback">
                                Please enter your username.
                            </div>
                        </div>
                        {!isLogin && (
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingEmail"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="floatingEmail">Email address</label>
                                <div className="invalid-feedback">
                                    Please enter a valid email address.
                                </div>
                            </div>
                        )}
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingPassword">Password</label>
                            <div className="invalid-feedback">
                                Please enter your password.
                            </div>
                        </div>
                        {!isLogin && (
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPasswordConfirm"
                                    placeholder="Password"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    required
                                />
                                <label htmlFor="floatingPasswordConfirm">Confirm Password</label>
                                <div className="invalid-feedback">
                                    Please confirm your password.
                                </div>
                            </div>
                        )}
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <div className="d-grid">
                            <button className="btn btn-primary" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button onClick={handleSwitch} className="btn btn-link">
                        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AuthModal;
