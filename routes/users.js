const router = require('express').Router();

const {
  getAllUsers,
  createUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/users/:usersId', getCurrentUser);

router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
