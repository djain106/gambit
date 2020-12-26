import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login/Login'
import Home from './home/Home'
import Register from './registration/Register'
import './NavSwitch.css'

function NavSwitch() {
    return (
        <div className="navSwitch">
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default NavSwitch
