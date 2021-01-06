import React, { useEffect, useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import './Login.css';
import { useUser } from '../contexts/user-context'
import { useHistory } from 'react-router-dom';
import validUser from '../../helpers/validUser';

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginAlert, setLoginAlert] = useState("");
    const history = useHistory();
    const { user } = useUser();

    function validateFormFields() {
        return (username.length >= 5 && password.length >= 8);
    }

    useEffect(() => {
        if (validUser(user)) {
            setLoginAlert("");
            history.push('/home');
        }
        return () => { }
    }, [user, history])

    async function handleSubmit(e) {
        e.preventDefault();
        setPassword("");
        props.onLogin(username, password);
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
