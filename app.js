const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');
const router = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb ', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6457b0eaf5d12c76611540ec',
  };

  next();
});

app.use('/', router);
app.use((req, res) => {
  res.status(404).send({ message: 'Извините, не могу найти!' });
});
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
