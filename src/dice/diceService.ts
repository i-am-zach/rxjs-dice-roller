import { BehaviorSubject } from "rxjs";

type DiceRollObject = {
    rollValue: number,
    index: number,
}

export const rollSubscriber = new BehaviorSubject<DiceRollObject>({ rollValue: 0, index: -1 });
export const eventSubscriber = new BehaviorSubject<"roll">("roll");

export const diceService = {
    roll: function (rollValue: number, index: number) {
        rollSubscriber.next({ rollValue, index });
    },
    requestRolls: function () {
        eventSubscriber.next("roll");
    }
}
