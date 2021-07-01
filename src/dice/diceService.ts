import { BehaviorSubject } from "rxjs";

type DiceRollObject = {
    rollValue: number,
    index: number,
}

export const rollSubject = new BehaviorSubject<DiceRollObject>({ rollValue: 0, index: -1 });
export const eventSubject = new BehaviorSubject<"roll">("roll");

export const diceService = {
    roll: function (rollValue: number, index: number) {
        rollSubject.next({ rollValue, index });
    },
    requestRolls: function () {
        eventSubject.next("roll");
    }
}
