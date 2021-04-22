import {Alert, Button, Col, Row, Table} from "react-bootstrap";
import React from "react";
import TableLoader from "../loaders/TableLoader";
import {ROWS_PER_PAGE} from "../../constants";
import DataTablePagination from "./DataTablePagination";
import DataTableHeaders from "./DataTableHeaders";
import DataTableBody from "./DataTableBody";
import DataTableFilters from "./DataTableFilters";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    deleteTableDataItemAsync,
    getTableDataListAsync,
    selectTable,
    setTableFilters,
    setTablePage
} from "../../features/table/tableSlice";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import {DataModel} from "../../models/DataModel";
import InfoDialog from "../dialogs/InfoDialog";

export interface Column {
    title: string,
    key: string | null, // A null key means we'll only display the formatter.
    formatter?: Function,
    isSortable?: boolean
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

    React.useEffect(() => {
        dispatch((getTableDataListAsync({
            endpoint: endpoint,
            filters: tableState.filters,
            page: tableState.currentPage
        })))
    }, [dispatch, endpoint, tableState.currentPage, tableState.filters]);

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
            filters: tableState.filters,
            page: tableState.currentPage
        })));
    }

    const deleteRecord = () => {
        if (recordToDelete?.id) {
            // TODO:
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
            <DataTableFilters filters={filters} currentFilterSettings={tableState.filters}
                              onChange={(name: string, value: string) => {
                                  dispatch(setTableFilters({name, value}));
                              }}/>
            {error()}
            <Table striped bordered hover size="sm">
                <DataTableHeaders columns={columns}/>
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