import {DataModel} from "../../models/DataModel";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchModel, saveModel} from "./dataFormAPI";
import {RootState} from "../../app/store";
import {getTableDataListAsync} from "../table/tableSlice";

export interface DataFormState {
    loading: boolean;
    saving: boolean;
    error?: any | null;
    currentModel?: DataModel | null;
    modelSaved: boolean;
}

const initialState: DataFormState = {
    loading: false,
    saving: false,
    error: null,
    currentModel: null,
    modelSaved: false
}

export const fetchModelAsync = createAsyncThunk(
    'dataForm/getModel',
    async ({endpoint, id}: any, thunkAPI) => {
        try {
            const {data} = await fetchModel(endpoint, id);

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const saveModelAsync = createAsyncThunk(
    'dataForm/saveModel',
    async ({endpoint, model}: any, thunkAPI) => {
        console.log('thunk', endpoint, model)
        try {
            const {data} = await saveModel(endpoint, model);

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const dataFormSlice = createSlice({
    name: 'dataForm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchModelAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentModel = null;
            })
            .addCase(fetchModelAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentModel = action.payload;
            })
            .addCase(fetchModelAsync.rejected, (state, action) => {
                state.loading = false;
                state.currentModel = null;
                state.error = action.payload;
            })
            .addCase(saveModelAsync.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(saveModelAsync.fulfilled, (state) => {
                state.saving = false;
                state.modelSaved = true;
            })
            .addCase(saveModelAsync.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload;
            })
            .addCase(getTableDataListAsync.pending, (state, action) => {
                state.modelSaved = false;
            })
    }
});

export const selectDataForm = (state: RootState) => state.dataForm;

export default dataFormSlice.reducer;