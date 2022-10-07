const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/admin/auth.routes');
const clientAuthRouter = require('./routes/client/auth.routes');
const usersRouter = require('./routes/admin/users.routes');
const hotelsRouter = require('./routes/admin/hotels.routes');
const reservationsRouter = require('./routes/admin/reservations.routes');
const assetsRouter = require('./routes/admin/assets.routes');
const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const corsMiddleware = require('./middlewares/cors.middleware');

app.use(corsMiddleware)
app.use('/assets', express.static('assets'));
app.use(express.json());
app.use('/api/admin/auth', authRouter);
app.use('/api/client/auth', clientAuthRouter);
app.use('/api/admin/users', usersRouter);
app.use('/api/admin/hotels', hotelsRouter);
app.use('/api/admin/reservations', reservationsRouter);
app.use('/api/admin/assets', assetsRouter);

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
