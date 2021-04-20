import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {registerAsync, selectRegister} from "../../features/register/registerSlice";
import PageContainer from "../../components/page-container/PageContainer";
import {Alert, Card, Col, Container, Row} from "react-bootstrap";
import DataForm from "../../components/data-form/DataForm";
import React from "react";
import {RegisterRequest} from "../../models/Auth";
import InfoDialog from "../../components/dialogs/InfoDialog";
import {useHistory} from "react-router-dom";

const RegisterPage: React.FC = () => {
    const registerState = useAppSelector(selectRegister);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [showRegisteredDialog, setShowRegisteredDialog] = React.useState(false);

    const submitRegistration = (data: RegisterRequest) => {
        dispatch(registerAsync(data));
    }

    React.useEffect(() => {
        if (!showRegisteredDialog && registerState.registered) {
            setShowRegisteredDialog(true);
        }
    }, [registerState.registered, showRegisteredDialog]);

    const registerFormConfig = {
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
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: 'Password',
                validation: {required: true},
                errorString: 'Enter a password'
            },
            // TODO: Figure out a nice generic way to match passwords.
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
        onSubmit: submitRegistration,
        submitButtonText: {
            idle: 'Register',
            saving: 'Registering...'
        },
        saving: registerState.registering
    }

    const hideRegisteredDialog = () => {
        setShowRegisteredDialog(false);
        history.push('/login');
    }

    return (
        <PageContainer>
            <Container>
                <InfoDialog text={"You have successfully registered. You can now log in."}
                            onClose={hideRegisteredDialog} isOpen={showRegisteredDialog}/>
                <Row className="mt-5">
                    <Col>
                        <h1>Register</h1>
                        <Card>
                            <Card.Body>
                                <DataForm {...registerFormConfig} />
                                {
                                    registerState.error && (
                                        <Alert variant="danger" className="mt-3">
                                            {registerState.error}
                                        </Alert>
                                    )
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </PageContainer>
    )
}

export default RegisterPage;