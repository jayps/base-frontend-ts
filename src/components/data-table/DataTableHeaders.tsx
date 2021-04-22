import {Column, DataTableActions} from "./DataTable";
import React from "react";

export interface DataTableHeadersProps {
    columns: Column[],
    actions: DataTableActions
}

const DataTableHeaders: React.FC<DataTableHeadersProps> = ({columns, actions}) => {
    const [showActions, setShowActions] = React.useState(false);

    React.useEffect(() => {
        setShowActions(actions.delete.enabled)
    }, [actions.delete.enabled]);

    return (
        <thead>
        <tr>
            {
                columns.map(c => <th key={c.title}>{c.title}</th>)
            }
            {
                showActions && (
                    <th>
                        Actions
                    </th>
                )
            }
        </tr>
        </thead>
    )
}

export default DataTableHeaders;