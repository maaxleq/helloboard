import { Component } from '@angular/core';
import { Ui } from './models/ui';
import { LocalStorageService } from './services/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'helloboard';

    todoQuestion = "What to do ?";
    notesQuestion = "What to remember ?";

    todoRepository = "todo";
    notesRepository = "notes";

    ui: Ui = "light";

    constructor(
        private localStorageService: LocalStorageService
    ) {}

    ngOnInit(): void {
        this.ui = this.localStorageService.getUi() ?? "light";
    }

    setUi(ui: Ui): void {
        this.ui = ui;

        this.localStorageService.setUi(this.ui);
    }
}
