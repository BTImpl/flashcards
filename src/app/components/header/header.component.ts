import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderModel, KnownUnknownEnum, UsersEnum } from 'src/app/model/header.model';
import { TranslatePipe } from '@ngx-translate/core';
import { WordStore } from 'src/app/services/word.store';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [TranslatePipe]
})
export class HeaderComponent {
  private router = inject(Router);
  private wordStore = inject(WordStore);

  model: HeaderModel = {
    user: UsersEnum.GABI,
    list: KnownUnknownEnum.KNOWN
  };

  toHome(){
    this.router.navigate(['/']);
  }

  changeList(){
    this.model.list = this.model.list === KnownUnknownEnum.KNOWN ? KnownUnknownEnum.UNKNOWN : KnownUnknownEnum.KNOWN;
  }

  changeUser(){
    this.model.user = this.model.user === UsersEnum.GABI ? UsersEnum.TOMI : UsersEnum.GABI;
    console.log(`user changed: ${this.model.user}`);
    this.wordStore.selectedSheet.set(this.model.user);
  }
}
