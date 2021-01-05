import React from 'react'
import './Roulette.css'

function RouletteTable({
    spin = () => { },
    endSpin = () => { } }
) {
    return (
        <div>
            <button onClick={spin}>Spin</button>
            <button onClick={endSpin}>Reset</button>
        </div>
    )
}

export default RouletteTable
