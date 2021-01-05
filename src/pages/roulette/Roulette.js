import React, { useState } from 'react'
import RouletteWheel from './RouletteWheel'
import RouletteTable from './RouletteTable';

const WHEEL_NUMBERS = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
const share = 360 / WHEEL_NUMBERS.length;

function Roulette() {
    const [spinning, setSpinning] = useState(false);
    const [selectedIndex, setSelected] = useState();

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
                <RouletteTable />
            </div>
        </div>
    )
}

export default Roulette
