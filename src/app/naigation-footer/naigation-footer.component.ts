import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-naigation-footer',
  imports: [ TranslatePipe],
  templateUrl: './naigation-footer.component.html',
  styleUrl: './naigation-footer.component.css',
  standalone: true
})
export class NaigationFooterComponent {
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
