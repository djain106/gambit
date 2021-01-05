import React from 'react'
import './Roulette.css'

function RouletteWheel(props) {
    const share = props.share;
    const winningIndex = props.winner;
    let startSpin = `
    @keyframes spinning {
        from { transform: rotate(0); }
        to { transform: rotate(${(winningIndex * share) + 360}deg); }
    }
    `;
    return (
        <div className={`circle${props.spinning ? " spinning" : ""}`}>
            {props.numbers.map((num, index) =>
                <div key={index} className="slice" style={{
                    transform: `rotate(${((index * share) - (share / 2))}deg) skewY(${(share - 90)}deg)`
                }}>
                    <p className="text">
                        {num}
                    </p>
                </div>
            )}
            <style children={startSpin} />
            <div className="innerCircle"></div>
        </div>
    )
}
export default RouletteWheel
