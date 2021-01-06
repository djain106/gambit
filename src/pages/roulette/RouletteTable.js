import React from 'react'
import './Roulette.css'

function RouletteTable(props) {
    let numbers = [...props.numbers];
    numbers.sort((a, b) => (a.num > b.num) ? 1 : -1);
    numbers.splice(0, 1);
    const items = [];
    for (let i = 0; i < 3; i++) {
        const innerButtons = []
        for (let j = 0; j < 12; j++) {
            const numIndex = (i * 12) + j;
            innerButtons.push(<button
                key={numbers[numIndex].num}
                onClick={() => props.addBet(numbers[numIndex].num.toString())}
                className={numbers[numIndex].color}>{numbers[numIndex].num}</button>)
        }
        items.push(<div key={i} className="section">{innerButtons}</div>)
    }

    return (
        <div hidden={props.spinning} className="betTable" style={{ marginRight: "20px" }}>
            <div>
                <button
                    onClick={() => props.addBet(0)}
                    className={`zero ${props.numbers[0].color}`}>{props.numbers[0].num}</button>
                {items}
            </div>
            <div className="extraButtons">
                <button onClick={() => props.addBet('EVEN')} className="greenN">EVEN</button>
                <button onClick={() => props.addBet('RED')} className="redN">Red</button>
                <button onClick={() => props.addBet('BLACK')} className="blackN">Black</button>
                <button onClick={() => props.addBet('ODD')} className="greenN">ODD</button>
            </div>
        </div>
    )
}

export default RouletteTable
