import {Col, Row, Table} from "react-bootstrap";
import React from "react";
import TableLoader from "../loaders/TableLoader";
import {ROWS_PER_PAGE} from "../../constants";
import DataTablePagination from "./DataTablePagination";
import DataTableHeaders from "./DataTableHeaders";
import DataTableBody from "./DataTableBody";

export interface Column {
    title: string,
    key: string | null, // A null key means we'll only display the formatter.
    formatter?: Function
}

export interface DataTableProps {
    columns: Column[],
    data: any[],
    loading: boolean,
    rowCount: number,
    currentPage: number,
    onPaginate: Function
}

const DataTable: React.FC<DataTableProps> = ({columns, data, loading = false, rowCount, currentPage, onPaginate}) => {
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