import DataTable, {Column, DataTableActions, DataTableFilter} from "../../components/data-table/DataTable";
import {User} from "../../models/User";
import {Link} from "react-router-dom";
import {API_URL} from "../../constants";
import DashboardContainer from "../../components/dashboard-container/DashboardContainer";
import {Button, Col, Row} from "react-bootstrap";
import React from "react";
import {Group} from "../../models/Group";

const GroupsPage: React.FC = () => {
    const groupsTableColumns: Column[] = [
        {
            title: 'Name',
            key: 'name',
            formatter: (group: Group) => (<Link to={`/groups/${group.id}/`}>{group.name}</Link>),
            isSortable: true
        },
    ];

    const groupTableFilters: DataTableFilter[] = [];

    const groupTableActions: DataTableActions = {
        delete: {
            enabled: true,
        }
    }

    const groupsTableConfig = {
        endpoint: `${API_URL}/users/groups/`,
        columns: groupsTableColumns,
        filters: [],
        actions: groupTableActions
    }

    return (
        <DashboardContainer>
            <Row>
                <Col sm={8}>
                    <h1>Groups</h1>
                </Col>
                <Col sm={4} className={"text-right"}>
                    <Button as={Link} to="/groups/create" variant={"primary"}>
                        New group
                    </Button>
                </Col>
            </Row>

            <DataTable {...groupsTableConfig} />
        </DashboardContainer>
    )
}

export default GroupsPage;