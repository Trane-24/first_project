const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const hotelsRouter = require('./routes/hotels.routes');
const app = express();
const PORT = config.get('serverPort');
const corsMiddleware = require('./middlewares/cors.middleware');

app.use(corsMiddleware)
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'))
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port`);
    })
  } catch (e) {

  }
}

start();
