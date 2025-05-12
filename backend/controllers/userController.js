const db = require('../config/db.js');


// Register user
exports.registerUser = (req, res) => {
    const { username, email, mobile_number, address, password } = req.body;

    // SQL query to insert a new user
    const query = `INSERT INTO users (username, email, mobile_number, address, password) 
                 VALUES (?, ?, ?, ?, ?)`;

    db.execute(query, [username, email, mobile_number, address, password], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
};

// Get all users
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users';

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Error fetching users' });
        }
        res.json(results);
    });
};
