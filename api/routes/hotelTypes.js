const hotelTypes = require('../controllers/admin/hotelTypes.js');
const clientHotelTypes = require('../controllers/client/hotelTypes.js');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = (app) => {
  app.get('/api/admin/hotelTypes', authMiddleware, hotelTypes.get);
  app.get('/api/admin/hotelTypes/:id', authMiddleware, hotelTypes.getOne);
  app.post('/api/admin/hotelTypes', authMiddleware, hotelTypes.post);
  app.put('/api/admin/hotelTypes/:id', authMiddleware, hotelTypes.put);
  app.delete('/api/admin/hotelTypes/:id', authMiddleware, hotelTypes.delete);

  app.get('/api/client/hotelTypes', clientHotelTypes.get);
};
