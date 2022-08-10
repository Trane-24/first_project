import { appActions } from "store/app/appSlice";
import { v4 as uuid } from "uuid";

const signInMeddelware = ({ dispatch }: any) => (next: any) => (action: any) => {
  const { type, payload } = action;

  if (type.endsWith('/signIn/fulfilled')) {
    dispatch(appActions.enqueueSnackbar({
      key: uuid(),
      message: payload?.message || 'Welcome',
      options: { variant: 'success'},
    }))
  }

  return next(action);
}

export default signInMeddelware;