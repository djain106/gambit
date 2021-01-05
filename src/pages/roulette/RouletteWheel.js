import React from 'react'
import './Roulette.css'

const WHEEL_NUMBERS = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
const share = 360 / WHEEL_NUMBERS.length;

function RouletteWheel(props) {
    return (
        <div className={`circle${props.spinning ? " spinning" : ""}`} >
            {WHEEL_NUMBERS.map((num, index) =>
                <div key={index} className="slice" style={{
                    transform: `rotate(${((index * share) - (share / 2))}deg) skewY(${(share - 90)}deg)`
                }}>
                    <p className="text">
                        {num}
                    </p>
                </div>
            )}
            <div className="innerCircle"></div>
        </div>
    )
}
export default RouletteWheel
