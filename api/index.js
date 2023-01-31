const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
const PORT = process.env.PORT || config.get('serverPort');
// Middlewares
const corsMiddleware = require('../api/middlewares/cors.middleware');
// Swager
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/admin.json');

app.use(corsMiddleware)
app.use(express.json());

const server = http.createServer(app);

// Routes
require('./routes/auth.js')(app);
require('./routes/users.js')(app);
require('./routes/reservations.js')(app);
require('./routes/hotelTypes.js')(app);
require('./routes/hotels.js')(app);
require('./routes/assets.js')(app);
require('./routes/helpdesk.js')(app);

require('./ws')(server);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'))
    server.listen(PORT, () => {
      console.log(`Server started on ${PORT} port`);
    });
  } catch (e) {
    console.log(e)
  }
}

start();
