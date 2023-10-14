import React, { useState, useEffect } from "react";
import './index.css'
import Die from './components/die';
import { nanoid } from "nanoid";
import Confetti from 'react-confetti';
function App() {

    const [dieNum, setDieNum] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = dieNum.every(die => die.isHeld)
        const firstValue = dieNum[0].value
        const allSameValue = dieNum.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("you won")
        }
    }, [dieNum])


    const dieceElement = dieNum.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    function allNewDice() {
        let arrNumber = [];
        for (let i = 0; i < 10; i++) {
            arrNumber.push(generateNewDie());
        }
        return arrNumber
    }

    function generateNewDie() {
        let num = Math.floor(Math.random() * 6) + 1;        //Math.ceil(Math.random()*6)
        return {
            value: num,
            isHeld: false,
            id: nanoid()
        }
    }

    function rollDice() {
        if (!tenzies) {
            setDieNum(prevState => prevState.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDieNum(allNewDice())
        }
    }

    function holdDice(id) {
        setDieNum(prevState => prevState.map(die => {
            return die.id === id ?
                {
                    ...die,
                    isHeld: !die.isHeld

                } : die
        }))

    }
    return (
        <div>
            <main className="squear">
                {tenzies && <Confetti />}
                <div className="squear1">
                    <h1>Tenzies</h1>
                    <p>Roll until all dice are the same.<br />Click each die to freeze it at its current value<br /> between rolls.</p>
                    <div className="dice-container">
                        {dieceElement}
                    </div>
                    <button
                        onClick={rollDice}
                        className="rollbtn"
                    >
                        {tenzies ? "new game" : "roll"}
                    </button>
                </div>
            </main>
        </div>
    )
} export default App