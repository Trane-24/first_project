const hotels = require('../controllers/admin/hotels.js');
const clientHotels = require('../controllers/client/hotels.js');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = (app) => {
  app.get('/api/admin/hotels', authMiddleware, hotels.get);
  app.get('/api/admin/hotels/:id', authMiddleware, hotels.getOne);
  app.post('/api/admin/hotels', authMiddleware, hotels.post);
  app.put('/api/admin/hotels/:id', authMiddleware, hotels.put);
  app.delete('/api/admin/hotels/:id', authMiddleware, hotels.delete);
  app.put('/api/admin/hotels/:id/actions/markAsVerified', authMiddleware, hotels.markAsVerified);

  app.get('/api/client/hotels/search', clientHotels.search);
  app.get('/api/client/hotels/search/:id', clientHotels.searchById);
  app.get('/api/client/hotels/topHotels', clientHotels.topHotels);
  app.get('/api/client/hotels', authMiddleware, clientHotels.get);
  app.get('/api/client/hotels/:id', authMiddleware, clientHotels.getOne);
  app.post('/api/client/hotels', authMiddleware, clientHotels.post);
  app.put('/api/client/hotels/:id', authMiddleware, clientHotels.put);
  app.delete('/api/client/hotels/:id', authMiddleware, clientHotels.delete);
};
