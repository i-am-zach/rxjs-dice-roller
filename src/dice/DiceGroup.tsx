import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { BehaviorSubject } from 'rxjs'
import Dice from './Dice';
import { rollSubscriber, eventSubscriber } from "./diceService";
import { useMemo } from 'react';

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

export const diceSumSubject = new BehaviorSubject(0);

type DiceRoll = {
    rollValue: number,
    index: number,
}

export default function DiceGroup() {
    const [diceRolls, setDiceRolls] = useState<DiceRoll[]>([]);

    const getTotal = useMemo(() =>  diceRolls.reduce((reducer, obj) => reducer + obj.rollValue, 0), [diceRolls])

    useEffect(() => {
        const subscription = rollSubscriber.subscribe(rollObject => {
            setDiceRolls(oldDiceRolls => {
                oldDiceRolls = oldDiceRolls.filter(obj => obj.index !== rollObject.index);
                oldDiceRolls.push(rollObject);
                return oldDiceRolls;
            })
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    const onRollDice = () => {
        eventSubscriber.next("roll");
    }

    return (
        <div>
            <h1>Dice Group</h1>
            <button onClick={onRollDice}>Roll Dice</button>
            <div>Total:  {getTotal}</div>
            <StyledGrid>
                {Array.from([1, 2, 3, 4, 5]).map(index => <Dice index={index} key={index} />)}
            </StyledGrid>
        </div>
    )
}
