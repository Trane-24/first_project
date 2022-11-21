import { helpdeskActions } from "store/helpdesk/helpdeskSlice";

let ws: any = null;

const messagesMiddelware = ({ dispatch, getState }: any) => (next: any) => (action: any) => {
  const { type, payload } = action;

  const { currentUser } = getState().users;

  if (type === 'helpdesk/connect') {
    ws = new WebSocket('ws://localhost:5001');
    ws.onmessage = (messageOutput: any) => {
      console.log(JSON.parse(messageOutput.data));
      const { event, ...message } = JSON.parse(messageOutput.data);
      switch (event) {
        case 'message':
          dispatch(helpdeskActions.addMessage(message));
          break;
        default:
          break;
      }
    }
  }

  if (type === 'helpdesk/disconnect') {
    if (!ws) return;
    ws.close();
  }

  if (type === 'helpdesk/sendMessage') {
    if (!ws) return;
    ws.send(JSON.stringify({ ...payload, event: 'message' }));
  }

  return next(action);
}

export default messagesMiddelware;
