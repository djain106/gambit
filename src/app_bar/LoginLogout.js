import React from 'react'
import { Button } from '@material-ui/core';
import { useAuth } from '../pages/contexts/auth-context'
import validUser from '../pages/validUser'

function LoginLogout(props) {
    const user = props.user;
    const { setAuthCookie } = useAuth();

    function appLogout(e) {
        e.preventDefault();
        setAuthCookie("");
    }

    if (!validUser(user)) {
        return <Button href="/login" color="inherit">Login</Button>;
    }
    return (
        <div>
            <Button href="/home" color="inherit" onClick={appLogout}>Logout</Button>
            <h2>{user.username}</h2>
            <h4>{user.balance}</h4>
        </div>
    )
}

export default LoginLogout
