require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const validation = require('./middlewares/validation');
const centralError = require('./middlewares/centralError');
const {
  NotFoundError,
} = require('./errors/index');

const { PORT = 3000 } = process.env;
const allowedOrigins = [
  'https://pavel.student.nomoredomainsrocks.ru',
  'https://api.pavel.student.nomoredomainsrocks.ru',
  'localhost:3000'
]
const corsOptions = {
  origin: allowedOrigins, // allowedOrigins,
  credentials: true, // Разрешить передачу учетных данных (куки)
};
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Успешное подключение к MongoDB');
  })
  .catch((error) => { console.error('Ошибка подключения к MongoDB:', error); });

const app = express();
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(express.json());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
app.post('/signin', validation.signUser, login);
app.post('/signup', validation.login, createUser);
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError(`Запрашиваемый ресурс по адресу ${req.path} не найден`));
});
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(centralError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
});
