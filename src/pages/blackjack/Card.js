import React from 'react'
import './Card.css'

function Card(props) {
    const hidden = props.hidden;
    const suit = props.suit;
    const value = props.value;
    const color = (suit === "♠" || suit === "♣") ? "black" : "red";

    if (hidden) {
        return <div className="hiddenCard" />
    }
    return (
        <div className="card">
            <div className={color}>
                <h1 className={value}>{value}</h1>
                <h1 className={suit}>{suit}</h1>
            </div>
        </div>
    )
}

export default Card
