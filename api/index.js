const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const ws = require('./ws');
const app = express();
const PORT = process.env.PORT || config.get('serverPort');
// Routes
const authRouter = require('../api/routes/admin/auth.routes');
const clientAuthRouter = require('../api/routes/client/auth.routes');
const usersRouter = require('../api/routes/admin/users.routes');
const clientUsersRouter = require('../api/routes/client/users.routes');
const hotelsRouter = require('../api/routes/admin/hotels.routes');
const clientHotelsRouter = require('../api/routes/client/hotels.routes');
const reservationsRouter = require('../api/routes/admin/reservations.routes');
const clientReservationsRouter = require('../api/routes/client/reservations.routes');
const assetsRouter = require('../api/routes/admin/assets.routes');
const clientAssetsRouter = require('../api/routes/client/assets.routes');
const helpdeskRouter = require('../api/routes/admin/helpdesk.routes');
const clientHelpdeskRouter = require('../api/routes/client/helpdesk.routes');
const hotelTypesRouter = require('../api/routes/admin/hotelTypes.routes');
const clientHotelTypesRouter = require('../api/routes/client/hotelTypes.routes');
// Middlewares
const corsMiddleware = require('../api/middlewares/cors.middleware');
// Swager
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../api/swagger/client.json');
// const swaggerDoc = require('./swagger/admin.json');

app.use(corsMiddleware)
app.use('/assets', express.static('assets'));
app.use(express.json());
app.use('/api/admin/auth', authRouter);
app.use('/api/client/auth', clientAuthRouter);
app.use('/api/admin/users', usersRouter);
app.use('/api/client/users', clientUsersRouter);
app.use('/api/admin/hotels', hotelsRouter);
app.use('/api/client/hotels', clientHotelsRouter);
app.use('/api/admin/reservations', reservationsRouter);
app.use('/api/client/reservations', clientReservationsRouter);
app.use('/api/admin/assets', assetsRouter);
app.use('/api/client/assets', clientAssetsRouter);
app.use('/api/admin/helpdesk', helpdeskRouter);
app.use('/api/client/helpdesk', clientHelpdeskRouter);
app.use('/api/admin/hotelTypes', hotelTypesRouter);
app.use('/api/client/hotelTypes', clientHotelTypesRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'))
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port`);
    });
  } catch (e) {
    console.log(e)
  }
}

start();
