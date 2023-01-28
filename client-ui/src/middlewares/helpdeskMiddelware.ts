import StorageService from "services/StorageService";
import { helpdeskActions } from "store/helpdesk/helpdeskSlice";

const helpdeskMiddleware = ({ dispatch, getState}: any) => {
  let ws: WebSocket | null = null;

  return (next: any) => (action: any) => {
    const { type, payload } = action;
  
    const { currentUser } = getState().users;
  
    if (type === 'helpdesk/connect') {
      ws = new WebSocket(`ws://localhost:5001?token=${StorageService.getToken()}`);
  
      ws.onmessage = (message: any) => {
        dispatch(helpdeskActions.addMessage(JSON.parse(message.data)))
      }
    }

    if (type === 'helpdesk/disconnect') {
      ws?.close();
      ws = null;
    }
  
    if (type === 'helpdesk/sendMessage') {
      ws?.send(JSON.stringify({ ...payload, event: 'message', fromUser: currentUser._id }));
    }
  
    return next(action);
  }
}

export default helpdeskMiddleware;
