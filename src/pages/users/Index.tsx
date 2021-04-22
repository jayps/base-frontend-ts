import React from "react";
import {User} from "../../models/User";
import DashboardContainer from "../../components/dashboard-container/DashboardContainer";
import {Button, Col, Row} from "react-bootstrap";
import DataTable, {Column, DataTableActions, DataTableFilter} from "../../components/data-table/DataTable";
import {Link} from "react-router-dom";
import {API_URL} from "../../constants";

const UsersList: React.FC = () => {
    const usersTableColumns: Column[] = [
        {
            title: 'First name',
            key: 'firstName',
            formatter: (user: User) => (<Link to={`/users/${user.id}/`}>{user.firstName}</Link>),
            isSortable: true
        },
        {title: 'Last name', key: 'lastName', isSortable: true},
        {title: 'Email address', key: 'email', isSortable: true},
        {title: 'Is active', key: 'isActive'},
        {title: 'Is staff', key: 'isStaff'},
        {title: 'Is superuser', key: 'isSuperuser'},
    ];

    const usersTableFilters: DataTableFilter[] = [
        {
            name: 'is_staff',
            label: 'Is Staff',
            options: [
                {label: 'No filter', value: ''},
                {label: 'Yes', value: 'true'},
                {label: 'No', value: 'false'},
            ]
        },
        {
            name: 'is_superuser',
            label: 'Is Superuser',
            options: [
                {label: 'No filter', value: ''},
                {label: 'Yes', value: 'true'},
                {label: 'No', value: 'false'},
            ]
        },
        {
            name: 'is_active',
            label: 'Is Active',
            options: [
                {label: 'No filter', value: ''},
                {label: 'Yes', value: 'true'},
                {label: 'No', value: 'false'},
            ]
        }
    ];

    const usersTableActions: DataTableActions = {
        delete: {
            enabled: true,
        }
    }

    const usersTableConfig = {
        endpoint: `${API_URL}/users/`,
        columns: usersTableColumns,
        filters: usersTableFilters,
        actions: usersTableActions
    }

    return (
        <DashboardContainer>
            <Row>
                <Col sm={8}>
                    <h1>Users</h1>
                </Col>
                <Col sm={4} className={"text-right"}>
                    <Button as={Link} to="/users/create" variant={"primary"}>
                        New user
                    </Button>
                </Col>
            </Row>

            <DataTable {...usersTableConfig} />
        </DashboardContainer>
    )
}

export default UsersList;