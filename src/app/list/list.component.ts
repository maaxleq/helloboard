import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Ui } from '../models/ui';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    @Input() question?: string;
    @Input() repository?: string;
    currentItem: string = "";
    items: string[] = [];
    @Input() ui: Ui = "light";

    constructor(
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        if (this.repository){
            this.items = this.localStorageService.getItems(this.repository) ?? [];
        }
    }

    add(){
        if (this.currentItem.length > 0){
            this.items.push(this.currentItem);
            this.currentItem = "";
    
            this.saveItems();
        }
    }

    remove(item: string){
        this.items = this.items.filter((value, index, array) => {
            return value !== item;
        });

        this.saveItems();
    }

    saveItems(): void {
        if (this.repository){
            this.items = this.localStorageService.setItems(this.repository, this.items);
        }
    }
}
