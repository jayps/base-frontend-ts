import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {DataTableFilterSetting} from "../../components/data-table/DataTable";
import {DataModel} from "../../models/DataModel";
import {DataModelRequest} from "../../models/Request";
import {deleteTableDataItem, getTableDataList} from "./tableAPI";
import {deleteUser} from "../users/usersAPI";
import {deleteUserAsync} from "../users/usersSlice";

export interface TableState {
    loading: boolean;
    saving: boolean;
    error?: any | null;
    records: DataModel[];
    totalRecords: number;
    currentPage: number;
    filters: DataTableFilterSetting[];
    search?: string | null;
    sorting?: string | null;
    nextPage?: string | null;
    previousPage?: string | null;
    recordDeleted?: boolean;
}

const initialState: TableState = {
    loading: true,
    saving: false,
    error: null,
    records: [],
    totalRecords: 0,
    currentPage: 1,
    filters: []
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getTableDataListAsync = createAsyncThunk(
    'table/getTableDataList',
    async (requestParams: DataModelRequest, thunkAPI) => {
        try {
            const {data} = await getTableDataList(requestParams);

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const deleteTableDataItemAsync = createAsyncThunk(
    'table/deleteTableDataItem',
    async ({endpoint, id}: any, thunkAPI) => {
        try {
            await deleteTableDataItem(endpoint, id);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const tableSlice = createSlice({
    name: 'users',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setTablePage: (state, action) => {
            state.currentPage = action.payload;
        },
        setTableFilters: (state, action: PayloadAction<DataTableFilterSetting>) => {
            const currentFilters = state.filters.filter(f => f.name !== action.payload.name);
            if (action.payload.value) {
                currentFilters.push(action.payload);
            }

            state.filters = currentFilters;
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getTableDataListAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.records = [];
                state.totalRecords = 0;
                state.recordDeleted = false;
            })
            .addCase(getTableDataListAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.records = action.payload.results;
                state.totalRecords = action.payload.count;
                state.nextPage = action.payload.next;
                state.previousPage = action.payload.previous;
            })
            .addCase(getTableDataListAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteTableDataItemAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.recordDeleted = false;
            })
            .addCase(deleteTableDataItemAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.recordDeleted = true;
            })
            .addCase(deleteTableDataItemAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const {setTablePage, setTableFilters} = tableSlice.actions;

export const selectTable = (state: RootState) => state.table;

export default tableSlice.reducer;
