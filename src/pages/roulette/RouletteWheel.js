import React from 'react'
import './Roulette.css'
import { Button } from 'react-bootstrap'

function RouletteWheel(props) {
    const share = props.share;
    const winningIndex = props.winner;
    const spinning = props.spinning;
    let startSpin = `
    @keyframes spinning {
        from { transform: rotate(0); }
        to { transform: rotate(${(winningIndex * share) + 360}deg); }
    }
    `;
    return (
        <div>
            <div className="pointer"></div>
            <div className={`circle${spinning ? " spinning" : ""}`}>
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
                <div className="innerCircle"><p className="gambit">Gambit</p></div>
            </div>
            <div className="controls">
                <Button hidden={winningIndex !== undefined} onClick={props.spin} onAnimationEnd={props.endSpin}>Spin</Button>
                <Button hidden={winningIndex === undefined} onClick={props.reset}>Reset</Button>
            </div>
        </div>
    )
}
export default RouletteWheel
