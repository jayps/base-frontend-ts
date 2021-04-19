import {Col, Row, Table} from "react-bootstrap";
import React from "react";
import TableLoader from "../loaders/TableLoader";

export interface Column {
    title: string,
    key: string,
    formatter?: Function
}

export interface DataTableProps {
    columns: Column[],
    data: any[],
    loading: boolean
}

const DataTable: React.FC<DataTableProps> = ({columns, data, loading = false}) => {
    const headers = () => {
        return (
            <thead>
            <tr>
                {
                    columns.map(c => <th key={c.key}>{c.title}</th>)
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
                                        return <td key={c.key}>{c.formatter(datum)}</td>
                                    }
                                    return <td key={c.key}>{processCell(datum[c.key])}</td>
                                })
                            }
                        </tr>
                    )
                )
            }
            </tbody>
        )
    }

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
        <Table striped bordered hover>
            {headers()}
            {body()}
        </Table>
    )
}

export default DataTable;