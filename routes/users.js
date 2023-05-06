const router = require('express').Router();

const {
  getAllUsers,
  createUser,
  getCurrentUser,
  // getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/me', getCurrentUser);
// router.get('/:userId', getUserById);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
