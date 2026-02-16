import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderModel, KnownUnknownEnum, UsersEnum } from 'src/app/model/header.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [TranslatePipe]
})
export class HeaderComponent {
  private router = inject(Router);

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

  chanegeUser(){
    this.model.user = this.model.user === UsersEnum.GABI ? UsersEnum.TOMI : UsersEnum.TOMI;
  }
}
