import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PoMenuModule, PoMenuPanelItem, PoMenuPanelModule, PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-masterpage',
  standalone: true,
  imports: [PoMenuModule, PoMenuPanelModule, PoPageModule, RouterModule],
  templateUrl: './masterpage.html',
  styleUrl: './masterpage.css',
})

export class Masterpage {

  title:string = 'Home';

  readonly menus: Array<PoMenuPanelItem> = [
    { label: 'Home', link: 'home', action: this.clickItemMenu.bind(this), icon: 'an-fill an-house'},
    { label: 'Clientes', link: 'customer', action: this.clickItemMenu.bind(this), icon: 'an-fill an-users-four' },
    { label: 'Orçamentos', link: 'budgets', action: this.clickItemMenu.bind(this), icon: 'an-fill an-file' },
    { label: 'Logoff', link: 'logoff', action: this.clickItemMenu.bind(this),icon: 'an-fill an-arrow-bend-up-left' }
  ];

  clickItemMenu(menu: PoMenuPanelItem):void{
    this.title = menu.label;
  }

}
