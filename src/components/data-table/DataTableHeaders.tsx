import {Column} from "./DataTable";
import React from "react";

export interface DataTableHeadersProps {
    columns: Column[]
}

const DataTableHeaders: React.FC<DataTableHeadersProps> = ({columns}) => {
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

export default DataTableHeaders;