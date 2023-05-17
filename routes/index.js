const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateSignUp, validateSignIn } = require('../middlewares/validations');
const { createUser, login } = require('../controllers/users');
const { NotFoundError } = require('../errors/index-errors');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);

router.use('/', auth, userRoutes);
router.use('/', auth, cardRoutes);

router.use('/*', auth, () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
