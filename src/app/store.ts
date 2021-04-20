import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/usersSlice';
import registerReducer from '../features/register/registerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    users: userReducer,
    register: registerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
