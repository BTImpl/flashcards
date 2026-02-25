import { Component } from '@angular/core';
import { NavigationCardComponent } from './navigation-card/navigation-card.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [NavigationCardComponent],
    standalone: true
})
export class HomeComponent {



}
