import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    name: string = "";
    date?: Date;

    constructor(
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.name = this.localStorageService.getName() ?? "";
        this.date = new Date();

        setInterval(() => {
            this.date = new Date();
        }, 1000);
    }

    saveName(): void {
        this.name = this.localStorageService.setName(this.name);
    }

    getFormattedDate(): string {
        if (this.date) {
            let year = this.date.getFullYear().toString();

            let month = this.date.getMonth().toString();
            if (month.length === 1) {
                month = `0${month}`;
            }

            let date = this.date.getDate().toString();
            if (date.length === 1) {
                date = `0${date}`;
            }

            return `${year}-${month}-${date}`;
        }
        else {
            return "No date";
        }
    }

    getFormattedTime(): string {
        if (this.date) {
            let hours = this.date.getHours().toString();
            if (hours.length === 1) {
                hours = `0${hours}`;
            }

            let minutes = this.date.getMinutes().toString();
            if (minutes.length === 1) {
                minutes = `0${minutes}`;
            }

            let seconds = this.date.getSeconds().toString();
            if (seconds.length === 1) {
                seconds = `0${seconds}`;
            }

            return `${hours}:${minutes}:${seconds}`;
        }
        else {
            return "No time";
        }
    }
}
