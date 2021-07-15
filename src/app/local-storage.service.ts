import { Injectable } from '@angular/core';

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
}
