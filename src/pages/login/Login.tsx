import React from "react";
import PageContainer from "../../features/page-container/PageContainer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {loginAsync, selectAuth} from "../../features/auth/authSlice";

const Login: React.FC = () => {
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const login = async (email: string, password: string) => {
        dispatch(loginAsync({email, password}));
    }

    return (
        <PageContainer>
            <h1>Login page</h1>
            <button onClick={() => login('jp@jpmeyer.dev', 'Pass123#')}>Login</button>
            AUTH = {
                JSON.stringify(auth)
            }
        </PageContainer>
    )
}

export default Login;