import React from 'react';

const LandingPage = ({ username }) => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Welcome to the Habit Tracker</h1>
            {username && <p className="lead">Welcome back, {username}!</p>}
            <p className="lead">Track your habits and improve your productivity!</p>
        </div>
    );
};

export default LandingPage;
