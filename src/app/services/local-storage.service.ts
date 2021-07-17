import { Injectable } from '@angular/core';
import { Weather } from '../models/weather';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    setName(name: string): string {
        localStorage.setItem("name", name);

        return name;
    }

    getName(): string | null {
        return localStorage.getItem("name");
    }

    setItems(repository: string, items: string[]): string[] {
        localStorage.setItem(repository, JSON.stringify(items));

        return items;
    }

    getItems(repository: string): string[] | null {
        let stringified = localStorage.getItem(repository);

        if (stringified){
            return JSON.parse(stringified);
        }
        else {
            return null;
        }
    }
    
    setLastWeatherFetch(lastFetch: number): number {
        localStorage.setItem("last_weather_fetch", lastFetch.toString());

        return lastFetch;
    }

    getLastWeatherFetch(): number {
        const lastFetch = localStorage.getItem("last_weather_fetch");
        if (lastFetch === null){
            return 0;
        }
        else {
            return parseInt(lastFetch);
        }
    }

    setLastForecastFetch(lastFetch: number): number {
        localStorage.setItem("last_forecast_fetch", lastFetch.toString());

        return lastFetch;
    }

    getLastForecastFetch(): number {
        const lastFetch = localStorage.getItem("last_forecast_fetch");
        if (lastFetch === null){
            return 0;
        }
        else {
            return parseInt(lastFetch);
        }
    }

    setWeather(weather: Weather): Weather {
        localStorage.setItem("weather", JSON.stringify(weather));

        return weather;
    }

    getWeather(): Weather | null {
        let stringified = localStorage.getItem("weather");

        if (stringified){
            return JSON.parse(stringified);
        }
        else {
            return null;
        }
    }

    setForecast(forecast: Weather[]): Weather[] {
        localStorage.setItem("forecast", JSON.stringify(forecast));

        return forecast;
    }

    getForecast(): Weather[] | null {
        let stringified = localStorage.getItem("forecast");

        if (stringified){
            return JSON.parse(stringified);
        }
        else {
            return null;
        }
    }

    setPreviousCity(city: string): string {
        localStorage.setItem("prev_city", city);

        return city;
    }

    getPreviousCity(): string | null {
        return localStorage.getItem("prev_city");
    }

    setCity(city: string): string {
        localStorage.setItem("city", city);
        this.setPreviousCity(city);

        return city;
    }

    getCity(): string | null {
        return localStorage.getItem("city");
    }

    clearWeather() {
        localStorage.removeItem("weather");
    }

    clearForecast() {
        localStorage.removeItem("forecast");
    }
}
