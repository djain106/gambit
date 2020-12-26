import React from 'react'
import './TopBar.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Button, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Logo from "./gambit_logo.png"

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

export default function TopBar() {
    const classes = useStyles();

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
                    <Button href="/login" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

