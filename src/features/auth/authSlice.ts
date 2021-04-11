import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {User} from "../../models/User";
import {login} from "./authAPI";
import {AuthRequest, AuthToken} from "../../models/Auth";

export interface AuthState {
    loggingIn: boolean;
    loginError?: any | null;
    currentUser?: User | null;
    token?: AuthToken | null;
}

const initialState: AuthState = {
    loggingIn: false,
    loginError: null,
    currentUser: null,
    token: null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({email, password}: AuthRequest, thunkAPI) => {
        try {
            const {data} = await login(email, password);
            localStorage.setItem('token', JSON.stringify(data));

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                localStorage.removeItem('token');
                state.loggingIn = true;
                state.loginError = null;
                state.token = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loggingIn = false;
                state.token = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loggingIn = false;
                state.token = null;
                state.loginError = action.payload;
            })
    },
});

export const {logout, setToken} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
