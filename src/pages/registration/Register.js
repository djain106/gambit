import axios from '../../services/axios.js';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import './Register.css';
import { useHistory } from 'react-router-dom';
import { useUser } from '../contexts/user-context';
import { useAuth } from '../contexts/auth-context'

function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertUsername, setAlertUsername] = useState("");
    const [alertPassword, setAlertPassword] = useState("");
    const history = useHistory();
    const { setUser } = useUser();
    const { setAuthCookie } = useAuth();

    useEffect(() => {
        setAlertUsername("");
        return () => { }
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        await axios.post('/auth/register', {
            username: username,
            password: password,
        }).then(function (res) {
            const token = res.data.token;
            setAuthCookie(token);
            setUser(res.data.user);
            history.push("/home");
        }).catch((err) => {
            console.error(err)
        });
    }

    function handleUsernameChange(event) {
        const currentUsername = event.target.value
        setUsername(currentUsername);
    }

    function handlePasswordChange(event) {
        const currentPassword = event.target.value;
        setPassword(currentPassword);
        if (currentPassword.length < 8) {
            setAlertPassword("Password is too short. Minimum 8 characters.");
        } else {
            setAlertPassword("");
        }
    }

    function handleConfirmPasswordChange(event) {
        const currentConfirmPassword = event.target.value;
        setConfirmPassword(currentConfirmPassword);
        if (password.length < 8) {
            return
        }
        if (currentConfirmPassword !== password) {
            setAlertPassword("Passwords do not match.")
        } else {
            setAlertPassword("");
        }
    }

    function validateFields() {
        return password.length > 0
            && username.length > 0
            && alertPassword.length === 0
            && alertUsername.length === 0;
    }

    return (
        <div className="appRegister">
            <h1> Welcome to Gambit! </h1>
            <form onSubmit={handleSubmit}>
                {alertUsername.length > 0 &&
                    <Alert variant="primary">
                        {alertUsername}
                    </Alert>
                }
                <FormGroup controlId="username">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={username}
                        onChange={e => handleUsernameChange(e)}
                    />
                </FormGroup>
                {alertPassword.length > 0 &&
                    <Alert variant="primary">
                        {alertPassword}
                    </Alert>
                }
                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => handlePasswordChange(e)}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        value={confirmPassword}
                        onChange={e => handleConfirmPasswordChange(e)}
                        type="password"
                    />
                </FormGroup>
                <Button block disabled={!validateFields()} type="submit">
                    Create User
                </Button>
            </form>
        </div>
    )
}

export default Registration
