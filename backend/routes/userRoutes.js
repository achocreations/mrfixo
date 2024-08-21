const express = require('express');
const { registerUser, login, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { validateUser, validateLogin } = require('../utils/validators');

const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', validateLogin, login);
router.get('/', getUsers);
router.get('/:id', getUser);
router.update('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
