const db = require('../database');  // Import the database connection
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log('DB object:', db);  // Add this line to check the db object

exports.signup = (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

    db.run(query, [username, email, hashedPassword], function (err) {
        if (err) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const token = jwt.sign({ id: this.lastID }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ token });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    console.log('Login request received:', email, password);  // Debug log

    const query = `SELECT * FROM users WHERE email = ?`;

    db.get(query, [email], (err, user) => {
        if (err) {
            console.error('Database error:', err);  // Debug log
            return res.status(500).json({ message: 'Database error' });
        }

        if (!user) {
            console.log('User not found');  // Debug log
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');  // Debug log
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    });
};
