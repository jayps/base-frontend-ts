import {useHistory, useParams} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import DashboardContainer from "../../components/dashboard-container/DashboardContainer";
import React from "react";
import DataForm from "../../components/data-form/DataForm";
import {API_URL} from "../../constants";

interface ManageGroupPageParams {
    id?: string;
}

const ManageGroupPage: React.FC = () => {
    const {id} = useParams<ManageGroupPageParams>();
    const [isNewGroup, setIsNewGroup] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        setIsNewGroup(id === 'create');
    }, [id]);

    const groupFormConfig = {
        fields: [
            {
                label: 'Name',
                name: 'name',
                type: 'text',
                placeholder: 'Name',
                validation: {required: true},
                errorString: 'Enter a name.'
            },
        ],
        onSubmitted: () => {
            history.push('/groups');
        },
        submitButtonText: {
            idle: 'Submit',
            saving: 'Submitting...'
        },
        endpoint: `${API_URL}/users/groups/`,
        errorMessage: 'Something went wrong while saving this group. Try again or contact support',
        id
    };

    return (
        <DashboardContainer>
            <Row>
                <Col sm={8}>
                    <h1>{isNewGroup ? 'Create' : 'Manage'} Group</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataForm {...groupFormConfig} />
                </Col>
            </Row>
        </DashboardContainer>
    )
}

export default ManageGroupPage;