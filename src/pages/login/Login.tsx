import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useForm} from "react-hook-form";
import {loginAsync, selectAuth} from "../../features/auth/authSlice";
import {AuthRequest} from "../../models/Auth";
import PageContainer from "../../components/page-container/PageContainer";
import {Alert, Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import DataForm, {DataFormProps} from "../../components/data-form/DataForm";

const Login: React.FC = () => {
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async ({email, password}: AuthRequest) => {
        dispatch(loginAsync({email, password}));
    }

    const loginFormConfig: DataFormProps = {
        fields: [
            {
                label: 'Email address',
                name: 'email',
                type: 'email',
                placeholder: 'Email address',
                validation: {required: true},
                mutedText: 'We\'ll never share your email address.',
                errorString: 'Enter a valid email address.'
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: 'Password',
                validation: {required: true},
                errorString: 'Enter your password'
            }
        ],
        onSubmit: onSubmit,
        submitButtonText: {
            idle: 'Login',
            saving: 'Logging in...'
        },
        loading: auth.loggingIn
    };

    return (
        <PageContainer>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h1>Login</h1>
                        <Card>
                            <Card.Body>
                                <DataForm {...loginFormConfig} />
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