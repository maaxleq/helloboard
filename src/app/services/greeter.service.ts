import { Injectable } from '@angular/core';

interface Greet {
    minHour: number,
    maxHour: number,
    message: string,
}

@Injectable({
    providedIn: 'root'
})
export class GreeterService {

    private greets: Greet[] = [
        {
            minHour: 0,
            maxHour: 3,
            message: "Good night",
        },
        {
            minHour: 4,
            maxHour: 11,
            message: "Good morning",
        },
        {
            minHour: 12,
            maxHour: 18,
            message: "Good afternoon",
        },
        {
            minHour: 19,
            maxHour: 23,
            message: "Good evening",
        },
    ]

    constructor() { }

    private matchesGreet(targetHour: number, greet: Greet): boolean {
        return targetHour >= greet.minHour && targetHour <= greet.maxHour;
    }

    public getGreetMessage(targetHour: number): string | undefined {
        for (let greet of this.greets) {
            if (this.matchesGreet(targetHour, greet)){
                return greet.message;
            }
        }

        return undefined;
    }
}
