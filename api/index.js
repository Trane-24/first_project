const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const hotelsRouter = require('./routes/hotels.routes');
const reservationsRouter = require('./routes/reservations.routes');
const assetsRouter = require('./routes/assets.routes');
const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const corsMiddleware = require('./middlewares/cors.middleware');

app.use(corsMiddleware)
app.use('/assets', express.static('assets'));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/assets', assetsRouter);

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
