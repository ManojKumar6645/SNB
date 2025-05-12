const express = require('express');
const { registerUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/', registerUser);  // POST /api/users
router.get('/', getAllUsers);    // GET /api/users

module.exports = router;
