import React from 'react'
import './TopBar.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Logo from "./gambit_logo.png";
import { useUser } from '../pages/contexts/user-context'
import LoginLogout from './components/LoginLogout'
import NavMenu from './components/NavMenu'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'sticky',
        display: 'flex',
        justifyContent: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

function TopBar() {
    const classes = useStyles();
    const { user } = useUser();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavMenu />
                    <div className="topBarTitle">
                        <AttachMoneyIcon />
                        <a href="/">
                            <img src={Logo} alt="" />
                        </a>
                        <AttachMoneyIcon />
                    </div>
                    <LoginLogout user={user} />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default TopBar