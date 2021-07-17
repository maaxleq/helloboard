import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Weather } from '../models/weather';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    secsBetweenApiCalls: number = 3600;

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    private getUrl(type: "weather" | "forecast", city: string) {
        return `https://dashboard.maxleq.com/api/${type}/${city}`;
    }

    private isWeatherSaved(): boolean {
        return this.localStorageService.getWeather() !== null;
    }

    private isForecastSaved(): boolean {
        return this.localStorageService.getForecast() !== null;
    }

    private isNewWeatherCallAvailable(): boolean {
        return (Date.now() / 1000) - this.localStorageService.getLastWeatherFetch() > this.secsBetweenApiCalls;
    }

    private isNewForecastCallAvailable(): boolean {
        return (Date.now() / 1000) - this.localStorageService.getLastForecastFetch() > this.secsBetweenApiCalls;
    }

    private isNewCity(city: string): boolean {
        return city !== this.localStorageService.getPreviousCity();
    }

    public getWeather(city: string): Observable<Weather | null> {
        if (this.isNewWeatherCallAvailable() || ! this.isWeatherSaved() || this.isNewCity(city)) {
            return this.fetchWeather(city);
        }
        else {
            return this.loadWeather(city);
        }
    }

    public getForecast(city: string): Observable<Weather[] | null> {
        if (this.isNewForecastCallAvailable() || ! this.isForecastSaved() || this.isNewCity(city)) {
            return this.fetchForecast(city);
        }
        else {
            return this.loadForecast(city);
        }
    }

    private loadWeather(city: string): Observable<Weather | null> {
        return of(this.localStorageService.getWeather());
    }

    private loadForecast(city: string): Observable<Weather[] | null> {
        return of(this.localStorageService.getForecast());
    }

    private handleError<T>(result?: T){
        return (error: any) => {
            return of (result as T);
        }
    }

    private fetchWeather(city: string): Observable<Weather | null> {
        const url = this.getUrl("weather", city);

        this.localStorageService.setLastWeatherFetch((Date.now() / 1000));

        try {
            return this.http.get<Weather>(url).pipe(
                catchError(this.handleError<Weather | null>(null))
            );
        }
        catch (e) {
            return of(null);
        }
    }

    private fetchForecast(city: string): Observable<Weather[] | null> {
        const url = this.getUrl("forecast", city);

        this.localStorageService.setLastForecastFetch((Date.now() / 1000));

        try {
            return this.http.get<Weather[]>(url).pipe(
                catchError(this.handleError<Weather[] | null>(null))
            );
        }
        catch (e) {
            return of(null);
        }
    }
}
