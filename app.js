require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/users');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

mongoose.connect('mongodb://127.0.0.1/mestodb ', {
  useNewUrlParser: true,
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
