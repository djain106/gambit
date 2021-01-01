import React, { useRef } from 'react';
import { useDetectOutsideClick } from '../../helpers/useDetectOutsideClick'
import './NavMenu.css'
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function NavMenu() {
    const dropdownRef = useRef(null);
    const [show, setShow] = useDetectOutsideClick(dropdownRef, false);

    return (
        <div className="navig-container">
            <IconButton edge="start" color="inherit" aria-label="navig" onClick={() => setShow(!show)}>
                <MenuIcon />
            </IconButton>
            <nav
                ref={dropdownRef}
                className={`navig ${show ? "active" : "inactive"}`}
            >
                <ul>
                    <li>
                        <p><b>Games</b></p>
                    </li>
                    <li>
                        <a href="/blackjack">BlackJack</a>
                    </li>
                    <li>
                        <a href="/roulette">Roulette</a>
                    </li>
                    <li>
                        <a href="/slots">Slots</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavMenu
