import React, { useEffect, useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './Login.css';
import axios from '../../services/axios.js';
import { Alert } from 'react-bootstrap';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState({});
    const [loginAlert, setLoginAlert] = useState("");
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/users');
            const hashMap = req.data.reduce(function (map, obj) {
                map[obj.username] = obj;
                return map
            }, {});
            setUsers(hashMap);
        }
        fetchData();
        return () => { }
    }, [])

    function validateFormFields() {
        return (username.length >= 5 && password.length >= 8);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setPassword("");
        if (users.hasOwnProperty(username)) {
            if (bcrypt.compareSync(password, users[username]["password"])) {
                props.onLogin(username, users[username]["balance"]);
                history.push('/home');
            }
        }
        setLoginAlert("Incorrect username or password!");
    }

    return (
        <div className="appLogin">
            <h1> Welcome to Gambit! </h1>
            <form onSubmit={handleSubmit}>
                {loginAlert.length > 0 &&
                    <Alert variant="primary">
                        {loginAlert}
                    </Alert>
                }
                <FormGroup controlId="username">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block disabled={!validateFormFields()} type="submit">
                    Login
                </Button>
                <Button block href="/register">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default Login
