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
  'localhost:3000', 'localhost:3001',
];

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
app.use(cookieParser());
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://pavel.student.nomoredomainsrocks.ru',
  'https://api.pavel.student.nomoredomainsrocks.ru',
  'http://pavel.student.nomoredomainsrocks.ru',
  'http://api.pavel.student.nomoredomainsrocks.ru',
  'localhost:3000', 'localhost:3001',
];

app.use(cors(corsOptions));

function z(req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    // res.header('Access-Control-Allow-Origin', '*');
  }
  next();
}

app.use(z);

// app.use(cors());
// app.use(cors({
//   origin:
//     [
//       'https://pavel.student.nomoredomainsrocks.ru',
//       'https://api.pavel.student.nomoredomainsrocks.ru',
//       'http://pavel.student.nomoredomainsrocks.ru',
//       'http://api.pavel.student.nomoredomainsrocks.ru',
//       'localhost:3000', 'localhost:3001',
//     ],
//   credentials: true,
// }));

app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(express.json());
console.log(2);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
console.log(3);
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
console.log(1);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
