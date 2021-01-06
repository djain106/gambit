import React, { useState } from 'react';
import RouletteWheel from './RouletteWheel';
import RouletteTable from './RouletteTable';
import numbers from './numbers.json';
import BetsTable from './BetsTable';

const WHEEL_NUMBERS = numbers.numbers;
const share = 360 / WHEEL_NUMBERS.length;

function Roulette() {
    const [spinning, setSpinning] = useState(false);
    const [selectedIndex, setSelected] = useState();
    const [betAmount, setBetAmount] = useState(0);
    let betPicks = new Set();

    function spin() {
        setSelected(Math.floor(Math.random() * Math.floor(WHEEL_NUMBERS.length)));
        setSpinning(true);
    }

    function endSpin() {
    }

    function reset() {
        setSpinning(false);
        setSelected(undefined);
    }

    function addBetNum(num) {
        console.log(num);

    }

    function changeBetAmount(e) {
        const value = e.target.value;
        setBetAmount(Math.abs(Math.trunc(value)))
    }

    return (
        <div className="border">
            <div className="table">
                <RouletteWheel
                    spin={spin}
                    endSpin={endSpin}
                    winner={selectedIndex}
                    numbers={WHEEL_NUMBERS}
                    share={share}
                    spinning={spinning}
                    reset={reset} />
                <RouletteTable
                    numbers={WHEEL_NUMBERS}
                    spinning={spinning}
                    addBet={addBetNum}
                />
                <BetsTable />
            </div>
            <div className="betting">
                <label style={{ marginRight: "10px" }}><b>Chip Amount</b></label>
                <input type="number" min="0" onChange={changeBetAmount} value={(betAmount === 0) ? '' : betAmount} />
            </div>
        </div>
    )
}

export default Roulette
