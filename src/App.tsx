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
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
