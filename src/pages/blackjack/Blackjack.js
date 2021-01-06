import React, { useState } from 'react'
import { useUser } from '../contexts/user-context'
import validUser from '../../helpers/validUser';
import Card from './Card'
import './Blackjack.css'
import jsonDeck from './deck.json'
import { Button } from 'react-bootstrap';
import updateBalance from '../../helpers/updateBalance.js'

function Blackjack() {
    // Enums
    const Gamestate = {
        BETTING: "betting",
        USER: "userTurn",
        DEALER: "dealerTurn",
        DONE: "done",
    }

    // Variables
    const data = JSON.parse(JSON.stringify(jsonDeck.cards));
    const faceCards = ['K', 'Q', 'J'];
    const { user, setUser } = useUser();
    const [dealerValue, setDealerValue] = useState(0);
    const [playerValue, setPlayerValue] = useState(0);
    const [deck, setDeck] = useState(data);
    const [betAmount, setBetAmount] = useState(1);
    const [gamestate, setGamestate] = useState(Gamestate.BETTING);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [winner, setWinner] = useState("");

    // Functions
    function verifyBetAmount(e) {
        setBetAmount(Math.min(Math.abs(Math.trunc(e.target.value)), user.balance))
    }

    function pickCards(count) {
        const cards = [];
        for (var i = 0; i < count; i++) {
            var index = Math.floor(Math.random() * deck.length);
            var card = deck[index];
            card["hidden"] = false;
            var newDeck = deck;
            newDeck.splice(index, 1);
            setDeck(newDeck);
            cards.push(card);
        }
        return cards
    }

    function calculateValue(cards) {
        var value = 0;
        var aces = 0;
        cards.forEach((card) => {
            if (card.value === 'A')
                aces += 1;
            else
                value += getCardValue(card.value);
        });
        if (value + aces >= 21 || aces === 0) {
            return value + aces
        }

        while (value + 11 <= 21 && aces === 1) {
            aces -= 1
            value += 11
        }

        return value + aces
    }

    function getCardValue(value) {
        if (faceCards.includes(value)) {
            return 10
        } else {
            return parseInt(value);
        }
    }

    async function dealCards() {
        setGamestate(Gamestate.USER);
        const updatedUser = await updateBalance(-1 * betAmount);
        setUser(updatedUser);
        const pCards = pickCards(2);
        setPlayerCards(pCards);
        setPlayerValue(calculateValue(pCards));
        var dCards = pickCards(2);
        dCards[1].hidden = true;
        setDealerCards(dCards);
        setDealerValue(calculateValue([dCards[0]]));
    }

    function hit(cards) {
        var newCard = pickCards(1);
        cards.push(newCard[0]);
        const value = calculateValue(cards);
        setPlayerCards(cards);
        setPlayerValue(value);
        if (value >= 21) {
            playDealer();
        }
    }

    function playDealer() {
        setGamestate(Gamestate.DEALER);
        var cards = dealerCards;
        cards.forEach((card) => card.hidden = false)
        var value = calculateValue(cards);
        while (value < 17) {
            var newCard = pickCards(1)[0];
            cards.push(newCard);
            value = calculateValue(cards);
        }

        setDealerCards(cards);
        setDealerValue(value);
        calculateWinner(value)
    }

    async function calculateWinner(value) {
        if (playerValue > 21) {
            setWinner(': Bust');
        } else if (playerValue === value) {
            setWinner(': Draw');
            const updatedUser = await updateBalance(betAmount);
            setUser(updatedUser);
        } else if (value < 22 && value > playerValue) {
            setWinner(': Dealer Wins');
        } else {
            setWinner(': Player Wins!');
            const updatedUser = await updateBalance(2 * betAmount);
            setUser(updatedUser);
        }
        setGamestate(Gamestate.DONE);
    }

    async function reset(changeBet) {
        setDeck(data);
        setDealerValue(0);
        setPlayerValue(0);
        setPlayerCards([]);
        setDealerCards([]);
        setWinner("");
        setGamestate(Gamestate.BETTING);
        if (changeBet || user.balance === 0) {
            setBetAmount(0);
        } else {
            setBetAmount(Math.min(user.balance, betAmount));
        }
    }

    // Renders
    if (!validUser(user)) {
        return (
            <div className="border">
                <h2>Please <a href="/login">login</a> to continue.</h2>
            </div>
        )
    }

    return (
        <div className="border">
            <div className="gameboard">
                <h2>BlackJack {winner}</h2>
                <h4 hidden={gamestate === Gamestate.BETTING}>Dealer's Hand ({dealerValue})</h4>
                <div className="card-spot">
                    {dealerCards.map((card, index) =>
                        <Card key={index} value={card.value} suit={card.suit} hidden={card.hidden} />)}
                </div>
                <div className="card-spot">
                    {playerCards.map((card, index) =>
                        <Card key={index} value={card.value} suit={card.suit} hidden={card.hidden} />)}
                </div>
                <h4 hidden={gamestate === Gamestate.BETTING}>Your Hand ({playerValue})</h4>
                <h4 hidden={gamestate !== Gamestate.BETTING}>Current Balance: {user.balance}</h4>
                <div className="buttons">
                    <label><b>Bet Amount</b></label>
                    <input type="number" min={1} max={user.balance} pattern="\d+" value={betAmount} onChange={(e) => verifyBetAmount(e)} disabled={gamestate !== Gamestate.BETTING} />
                    <Button onClick={() => dealCards()} hidden={gamestate !== Gamestate.BETTING} disabled={betAmount <= 0}>Bet</Button>
                    <Button onClick={() => hit(playerCards)} disabled={gamestate !== Gamestate.USER} hidden={gamestate !== Gamestate.USER}>Hit</Button>
                    <Button onClick={() => playDealer()} disabled={gamestate !== Gamestate.USER} hidden={gamestate !== Gamestate.USER}>Stand</Button>
                    <Button onClick={() => reset(true)} disabled={gamestate !== Gamestate.DONE} hidden={gamestate !== Gamestate.DONE}>Change Bet</Button>
                    <Button onClick={() => reset(false)} disabled={gamestate !== Gamestate.DONE} hidden={gamestate !== Gamestate.DONE}>Redo Bet</Button>
                </div>
            </div>
        </div>
    )
}

export default Blackjack
