import {Alert, Button, Col, Row, Table} from "react-bootstrap";
import React, {useCallback} from "react";
import TableLoader from "../loaders/TableLoader";
import {ROWS_PER_PAGE} from "../../constants";
import DataTablePagination from "./DataTablePagination";
import DataTableHeaders from "./DataTableHeaders";
import DataTableBody from "./DataTableBody";
import DataTableFilters from "./DataTableFilters";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    deleteTableDataItemAsync, EndpointFilterPayload,
    getTableDataListAsync,
    selectTable,
    setSearch,
    setSorting,
    setTableFilters,
    setTablePage, tableSlice
} from "../../features/table/tableSlice";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import {DataModel, SortSettings} from "../../models/DataModel";
import InfoDialog from "../dialogs/InfoDialog";
import DataTableSearch from "./DataTableSearch";

export interface Column {
    title: string,
    key: string | null, // A null key means we'll only display the formatter.
    formatter?: Function,
    isSortable?: boolean,
    sortKey?: string // So Django is fun... even though we get camelCase responses, we still need to send snake_case sort keys. This only needs to be specified if different from the key.
}

// Filter settings to send to APIs
export interface DataTableFilterSetting {
    name: string,
    value: string
}

// Options to display in dropdowns
export interface DataTableFilterOption {
    value: string,
    label: string
}

export interface DataTableFilter {
    name: string,
    label: string,
    options: DataTableFilterOption[]
}

export interface DataTableAction {
    enabled: boolean,
}

export interface DataTableActions {
    delete: DataTableAction
}

export interface DataTableProps {
    endpoint: string,
    columns: Column[],
    filters: DataTableFilter[],
    actions: DataTableActions
}

const DataTable: React.FC<DataTableProps> = ({columns, filters, endpoint, actions}) => {
    const tableState = useAppSelector(selectTable);
    const dispatch = useAppDispatch();

    const [confirmDeleteRecord, setConfirmDeleteRecord] = React.useState(false);
    const [recordToDelete, setRecordToDelete] = React.useState<DataModel | null>(null);
    const [showRecordDeleted, setShowRecordDeleted] = React.useState<boolean>(false);
    const [numberOfPages, setNumberOfPages] = React.useState(0);
    const [pageLoaded, setPageLoaded] = React.useState(false);

    /**
     * Get table specific endpoint filters.
     * We store filters in state related to whichever table we're displaying,
     * so always make sure the currently displayed table uses the correct filters.
     * ** useCallback just makes sure we don't call this method and change state with every render.
     */
    const getTableFilters = useCallback(() => {
        const endpointFilters = tableState.filters.find(f => f.endpoint === endpoint);
        if (endpointFilters) {
            return endpointFilters.filters;
        }

        return [];
    }, [endpoint, tableState.filters]);

    React.useEffect(() => {
        dispatch(setTablePage(1)); // Reset the page when we're loading up the table
        setPageLoaded(true);
    }, [dispatch])

    React.useEffect(() => {
        if (!pageLoaded) {
            // If the page has not been set to 1, don't load the table.
            return;
        }
        // Django sorting is '-column' for desc, 'column' for asc.
        const orderingDirection = tableState?.sorting?.direction === 'asc' ? '' : '-';
        dispatch((getTableDataListAsync({
            endpoint: endpoint,
            filters: getTableFilters(),
            page: tableState.currentPage,
            search: tableState.search,
            ordering: tableState?.sorting ? `${orderingDirection}${tableState?.sorting?.column}` : undefined
        })))
    }, [dispatch, endpoint, getTableFilters, pageLoaded, tableState.currentPage, tableState.filters, tableState.search, tableState?.sorting]);

    React.useEffect(() => {
        if (tableState.recordDeleted && !showRecordDeleted) {
            setConfirmDeleteRecord(false);
            setShowRecordDeleted(true);
        }
    }, [showRecordDeleted, tableState.recordDeleted]);

    React.useEffect(() => {
        setNumberOfPages(Math.ceil(tableState.totalRecords / ROWS_PER_PAGE));
    }, [tableState.totalRecords]);

    if (tableState.loading) {
        return (
            <Row>
                <Col>
                    <TableLoader/>
                </Col>
            </Row>
        )
    }

    const showConfirmDelete = (record: DataModel) => {
        setConfirmDeleteRecord(true);
        setRecordToDelete(record);
    }

    const hideConfirmDelete = () => {
        setConfirmDeleteRecord(false);
    }

    const acknowledgeDeleted = () => {
        setShowRecordDeleted(false);
        dispatch((getTableDataListAsync({
            endpoint: endpoint,
            filters: getTableFilters(),
            page: tableState.currentPage
        })));
    }

    const deleteRecord = () => {
        if (recordToDelete?.id) {
            dispatch(deleteTableDataItemAsync({endpoint, id: recordToDelete.id}))
        }
    }

    const actionButtons = (record: DataModel) => {
        const actionOutput = [];
        if (actions.delete.enabled) {
            actionOutput.push(<Button variant="link" onClick={() => showConfirmDelete(record)}>Delete</Button>);
        }

        return actionOutput;
    }

    const onSort = (column: Column) => {
        if (!column.key) {
            // If there is no key, we can't sort.
            return;
        }
        let newSortSettings: SortSettings = {column: column.sortKey || column.key, direction: 'asc'};
        if (newSortSettings.column === tableState?.sorting?.column) {
            newSortSettings.direction = tableState.sorting.direction === 'asc' ? 'desc' : 'asc';
        }

        dispatch(setSorting(newSortSettings));
    }

    const error = () => {
        if (!tableState.loading && tableState.error) {
            return (
                <Alert variant={"danger"}>
                    {tableState.error}
                </Alert>
            )
        }

        return null;
    }

    return (
        <>
            <DataTableSearch onSearch={(term: string) => {
                dispatch(setSearch(term))
            }} currentSearchParam={tableState.search}/>
            <DataTableFilters filters={filters} currentFilterSettings={getTableFilters()}
                              onChange={(name: string, value: string) => {
                                  const payload: EndpointFilterPayload = {
                                      endpoint,
                                      filter: {name, value}
                                  }
                                  dispatch(setTableFilters(payload));
                              }}/>
            {error()}
            <Table striped bordered hover size="sm">
                <DataTableHeaders columns={columns} actions={actions} onSort={onSort} currentSorting={tableState?.sorting}/>
                <DataTableBody columns={columns} data={tableState.records} actions={actionButtons}/>
            </Table>
            {
                tableState.totalRecords > ROWS_PER_PAGE && (
                    <DataTablePagination
                        numberOfPages={numberOfPages}
                        currentPage={tableState.currentPage}
                        onClick={(page: number) => dispatch(setTablePage(page))}
                    />
                )
            }
            <ConfirmationDialog
                prompt={"Are you sure you want to delete this record?"}
                yesButton={{action: deleteRecord}}
                noButton={{action: hideConfirmDelete}}
                isOpen={confirmDeleteRecord}/>
            <InfoDialog text={"Record deleted successfully."} onClose={acknowledgeDeleted} isOpen={showRecordDeleted}/>

        </>
    )
}

export default DataTable;