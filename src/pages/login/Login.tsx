import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { useForm } from "react-hook-form";
import {loginAsync, selectAuth} from "../../features/auth/authSlice";
import {AuthRequest} from "../../models/Auth";
import PageContainer from "../../components/page-container/PageContainer";

const Login: React.FC = () => {
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async ({email, password}: AuthRequest) => {
        dispatch(loginAsync({email, password}));
    }

    return (
        <PageContainer>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" {...register("email", { required: true })} placeholder="Email" /><br />
                {
                    errors.email && <span>Enter a valid email address to log in.<br /></span>
                }
                <input type="password" {...register("password", { required: true })} placeholder="Password" /><br />
                {
                    errors.password && <span>Enter a valid password to log in.<br /></span>
                }
                <input type="submit" />
            </form>
            {
                auth.loginError && (
                    <p>
                        We couldn't log you in with the details you provided.
                    </p>
                )
            }
        </PageContainer>
    )
}

export default Login;