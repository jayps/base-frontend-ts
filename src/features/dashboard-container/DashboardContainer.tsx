import {Link} from "react-router-dom";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {logout, selectAuth} from "../auth/authSlice";

export interface PageContainerProps {
    children: any;
}

const PageContainer: React.FC<PageContainerProps> = ({children}) => {
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    return (
        <div>
            DASH
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard">Home</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    {
                        auth.token && <button onClick={() => dispatch(logout())}>Logout</button>
                    }
                </ul>
            </nav>
            {children}
        </div>
    )
}

export default PageContainer;