import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {selectAuth, setToken} from "./features/auth/authSlice";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import UsersList from './pages/users/Index';
import ManageUserPage from "./pages/users/Manage";
import RegisterPage from "./pages/register/RegisterPage";
import GroupsPage from "./pages/groups/Index";
import ManageGroupPage from "./pages/groups/Manage";
import {AccessTokenData} from "./models/Auth";

function App() {
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const token = localStorage.getItem('token');
    if (token) {
        if (token) {
            const parts = token.split('.');
            if (parts.length > 2) {
                try {
                    const decoded = atob(parts[1])
                    const tokenData: AccessTokenData = JSON.parse(decoded);
                    const expiry = tokenData.exp * 1000;
                    if (expiry < Date.now()) {
                        localStorage.removeItem('token');
                    }
                } catch (e) {
                    localStorage.removeItem('token');
                }
            }
        }

        if (!auth.token) {
            dispatch(setToken(JSON.parse(token)));
        }
    }

    const permissions: any = {
        isStaff: auth.currentUser?.isStaff,
        isSuperuser: auth.currentUser?.isSuperuser
    };

    return (
        <Router>
            <div>
                <Switch>
                    <ProtectedRoute path="/dashboard" prevent={!token} redirect={"/"}
                                    component={Dashboard}/>
                    <ProtectedRoute path="/users/:id" prevent={!permissions.isStaff} redirect={"/dashboard"}
                                    component={ManageUserPage}/>
                    <ProtectedRoute path="/users/create" prevent={!permissions.isStaff} redirect={"/dashboard"}
                                    component={ManageUserPage}/>
                    <ProtectedRoute path="/groups/:id" prevent={!permissions.isStaff} redirect={"/groups"}
                                    component={ManageGroupPage}/>
                    <ProtectedRoute path="/groups" prevent={!permissions.isStaff} redirect={"/groups"}
                                    component={GroupsPage}/>
                    <ProtectedRoute path="/users" prevent={!permissions.isStaff} redirect={"/dashboard"}
                                    component={UsersList}/>
                    <ProtectedRoute path="/login" prevent={token !== undefined && token !== null} redirect={"/dashboard"}
                                    component={Login}/>
                    <ProtectedRoute path="/register" prevent={token !== undefined && token !== null} redirect={"/dashboard"}
                                    component={RegisterPage}/>
                    <ProtectedRoute path="/about" prevent={false} component={About}/>
                    <ProtectedRoute path="/" prevent={false} component={Home}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
