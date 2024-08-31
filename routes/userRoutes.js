const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
