const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const path = require('path');

const cors = require('cors');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoose = require('mongoose');

const httpStatusText = require('./utils/httpStatusText');

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: 'true',
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
//   .then(() => {
//     console.log('DB connection successfully');
//   });

app.use(cors());
app.use(express.json());

const coursesRouter = require('./routes/coursesRoute');
const usersRouter = require('./routes/UsersRoute');

app.use('/api/courses', coursesRouter); // /api/courses

app.use('/api/users', usersRouter); // /api/users

// global middleware for not found router
app.all('*', (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: 'this resource is not available',
  });
});

// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log('listening on port: 4000');
});
