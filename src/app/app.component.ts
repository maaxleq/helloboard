import { Component } from '@angular/core';

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
}
