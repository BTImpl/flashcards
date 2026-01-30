import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent {
  private router = inject(Router);

  user = 'Gabi';
  listName = 'Known';

  toHome(){
    this.router.navigate(['/']);
  }

}
