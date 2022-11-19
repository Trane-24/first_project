const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/admin/auth.routes');
const clientAuthRouter = require('./routes/client/auth.routes');
const usersRouter = require('./routes/admin/users.routes');
const clientUsersRouter = require('./routes/client/users.routes');
const hotelsRouter = require('./routes/admin/hotels.routes');
const clientHotelsRouter = require('./routes/client/hotels.routes');
const reservationsRouter = require('./routes/admin/reservations.routes');
const clientReservationsRouter = require('./routes/client/reservations.routes');
const assetsRouter = require('./routes/admin/assets.routes');
const clientAssetsRouter = require('./routes/client/assets.routes');
const helpdeskRouter = require('./routes/admin/helpdesk.routes');
const clientHelpdeskRouter = require('./routes/client/helpdesk.routes');
const hotelTypesRouter = require('./routes/admin/hotelTypes.routes');
const clientHotelTypesRouter = require('./routes/client/hotelTypes.routes');
const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const corsMiddleware = require('./middlewares/cors.middleware');
const ws = require('ws');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/client.json');
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
    const wss = new ws.Server({ port: 5001 }, () => console.log(`Websocket server started`));
    wss.on('connection', (ws) => {
      ws.on('message', (messageOutput) => {
        console.log(JSON.parse(messageOutput));
        const { event, message, userId, clientId } = JSON.parse(messageOutput);
        switch (event) {
          case 'message': 
            sendMessages(JSON.parse(messageOutput))
            break;
          default:
            break;
        }
      })
    })

    function sendMessages(message) {
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
      })
    }
  } catch (e) {

  }
}

start();
