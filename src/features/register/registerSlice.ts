import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RegisterRequest} from "../../models/Auth";
import {register} from "./registerAPI";
import {RootState} from "../../app/store";

export interface RegisterState {
    registering: boolean;
    error: any | null;
    registered: boolean;
}

const initialState: RegisterState = {
    registering: false,
    error: null,
    registered: false
};

export const registerAsync = createAsyncThunk(
    'register/register',
    async (registrationData: RegisterRequest, thunkAPI) => {
        try {
            const {data} = await register(registrationData);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        acknowledgeRegistration: (state, action) => {
            state.registered = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.registered = false;
                state.registering = true;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state) => {
                state.registered = true;
                state.registering = false;
                state.error = null;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.registered = false;
                state.registering = false;
                state.error = action.payload;
            })
    }
});

// If you add stuff to reducers, export them as constants here.
export const selectRegister = (state: RootState) => state.register;

export default registerSlice.reducer;