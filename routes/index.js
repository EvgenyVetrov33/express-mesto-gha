const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { NotFoundError } = require('../errors/index-errors');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/', auth, userRoutes);
router.use('/', auth, cardRoutes);

router.use('/*', auth, () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
