import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getUsersListAsync, selectUsers} from "../../features/users/usersSlice";
import {User} from "../../models/User";
import DashboardContainer from "../../components/dashboard-container/DashboardContainer";
import TableLoader from "../../components/loaders/TableLoader";
import {Table} from "react-bootstrap";

const UsersList: React.FC = () => {
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getUsersListAsync());
    }, [dispatch]);

    const loader = () => {
        if (users.loading) {
            return (
                <TableLoader/>
            )
        }

        return null;
    }

    const error = () => {
        if (!users.loading && users.error) {
            return (
                <div>
                    {users.error}
                </div>
            )
        }

        return null;
    }

    const userRow = (user: User) => {
        return <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.isActive ? 'Yes' : 'No'}</td>
            <td>{user.isStaff ? 'Yes' : 'No'}</td>
            <td>{user.isSuperuser ? 'Yes' : 'No'}</td>
        </tr>
    }

    const usersList = () => {
        if (!users.loading && users.users) {
            return (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email address</th>
                        <th>Is active</th>
                        <th>Is staff</th>
                        <th>Is superuser</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.users.map(u => userRow(u))}
                    </tbody>
                </Table>
            )
        }

        return null;
    }

    return (
        <DashboardContainer>
            <h1>Users</h1>
            {loader()}
            {error()}
            {usersList()}
        </DashboardContainer>
    )
}

export default UsersList;