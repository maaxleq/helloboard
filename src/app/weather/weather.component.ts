import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../models/weather';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    weather?: Weather = undefined;
    forecast?: Weather[] = undefined;
    city?: string = undefined;
    private secsBetweenRefreshes: number = 60;

    constructor(
        private weatherService: WeatherService,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.city = this.localStorageService.getCity() ?? undefined;

        setInterval(() => {
            this.refresh();
        }, this.secsBetweenRefreshes * 1000);
        this.refresh();
    }

    getFormattedDateOfTimestamp(timestamp: number): string {
        const date = new Date(timestamp * 1000);

        let month = date.getMonth().toString();
        if (month.length === 1) {
            month = `0${month}`;
        }

        let day = date.getDate().toString();
        if (length === 1) {
            day = `0${day}`;
        }

        return `${month}-${day}`;
    }

    getFormattedTimeOfTimestamp(timestamp: number): string {
        const date = new Date(timestamp * 1000);

        let hours = date.getHours().toString();
        if (hours.length === 1) {
            hours = `0${hours}`;
        }

        let minutes = date.getMinutes().toString();
        if (minutes.length === 1) {
            minutes = `0${minutes}`;
        }

        return `${hours}:${minutes}`;
    }

    canDisplayWeather(): boolean {
        return this.city !== undefined && this.weather !== undefined && this.forecast !== undefined;
    }

    refresh(){
        if (this.city){
            this.weatherService.getWeather(this.city).subscribe(weather => {
                this.weather = weather ?? undefined;
                this.saveWeather();
            });
            this.weatherService.getForecast(this.city).subscribe(forecast => {
                this.forecast = forecast ?? undefined;
                this.saveForecast();
            });

            this.localStorageService.setCity(this.city);
        }
        else {
            this.weather = undefined;
            this.forecast = undefined;

            this.localStorageService.clearWeather();
            this.localStorageService.clearForecast();
        }
    }

    private saveWeather(){
        if (this.weather){
            this.localStorageService.setWeather(this.weather);
        }
        else {
            this.localStorageService.clearWeather();
        }
    }

    private saveForecast(){
        if (this.forecast){
            this.localStorageService.setForecast(this.forecast);
        }
        else {
            this.localStorageService.clearForecast();
        }
    }
}
