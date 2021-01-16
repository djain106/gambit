import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login/Login'
import Home from './home/Home'
import Register from './registration/Register'
import BlackJack from './blackjack/Blackjack'
import Roulette from './roulette/Roulette'
import Slots from './slots/Slots'

function NavRouter(props) {
    return (
        <div className="navSwitch">
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login onLogin={props.onLogin} />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/blackjack">
                        <BlackJack />
                    </Route>
                    <Route path="/roulette">
                        <Roulette />
                    </Route>
                    <Route path="/slots">
                        <Slots />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default NavRouter
