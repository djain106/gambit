import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from '../../pages/contexts/auth-context';
import validUser from '../../helpers/validUser';
import { useDetectOutsideClick } from '../../helpers/useDetectOutsideClick'
import { useUser } from '../../pages/contexts/user-context'
import './LoginLogout.css'

function LoginLogout(props) {
    const { user } = useUser();
    const { setAuthCookie } = useAuth();
    const dropdownRef = useRef(null);
    const [show, setShow] = useDetectOutsideClick(dropdownRef, false);

    function appLogout(e) {
        e.preventDefault();
        setAuthCookie("");
    }

    if (!validUser(user)) {
        return <Button href="/login" color="inherit">Login</Button>;
    }
    return (
        <div className="menu-container">
            <button onClick={() => setShow(!show)} className="menu-trigger">
                <span>{user.username}</span>
            </button>
            <nav
                ref={dropdownRef}
                className={`menu ${show ? "active" : "inactive"}`}
            >
                <ul>
                    <li>
                        <p><b>Balance: {user.balance}</b></p>
                    </li>
                    <li>
                        <a href="/">Profile</a>
                    </li>
                    <li>
                        <a onClick={appLogout} href="/">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default LoginLogout
