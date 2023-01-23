const ws = require('ws');
const config = require('config');
const jwt = require('jsonwebtoken');
// Models
const User = require('./models/User');
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');

const clients = [];

const wss = new ws.Server({ port: 5001 }, () => console.log(`Websocket server started`));

wss.on('connection', async (ws, request) => {
  const token = request.url.replace('/?token=', '');
  const decoded = jwt.verify(token, config.get('secretKey'));
  const user = await User.findOne({ _id: decoded.id }, 'firstName lastName role');
  if (user) {
    clients.push({ ...user._doc, ws });
  }

  ws.on('message', async (messageOutput) => {
    const { event, message, fromUser, clientId:_clientId } = JSON.parse(messageOutput);
    const clientId = _clientId ? _clientId : fromUser;

    switch (event) {
      case 'message': 
        const conversation = await Conversation.findOne({ client: clientId });

        if (!conversation) {
          const newConversation = new Conversation({
            client: clientId,
            message,
            read: false,
          })
          
          await newConversation.save();
        } else {
          await conversation.update({
            message,
            read: false,
          });
        }

        const msg = new Message({
          message,
          fromUser,
          clientId,
          read: false,
        });

        await msg.save()
          .then(data => data.populate('fromUser', 'firstName lastName'))
          .then(data => sendMessages({...data._doc, event}))
        break;
      default:
        break;
    }
  })
})

function sendMessages(message) {
  clients.filter(client => {
    const messageClientId = JSON.stringify(message.clientId);
    const clientId = JSON.stringify(client._id);
    const senderId = JSON.stringify(message.fromUser._id)
    return client.role === 'admin' || clientId === senderId || clientId === messageClientId
  }).forEach((cl) => {
    cl.ws.send(JSON.stringify(message))
  })
}

module.exports = wss;
