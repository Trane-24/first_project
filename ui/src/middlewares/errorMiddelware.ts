import { appActions } from "store/app/appSlice";
import { v4 as uuid } from "uuid";

const errorMiddleware = ({ dispatch }: any) => (next: any) => (action: any) => {
  const { type, payload } = action;
  if (type.endsWith('/rejected')) {
    dispatch(appActions.enqueueSnackbar({
      key: uuid(),
      message: payload?.message || 'Server error'
    }))
  }

  return next(action);
}

export default errorMiddleware;
