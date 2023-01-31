const users = require('../controllers/admin/users.js');
const clientUsers = require('../controllers/client/users.js');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = (app) => {
  app.get('/api/admin/users/fetchMe', authMiddleware, users.getMe);
  app.get('/api/admin/users', authMiddleware, users.get);
  app.get('/api/admin/users/:id', authMiddleware, users.getOne);
  app.post('/api/admin/users', authMiddleware, users.post);
  app.put('/api/admin/users/:id', authMiddleware, users.put);
  app.delete('/api/admin/users/:id', authMiddleware, users.delete);

  app.get('/api/client/users/me', authMiddleware, clientUsers.getMe);
  app.put('/api/client/users/me', authMiddleware, clientUsers.putMe);
};
