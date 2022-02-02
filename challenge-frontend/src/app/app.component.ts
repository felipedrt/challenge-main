import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //#region Attributes

  //#region Public Attributes

  public menuItems: Array<PoMenuItem> = [
    {
      label: 'Category Management',
      action: (menu: PoMenuItem) => {
        this.childPageTitle = menu.label;
        this.route.navigate(['categoryManagement']);
      },
      icon: 'po-icon-list',
      shortLabel: 'Category'
    },
    {
      label: 'Device Management',
      action: (menu: PoMenuItem) => {
        this.childPageTitle = menu.label;
        this.route.navigate(['deviceManagement']);
      },
      icon: 'po-icon-device-smartphone',
      shortLabel: 'Device',
    },
  ];

  public childPageTitle = '';

  //#endregion

  //#endregion

  //#region Constructor

  constructor(public route: Router) {}

  //#endregion
}
