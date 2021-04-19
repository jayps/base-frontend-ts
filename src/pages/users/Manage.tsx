import {Redirect, useParams} from "react-router-dom";
import {User} from "../../models/User";
import {Col, Row} from "react-bootstrap";
import DashboardContainer from "../../components/dashboard-container/DashboardContainer";
import React from "react";
import DataForm from "../../components/data-form/DataForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchUserAsync, saveUserAsync, selectUsers} from "../../features/users/usersSlice";

interface ManageUserPageParams {
    id?: string;
}

const ManageUserPage: React.FC = () => {
    const {id} = useParams<ManageUserPageParams>();
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();
    const [isNewUser, setIsNewUser] = React.useState(false);

    React.useEffect(() => {
        const isNewUser = id === 'create';
        setIsNewUser(isNewUser);
        if (!isNewUser && id) {
            dispatch(fetchUserAsync(id))
        }
    }, [dispatch, id]);

    const onSubmit = ({id, email, firstName, lastName}: User) => {
        dispatch(saveUserAsync({id, email, firstName, lastName}));
    }

    const userFormConfig = {
        fields: [
            {
                label: 'Email address',
                name: 'email',
                type: 'email',
                placeholder: 'Email address',
                validation: {required: true},
                errorString: 'Enter a valid email address.'
            },
            {
                label: 'First name',
                name: 'firstName',
                type: 'text',
                placeholder: 'First name',
                validation: {required: true},
                errorString: 'Enter a first name'
            },
            {
                label: 'Last name',
                name: 'lastName',
                type: 'text',
                placeholder: 'Last name',
                validation: {required: true},
                errorString: 'Enter a last name'
            }
        ],
        onSubmit: onSubmit,
        loading: users.saving,
        submitButtonText: {
            idle: 'Submit',
            loading: 'Submitting...'
        },
        initialData: users.currentUser
    };

    if (users.userSaved) {
        return <Redirect to={"/users"} />
    }

    return (
        <DashboardContainer>
            <Row>
                <Col sm={8}>
                    <h1>{isNewUser ? 'Create' : 'Manage'} User</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataForm {...userFormConfig} />
                </Col>
            </Row>
        </DashboardContainer>
    )
}

export default ManageUserPage;