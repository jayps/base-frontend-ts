import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import registerReducer from '../features/register/registerSlice';
import tableReducer from '../features/table/tableSlice';
import dataFormReducer from '../features/data-form/dataFormSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    register: registerReducer,
    table: tableReducer,
    dataForm: dataFormReducer
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
