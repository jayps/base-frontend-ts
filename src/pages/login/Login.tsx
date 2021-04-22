import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useForm} from "react-hook-form";
import {loginAsync, selectAuth} from "../../features/auth/authSlice";
import {AuthRequest} from "../../models/Auth";
import PageContainer from "../../components/page-container/PageContainer";
import {Alert, Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";

const Login: React.FC = () => {
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async ({email, password}: AuthRequest) => {
        dispatch(loginAsync({email, password}));
    }

    return (
        <PageContainer>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h1>Login</h1>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email"
                                                      placeholder="Email address"
                                                      isInvalid={errors.email}
                                                      {...register("email", {required: true})}/>
                                        {
                                            errors.email &&
                                            <Form.Control.Feedback>
                                                Enter a valid email address to log in.
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
                                                      isInvalid={errors.password || auth.loginError}
                                                      {...register("password", {required: true})}/>
                                        {
                                            errors.password &&
                                            <Form.Text className="text-muted">
                                                Enter a valid password to log in.
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Button variant="primary" type="submit" disabled={auth.loggingIn}>
                                        {
                                            auth.loggingIn && (
                                                <Spinner animation="border" role="status" size="sm" className={"mr-1"}>
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner>
                                            )
                                        }
                                        {
                                            auth.loggingIn ? 'Submitting...' : 'Submit'
                                        }
                                    </Button>
                                </Form>
                                {
                                    auth.loginError && (
                                        <Alert variant="danger" className="mt-3">
                                            We couldn't log you in with the details you provided.
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

export default Login;