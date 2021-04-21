import {Column} from "./DataTable";
import React from "react";

export interface DataTableBodyProps {
    columns: Column[],
    data: any[]
}

const DataTableBody: React.FC<DataTableBodyProps> = ({columns, data}) => {
    // Process data cells for the table. Converts things like booleans to text values.
    const processCell = (value: any) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }

        return value;
    }

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

export default DataTableBody;