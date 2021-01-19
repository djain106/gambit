import React, { useState } from 'react';
import Carousel from './Carousel'
import './Slots.css';

function Slots() {
    return (
        <div className="border">
            <div className="machine">
                <Carousel ringId={1}></Carousel>
                <Carousel ringId={2}></Carousel>
                <Carousel ringId={3}></Carousel>
            </div>
        </div>
    )
}

export default Slots
