import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteUserAsync, getUsersListAsync, selectUsers} from "../../features/users/usersSlice";
import {User} from "../../models/User";
import DashboardContainer from "../../components/dashboard-container/DashboardContainer";
import {Alert, Button, Col, Row} from "react-bootstrap";
import DataTable from "../../components/data-table/DataTable";
import {Link} from "react-router-dom";
import ConfirmationDialog from "../../components/dialogs/ConfirmationDialog";
import InfoDialog from "../../components/dialogs/InfoDialog";

const UsersList: React.FC = () => {
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();
    const [confirmDeleteUser, setConfirmDeleteUser] = React.useState(false);
    const [userToDelete, setUserToDelete] = React.useState<User | null>(null);
    const [showUserDeleted, setShowUserDeleted] = React.useState<boolean>(false);

    const showConfirmDeleteUser = (user: User) => {
        setConfirmDeleteUser(true);
        setUserToDelete(user);
    }

    const hideConfirmDeleteUser = () => {
        setConfirmDeleteUser(false);
    }

    const acknowledgeUserDeleted = () => {
        setShowUserDeleted(false);
        dispatch(getUsersListAsync());
    }

    const deleteUser = () => {
        if (userToDelete?.id) {
            dispatch(deleteUserAsync(userToDelete.id))
        }
    }

    const usersTableConfig = [
        {
            title: 'First name',
            key: 'firstName',
            formatter: (user: User) => (<Link to={`/users/${user.id}/`}>{user.firstName}</Link>)
        },
        {title: 'Last name', key: 'lastName'},
        {title: 'Email address', key: 'email'},
        {title: 'Is active', key: 'isActive'},
        {title: 'Is staff', key: 'isStaff'},
        {title: 'Is superuser', key: 'isSuperuser'},
        {
            title: 'Actions',
            key: null,
            formatter: (user: User) => {
                return (
                    <>
                        <Button variant="link" onClick={() => showConfirmDeleteUser(user)}>Delete</Button>
                    </>
                )
            }
        }
    ];

    React.useEffect(() => {
        dispatch(getUsersListAsync());
    }, [dispatch]);

    React.useEffect(() => {
        if (users.userDeleted && !showUserDeleted) {
            hideConfirmDeleteUser();
            setShowUserDeleted(true)
        }
    }, [dispatch, setShowUserDeleted, showUserDeleted, users.userDeleted]);

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
            <DataTable columns={usersTableConfig} data={users.users} loading={users.loading}/>
            <ConfirmationDialog
                prompt={"Are you sure you want to delete this user?"}
                yesButton={{action: deleteUser}}
                noButton={{action: hideConfirmDeleteUser}}
                isOpen={confirmDeleteUser} />
            <InfoDialog text={"User deleted successfully"} onClose={acknowledgeUserDeleted} isOpen={showUserDeleted} />
        </DashboardContainer>
    )
}

export default UsersList;