import StorageService from "services/StorageService";
import { helpdeskActions } from "store/helpdesk/helpdeskSlice";

const actions = ['helpdesk/startConnecting', 'helpdesk/sendMessage'];
// enum action {
//   connect = 'helpdesk/startConnecting',
//   send = 'helpdesk/sendMessage',
// }
let ws: WebSocket | undefined;

const wsMiddleware = ({ dispatch, getState}: any) => (next: any) => (action: any) => {
  const { type, payload } = action;

  if (!actions.includes(type)) {
    return next(action);
  }

  const state = getState();
  const token = StorageService.getToken();
  const currentUser = state.users.currentUser;

  const sendMessage = () => {
    const dataMessage = { message: payload, event: 'message', fromUser: currentUser._id};

    ws?.send(JSON.stringify(dataMessage));
  }

  switch (type) {
    case 'helpdesk/startConnecting':
      ws = new WebSocket(`ws://localhost:5001?token=${token}`);
      break;
    case 'helpdesk/sendMessage':
      sendMessage();
      break;
  }

  if (ws === undefined) {
    return next(action);
  }

  ws.onmessage = (message: any) => {
    console.log('ws.onmessage', JSON.parse(message.data));
    dispatch(helpdeskActions.addMessage(JSON.parse(message.data)))
  }

  return next(action);
}

export default wsMiddleware;