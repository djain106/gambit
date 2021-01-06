import React, { useState } from 'react';
import RouletteWheel from './RouletteWheel';
import RouletteTable from './RouletteTable';
import numbers from './numbers.json';
import BetsTable from './BetsTable';
import { useUser } from '../contexts/user-context';
import validUser from '../../helpers/validUser';
import updateBalance from '../../helpers/updateBalance';

const WHEEL_NUMBERS = numbers.numbers;
const share = 360 / WHEEL_NUMBERS.length;

function Roulette() {
    const [spinning, setSpinning] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState();
    const [betAmount, setBetAmount] = useState(0);
    const [betList, setBetList] = useState([]);
    const [winnings, setWinnings] = useState();
    const { user, setUser } = useUser();

    function spin() {
        setSelectedIndex(Math.floor(Math.random() * Math.floor(WHEEL_NUMBERS.length)));
        setSpinning(true);
    }

    async function endSpin() {
        var netBet = calculateWinnings();
        if (netBet !== 0) {
            const updatedUser = await updateBalance(netBet);
            setUser(updatedUser);
        }
        setWinnings(netBet);
    }

    function reset() {
        setSpinning(false);
        setSelectedIndex(undefined);
        setBetList([]);
        setWinnings();
    }

    function calculateWinnings() {
        if (betList.length === 0) {
            return 0;
        }
        var total = 0;
        const winner = WHEEL_NUMBERS[selectedIndex];
        for (var i = 0; i < betList.length; i++) {
            var bet = parseInt(betList[i].n);
            var amount = betList[i].amount;
            if (Number.isInteger(bet)) {
                total += bet === winner.num ? 34 * amount : -amount;
            } else {
                const bet = betList[i].n;
                if (winner.num === 0) {
                    total -= amount;
                } else if (bet === 'EVEN') {
                    total += winner.num % 2 === 0 ? amount : -amount;
                } else if (bet === 'ODD') {
                    total += winner.num % 2 === 1 ? amount : -amount;
                } else if (bet === 'RED') {
                    total += winner.color === 'redN' ? amount : -amount;
                } else if (bet === 'BLACK') {
                    total += winner.color === 'blackN' ? amount : -amount;
                }
            }
        }
        return total;
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

    if (!validUser(user)) {
        return (
            <div className="border">
                <h2>Please <a href="/login">login</a> to continue.</h2>
            </div>
        )
    }

    return (
        <div className="border">
            <div className="table">
                <RouletteWheel
                    winner={selectedIndex}
                    numbers={WHEEL_NUMBERS}
                    share={share}
                    endSpin={endSpin}
                    spinning={spinning} />
                <RouletteTable
                    numbers={WHEEL_NUMBERS}
                    spinning={spinning}
                    addBet={addBet}
                />
                <BetsTable
                    winner={selectedIndex}
                    spin={spin}
                    reset={reset}
                    betList={betList}
                    netBet={winnings}
                />
            </div>
            <div className="center">
                <label style={{ marginRight: "10px" }}><b>Bet Amount</b></label>
                <input disabled={spinning} type="number" min="0" onChange={changeBetAmount} value={(betAmount === 0) ? '' : betAmount} />
            </div>
            <div className="center">
                <label style={{ marginRight: "10px" }}><b>Current Balance: {user.balance}</b></label>
            </div>
        </div>
    )
}

export default Roulette
