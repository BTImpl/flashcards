import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-footer',
  imports: [ TranslatePipe],
  templateUrl: './navigation-footer.component.html',
  styleUrls: ['./navigation-footer.component.css'],
  standalone: true
})
export class NavigationFooterComponent {
  @Input() backDisabled: boolean = false;
  @Input() nextDisabled: boolean = false;
  @Output() backClicked = new EventEmitter<void>();
  @Output() nextClicked = new EventEmitter<void>();

  back() {
    this.backClicked.emit();
  }

  next() {
    this.nextClicked.emit();
  }
}
