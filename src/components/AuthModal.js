// src/components/AuthModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './AuthModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement('#root');

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={`ReactModal__Content ${isLogin ? 'login-modal' : 'signup-modal'}`}
            overlayClassName="ReactModal__Overlay"
            shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h5 className="modal-title">{isLogin ? 'Login' : 'Sign Up'}</h5>
                </div>
                <div className="modal-body">
                    {isLogin ? (
                        <form className="needs-validation" noValidate>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingUsername" placeholder="username" required />
                                <label htmlFor="floatingUsername">Username</label>
                                <div className="invalid-feedback">
                                    Please enter your username.
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                                <label htmlFor="floatingPassword">Password</label>
                                <div className="invalid-feedback">
                                    Please enter your password.
                                </div>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary" type="submit">Login</button>
                            </div>
                        </form>
                    ) : (
                        <form className="needs-validation" noValidate>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingUsername" placeholder="username" required />
                                <label htmlFor="floatingUsername">Username</label>
                                <div className="invalid-feedback">
                                    Please enter your username.
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" required />
                                <label htmlFor="floatingEmail">Email address</label>
                                <div className="invalid-feedback">
                                    Please enter a valid email address.
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                                <label htmlFor="floatingPassword">Password</label>
                                <div className="invalid-feedback">
                                    Please enter your password.
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPasswordConfirm" placeholder="Password" required />
                                <label htmlFor="floatingPasswordConfirm">Confirm Password</label>
                                <div className="invalid-feedback">
                                    Please confirm your password.
                                </div>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary" type="submit">Sign Up</button>
                            </div>
                        </form>
                    )}
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
