import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getUsersListAsync, selectUsers} from "../../features/users/usersSlice";
import {User} from "../../models/User";
import DashboardContainer from "../../components/dashboard-container/DashboardContainer";
import TableLoader from "../../components/loaders/TableLoader";
import {Alert, Button, Col, Row, Table} from "react-bootstrap";
import DataTable from "../../components/data-table/DataTable";
import { Link } from "react-router-dom";

const UsersList: React.FC = () => {
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    const usersTableConfig = [
        {title: 'First name', key: 'firstName', formatter: (user: User) => (<Link to={`/users/${user.id}/`}>{user.firstName}</Link>)},
        {title: 'Last name', key: 'lastName'},
        {title: 'Email address', key: 'email'},
        {title: 'Is active', key: 'isActive'},
        {title: 'Is staff', key: 'isStaff'},
        {title: 'Is superuser', key: 'isSuperuser'},
    ];

    React.useEffect(() => {
        dispatch(getUsersListAsync());
    }, [dispatch]);

    const error = () => {
        if (!users.loading && users.error) {
            return (
                <Alert variant={"danger"}>
                    {users.error}
                </Alert>
            )
        }

        return null;
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

            {error()}
            <DataTable columns={usersTableConfig} data={users.users} loading={users.loading} />
        </DashboardContainer>
    )
}

export default UsersList;