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

function App() {
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const token = localStorage.getItem('token');
    if (token && !auth.token) {
        dispatch(setToken(JSON.parse(token)));
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
