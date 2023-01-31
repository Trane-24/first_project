const helpdesk = require('../controllers/admin/helpdesk.js');
const clientHelpdesk = require('../controllers/client/helpdesk.js');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = (app) => {
  app.get('/api/admin/helpdesk/conversations', authMiddleware, helpdesk.getConversations);
  app.get('/api/admin/helpdesk/messages/:id', authMiddleware, helpdesk.getMessages);
  app.put('/api/admin/helpdesk/messages/:id/actions/markAsRead', authMiddleware, helpdesk.markAsRead);

  app.get('/api/client/helpdesk/messages', authMiddleware, clientHelpdesk.get);
  app.put('/api/client/helpdesk/messages/actions/markAsRead', authMiddleware, clientHelpdesk.markAsRead);
};
