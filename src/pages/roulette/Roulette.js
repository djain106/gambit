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
    const [betList, setBetList] = useState([])

    function spin() {
        setSelected(Math.floor(Math.random() * Math.floor(WHEEL_NUMBERS.length)));
        setSpinning(true);
    }

    function endSpin() {
    }

    function reset() {
        setSpinning(false);
        setSelected(undefined);
        setBetList([]);
    }

    function addBet(nums) {
        if (betAmount === 0) {
            return;
        }
        var added = false;
        var bets = [...betList];
        for (var i = 0; i < bets.length; i++) {
            if (bets[i]["n"] === nums.toString()) {
                added = true;
                bets[i]["amount"] += betAmount;
            }
        }
        if (!added) {
            bets.push({
                n: nums.toString(),
                amount: betAmount
            })
        }
        setBetList(bets);
    }

    function changeBetAmount(e) {
        const value = e.target.value;
        setBetAmount(Math.abs(Math.trunc(value)))
    }

    return (
        <div className="border">
            <div className="table">
                <RouletteWheel
                    winner={selectedIndex}
                    numbers={WHEEL_NUMBERS}
                    share={share}
                    spinning={spinning} />
                <RouletteTable
                    numbers={WHEEL_NUMBERS}
                    spinning={spinning}
                    addBet={addBet}
                />
                <BetsTable
                    winner={selectedIndex}
                    spin={spin}
                    endSpin={endSpin}
                    reset={reset}
                    betList={betList}
                />
            </div>
            <div className="betting">
                <label style={{ marginRight: "10px" }}><b>Bet Amount</b></label>
                <input type="number" min="0" onChange={changeBetAmount} value={(betAmount === 0) ? '' : betAmount} />
            </div>
        </div>
    )
}

export default Roulette
