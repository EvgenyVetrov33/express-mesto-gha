const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb ', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routerUser);
app.use('/:userId', routerUser);

app.use('./cards', routerCard);

app.use((req, res, next) => {
  req.user = {
    _id: '64564330e064d0aac2351391',
  };

  next();
});

app.use((req, res) => {
  res.status(404).send({ message: 'Извините, не могу найти!' });
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
