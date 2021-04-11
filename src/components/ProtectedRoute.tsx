import {Redirect, Route} from "react-router-dom";
import React from "react";

export interface ProtectedRouteProps {
    prevent: boolean;
    path?: string;
    redirect?: string;
    component: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({prevent, path, redirect, component}: ProtectedRouteProps) => {
    let Component = component;
    return (
        <Route path={path} render={(props) => prevent ?
            <Redirect to={{
                pathname: redirect || '/',
            }}/> :
            (
                <Component />
            )
        }/>
    )
}

export default ProtectedRoute;