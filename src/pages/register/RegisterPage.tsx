import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {registerAsync, selectRegister} from "../../features/register/registerSlice";
import PageContainer from "../../components/page-container/PageContainer";
import {Alert, Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import DataForm from "../../components/data-form/DataForm";
import React from "react";
import {RegisterRequest} from "../../models/Auth";
import InfoDialog from "../../components/dialogs/InfoDialog";
import {useHistory} from "react-router-dom";
import {API_URL} from "../../constants";
import {useForm} from "react-hook-form";

const RegisterPage: React.FC = () => {
    const registerState = useAppSelector(selectRegister);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const history = useHistory();
    const [showRegisteredDialog, setShowRegisteredDialog] = React.useState(false);

    const submitRegistration = (data: any) => {
        console.log(data);
        dispatch(registerAsync(data));
    }

    React.useEffect(() => {
        if (!showRegisteredDialog && registerState.registered) {
            setShowRegisteredDialog(true);
        }
    }, [registerState.registered, showRegisteredDialog]);

    const hideRegisteredDialog = () => {
        setShowRegisteredDialog(false);
        history.push('/login');
    }

    return (
        <PageContainer>
            <Container>
                <h1>Register page</h1>
                <InfoDialog text={"You have successfully registered. You can now log in."}
                            onClose={hideRegisteredDialog} isOpen={showRegisteredDialog}/>
                <Row className="mt-5">
                    <Col>
                        <h1>Register</h1>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(submitRegistration)}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email"
                                                      placeholder="Email address"
                                                      isInvalid={errors.email}
                                                      {...register("email", {required: true})}/>
                                        {
                                            errors.email &&
                                            <Form.Control.Feedback>
                                                Enter a valid email address.
                                            </Form.Control.Feedback>
                                        }
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>

                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="Password"
                                                      placeholder="Password"
                                                      isInvalid={errors.password }
                                                      {...register("password", {required: true})}/>
                                        {
                                            errors.password &&
                                            <Form.Text className="text-muted">
                                                Enter a password.
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="firstName"
                                                      placeholder="First Name"
                                                      isInvalid={errors.firstName}
                                                      {...register("firstName", {required: true})}/>
                                        {
                                            errors.firstName &&
                                            <Form.Text className="text-muted">
                                                Enter your first name.
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="lastName"
                                                      placeholder="Last Name"
                                                      isInvalid={errors.lastName}
                                                      {...register("lastName", {required: true})}/>
                                        {
                                            errors.lastName &&
                                            <Form.Text className="text-muted">
                                                Enter your last name.
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Button variant="primary" type="submit" disabled={registerState.registering}>
                                        {
                                            registerState.registering && (
                                                <Spinner animation="border" role="status" size="sm" className={"mr-1"}>
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner>
                                            )
                                        }
                                        {
                                            registerState.registering ? 'Submitting...' : 'Submit'
                                        }
                                    </Button>
                                </Form>
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