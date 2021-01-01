import axios from '../../services/axios.js';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import './Register.css';
import { useHistory } from 'react-router-dom';
import { useUser } from '../contexts/user-context';
import { useAuth } from '../contexts/auth-context'
import validUser from '../../helpers/validUser';

function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();
    const { user, setUser } = useUser();
    const { setAuthCookie } = useAuth();
    const [usernameAlert, setUsernameAlert] = useState(false);

    useEffect(() => {
        if (validUser(user)) {
            history.push("/home");
        }
        return () => { }
    }, [user, history])

    useEffect(() => {
        setUsernameAlert(false);
        return () => { }
    }, [username])

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
            setUsernameAlert(true);
            setPassword("");
            setConfirmPassword("");
            console.error(err)
        });
    }

    function validateFields() {
        return password.length >= 8
            && username.length >= 5
            && confirmPassword.length >= 8
            && password === confirmPassword;
    }

    return (
        <div className="appRegister">
            <h1> Welcome to Gambit! </h1>
            <form onSubmit={handleSubmit}>
                {username.length < 5 && username.length !== 0 &&
                    <Alert variant="primary">
                        Username is too short. (Minimum 5 characters.)
                    </Alert>
                }
                {usernameAlert &&
                    <Alert variant="primary">
                        Username is already taken.
                    </Alert>}
                <FormGroup controlId="username">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                {password.length < 8 && password.length !== 0 &&
                    <Alert variant="primary">
                        Password is too short. (Minimum 8 characters.)
                    </Alert>
                }
                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                {confirmPassword.length !== 0 && confirmPassword !== password &&
                    <Alert variant="primary">
                        Passwords do not match.
                    </Alert>
                }
                <FormGroup controlId="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
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
