import {Col, Row, Table} from "react-bootstrap";
import React from "react";
import TableLoader from "../loaders/TableLoader";
import Pagination from "react-bootstrap-4-pagination";
import {ROWS_PER_PAGE} from "../../constants";

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

    const headers = () => {
        return (
            <thead>
            <tr>
                {
                    columns.map(c => <th key={c.title}>{c.title}</th>)
                }
            </tr>
            </thead>
        )
    }

    // Process data cells for the table. Converts things like booleans to text values.
    const processCell = (value: any) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }

        return value;
    }

    const body = () => {
        if (data.length === 0) {
            return <tbody>
            <tr>
                <td colSpan={columns.length} className="text-center">
                    No data.
                </td>
            </tr>
            </tbody>
        }

        return (
            <tbody>
            {
                data.map((datum: any, index: number) => (
                        <tr key={index}>
                            {
                                columns.map(c => {
                                    if (c.formatter) {
                                        return <td key={c.title}>{c.formatter(datum)}</td>
                                    }
                                    return <td key={c.title}>{c.key && processCell(datum[c.key])}</td>
                                })
                            }
                        </tr>
                    )
                )
            }
            </tbody>
        )
    }

    // if (currentPage > numberOfPages) {
    //     onPaginate(numberOfPages)
    // }

    return (
        <>
            <Table striped bordered hover>
                {headers()}
                {body()}
            </Table>
            {
                rowCount > ROWS_PER_PAGE && (
                    <Pagination
                        threeDots
                        totalPages={numberOfPages}
                        currentPage={currentPage}
                        showMax={3}
                        prevNext
                        onClick={(page: number) => {onPaginate(page)}}
                    />
                )
            }
        </>
    )
}

export default DataTable;