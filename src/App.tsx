import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {selectAuth, setToken} from "./features/auth/authSlice";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const auth = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const token = localStorage.getItem('token');
    if (token && !auth.token) {
        dispatch(setToken(JSON.parse(token)));
    }

    return (
        <Router>
            <div>
                <Switch>
                    <ProtectedRoute path="/dashboard" prevent={!token} redirect={"/"}
                                    component={Dashboard}/>
                    <ProtectedRoute path="/login" prevent={token !== undefined && token !== null} redirect={"/dashboard"}
                                    component={Login}/>
                    <ProtectedRoute path="/about" prevent={false} component={About}/>
                    <ProtectedRoute path="/" prevent={false} component={Home}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
