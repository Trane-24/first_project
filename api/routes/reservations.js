const reservations = require('../controllers/admin/reservations.js');
const clientReservations = require('../controllers/client/reservations.js');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

module.exports = (app) => {
  app.get('/api/admin/reservations', authMiddleware, reservations.get);
  app.get('/api/admin/reservations/:id', authMiddleware, reservations.getOne);
  app.post('/api/admin/reservations', authMiddleware, reservations.post);
  app.put('/api/admin/reservations/:id', authMiddleware, reservations.put);
  app.delete('/api/admin/reservations/:id', authMiddleware, reservations.delete);

  app.get('/api/client/reservations', authMiddleware, clientReservations.get);
  app.post('/api/client/reservations', userMiddleware, clientReservations.post);
};
