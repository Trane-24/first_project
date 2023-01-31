const auth = require('../controllers/admin/auth.js');
const clientAuth = require('../controllers/client/auth.js');

module.exports = (app) => {
  app.post('/api/admin/auth/login', auth.login);

  app.post('/api/client/auth/login', clientAuth.login);
  app.post('/api/client/auth/registration', clientAuth.registration);
};
