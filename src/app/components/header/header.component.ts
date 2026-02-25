import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListTypeEnum, LIST_TYPES, UsersEnum } from 'src/app/model/header.model';
import { TranslatePipe } from '@ngx-translate/core';
import { WordStore } from 'src/app/services/word.store';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [TranslatePipe, NgClass]
})
export class HeaderComponent {
  private router = inject(Router);
  wordStore = inject(WordStore);

  readonly UsersEnum = UsersEnum;

  readonly currentListConfig = computed(() => LIST_TYPES[this.wordStore.selectedListType()]);

  toHome(){
    this.router.navigate(['/']);
  }

  changeList(){
    this.wordStore.selectedListType.update(current =>
      current === ListTypeEnum.KNOWN ? ListTypeEnum.UNKNOWN : ListTypeEnum.KNOWN
    );
  }

  changeUser(){
    this.wordStore.selectedSheet.update(current =>
      current === UsersEnum.GABI ? UsersEnum.TOMI : UsersEnum.GABI
    );
  }
}
