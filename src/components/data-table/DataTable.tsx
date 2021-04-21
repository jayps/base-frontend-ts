import {Col, Row, Table} from "react-bootstrap";
import React from "react";
import TableLoader from "../loaders/TableLoader";
import {ROWS_PER_PAGE} from "../../constants";
import DataTablePagination from "./DataTablePagination";
import DataTableHeaders from "./DataTableHeaders";
import DataTableBody from "./DataTableBody";
import DataTableFilters from "./DataTableFilters";

export interface Column {
    title: string,
    key: string | null, // A null key means we'll only display the formatter.
    formatter?: Function
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

export interface DataTableProps {
    columns: Column[],
    data: any[],
    loading: boolean,
    rowCount: number,
    currentPage: number,
    onPaginate: Function,
    filters: DataTableFilter[],
    onFilter: Function,
    currentFilterSettings: DataTableFilterSetting[]
}

const DataTable: React.FC<DataTableProps> = ({columns, data, loading = false, rowCount, currentPage, onPaginate, filters, onFilter, currentFilterSettings}) => {
    const numberOfPages = Math.ceil(rowCount / ROWS_PER_PAGE);

    if (loading) {
        return (
            <Row>
                <Col>
                    <TableLoader/>
                </Col>
            </Row>
        )
    }

    return (
        <>
            <DataTableFilters filters={filters} currentFilterSettings={currentFilterSettings} onChange={(name: string, value: string) => {
                onFilter({name, value});
            }}/>
            <Table striped bordered hover size="sm">
                <DataTableHeaders columns={columns}/>
                <DataTableBody columns={columns} data={data}/>
            </Table>
            {
                rowCount > ROWS_PER_PAGE && (
                    <DataTablePagination
                        numberOfPages={numberOfPages}
                        currentPage={currentPage}
                        onClick={(page: number) => {
                            onPaginate(page)
                        }}
                    />
                )
            }
        </>
    )
}

export default DataTable;