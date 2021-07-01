import React, { useState } from 'react'
import { useEffect } from 'react';
import { eventSubject, diceService } from "./diceService"

export type DiceComponentProps = {
    index: number,
}

export default function Dice({ index }: DiceComponentProps) {
    const [rollNumber, setRollNumber] = useState(1);

    useEffect(() => {
        const subscription = eventSubject.subscribe(event => {
            if (event === "roll") {
                const newNumber = Math.ceil(Math.random() * 6);
                diceService.roll(newNumber, index);
                setRollNumber(newNumber);
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [])



    return (
        <div>
            <h2>Dice</h2>
            <h3>Current roll: {rollNumber}</h3>
        </div>
    )
}
