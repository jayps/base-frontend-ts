import {useHistory, useParams} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import DashboardContainer from "../../components/dashboard-container/DashboardContainer";
import React from "react";
import DataForm from "../../components/data-form/DataForm";
import {API_URL} from "../../constants";

interface ManageUserPageParams {
    id?: string;
}

const ManageUserPage: React.FC = () => {
    const {id} = useParams<ManageUserPageParams>();
    const [isNewUser, setIsNewUser] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        setIsNewUser(id === 'create');
    }, [id]);

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
        onSubmitted: () => {
            history.push('/users');
        },
        submitButtonText: {
            idle: 'Submit',
            saving: 'Submitting...'
        },
        endpoint: `${API_URL}/users/`,
        errorMessage: 'Something went wrong while saving this user. Try again or contact support',
        id
    };

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