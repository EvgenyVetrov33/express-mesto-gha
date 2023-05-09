const router = require('express').Router();

const {
  getAllUsers,
  createUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/users/:userId', getCurrentUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
