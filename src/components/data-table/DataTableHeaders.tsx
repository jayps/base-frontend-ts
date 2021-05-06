import {Column, DataTableActions} from "./DataTable";
import React from "react";
import {SortSettings} from "../../models/DataModel";
import styled from "styled-components";

export interface DataTableHeadersProps {
    columns: Column[];
    actions: DataTableActions;
    onSort: Function;
    currentSorting?: SortSettings;
}

const ClickableHeader = styled.span`
    cursor: pointer;
`;

const DataTableHeaders: React.FC<DataTableHeadersProps> = ({columns, actions, onSort, currentSorting}) => {
    const [showActions, setShowActions] = React.useState(false);

    React.useEffect(() => {
        setShowActions(actions.delete.enabled)
    }, [actions.delete.enabled]);

    const sortingIcon = (column: Column) => {
        if (!currentSorting || (!column.sortKey && !column.key)) {
            return null;
        }
        if (column.sortKey === currentSorting.column || column.key === currentSorting.column) {
            if (currentSorting.direction === 'asc') {
                return (
                    <i className="bi bi-caret-up" />
                )
            }

            return (
                <i className="bi bi-caret-down" />
            )
        }
    }

    return (
        <thead>
        <tr>
            {
                columns.map((c) => {
                    if (!c.isSortable) {
                        return (
                            <th key={c.title}>{c.title}</th>
                        )
                    }

                    return (
                        <th key={c.title}>
                            <ClickableHeader onClick={() => onSort(c)}>
                                {sortingIcon(c)}
                                {c.title}
                            </ClickableHeader>
                        </th>
                    )
                })
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