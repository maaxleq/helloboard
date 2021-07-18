import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Ui } from '../models/ui';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    name: string = "";
    date?: Date;
    @Input() ui: Ui = "light";
    @Output() changeUiEvent = new EventEmitter<Ui>();

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

    switchUi(): void {
        if (this.ui === "light"){
            this.ui = "dark";
        }
        else {
            this.ui = "light";
        }

        this.changeUiEvent.emit(this.ui);
    }

    getUiIconName(): string {
        return `${this.ui}_mode`;
    }

    saveName(): void {
        this.localStorageService.setName(this.name);
    }

    getFormattedDate(): string {
        if (this.date) {
            let year = this.date.getFullYear().toString();

            let month = (this.date.getMonth() + 1).toString();
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
