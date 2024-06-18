const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const userExistsQuery = 'SELECT * FROM users WHERE email = ?';
        db.get(userExistsQuery, [email], (err, row) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (row) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ message: 'Error hashing password' });
                }

                // Insert new user
                const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
                db.run(insertUserQuery, [username, email, hashedPassword], function (err) {
                    if (err) {
                        return res.status(500).json({ message: 'Database error' });
                    }

                    // Generate token
                    const token = jwt.sign({ id: this.lastID }, 'your_jwt_secret', { expiresIn: '1h' });
                    res.status(201).json({ token });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    try {
        const userQuery = 'SELECT * FROM users WHERE email = ?';
        db.get(userQuery, [email], (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Compare passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: 'Error comparing passwords' });
                }
                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }

                // Generate token
                const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
                res.status(200).json({ token });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
