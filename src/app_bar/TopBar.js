import React, { useEffect, useState } from 'react'
import './TopBar.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Button, IconButton, Toolbar } from '@material-ui/core';
import jwt from 'jsonwebtoken'
import MenuIcon from '@material-ui/icons/Menu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Logo from "./gambit_logo.png";
import { useCookies, withCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'sticky',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
}));

function HeaderBar(props) {
    const classes = useStyles();
    const [cookies] = useCookies(['token']);
    const [username, setUsername] = useState("");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        try {
            var verified = jwt.verify(cookies['token'], props.privateKey);
            setUsername(verified.username);
            setBalance(verified.balance);
        } catch (err) {
            setUsername("");
            setBalance(0);
        }
        return () => { }
    }, [cookies, props.privateKey])

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div className="topBarTitle">
                        <AttachMoneyIcon />
                        <a href="/">
                            <img src={Logo} alt="" />
                        </a>
                        <AttachMoneyIcon />
                    </div>
                    {!(username) &&
                        <Button href="/login" color="inherit">Login</Button>}
                    {username &&
                        <div>
                            <Button href="/home" color="inherit" onClick={props.onLogout}>Logout</Button>
                            <h2>{username}</h2>
                            <h4>{balance}</h4>
                        </div>}
                </Toolbar>
            </AppBar>
        </div>
    )
}

const TopBar = withCookies(HeaderBar);

export default TopBar