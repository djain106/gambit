import React, { useState } from 'react';
import Carousel from './Carousel'
import './Slots.css';

function Slots() {
    const items = {
        fruits: ["🍒", "🍉", "🍊", "🍓", "🍇", "🥝"]
    };
    const [fruit1, setFruit1] = useState("🍒");
    const [fruit2, setFruit2] = useState("🍒");
    const [fruit3, setFruit3] = useState("🍒");
    const [rolling, setRolling] = useState(false);

    function roll() {

    }

    return (
        <div className="border">
            <div className="machine">
                <Carousel></Carousel>
                <Carousel></Carousel>
                <Carousel></Carousel>
            </div>
        </div>
    )
}

export default Slots
