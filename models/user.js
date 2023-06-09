const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { urlRegex } = require('../utils/regex');
const { AuthError } = require('../errors/index-errors');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" -2'],
      maxlength: [30, 'Максимальная длина поля "name" -30'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля "about" -2'],
      maxlength: [30, 'Максимальная длина поля "about" -30'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(v) {
          return urlRegex.test(v);
        },
        message: (props) => `${props.value} -- невалидная ссылка на картинку`,
      },
    },
    email: {
      type: String,
      minlength: [2, 'Минимальная длина поля "email" -2'],
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Некорректный адрес почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
